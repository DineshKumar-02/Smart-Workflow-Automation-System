const express = require("express")
const router = express.Router()
const Workflow = require("../models/Workflow")

// GET all workflows
router.get("/", async (req, res) => {
  const data = await Workflow.find()
  res.json(data)
})

// CREATE workflow
router.post("/", async (req, res) => {
  const newWorkflow = new Workflow({
    ...req.body,
    version: 1,
    status: "Pending",
    startedBy: "Dinesh",
    startDate: new Date().toLocaleDateString(),
    endDate: "-"
  })

  await newWorkflow.save()
  res.json(newWorkflow)
})

// DELETE
router.delete("/:id", async (req, res) => {
  await Workflow.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Workflow.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updated)
})

module.exports = router