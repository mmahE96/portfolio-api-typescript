import { PrismaClient } from '@prisma/client'
import { Article } from '../types/article.type';
import { User } from '../types/user.type';
const prisma = new PrismaClient()

async function findById(id: string) {
  const userId = parseInt(id)
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

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
    const users = await prisma.user.findMany(
      {
        include: {
          articles: true,
        },
      }
      
    );
    return users;
  } catch (error) {
    return error;
  }
}

async function create(email: string, password: string, role: string) {
  
  
  try {
    const user: any = await prisma.user.create({
      data: {
        email,
        password,
        role,        
      },
    });
    console.log(user.articles)
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

export {findById, findUnique, findMany, create, updateRole, updatePassword, pagination, prisma };
