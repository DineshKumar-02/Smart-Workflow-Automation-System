const express = require('express')
const router = express.Router()
const Workflow  = require('../Models/Workflow')
const Step      = require('../Models/Step')
const Rule      = require('../Models/Rule')
const Execution = require('../Models/Execution')

// ─────────────────────────────────────────
// WORKFLOWS
// ─────────────────────────────────────────

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
    res.json({ message: 'Workflow deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────
// STEPS
// ─────────────────────────────────────────

// GET all steps for a workflow
router.get('/:id/steps', async (req, res) => {
  try {
    const steps = await Step.find({ workflow_id: req.params.id }).sort({ order: 1 })
    res.json(steps)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ADD step to workflow
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
router.delete('/steps/:stepId', async (req, res) => {
  try {
    await Step.findByIdAndDelete(req.params.stepId)
    res.json({ message: 'Step deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────
// RULES
// ─────────────────────────────────────────

// GET all rules for a step
router.get('/steps/:stepId/rules', async (req, res) => {
  try {
    const rules = await Rule.find({ step_id: req.params.stepId }).sort({ priority: 1 })
    res.json(rules)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ADD rule to step
router.post('/steps/:stepId/rules', async (req, res) => {
  try {
    const rule = new Rule({ ...req.body, step_id: req.params.stepId })
    await rule.save()
    res.json(rule)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE rule
router.delete('/rules/:ruleId', async (req, res) => {
  try {
    await Rule.findByIdAndDelete(req.params.ruleId)
    res.json({ message: 'Rule deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────
// EXECUTION — RUN WORKFLOW
// ─────────────────────────────────────────

router.post('/:id/execute', async (req, res) => {
  try {
    const { Parser } = require('expr-eval')
    const workflow  = await Workflow.findById(req.params.id)
    const steps     = await Step.find({ workflow_id: req.params.id }).sort({ order: 1 })
    const inputData = req.body.data || {}
    const logs      = []

    let currentStep = steps[0]  // start from first step

    while (currentStep) {
      const rules = await Rule.find({ step_id: currentStep._id.toString() }).sort({ priority: 1 })
      const evaluatedRules = []
      let nextStepId = null

      for (const rule of rules) {
        // DEFAULT rule — fallback
        if (rule.condition === 'DEFAULT') {
          evaluatedRules.push({ rule: 'DEFAULT', result: true })
          nextStepId = rule.next_step_id
          break
        }
        // Evaluate condition against input data
        try {
          const parser = new Parser()
          const result = parser.evaluate(rule.condition, inputData)
          evaluatedRules.push({ rule: rule.condition, result })
          if (result === true) {
            nextStepId = rule.next_step_id
            break  // first match wins
          }
        } catch (e) {
          evaluatedRules.push({ rule: rule.condition, result: false, error: e.message })
        }
      }

      // Save log for this step
      logs.push({
        step_name:          currentStep.name,
        step_type:          currentStep.step_type,
        evaluated_rules:    evaluatedRules,
        selected_next_step: nextStepId,
        status:             'completed',
        started_at:         new Date()
      })

      // Move to next step
      if (nextStepId) {
        currentStep = await Step.findById(nextStepId)
      } else {
        currentStep = null  // workflow ends
      }
    }

    // Save execution to DB
    const execution = new Execution({
      workflow_id:  req.params.id,
      status:       'completed',
      data:         inputData,
      logs:         logs,
      triggered_by: req.body.triggered_by || 'user'
    })
    await execution.save()
    res.json(execution)

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─────────────────────────────────────────
// EXECUTIONS — AUDIT LOG
// ─────────────────────────────────────────

// GET all executions
router.get('/executions/all', async (req, res) => {
  try {
    const data = await Execution.find().sort({ started_at: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET one execution by ID
router.get('/executions/:execId', async (req, res) => {
  try {
    const data = await Execution.findById(req.params.execId)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router