import { authService } from '../../services/Auth.service';
import { makeUseForm } from '../hookMakers/makeUseForm.hook';

export const useResetPassword = makeUseForm(authService.resetPassword, {
  password: '',
  passwordConfirmation: '',
  token: '',
  isEmpty: true,
});
