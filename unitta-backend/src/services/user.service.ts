import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import { Role, Status } from '@prisma/client';

export async function findAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      credits: true,
      createdAt: true
    }
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      credits: true,
      createdAt: true
    }
  });
}

export async function createUserService(data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
  status?: Status;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new Error('Email já cadastrado');

  const hashed = await bcrypt.hash(data.password, 10);

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role || 'PRO',
      status: data.status || 'PENDING'
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      credits: true,
      createdAt: true
    }
  });
}

export async function updateUserStatusService(id: string, status: Status) {
  const user = await prisma.user.update({
    where: { id },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      status: true
    }
  });
  return user;
}

export async function deleteUserService(id: string) {
  await prisma.user.delete({ where: { id } });
}
