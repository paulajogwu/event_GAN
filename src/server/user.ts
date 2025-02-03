import { db } from "./db";
export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({ where: { id } });
  } catch {
    return null;
  }
};

export const getAccountTypeByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user?.role
  } catch {
    return null;
  }
};
