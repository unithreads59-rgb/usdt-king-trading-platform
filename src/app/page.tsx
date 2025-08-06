"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletConnected(!isWalletConnected);
  };

  const depositAddress = "0xf80Aa9242BBc876443E9Aef9A4038b904f4aD1A2";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Address copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">UK</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              USDT King
            </span>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search USDT holdings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 border-green-200 focus:border-green-400"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a href="#explore" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Explore</a>
            <a href="#earn" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Earn</a>
            <a href="#reserve" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Reserve</a>
            
            {/* Airdrop Button */}
            <Button 
              variant="outline" 
              className="border-green-400 text-green-600 hover:bg-green-50"
              onClick={() => setShowDepositModal(true)}
            >
              Airdrop
            </Button>

            {/* User Authentication */}
            <Button 
              className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white"
              onClick={() => window.location.href = '/auth'}
            >
              Sign In / Register
            </Button>

            {/* Wallet Connection */}
            <Button 
              className={`${isWalletConnected 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
              onClick={handleConnectWallet}
            >
              {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">Menu</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
                <div className="w-full h-0.5 bg-gray-600"></div>
              </div>
            </Button>
          </div>
        </nav>
      </header>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4 text-center">BEP-20 Deposit Address</h3>
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

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
            EXPLORE, DISCOVER AND EARN BIG WITH THE TOP USDT PLATFORM IN THE WORLD
          </h1>
          
          {/* BEP-20 Network Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-yellow-100 text-green-800 rounded-full text-sm font-semibold">
              🔗 BEP-20 Network Only
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="text-left">
              <div className="flex items-start space-x-4 mb-8">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">MR</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Multi-Reward</h3>
                  <p className="text-gray-600 leading-relaxed">
                    USDT King leverages a proprietary AI-powered algorithmic trading model on BEP-20 network, and provides a dual earnings mechanism with trading rewards as well as referral rewards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">EV</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Earn Future Value</h3>
                  <p className="text-gray-600 leading-relaxed">
                    USDT King reduces the entry hurdles of the USDT market on BEP-20 and expands the boundaries of USDT collection & trading through its innovative AI algorithmic trading process and rewarding financial model.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8f1fc148-c138-4501-9404-311d4d139dc6.png"
                alt="USDT King BEP-20 dashboard interface showcasing modern green and gold themed trading platform"
                className="w-full h-auto rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fa1b8445-066d-4a01-8f6c-6dae66b68c7b.png";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* USDT Holdings Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8143e6d5-ffb9-4ee5-8a36-a34cb2b76f30.png"
                  alt="Premium USDT holdings display with elegant green and gold design elements"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.currentTarget.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0176fb2c-f421-44fb-a755-0f02e3de6213.png";
                  }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Premium USDT</span>
                  <span className="text-sm text-green-600 font-bold">+2.5%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">$50,100</div>
                <div className="text-sm text-gray-500">Highest Bid</div>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a37516ce-b085-4af9-98ca-e653da1fd95d.png"
                  alt="Stable USDT reserves visualization with professional green themed layout"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.currentTarget.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/23553c0b-52fa-4b4c-8f22-650cd5e10bd7.png";
                  }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Stable Reserve</span>
                  <span className="text-sm text-green-600 font-bold">+1.8%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">$26,040</div>
                <div className="text-sm text-gray-500">Reserve Pool</div>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2515a365-d5ae-4ca8-b838-cd14b160e2ea.png"
                  alt="Elite USDT portfolio showcase with luxury gold and green styling"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    e.currentTarget.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9ba54f2c-1258-405f-8f0e-73f0566765c6.png";
                  }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Elite Portfolio</span>
                  <span className="text-sm text-green-600 font-bold">+3.2%</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">$75,250</div>
                <div className="text-sm text-gray-500">Portfolio Value</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Holdings Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">TOP HOLDINGS OVER</h2>
          <p className="text-center text-gray-600 mb-12">Last 24 Hours</p>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: "Premium USDT Pool", value: "12,456.78M", change: "+0.25%" },
              { rank: 2, name: "Stable Reserve Fund", value: "8,243.33M", change: "+0.17%" },
              { rank: 3, name: "Elite USDT Holdings", value: "10,013.63M", change: "+0.14%" },
              { rank: 4, name: "Secure USDT Vault", value: "8,401.92M", change: "+0.16%" },
              { rank: 5, name: "Premium Reserve", value: "8,169.79M", change: "+0.16%" }
            ].map((item) => (
              <div key={item.rank} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-400">{item.rank}</span>
                  <img
                    src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a869279d-1248-4fb3-ac18-7f56031ecb6e.png}`}
                    alt={`${item.name} icon representing USDT holding type ${item.rank}`}
                    className="w-12 h-12 rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f62d1388-7a96-4ac3-a562-d6f991c2fccf.png}`;
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                      {item.value}
                    </div>
                  </div>
                </div>
                <div className="text-green-600 font-semibold">{item.change}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-50">
              More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured USDT Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-100 to-yellow-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">FEATURED USDT HOLDINGS</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={`https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e06ad0e5-8bb1-4668-aed2-72e660f54e9f.png}+with+premium+design`}
                    alt={`Featured USDT holding ${item} showcasing premium design with green and gold accents`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/def1bd22-a79d-4268-9fc0-3f49a3172ab3.png}`;
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">Premium USDT #{item}</h3>
                    <p className="text-gray-600 text-sm">Secure stablecoin holdings with guaranteed returns</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UK</span>
                </div>
                <span className="text-xl font-bold">USDT King</span>
              </div>
              <p className="text-gray-400 text-sm">
                The premier platform for USDT trading, reserves, and premium stablecoin services.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Explore</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Earn</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Reserve</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Holdings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 USDT King. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
