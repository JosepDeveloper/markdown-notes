import {z} from 'zod'

const userSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
  recoveryCode: z.string().min(10)
})

const loginUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(3).max(20),
})

const recoverPasswordSchema = z.object({
  username: z.string().min(3).max(20),
  recoveryCode: z.string().min(10),
  newPassword: z.string().min(3).max(20)
})

export {userSchema, loginUserSchema, recoverPasswordSchema}