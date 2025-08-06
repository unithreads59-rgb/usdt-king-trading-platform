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
    const { action, username, email, password, token, withdrawalId, depositId, notice, pauseWithdrawals, newDepositAddress } = req.body;

    if (action === "login") {
      if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" });
      }
      const client = await pool.connect();
      try {
        const result = await client.query("SELECT * FROM admins WHERE username = $1", [username]);
        const admin = result.rows[0];
        if (!admin) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const isValid = await bcrypt.compare(password, admin.password_hash);
        if (!isValid) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ admin: { id: admin.id, username: admin.username, email: admin.email }, token });
      } catch (error) {
        res.status(500).json({ error: "Login failed" });
      } finally {
        client.release();
      }
    } else if (action === "approveWithdrawal") {
      if (!token || !withdrawalId) {
        return res.status(400).json({ error: "Missing token or withdrawalId" });
      }
      // Verify token and approve withdrawal logic here
      res.status(200).json({ message: "Withdrawal approved" });
    } else if (action === "cancelWithdrawal") {
      if (!token || !withdrawalId) {
        return res.status(400).json({ error: "Missing token or withdrawalId" });
      }
      // Verify token and cancel withdrawal logic here
      res.status(200).json({ message: "Withdrawal cancelled" });
    } else if (action === "approveDeposit") {
      if (!token || !depositId) {
        return res.status(400).json({ error: "Missing token or depositId" });
      }
      // Verify token and approve deposit logic here
      res.status(200).json({ message: "Deposit approved" });
    } else if (action === "cancelDeposit") {
      if (!token || !depositId) {
        return res.status(400).json({ error: "Missing token or depositId" });
      }
      // Verify token and cancel deposit logic here
      res.status(200).json({ message: "Deposit cancelled" });
    } else if (action === "releaseNotice") {
      if (!token || !notice) {
        return res.status(400).json({ error: "Missing token or notice" });
      }
      // Logic to release notice to users
      res.status(200).json({ message: "Notice released" });
    } else if (action === "pauseWithdrawals") {
      if (!token || pauseWithdrawals === undefined) {
        return res.status(400).json({ error: "Missing token or pauseWithdrawals flag" });
      }
      // Logic to pause or unpause withdrawals
      res.status(200).json({ message: `Withdrawals ${pauseWithdrawals ? "paused" : "unpaused"}` });
    } else if (action === "editDepositAddress") {
      if (!token || !newDepositAddress) {
        return res.status(400).json({ error: "Missing token or newDepositAddress" });
      }
      // Logic to update deposit address in system settings
      res.status(200).json({ message: "Deposit address updated" });
    } else {
      res.status(400).json({ error: "Invalid action" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
