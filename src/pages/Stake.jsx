import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress, getMint } from "@solana/spl-token";
import { motion } from "framer-motion";
import Logo from "../components/logo";




// FOND token mint address
const FOND_MINT = "A3GCAAwFxAUgx97j9uw8Vkf8MaFqUut2tsyAXq9Cpump";

export default function Stake() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakingStatus, setStakingStatus] = useState("");
  const [fondBalance, setFondBalance] = useState(null);
  const [fondDecimals, setFondDecimals] = useState(9); // default, auto-updates

  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

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

  // Stake/unstake demo logic
  const handleStake = () => {
    if (stakeAmount > 0) {
      setStakingStatus(`Staked ${stakeAmount} $FOND successfully!`);
      setStakeAmount("");
    } else {
      setStakingStatus("Please enter a valid amount.");
    }
  };

  const handleUnstake = () => {
    setStakingStatus(`Unstaked ${stakeAmount} $FOND successfully!`);
    setStakeAmount("");
  };

  return (
    <motion.div
      className="space-y-8 p-6"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
        {/* === FONDUE LOGO AT THE TOP === */}
              <div className="flex justify-center mt-4 mb-4">
                <Logo />
              </div>
      <motion.h1
        className="text-4xl font-bold text-yellow-400"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        Let It Simmer
      </motion.h1>
      <motion.p
        className="text-lg text-white"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        Stake your $FOND and watch it grow! The longer you stake, the higher your rewards.
      </motion.p>

      {connected && (
        <motion.div
          className="space-y-2 mb-4"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-2 rounded bg-[#1a1a1a] text-yellow-400 break-all">
            Connected: {publicKey?.toBase58()}
          </div>
          <div className="p-2 rounded bg-[#292929] text-white">
            Your $FOND balance: {fondBalance === null ? "Loading..." : fondBalance}
          </div>
        </motion.div>
      )}

      {/* Staking Stats */}
      <motion.div
        className="bg-[#292929] p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.32 }}
      >
        <h2 className="text-2xl font-semibold text-yellow-400">Staking Info</h2>
        <div className="mt-4">
          <p className="text-white">Total Staked: 100,000 $FOND</p>
          <p className="text-white">APY: 12% (Annual Percentage Yield)</p>
        </div>
      </motion.div>

      {/* Staking Form */}
      <motion.div
        className="bg-[#292929] p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.36 }}
      >
        <h2 className="text-2xl font-semibold text-yellow-400">Stake $FOND</h2>
        <input
          type="number"
          className="mt-4 w-full p-3 bg-[#1a1a1a] text-yellow-400 border border-gray-700 rounded-lg"
          placeholder="Enter amount to stake"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
        />
        <div className="flex gap-4 mt-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleStake}
            className="w-full py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition"
          >
            Stake
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleUnstake}
            className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Unstake
          </motion.button>
        </div>
      </motion.div>

      {/* Staking Status */}
      {stakingStatus && (
        <motion.div
          className="bg-green-500 text-white p-4 rounded-lg"
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
          key={stakingStatus}
        >
          {stakingStatus}
        </motion.div>
      )}
    </motion.div>
  );
}
