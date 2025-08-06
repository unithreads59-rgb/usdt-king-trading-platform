"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface Transaction {
  id: number;
  user: string;
  email: string;
  amount: number;
  status: "pending" | "approved" | "cancelled";
  date: string;
  txHash?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [withdrawals, setWithdrawals] = useState<Transaction[]>([]);
  const [deposits, setDeposits] = useState<Transaction[]>([]);
  const [notice, setNotice] = useState("");
  const [pauseWithdrawals, setPauseWithdrawals] = useState(false);
  const [depositAddress, setDepositAddress] = useState("0xf80Aa9242BBc876443E9Aef9A4038b904f4aD1A2");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalDeposits: 45678.90,
    totalWithdrawals: 23456.78,
    pendingTransactions: 12
  });

  useEffect(() => {
    // Load token from localStorage
    const savedToken = localStorage.getItem("adminToken");
    if (!savedToken) {
      router.push("/admin");
      return;
    }
    setToken(savedToken);
    
    // Load mock data
    loadMockData();
  }, [router]);

  const loadMockData = () => {
    // Mock withdrawals data
    const mockWithdrawals: Transaction[] = [
      {
        id: 1,
        user: "John Doe",
        email: "john@example.com",
        amount: 1500.00,
        status: "pending",
        date: "2024-01-15 10:30:00",
        txHash: "0x1234...abcd"
      },
      {
        id: 2,
        user: "Alice Smith",
        email: "alice@example.com",
        amount: 2300.50,
        status: "pending",
        date: "2024-01-15 09:15:00"
      },
      {
        id: 3,
        user: "Bob Johnson",
        email: "bob@example.com",
        amount: 750.25,
        status: "approved",
        date: "2024-01-14 16:45:00",
        txHash: "0x5678...efgh"
      }
    ];

    // Mock deposits data
    const mockDeposits: Transaction[] = [
      {
        id: 4,
        user: "Sarah Wilson",
        email: "sarah@example.com",
        amount: 5000.00,
        status: "pending",
        date: "2024-01-15 11:20:00",
        txHash: "0x9abc...1234"
      },
      {
        id: 5,
        user: "Mike Brown",
        email: "mike@example.com",
        amount: 1200.75,
        status: "pending",
        date: "2024-01-15 08:30:00"
      },
      {
        id: 6,
        user: "Emma Davis",
        email: "emma@example.com",
        amount: 3400.00,
        status: "approved",
        date: "2024-01-14 14:10:00",
        txHash: "0xdef0...5678"
      }
    ];

    setWithdrawals(mockWithdrawals);
    setDeposits(mockDeposits);
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

  const approveWithdrawal = async (id: number) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWithdrawals(prev => 
        prev.map(w => w.id === id ? { ...w, status: "approved" as const } : w)
      );
      showMessage("Withdrawal approved successfully!", "success");
    } catch (err) {
      showMessage("Failed to approve withdrawal", "error");
    } finally {
      setLoading(false);
    }
  };

  const cancelWithdrawal = async (id: number) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWithdrawals(prev => 
        prev.map(w => w.id === id ? { ...w, status: "cancelled" as const } : w)
      );
      showMessage("Withdrawal cancelled successfully!", "success");
    } catch (err) {
      showMessage("Failed to cancel withdrawal", "error");
    } finally {
      setLoading(false);
    }
  };

  const approveDeposit = async (id: number) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDeposits(prev => 
        prev.map(d => d.id === id ? { ...d, status: "approved" as const } : d)
      );
      showMessage("Deposit approved successfully!", "success");
    } catch (err) {
      showMessage("Failed to approve deposit", "error");
    } finally {
      setLoading(false);
    }
  };

  const cancelDeposit = async (id: number) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDeposits(prev => 
        prev.map(d => d.id === id ? { ...d, status: "cancelled" as const } : d)
      );
      showMessage("Deposit cancelled successfully!", "success");
    } catch (err) {
      showMessage("Failed to cancel deposit", "error");
    } finally {
      setLoading(false);
    }
  };

  const releaseNotice = async () => {
    if (!notice.trim()) {
      showMessage("Please enter a notice message", "error");
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showMessage("Notice released to all users successfully!", "success");
      setNotice("");
    } catch (err) {
      showMessage("Failed to release notice", "error");
    } finally {
      setLoading(false);
    }
  };

  const togglePauseWithdrawals = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPauseWithdrawals(!pauseWithdrawals);
      showMessage(
        `Withdrawals ${!pauseWithdrawals ? "paused" : "resumed"} successfully!`, 
        "success"
      );
    } catch (err) {
      showMessage("Failed to update withdrawal status", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateDepositAddress = async () => {
    if (!depositAddress.trim()) {
      showMessage("Please enter a valid deposit address", "error");
      return;
    }
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showMessage("Deposit address updated successfully!", "success");
    } catch (err) {
      showMessage("Failed to update deposit address", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin");
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
              USDT King Admin
            </span>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50">
            Logout
          </Button>
        </div>
      </header>

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

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">${stats.totalDeposits.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Deposits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">${stats.totalWithdrawals.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Withdrawals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</div>
              <div className="text-sm text-gray-600">Pending Transactions</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Withdrawals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Pending Withdrawals</CardTitle>
              <CardDescription>Manage user withdrawal requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {withdrawals.filter(w => w.status === "pending").map((withdrawal) => (
                  <div key={withdrawal.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-gray-800">{withdrawal.user}</div>
                        <div className="text-sm text-gray-600">{withdrawal.email}</div>
                        <div className="text-sm text-gray-500">{withdrawal.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">${withdrawal.amount.toFixed(2)}</div>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                    </div>
                    {withdrawal.txHash && (
                      <div className="text-xs text-gray-500 mb-3">
                        TX: {withdrawal.txHash}
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => approveWithdrawal(withdrawal.id)}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => cancelWithdrawal(withdrawal.id)}
                        disabled={loading}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
                {withdrawals.filter(w => w.status === "pending").length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No pending withdrawals
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Deposits Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Pending Deposits</CardTitle>
              <CardDescription>Manage user deposit confirmations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deposits.filter(d => d.status === "pending").map((deposit) => (
                  <div key={deposit.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-gray-800">{deposit.user}</div>
                        <div className="text-sm text-gray-600">{deposit.email}</div>
                        <div className="text-sm text-gray-500">{deposit.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-800">${deposit.amount.toFixed(2)}</div>
                        {getStatusBadge(deposit.status)}
                      </div>
                    </div>
                    {deposit.txHash && (
                      <div className="text-xs text-gray-500 mb-3">
                        TX: {deposit.txHash}
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => approveDeposit(deposit.id)}
                        disabled={loading}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => cancelDeposit(deposit.id)}
                        disabled={loading}
                        variant="outline"
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
                {deposits.filter(d => d.status === "pending").length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No pending deposits
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Management */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Notice Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">System Notice</CardTitle>
              <CardDescription>Send announcements to all users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Enter notice message for all users..."
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button 
                  onClick={releaseNotice}
                  disabled={loading || !notice.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Release Notice
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">System Settings</CardTitle>
              <CardDescription>Manage platform configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Withdrawal Control */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <Label htmlFor="pause-withdrawals" className="text-sm font-medium">
                      Withdrawal Status
                    </Label>
                    <div className="text-sm text-gray-600">
                      {pauseWithdrawals ? "Withdrawals are currently paused" : "Withdrawals are active"}
                    </div>
                  </div>
                  <Switch
                    id="pause-withdrawals"
                    checked={!pauseWithdrawals}
                    onCheckedChange={togglePauseWithdrawals}
                    disabled={loading}
                  />
                </div>

                <Separator />

                {/* Deposit Address */}
                <div className="space-y-3">
                  <Label htmlFor="deposit-address" className="text-sm font-medium">
                    BEP-20 Deposit Address
                  </Label>
                  <Input
                    id="deposit-address"
                    value={depositAddress}
                    onChange={(e) => setDepositAddress(e.target.value)}
                    placeholder="Enter new deposit address"
                    className="font-mono text-sm"
                  />
                  <Button 
                    onClick={updateDepositAddress}
                    disabled={loading || !depositAddress.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Update Deposit Address
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Recent Transaction History</CardTitle>
            <CardDescription>All processed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[...withdrawals, ...deposits]
                .filter(t => t.status !== "pending")
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10)
                .map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        withdrawals.includes(transaction) ? 'bg-red-400' : 'bg-green-400'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-800">{transaction.user}</div>
                        <div className="text-sm text-gray-600">
                          {withdrawals.includes(transaction) ? 'Withdrawal' : 'Deposit'} • {transaction.date}
                        </div>
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
  );
}
