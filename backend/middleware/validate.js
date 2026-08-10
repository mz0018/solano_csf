import { is } from "zod/v4/locales";

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map(issue => ({
      field: issue.path[0],
      message: issue.message
    }))

    return res.status(400).json({
      message: "Invalid request data",
      errors
    });
  }

  req.body = result.data;
  next();
};