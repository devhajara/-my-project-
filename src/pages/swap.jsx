import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { motion } from "framer-motion";
import Logo from "../components/logo";


// Mint address for FOND token
const FOND_MINT = "A3GCAAwFxAUgx97j9uw8Vkf8MaFqUut2tsyAXq9Cpump";

export default function Swap() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const [fondBalance, setFondBalance] = useState(null);
  const [fondDecimals, setFondDecimals] = useState(9);
  const [solBalance, setSolBalance] = useState(null);

  const [fromToken, setFromToken] = useState("fond");
  const [toToken, setToToken] = useState("sol");
  const [swapAmount, setSwapAmount] = useState("");
  const [swapStatus, setSwapStatus] = useState("");

  // Fetch FOND balance and decimals
  useEffect(() => {
    async function fetchBalances() {
      if (!publicKey) {
        setFondBalance(null);
        setSolBalance(null);
        return;
      }
      console.log("Connected wallet:", publicKey?.toBase58());
      try {
        // Get FOND balance
        const mint = new PublicKey(FOND_MINT);
        const ata = await getAssociatedTokenAddress(mint, publicKey);
        const account = await getAccount(connection, ata);
        const mintInfo = await getMint(connection, mint);
        setFondDecimals(mintInfo.decimals);
        console.log("Connected wallet:", publicKey?.toBase58());
      } catch {
        setFondBalance(0);
      }
      try {
        // Get SOL balance
        const solLamports = await connection.getBalance(publicKey);
        setSolBalance(solLamports / 1e9); // 1 SOL = 1e9 lamports
      } catch {
        setSolBalance(0);
      }
    }
    fetchBalances();
  }, [publicKey, connection]);

  // Token display labels
  const tokenLabel = (tk) =>
    tk === "fond" ? "$FOND" : tk === "sol" ? "SOL" : tk.toUpperCase();

  // Swap "from" and "to"
  const handleSwitch = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setSwapAmount("");
    setSwapStatus("");
  };

  // Handle swap button
  const handleSwap = () => {
    if (!connected) {
      setSwapStatus("Please connect your wallet.");
      return;
    }
    if (!swapAmount || Number(swapAmount) <= 0) {
      setSwapStatus("Enter a valid amount to swap.");
      return;
    }
    if (
      (fromToken === "fond" && Number(swapAmount) > fondBalance) ||
      (fromToken === "sol" && Number(swapAmount) > solBalance)
    ) {
      setSwapStatus("Insufficient balance.");
      return;
    }
    setSwapStatus("Swapping... 🧀 (this is a demo, not on-chain)");
    setTimeout(() => {
      setSwapStatus(
        `Successfully swapped ${swapAmount} ${tokenLabel(fromToken)} for ${
          fromToken === "fond" ? (swapAmount / 10).toFixed(4) + " SOL" : (swapAmount * 10).toFixed(2) + " $FOND"
        }!`
      );
      setSwapAmount("");
    }, 1500);
  };

  return (
    
    <motion.div
      className="space-y-8 p-6"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
        {/* === FONDUE LOGO AT THE TOP === */}
              <div className="flex justify-center mt-4 mb-4">
                <Logo />
              </div>
      <motion.h1
        className="text-4xl font-bold text-yellow-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        FondueSwap 🧀
      </motion.h1>
      <motion.p
        className="text-lg text-white mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        Swap your $FOND for SOL (or vice versa) on our gooey, cheese-themed DEX.{" "}
        <span className="text-yellow-300">Prototype only!</span>
      </motion.p>

      {connected && (
        <motion.div
          className="mb-4 grid grid-cols-2 gap-2 max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-[#1a1a1a] text-yellow-400 rounded p-2">
            $FOND: {fondBalance === null ? "Loading..." : fondBalance}
          </div>
          <div className="bg-[#1a1a1a] text-blue-400 rounded p-2">
            SOL: {solBalance === null ? "Loading..." : solBalance}
          </div>
        </motion.div>
      )}

      <motion.div
        className="bg-[#292929] max-w-md mx-auto p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.36 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <select
            className="p-2 rounded bg-[#1a1a1a] text-yellow-400 border border-gray-700"
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
          >
            <option value="fond">$FOND</option>
            <option value="sol">SOL</option>
          </select>
          <motion.button
            whileTap={{ scale: 0.89, rotate: 20 }}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 font-bold"
            onClick={handleSwitch}
            aria-label="Switch tokens"
          >
            ⇄
          </motion.button>
          <select
            className="p-2 rounded bg-[#1a1a1a] text-yellow-400 border border-gray-700"
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
          >
            <option value="fond">$FOND</option>
            <option value="sol">SOL</option>
          </select>
        </div>
        <input
          type="number"
          className="w-full p-3 bg-[#1a1a1a] text-yellow-400 border border-gray-700 rounded-lg mb-4"
          placeholder={`Amount of ${tokenLabel(fromToken)} to swap`}
          value={swapAmount}
          min={0}
          onChange={(e) => setSwapAmount(e.target.value)}
        />
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition font-bold"
          onClick={handleSwap}
        >
          Swap
        </motion.button>
        {swapStatus && (
          <motion.div
            className="mt-4 p-3 rounded-lg bg-[#181818] text-white"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {swapStatus}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
