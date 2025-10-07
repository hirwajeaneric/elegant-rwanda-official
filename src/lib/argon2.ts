import { hash, verify, type Options } from '@node-rs/argon2';

const opts: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  return await hash(password, opts);
}

export async function verifyPassword(data: {password: string, hash: string}) {
  return await verify(data.hash, data.password, opts);
}