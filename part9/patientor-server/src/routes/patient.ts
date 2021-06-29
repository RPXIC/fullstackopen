import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const patient = patientService.getPatient(id)
        return res.json(patient)
    } catch (e) {
        return res.status(400).send(e.message);
    }
});

export default router;