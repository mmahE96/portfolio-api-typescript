import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function findUnique(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function findMany() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return error;
  }
}

async function create(email: string, password: string, role: string) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        role,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function updateRole(email: string, role: string) {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        role: role,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function updatePassword(email: string, password: string) {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

async function pagination(page: any, limit: any) {
  try {
    const users = await prisma.user.findMany({
      skip: page,
      take: limit,
    });
    return users;
  } catch (error) {
    return error;
  }
}

export { findUnique, findMany, create, updateRole, updatePassword, pagination };
