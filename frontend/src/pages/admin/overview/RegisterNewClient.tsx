import { useState } from 'react'
import { Input } from '../../../ui/form/Input'
import { Select } from '../../../ui/form/Select'
import { Button } from '../../../ui/form/Buttons'
import { Loader } from '../../../components/Loader'
import { ErrorText } from '../../../ui/form/ErrorText'
import { useMutateSignUpHook } from '../../../hooks/auth/auth.useMutateSignUpHook'
import { AdminResponsiveContainer } from '../../../ui/form/AdminResponsiveContainer'
import { useQueryGetOfficeListHook } from '../../../hooks/hr_office_admin/useQueryGetOfficeListHook'

import type { SignUpRequest } from '../../../types/AuthorizeTypes'

const RegisterNewClient = () => {

  const { mutate: signUpRequest, isPending: signUpRequestPending } = useMutateSignUpHook();
  const { data: offices, isPending: officesLoading, error: officesError } = useQueryGetOfficeListHook();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [officeCode, setOfficeCode] = useState<string>("");

  const [hasErrors, setHasErrors] = useState<string>("");

  const [role, setRole] = useState<SignUpRequest["role"]>("office_admin");
  const validRoles = ['office_admin', 'hr_admin', 'super_admin', 'head_office_admin'];

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setHasErrors("First name is required.");
      return;
    }

    if (!lastName.trim()) {
      setHasErrors("Last name is required.");
      return;
    }

    if (!userName.trim()) {
      setHasErrors("Username is required.");
      return;
    }

    if (!password.trim()) {
      setHasErrors("Password is required.");
      return;
    }

    if (!officeCode.trim()) {
      setHasErrors("Office code is required.");
      return;
    }

    if (!role.trim()) {
      setHasErrors("User role is required.");
      return;
    }

    setHasErrors("");
    signUpRequest({ firstName, lastName, userName, password, officeCode, role });
  }

  return (
    <AdminResponsiveContainer>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <div className="flex flex-col leading-none">
          <h1 className="text-2xl font-semibold">Add Client Account</h1>
          <span className="text-sm text-gray-500">Create a new office or admin account.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="client-first-name" className="mb-1 block text-sm font-medium">First name</label>
              <Input
                id="client-first-name"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Juan"
                error={hasErrors}
                className="w-full p-4 text-black"
              />
            </div>

            <div>
              <label htmlFor="client-last-name" className="mb-1 block text-sm font-medium">Last name</label>
              <Input
                id="client-last-name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="e.g. Dela Cruz"
                error={hasErrors}
                className="w-full p-4 text-black"
              />
            </div>
          </div>

          <div>
            <label htmlFor="client-username" className="mb-1 block text-sm font-medium">Username</label>
            <Input
              id="client-username"
              name="username"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g. juan.delacruz"
              error={hasErrors}
              className="w-full p-4 text-black"
            />
          </div>

          <div>
            <label htmlFor="client-password" className="mb-1 block text-sm font-medium">Password</label>
            <Input
              id="client-password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a secure password"
              error={hasErrors}
              className="w-full p-4 text-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="client-office" className="mb-1 block text-sm font-medium">Office</label>

              {officesLoading ? (
                <div className="w-full p-4 flex items-center justify-center">
                  <Loader />
                </div>
              ) : officesError ? (
                <ErrorText message={officesError.message} />
              ) : (
                <Select
                  id="client-office"
                  variant="admin"
                  name="officeCode"
                  value={officeCode}
                  onChange={(e) => setOfficeCode(e.target.value)}
                  error={hasErrors}
                  className="w-full p-4 text-black"
                >
                  <option value="">Select an office...</option>
                  {offices.map((office) => (
                    <option key={office.code} value={office.code}>
                      {office.name} ({office.code})
                    </option>
                  ))}
                </Select>
              )}

            </div>

            <div>
              <label htmlFor="client-role" className="mb-1 block text-sm font-medium">Role</label>
              <Select
                id="client-role"
                variant="admin"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value as SignUpRequest["role"])}
                error={hasErrors}
                className="w-full p-4 text-black"
              >
                <option value="">Select a role...</option>
                {validRoles.map((role) => (
                  <option key={role} value={role}>
                    {role.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {hasErrors && <ErrorText message={hasErrors} />}

          <Button
            type="submit"
            disabled={signUpRequestPending}
            className="admin-blue-button"
          >
            {signUpRequestPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </AdminResponsiveContainer>
  )
}

export default RegisterNewClient