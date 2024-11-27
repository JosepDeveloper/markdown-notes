import {userSchema} from '../../lib/schemas/user.ts'
// @ts-ignore
import bcrypt from 'bcrypt'
import {prisma} from "../../lib/prisma.ts";

export async function POST({request}: { request: Request }) {
  const data = await request.json()

  const user = await userSchema.safeParseAsync(data)

  if (!user.success) {
    console.log(user.error)
    return new Response(JSON.stringify({message: 'Invalid User'}), {status: 400})
  }

  const {data: dataUser} = user

  const saltRounds = import.meta.env.SALT_ROUND
  const hashPassword = await bcrypt.hash(dataUser.password, Number(saltRounds))

  const dataToSave = {
    username: dataUser.username,
    password: hashPassword,
    securityQuestion: dataUser.securityQuestion,
    responseSecurityQuestion: dataUser.responseSecurityQuestion
  }

  let userSave
  try {
    userSave = await prisma.user.create({
      data: dataToSave
    })
  } catch (error) {
    return new Response(JSON.stringify({message: 'Error al guardar el usuario'}), {status: 500})
  }


  return new Response(
    JSON.stringify({
      message: 'User Save Succesfully',
      data: {
        username: userSave.username,
      }
    }),
    {
      status: 200
    }
  )
}