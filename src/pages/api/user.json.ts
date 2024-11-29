import {recoverPasswordSchema, userSchema} from '../../lib/schemas/user.ts'
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
  const hashRecoveryCode = await bcrypt.hash(dataUser.recoveryCode, Number(saltRounds))

  const dataToSave = {
    username: dataUser.username,
    password: hashPassword,
    recoveryCode: hashRecoveryCode
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

export async function PUT({request}: { request: Request }) {
  console.log(request)
  const data = await request.json()

  const userValidation = await recoverPasswordSchema.safeParseAsync(data)

  if (!userValidation.success) {
    console.log(userValidation.error)
    return new Response(JSON.stringify({message: 'Invalid User'}), {status: 400})
  }

  let userInDB

  try {
    userInDB = await prisma.user.findUnique({
      where: {
        username: data.username
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({message: 'User not found'}), {status: 404})
  }

  if (!userInDB) {
    return new Response(JSON.stringify({message: 'User not found'}), {status: 404})
  }

  const passwordValidation = await bcrypt.compare(data.recoveryCode, userInDB.recoveryCode)

  if (!passwordValidation) {
    return new Response(JSON.stringify({message: 'Invalid recovery code'}), {status: 401})
  }

  const hashPassword = await bcrypt.hash(data.newPassword, Number(import.meta.env.SALT_ROUND))

  const dataToSave = {
    password: hashPassword
  }

  try {
    await prisma.user.update({
      where: {
        username: data.username
      },
      data: dataToSave
    })
  } catch (error) {
    return new Response(JSON.stringify({message: 'Error al guardar el usuario'}), {status: 500})
  }

  return new Response(
    JSON.stringify({
      message: 'Password recovered successfully',
      data: {
        username: userInDB.username,
      }
    }),
    {
      status: 200
    }
  )
}