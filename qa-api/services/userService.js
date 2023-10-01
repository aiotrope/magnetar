import { sql } from '../database/database.js';

const getUsers = async () => {
  const users = await sql`SELECT * FROM users;`;
  return users;
};

const getUserById = async (id) => {
  const users = await sql`SELECT * FROM users WHERE id=${id};`;

  return users[0];
};

const getUserByUuid = async (uuid) => {
  const users = await sql`SELECT * FROM users WHERE uuid=${uuid};`;

  return users[0];
};

const userService = {
  getUsers,
  getUserById,
  getUserByUuid,
};

export default userService;
