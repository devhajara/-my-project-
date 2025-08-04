import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Stake from "./pages/Stake";
import Burn from "./pages/Burn";
import Swap from "./pages/Swap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const network = WalletAdapterNetwork.Mainnet; // Change to 'Mainnet' for main launch
  const endpoint = "https://mainnet.helius-rpc.com/?api-key=2a7a5dbd-6f5a-4f09-b31d-f8967b43ec9f";

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      // add more if you want!
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="flex min-h-screen bg-[#0e0e0e]">
              <Sidebar />
              <div className="flex-1 flex flex-col">
                {/* Connect Wallet Button */}
                <div className="flex justify-end mb-6">
                  <WalletMultiButton />
                </div>
                {/* App Routes */}
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stake" element={<Stake />} />
                    <Route path="/burn" element={<Burn />} />
                    <Route path="/swap" element={<Swap />} />
                  </Routes>
                </div>
                {/* Footer */}
                <footer className="text-center text-yellow-400 py-4">
                  © 2025 Fondue
                </footer>
              </div>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
