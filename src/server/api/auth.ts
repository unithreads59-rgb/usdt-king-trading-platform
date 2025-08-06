import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { action, username, email, password } = req.body;

    if (action === "register") {
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const client = await pool.connect();
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(
          "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
          [username, email, hashedPassword]
        );
        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ user, token });
      } catch (error) {
        res.status(500).json({ error: "Registration failed" });
      } finally {
        client.release();
      }
    } else if (action === "login") {
      if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
      }
      const client = await pool.connect();
      try {
        const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ user: { id: user.id, username: user.username, email: user.email }, token });
      } catch (error) {
        res.status(500).json({ error: "Login failed" });
      } finally {
        client.release();
      }
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
