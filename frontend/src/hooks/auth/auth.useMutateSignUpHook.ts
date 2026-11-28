import { useMutation } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { signUpService } from '../../services/auth/auth.service';

import type { SignUpRequest } from '../../types/AuthorizeTypes';

export const useMutateSignUpHook = () => {

    return useMutation({
        mutationFn: (request: SignUpRequest) => signUpService(request),

        onSuccess: (data) => {
            CSFCustomToaster.success(data.message);
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message);
        }
    });
}