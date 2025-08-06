import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Mock user data for demonstration
const mockUsers = [
  {
    id: 1,
    username: "testuser",
    email: "user@example.com",
    password_hash: "$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi" // password
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, email, password } = body;

    if (action === "register") {
      if (!username || !email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email || u.username === username);
      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: mockUsers.length + 1,
        username,
        email,
        password_hash: hashedPassword
      };
      
      mockUsers.push(newUser);
      
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "7d" });
      
      return NextResponse.json({
        user: { id: newUser.id, username: newUser.username, email: newUser.email },
        token
      }, { status: 201 });

    } else if (action === "login") {
      if (!email || !password) {
        return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
      }

      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const isValid = await bcrypt.compare(password, user.password_hash);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      
      return NextResponse.json({
        user: { id: user.id, username: user.username, email: user.email },
        token
      }, { status: 200 });

    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
