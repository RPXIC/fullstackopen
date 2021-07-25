import express from 'express'
import patientsService from '../services/patientsService'
import { toNewPatientEntry } from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries())
})

router.post('/', (_req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(_req.body)
    const addedPatient = patientsService.addPatient(newPatientEntry)
    res.json(addedPatient)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

export default router
