import * as yup from 'yup';
import { commonEmailRule, commonFieldRule } from '~/utils';

export const loginSchema = yup.object().shape({
  email: commonEmailRule,
  password: commonFieldRule,
});
