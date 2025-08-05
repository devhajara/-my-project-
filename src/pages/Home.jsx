import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/logo";
import { Globe2 } from "lucide-react";
import { SiTelegram, SiTiktok, SiInstagram, SiYoutube, SiX } from "react-icons/si";
import { FiGlobe } from "react-icons/fi";
import { FaXTwitter, FaTelegramPlane, FaTiktok, FaYoutube, FaInstagram, FaGlobe } from "react-icons/fa";
import { SiDexscreener } from "react-icons/si"; // Dexscreener isn't in FA, so we use a similar or placeholder icon

export default function Home() {
  return (
<div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[#0e0e0e]">
  <div className="text-center space-y-8">
    {/* Brand/Logo */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2"
    >
      <span className="text-7xl md:text-8xl"></span>
      <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-lg">
        Fondue
      </h1>
    </motion.div>
    {/* === FONDUE LOGO AT THE TOP === */}
    <div className="flex justify-center mt-4 mb-4">
      <Logo />
    </div>

    {/* Tagline */}
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-xl md:text-3xl text-white font-bold mb-6"
    >
      The DeFi dApp that melts together memes, community, and flavor on Solana.
    </motion.h2>

    {/* Big entry cards (with staggered animation) */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.14 } },
      }}
    >
      {[
        {
          to: "/stake",
          icon: "🍲",
          title: "Let It Simmer",
          subtitle: "Stake $FOND",
          bg: "bg-yellow-400 hover:bg-yellow-500",
        },
        {
          to: "/burn",
          icon: "🔥",
          title: "Burn to Mint",
          subtitle: "NFTs, Lore & Roles",
          bg: "bg-yellow-300 hover:bg-yellow-400",
        },
        {
          to: "/swap",
          icon: "🔄",
          title: "FondueSwap",
          subtitle: "Prototype DEX",
          bg: "bg-yellow-200 hover:bg-yellow-300",
        },
      ].map((card, i) => (
        <motion.div
          key={card.to}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.13 }}
        >
          <Link
            to={card.to}
            className={`rounded-2xl ${card.bg} text-[#1a1a1a] font-bold p-8 flex flex-col items-center shadow-xl transition`}
          >
            <span className="text-3xl mb-2">{card.icon}</span>
            <span className="text-xl">{card.title}</span>
            <span className="text-sm font-medium mt-2">{card.subtitle}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>


...

{/* Quick socials */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
>
<div className="flex justify-center gap-5 mt-6">
  {/* Twitter (X) */}
  <a href="https://x.com/thefonduecoin?s=21" target="_blank" rel="noopener noreferrer"
    aria-label="X" className="bg-black rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <FaXTwitter size="1.8em" color="white" />
  </a>
  {/* Telegram */}
  <a href="https://t.me/thefonduecoin" target="_blank" rel="noopener noreferrer"
    aria-label="Telegram" className="bg-[#26A5E4] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <FaTelegramPlane size="1.8em" color="white" />
  </a>
  {/* Dexscreener (using SiDexscreener or FaChartBar as placeholder) */}
  <a href="https://dexscreener.com/solana/fccy2nds3ubqypwzir5pq1qdaqgkg6qnd6n4nzzvhovh" target="_blank" rel="noopener noreferrer"
    aria-label="Dexscreener" className="bg-[#17c671] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <SiDexscreener size="1.8em" color="white" />
  </a>
  {/* TikTok */}
  <a href="https://www.tiktok.com/@thefonduecoin?_t=ZN-8yGCoyqi5Xa&_r=1" target="_blank" rel="noopener noreferrer"
    aria-label="TikTok" className="bg-[#FE2C55] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <FaTiktok size="1.8em" color="white" />
  </a>
  {/* YouTube */}
  <a href="https://www.youtube.com/@thefonduecoin" target="_blank" rel="noopener noreferrer"
    aria-label="YouTube" className="bg-[#FF0000] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <FaYoutube size="1.8em" color="white" />
  </a>
  {/* Instagram */}
  <a href="https://www.instagram.com/thefonduecoin/?igsh=c3h4bzU5cG42OGg3&utm_source=qr#" target="_blank" rel="noopener noreferrer"
    aria-label="Instagram" className="bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <FaInstagram size="1.8em" color="white" />
  </a>
  {/* Website */}
  <a href="https://fonduecoin.com" target="_blank" rel="noopener noreferrer"
    aria-label="Website" className="bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-400 rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition">
    <FaGlobe size="1.8em" color="white" />
  </a>
</div>


</motion.div>

  </div>
</div>
  );
}
