import diagnoses from '../../data/diagnoses';

import { Diagnostic } from '../types';

const getEntries = (): Array<Diagnostic> => {
  return diagnoses;
};

export default {
    getEntries
};