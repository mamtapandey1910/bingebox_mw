import { FieldPacket, QueryResult } from "mysql2";
import db from "../../db";
import bcryptjs from "bcryptjs";

const encryptPassword = async (password: string) => {
  const salts = await bcryptjs.genSalt(10);

  const hashPass = await bcryptjs.hash(password, salts);

  return hashPass;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
  avatar_url?: string,
  refresh_token?: string
) => {
  await db.execute(`CREATE TABLE IF NOT EXISTS 
            users(id INT AUTO_INCREMENT PRIMARY KEY ,
            name VARCHAR(100), 
            email VARCHAR(100) UNIQUE NOT NULL, 
            password VARCHAR(255) NOT NULL, 
            role VARCHAR(100) NOT NULL, 
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
            avatar_url VARCHAR(255), 
            refresh_token varchar(255))`);

  const hashPass = await encryptPassword(password);

  const [userid]: any = await db.execute(
    "INSERT INTO users (name, email, password, role) VALUES(?,?,?,?)",
    [name, email, hashPass, role]
  );

  const [userRows]: any = await db.execute(
    "SELECT name, email, role FROM users WHERE id=?",
    [userid.insertId]
  );
  return {
    userid: userid.insertId,
    ...userRows[0],
  };
};

export const findUserByEmail = async (email: string) => {
  const query = `SELECT id, name, password, role,avatar_url  FROM users WHERE email="${email}"`;

  const [userdetails]: any = await db.execute(query);
  return userdetails[0];
};

export const updatedUserModel = async (
  userid?: string,
  name?: string,
  email?: string,
  password?: string,
  role?: string,
  avatar_url?: string,
  refresh_token?: string
) => {
  const updateFields: Record<string, any> = {
    name,
    email,
    password,
    role,
    avatar_url,
    refresh_token,
  };

  const values: string[] = [];
  for (const [key, value] of Object.entries(updateFields)) {
    if (key === email) {
      values.push(`${key} = "${value}"`);
    }
    if (value && key !== email) {
      values.push(`${key} = '${value}'`);
    }
  }
  const query = values.join(", ");
  const updateUserQuery =
    `UPDATE users SET ` + query + ` WHERE id = '${userid}'`;
  const response = await db.execute(updateUserQuery);
};

export const verifyUser = async (
  id: string,
  password: string
): Promise<boolean> => {
  return false;
};
