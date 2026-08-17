import { useState } from 'react'

export type RegisterClientForm = {
  firstName: string
  lastName: string
  userName: string
  password: string
  officeCode: string
  role: 'office_admin' | 'hr_admin' | 'super_admin'
}

const initialForm: RegisterClientForm = {
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  officeCode: '',
  role: 'office_admin',
}

export const useRegisterClient = () => {
  const [form, setForm] = useState<RegisterClientForm>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterClientForm | 'general', string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const updateField = <K extends keyof RegisterClientForm>(field: K, value: RegisterClientForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }))
  }

  const validate = () => {
    const nextErrors: Partial<Record<keyof RegisterClientForm, string>> = {}

    if (form.firstName.trim().length < 2) {
      nextErrors.firstName = 'First name must be at least 2 characters.'
    }

    if (form.lastName.trim().length < 2) {
      nextErrors.lastName = 'Last name must be at least 2 characters.'
    }

    if (form.userName.trim().length < 3) {
      nextErrors.userName = 'Username must be at least 3 characters.'
    }

    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    if (form.officeCode.trim().length < 3) {
      nextErrors.officeCode = 'Office code must be at least 3 characters.'
    }

    if (!form.role) {
      nextErrors.role = 'Please select a role.'
    }

    return nextErrors
  }

  const resetForm = () => setForm(initialForm)

  const submit = async () => {
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return false
    }

    setIsSubmitting(true)
    setErrors({})
    setSuccessMessage('')

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          userName: form.userName.trim(),
          password: form.password,
          officeCode: form.officeCode.trim(),
          role: form.role,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Unable to create client account.')
      }

      setSuccessMessage('Client account created successfully.')
      resetForm()
      return true
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'Something went wrong.' })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    successMessage,
    updateField,
    submit,
  }
}
