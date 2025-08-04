import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { motion } from "framer-motion";
import Logo from "../components/logo";

// FOND token mint address
const FOND_MINT = "A3GCAAwFxAUgx97j9uw8Vkf8MaFqUut2tsyAXq9Cpump";

export default function Burn() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const [fondBalance, setFondBalance] = useState(null);
  const [fondDecimals, setFondDecimals] = useState(9);
  const [burnAmount, setBurnAmount] = useState("");
  const [mintType, setMintType] = useState("nft");
  const [burnStatus, setBurnStatus] = useState("");

  // Fetch user's $FOND balance and decimals
  useEffect(() => {
    async function fetchBalance() {
      if (!publicKey) {
        setFondBalance(null);
        return;
      }
      try {
        const mint = new PublicKey(FOND_MINT);
        const ata = await getAssociatedTokenAddress(mint, publicKey);
        const account = await getAccount(connection, ata);
        const mintInfo = await getMint(connection, mint);
        setFondDecimals(mintInfo.decimals);
        setFondBalance(Number(account.amount) / Math.pow(10, mintInfo.decimals));
      } catch (e) {
        setFondBalance(0);
      }
    }
    fetchBalance();
  }, [publicKey, connection]);

  const handleBurn = () => {
    if (!connected) {
      setBurnStatus("Please connect your wallet.");
      return;
    }
    if (!burnAmount || Number(burnAmount) <= 0 || Number(burnAmount) > fondBalance) {
      setBurnStatus("Enter a valid amount to burn.");
      return;
    }
    setBurnStatus("Burning in progress... 🔥 (this is a demo)");
    setTimeout(() => {
      setBurnStatus(
        `Successfully burned ${burnAmount} $FOND and minted a ${
          mintType === "nft"
            ? "Meme NFT"
            : mintType === "lore"
            ? "Lore Page"
            : "Community Role"
        }! 🍲`
      );
      setBurnAmount("");
    }, 1500);
  };

  return (
    <motion.div
      className="space-y-8 p-6"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {/* === FONDUE LOGO AT THE TOP === */}
      <div className="flex justify-center mt-4 mb-4">
        <Logo />
      </div>

      <motion.h1
        className="text-4xl font-bold text-yellow-400 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        Burn to Mint Portal
      </motion.h1>
      <motion.p
        className="text-lg text-white mb-4 text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        Burn your $FOND to unlock spicy rewards! Choose what you want to mint: a meme NFT, lore page, or a secret community role.
      </motion.p>
      {connected && (
        <motion.div
          className="mb-4 p-2 rounded bg-[#1a1a1a] text-yellow-400 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Your $FOND balance: {fondBalance === null ? "Loading..." : fondBalance}
        </motion.div>
      )}

      <motion.div
        className="bg-[#292929] p-6 rounded-lg max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.36 }}
      >
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">🔥 Burn & Mint</h2>
        <input
          type="number"
          className="w-full p-3 bg-[#1a1a1a] text-yellow-400 border border-gray-700 rounded-lg mb-4"
          placeholder="Amount to burn"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
          min={0}
          max={fondBalance || 0}
        />
        <div className="flex items-center gap-4 mb-4">
          <label className="text-yellow-300 font-semibold">Mint:</label>
          <select
            className="p-2 rounded bg-[#1a1a1a] text-yellow-400 border border-gray-700"
            value={mintType}
            onChange={(e) => setMintType(e.target.value)}
          >
            <option value="nft">Meme NFT</option>
            <option value="lore">Lore Page</option>
            <option value="role">Community Role</option>
          </select>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-[#1a1a1a] rounded-lg transition font-bold"
          onClick={handleBurn}
        >
          Burn & Mint
        </motion.button>
        {burnStatus && (
          <motion.div
            className="mt-4 p-3 rounded-lg bg-[#181818] text-white"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {burnStatus}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
