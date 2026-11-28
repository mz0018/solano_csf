import { useNavigate } from 'react-router-dom';
import { useAuthorize } from '../useAuthorize';
import { useMutation } from '@tanstack/react-query';
import { CSFCustomToaster } from '../../utils/Toaster';
import { signInService } from '../../services/auth/auth.service';
import { getRoleBasedNavigationPath } from '../../utils/getRoleBasedNavigationPath';

import type { SignInRequest } from '../../types/AuthorizeTypes';

export const useMutateSignInHook = () => {

    const { verifyAuth } = useAuthorize();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (request: SignInRequest) => signInService(request),

        onSuccess: async (data) => {
            await verifyAuth();

            const path = getRoleBasedNavigationPath(data.role);
            navigate(path);

            CSFCustomToaster.success(data.message);
        },

        onError: (error: Error) => {
            CSFCustomToaster.error(error.message);
        }
    });
}