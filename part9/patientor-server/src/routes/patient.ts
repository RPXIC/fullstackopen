import express from 'express'
import patientService from '../services/patientService'
import { toNewEntry } from '../utils'

const router = express.Router()

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params
    const patient = patientService.getPatient(id)
    return res.json(patient)
  } catch (e) {
    return res.status(400).send(e.message)
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params
    const newEntry = toNewEntry(req.body)
    const patient = patientService.getPatient(id)
    if (patient) {
      patientService.addEntry(patient, newEntry)
      return res.json(newEntry)
    } else {
      return res.status(404).send('Patient not found')
    }
  } catch (e) {
    return res.status(400).send(e.message)
  }
})

export default router
