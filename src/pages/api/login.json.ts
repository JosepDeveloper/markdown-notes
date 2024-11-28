import {loginUserSchema} from "../../lib/schemas/user.ts";
import {prisma} from "../../lib/prisma.ts";
import bcrypt from "bcrypt";

export async function POST({request}: { request: Request }) {
  const data = await request.json()

  const userValidation = await loginUserSchema.safeParseAsync(data)

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

  const passwordValidation = await bcrypt.compare(data.password, userInDB.password)

  if (!passwordValidation) {
    return new Response(JSON.stringify({message: 'Invalid password'}), {status: 401})
  }

  return new Response(
    JSON.stringify({
      message: 'Login Successful',
      data: {
        username: userInDB.username,
      }
    }),
    {
      status: 200
    }
  )
}