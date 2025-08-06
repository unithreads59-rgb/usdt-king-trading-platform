import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Mock admin data for demonstration
const mockAdmins = [
  {
    id: 1,
    username: "admin",
    email: "samadmehboob80@gmail.com",
    password_hash: "$2b$10$8K1p/a0dclxMNW.bIXXgaOKgq/Y4Fq4FNu1Vb2PuFuZ.Qs5Qs5Qs5" // Dan98990
  }
];

// Mock system settings
let systemSettings = {
  depositAddress: "0xf80Aa9242BBc876443E9Aef9A4038b904f4aD1A2",
  withdrawalsPaused: false,
  lastNotice: ""
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, password, token, withdrawalId, depositId, notice, pauseWithdrawals, newDepositAddress } = body;

    if (action === "login") {
      if (!username || !password) {
        return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
      }

      const admin = mockAdmins.find(a => a.email === username || a.username === username);
      if (!admin) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      // For demo purposes, we'll use a simple password check
      // In production, you should hash the password properly
      const isValid = password === "Dan98990" || await bcrypt.compare(password, admin.password_hash);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const adminToken = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: "7d" });
      
      return NextResponse.json({
        admin: { id: admin.id, username: admin.username, email: admin.email },
        token: adminToken
      }, { status: 200 });

    } else if (action === "approveWithdrawal") {
      if (!token || !withdrawalId) {
        return NextResponse.json({ error: "Missing token or withdrawalId" }, { status: 400 });
      }

      // Verify admin token
      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      // Simulate withdrawal approval
      return NextResponse.json({ 
        message: "Withdrawal approved successfully",
        withdrawalId 
      }, { status: 200 });

    } else if (action === "cancelWithdrawal") {
      if (!token || !withdrawalId) {
        return NextResponse.json({ error: "Missing token or withdrawalId" }, { status: 400 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      return NextResponse.json({ 
        message: "Withdrawal cancelled successfully",
        withdrawalId 
      }, { status: 200 });

    } else if (action === "approveDeposit") {
      if (!token || !depositId) {
        return NextResponse.json({ error: "Missing token or depositId" }, { status: 400 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      return NextResponse.json({ 
        message: "Deposit approved successfully",
        depositId 
      }, { status: 200 });

    } else if (action === "cancelDeposit") {
      if (!token || !depositId) {
        return NextResponse.json({ error: "Missing token or depositId" }, { status: 400 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      return NextResponse.json({ 
        message: "Deposit cancelled successfully",
        depositId 
      }, { status: 200 });

    } else if (action === "releaseNotice") {
      if (!token || !notice) {
        return NextResponse.json({ error: "Missing token or notice" }, { status: 400 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      systemSettings.lastNotice = notice;
      return NextResponse.json({ 
        message: "Notice released to all users successfully",
        notice 
      }, { status: 200 });

    } else if (action === "pauseWithdrawals") {
      if (!token || pauseWithdrawals === undefined) {
        return NextResponse.json({ error: "Missing token or pauseWithdrawals flag" }, { status: 400 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      systemSettings.withdrawalsPaused = pauseWithdrawals;
      return NextResponse.json({ 
        message: `Withdrawals ${pauseWithdrawals ? "paused" : "resumed"} successfully`,
        withdrawalsPaused: pauseWithdrawals 
      }, { status: 200 });

    } else if (action === "editDepositAddress") {
      if (!token || !newDepositAddress) {
        return NextResponse.json({ error: "Missing token or newDepositAddress" }, { status: 400 });
      }

      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      systemSettings.depositAddress = newDepositAddress;
      return NextResponse.json({ 
        message: "Deposit address updated successfully",
        depositAddress: newDepositAddress 
      }, { status: 200 });

    } else if (action === "getStats") {
      try {
        jwt.verify(token, JWT_SECRET);
      } catch (err) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
      }

      return NextResponse.json({
        stats: {
          totalUsers: 1247,
          totalDeposits: 45678.90,
          totalWithdrawals: 23456.78,
          pendingTransactions: 12
        },
        systemSettings
      }, { status: 200 });

    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
