import { Button } from '../../../ui/form/Buttons'
import { ErrorText } from '../../../ui/form/ErrorText'
import { Input } from '../../../ui/form/Input'
import { Select } from '../../../ui/form/Select'
import { AdminResponsiveContainer } from '../../../ui/form/AdminResponsiveContainer'
import { useRegisterClient, type RegisterClientForm } from '../../../hooks/useRegisterClient'

const RegisterNewClient = () => {
  const { form, errors, isSubmitting, successMessage, updateField, submit } = useRegisterClient()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submit()
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
              <label className="mb-1 block text-sm font-medium">First name</label>
              <Input
                type="text"
                value={form.firstName}
                onChange={(event) => updateField('firstName', event.target.value)}
                placeholder="e.g. Juan"
                error={errors.firstName}
                className="w-full p-4 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Last name</label>
              <Input
                type="text"
                value={form.lastName}
                onChange={(event) => updateField('lastName', event.target.value)}
                placeholder="e.g. Dela Cruz"
                error={errors.lastName}
                className="w-full p-4 text-black"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <Input
              type="text"
              value={form.userName}
              onChange={(event) => updateField('userName', event.target.value)}
              placeholder="e.g. juan.delacruz"
              error={errors.userName}
              className="w-full p-4 text-black"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <Input
              type="password"
              value={form.password}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Enter a secure password"
              error={errors.password}
              className="w-full p-4 text-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Office code</label>
              <Input
                type="text"
                value={form.officeCode}
                onChange={(event) => updateField('officeCode', event.target.value)}
                placeholder="e.g. HRMO"
                error={errors.officeCode}
                className="w-full p-4 text-black"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Role</label>
              <Select
                value={form.role}
                onChange={(event) =>
                  updateField('role', event.target.value as RegisterClientForm['role'])
                }
                error={errors.role}
                className="w-full p-4 text-black"
              >
                <option value="office_admin">Office Admin</option>
                <option value="hr_admin">HR Admin</option>
                <option value="super_admin">Super Admin</option>
              </Select>
            </div>
          </div>

          {errors.general && <ErrorText message={errors.general} />}

          {successMessage && (
            <div className="p-2 flex items-center gap-2 text-green-600 tracking-wider rounded mt-1">
              <small>{successMessage}</small>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#628dec] hover:opacity-90 text-white rounded-lg"
          >
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </AdminResponsiveContainer>
  )
}

export default RegisterNewClient