"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Transaction {
  id: number;
  type: "deposit" | "withdrawal";
  amount: number;
  status: "pending" | "approved" | "cancelled";
  date: string;
  txHash?: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(12450.75);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Withdrawal form
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  // Deposit form
  const [depositAmount, setDepositAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);

  const depositAddress = "0xf80Aa9242BBc876443E9Aef9A4038b904f4aD1A2";

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("userData");

    if (!token || !userData) {
      router.push("/auth");
      return;
    }

    setUser(JSON.parse(userData));
    loadMockTransactions();
  }, [router]);

  const loadMockTransactions = () => {
    const mockTransactions: Transaction[] = [
      {
        id: 1,
        type: "deposit",
        amount: 5000.00,
        status: "approved",
        date: "2024-01-15 10:30:00",
        txHash: "0x1234...abcd"
      },
      {
        id: 2,
        type: "withdrawal",
        amount: 1500.00,
        status: "pending",
        date: "2024-01-14 16:45:00"
      },
      {
        id: 3,
        type: "deposit",
        amount: 2300.50,
        status: "approved",
        date: "2024-01-13 09:15:00",
        txHash: "0x5678...efgh"
      }
    ];

    setTransactions(mockTransactions);
  };

  const showMessage = (message: string, type: "success" | "error") => {
    if (type === "success") {
      setSuccess(message);
      setError("");
    } else {
      setError(message);
      setSuccess("");
    }
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amount > balance) {
      setError("Insufficient balance");
      return;
    }

    if (!withdrawAddress.trim()) {
      setError("Please enter a withdrawal address");
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newTransaction: Transaction = {
        id: transactions.length + 1,
        type: "withdrawal",
        amount: amount,
        status: "pending",
        date: new Date().toLocaleString(),
      };

      setTransactions(prev => [newTransaction, ...prev]);
      setWithdrawAmount("");
      setWithdrawAddress("");
      showMessage("Withdrawal request submitted successfully!", "success");
    } catch (err) {
      showMessage("Failed to submit withdrawal request", "error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showMessage("Address copied to clipboard!", "success");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    router.push("/");
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    
    return (
      <Badge className={`${variants[status as keyof typeof variants]} border`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">UK</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              USDT King
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.username}</span>
            <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4 text-center">BEP-20 Deposit</h3>
            <p className="text-gray-600 mb-4 text-center">Send your USDT (BEP-20) to this address:</p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm font-mono break-all text-center">{depositAddress}</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => copyToClipboard(depositAddress)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Copy Address
              </Button>
              <Button 
                onClick={() => setShowDepositModal(false)}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              ⚠️ Only send USDT on BEP-20 network to this address
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Balance Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Account Balance</CardTitle>
            <CardDescription>Your current USDT holdings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-4">
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={() => setShowDepositModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Deposit USDT
              </Button>
              <Button 
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                View Holdings
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Withdrawal Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Withdraw USDT</CardTitle>
              <CardDescription>Send USDT to your external wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWithdrawal} className="space-y-4">
                <div>
                  <Label htmlFor="withdraw-amount">Amount (USDT)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    step="0.01"
                    placeholder="Enter withdrawal amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Available: ${balance.toLocaleString()}
                  </p>
                </div>
                <div>
                  <Label htmlFor="withdraw-address">BEP-20 Address</Label>
                  <Input
                    id="withdraw-address"
                    type="text"
                    placeholder="Enter your BEP-20 wallet address"
                    value={withdrawAddress}
                    onChange={(e) => setWithdrawAddress(e.target.value)}
                    className="font-mono text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Processing..." : "Submit Withdrawal"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Transaction History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Recent Transactions</CardTitle>
              <CardDescription>Your transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        transaction.type === 'withdrawal' ? 'bg-red-400' : 'bg-green-400'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-800">
                          {transaction.type === 'withdrawal' ? 'Withdrawal' : 'Deposit'}
                        </div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">${transaction.amount.toFixed(2)}</div>
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
