/* import { sql } from '../database/database.js';

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

const create = async (uuid) => {
  const user = await sql`INSERT INTO users (uuid) 
  VALUES (${uuid}) returning *;`;

  return user;
};

const userService = {
  getUsers,
  getUserById,
  getUserByUuid,
  create,
};

export default userService;
 */