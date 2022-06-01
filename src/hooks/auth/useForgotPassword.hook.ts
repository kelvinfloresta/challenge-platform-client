import { authService } from '../../services/Auth.service';
import { makeUseForm } from '../hookMakers/makeUseForm.hook';

export const useForgotPassword = makeUseForm(authService.forgotPassword, {
  email: '',
  isEmpty: true,
});
