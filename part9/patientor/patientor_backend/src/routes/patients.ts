import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, {toNewEntry} from '../utils';
import { Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});
router.get('/:id', (_req, res) => {
  const patient = patientService.findById(String(_req.params.id));

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newPatientEntry = toNewPatientEntry(_req.body);
  const addedEntry = patientService.addEntry(newPatientEntry);
  res.json(addedEntry);
  } catch (e){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});
router.post('/:id/entries', (_req, res) => {

  try {
    const entry = toNewEntry(_req.body)  as Entry;
    const newEntry = patientService.addNewEntry(entry, _req.params.id);
    res.json(newEntry);
   } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
   }
  });
export default router;