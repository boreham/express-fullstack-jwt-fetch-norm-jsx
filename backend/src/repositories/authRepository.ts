import pool from "../config/db";

interface CreateUserInput {
  email: string;
  username?: string;
  password: string;
}

export const createUser = async ({ email, username, password }: CreateUserInput) => {
  const result = await pool.query(
    `INSERT INTO users (email, username, password, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING id, email, username, created_at`,
    [email, username || null, password]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
};
