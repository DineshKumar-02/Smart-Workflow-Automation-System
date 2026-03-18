const express = require('express')
const router = express.Router()
const Workflow  = require('../Models/Workflow')
const Step      = require('../Models/Step')
const Rule      = require('../Models/Rule')
const Execution = require('../Models/Execution')

// ─── WORKFLOWS ──────────────────────────────────────

// GET all workflows
router.get('/', async (req, res) => {
  const data = await Workflow.find()
  res.json(data)
})

// GET one workflow
router.get('/:id', async (req, res) => {
  const data = await Workflow.findById(req.params.id)
  res.json(data)
})

// CREATE workflow
router.post('/', async (req, res) => {
  const wf = new Workflow(req.body)
  await wf.save()
  res.json(wf)
})

// UPDATE workflow
router.put('/:id', async (req, res) => {
  const wf = await Workflow.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(wf)
})

// DELETE workflow
router.delete('/:id', async (req, res) => {
  await Workflow.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

// ─── STEPS ──────────────────────────────────────────

// GET steps for a workflow
router.get('/:id/steps', async (req, res) => {
  const steps = await Step.find({ workflow_id: req.params.id })
  res.json(steps)
})

// ADD step to workflow
router.post('/:id/steps', async (req, res) => {
  const step = new Step({ ...req.body, workflow_id: req.params.id })
  await step.save()
  res.json(step)
})

// DELETE step
router.delete('/steps/:stepId', async (req, res) => {
  await Step.findByIdAndDelete(req.params.stepId)
  res.json({ message: 'Step deleted' })
})

// ─── RULES ──────────────────────────────────────────

// GET rules for a step
router.get('/steps/:stepId/rules', async (req, res) => {
  const rules = await Rule.find({ step_id: req.params.stepId }).sort({ priority: 1 })
  res.json(rules)
})

// ADD rule to step
router.post('/steps/:stepId/rules', async (req, res) => {
  const rule = new Rule({ ...req.body, step_id: req.params.stepId })
  await rule.save()
  res.json(rule)
})

// DELETE rule
router.delete('/rules/:ruleId', async (req, res) => {
  await Rule.findByIdAndDelete(req.params.ruleId)
  res.json({ message: 'Rule deleted' })
})

// ─── EXECUTION ──────────────────────────────────────

// RUN workflow
router.post('/:id/execute', async (req, res) => {
  try {
    const { Parser } = require('expr-eval')
    const workflow = await Workflow.findById(req.params.id)
    const steps    = await Step.find({ workflow_id: req.params.id }).sort({ order: 1 })
    const inputData = req.body.data || {}
    const logs = []

    let currentStep = steps[0]

    while (currentStep) {
      const rules = await Rule.find({ step_id: currentStep._id.toString() }).sort({ priority: 1 })
      const evaluatedRules = []
      let nextStepId = null

      for (const rule of rules) {
        if (rule.condition === 'DEFAULT') {
          evaluatedRules.push({ rule: 'DEFAULT', result: true })
          nextStepId = rule.next_step_id
          break
        }
        try {
          const parser = new Parser()
          const result = parser.evaluate(rule.condition, inputData)
          evaluatedRules.push({ rule: rule.condition, result })
          if (result === true) {
            nextStepId = rule.next_step_id
            break
          }
        } catch(e) {
          evaluatedRules.push({ rule: rule.condition, result: false })
        }
      }

      logs.push({
        step_name:          currentStep.name,
        step_type:          currentStep.step_type,
        evaluated_rules:    evaluatedRules,
        selected_next_step: nextStepId,
        status:             'completed',
        started_at:         new Date()
      })

      // move to next step
      if (nextStepId) {
        currentStep = await Step.findById(nextStepId)
      } else {
        currentStep = null
      }
    }

    const execution = new Execution({
      workflow_id:  req.params.id,
      status:       'completed',
      data:         inputData,
      logs:         logs,
      triggered_by: req.body.triggered_by || 'user'
    })
    await execution.save()
    res.json(execution)

  } catch(err) {
    res.status(500).json({ error: err.message })
  }
})

// GET all executions
router.get('/executions/all', async (req, res) => {
  const data = await Execution.find().sort({ started_at: -1 })
  res.json(data)
})

// GET one execution
router.get('/executions/:execId', async (req, res) => {
  const data = await Execution.findById(req.params.execId)
  res.json(data)
})

module.exports = router