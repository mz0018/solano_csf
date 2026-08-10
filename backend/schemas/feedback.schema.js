import { z } from 'zod'
export const feedbackSchema = z.object({
  officeCode: z
    .string()
    .optional(),
  queueNumber: z
    .string()
    .min(1, "Queue number is required"),
  service: z
    .string()
    .min(1, "Service is required"),
  clientName: z
    .string()
    .trim()
    .max(100, "Name is too long")
    .optional(),
  contactNumber: z
    .string()
    .trim()
    .max(20, "Contact number is too long")
    .optional(),
  gender: z
    .string()
    .min(1, "Gender is required"),
  affiliation: z
    .string()
    .min(1, "Affiliation is required"),
  ageGroup: z
    .string()
    .min(1, "Age group is required"),
  employmentStatus: z
    .string()
    .min(1, "Employment status is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .optional(),
  barangay: z
    .string()
    .optional(),
  addressDetail: z
    .string()
    .optional(),
  comments: z
    .string()
    .optional(),
  responsiveness: z.number().int().min(1).max(5),
  reliability: z.number().int().min(1).max(5),
  accessFacilities: z.number().int().min(1).max(5),
  communication: z.number().int().min(1).max(5),
  costs: z.number().int().min(1).max(5),
  integrity: z.number().int().min(1).max(5),
  assurance: z.number().int().min(1).max(5),
  outcome: z.number().int().min(1).max(5),
})