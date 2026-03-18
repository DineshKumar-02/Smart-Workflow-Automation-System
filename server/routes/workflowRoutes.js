const express   = require('express')
const router    = express.Router()
const Workflow  = require('../Models/Workflow')
const Step      = require('../Models/Step')
const Rule      = require('../Models/Rule')
const Execution = require('../Models/Execution')

// GET all workflows
router.get('/', async (req, res) => {
  try {
    const data = await Workflow.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET one workflow
router.get('/:id', async (req, res) => {
  try {
    const data = await Workflow.findById(req.params.id)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE workflow
router.post('/', async (req, res) => {
  try {
    const wf = new Workflow(req.body)
    await wf.save()
    res.json(wf)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// UPDATE workflow
router.put('/:id', async (req, res) => {
  try {
    const wf = await Workflow.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(wf)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE workflow
router.delete('/:id', async (req, res) => {
  try {
    await Workflow.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET steps
router.get('/:id/steps', async (req, res) => {
  try {
    const steps = await Step.find({ workflow_id: req.params.id }).sort({ order: 1 })
    res.json(steps)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ADD step
router.post('/:id/steps', async (req, res) => {
  try {
    const step = new Step({ ...req.body, workflow_id: req.params.id })
    await step.save()
    res.json(step)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE step
router.delete('/:id/steps/:stepId', async (req, res) => {
  try {
    await Step.findByIdAndDelete(req.params.stepId)
    res.json({ message: 'Step deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET rules
router.get('/:id/steps/:stepId/rules', async (req, res) => {
  try {
    const rules = await Rule.find({ step_id: req.params.stepId }).sort({ priority: 1 })
    res.json(rules)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ADD rule
router.post('/:id/steps/:stepId/rules', async (req, res) => {
  try {
    const rule = new Rule({ ...req.body, step_id: req.params.stepId })
    await rule.save()
    res.json(rule)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE rule
router.delete('/:id/steps/:stepId/rules/:ruleId', async (req, res) => {
  try {
    await Rule.findByIdAndDelete(req.params.ruleId)
    res.json({ message: 'Rule deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// EXECUTE workflow
router.post('/:id/execute', async (req, res) => {
  try {
    const { Parser } = require('expr-eval')
    const steps     = await Step.find({ workflow_id: req.params.id }).sort({ order: 1 })
    const inputData = req.body.data || {}
    const logs      = []
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
        } catch (e) {
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

      currentStep = nextStepId ? await Step.findById(nextStepId) : null
    }

    const execution = new Execution({
      workflow_id:  req.params.id,
      status:       'completed',
      data:         inputData,
      logs,
      triggered_by: req.body.triggered_by || 'user'
    })
    await execution.save()
    res.json(execution)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET all executions
router.get('/executions/all', async (req, res) => {
  try {
    const data = await Execution.find().sort({ started_at: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET one execution
router.get('/executions/:execId', async (req, res) => {
  try {
    const data = await Execution.findById(req.params.execId)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router