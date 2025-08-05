import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../components/logo";
import { Globe2 } from "lucide-react";
import { SiTelegram, SiTiktok, SiInstagram, SiYoutube, SiX } from "react-icons/si";
import { FiGlobe } from "react-icons/fi";

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
  transition={{ duration: 0.4, delay: 0.7 }}
>
  <div className="flex justify-center gap-5 mt-6">
  {/* Twitter (X) */}
  <a
    href="https://x.com/thefonduecoin?s=21"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X"
    className="bg-black rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="white">
      <path d="M18.26 2H21.74L14.92 10.21L23 22H16.48L11.32 14.8L5.47 22H2L9.23 13.22L1.5 2H8.13L12.76 8.49L18.26 2ZM17.13 20H19.09L7.17 4H5.12L17.13 20Z" />
    </svg>
  </a>
  {/* Telegram */}
  <a
    href="https://t.me/thefonduecoin"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Telegram"
    className="bg-[#26A5E4] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="white">
      <path d="M21.944 3.751c-.22-.197-.525-.237-.781-.105L2.225 13.207c-.297.152-.464.486-.411.823.052.338.315.585.658.604l5.111.287c.226.012.435.139.553.34l2.574 4.257c.157.26.45.411.76.411.05 0 .101-.005.152-.017.334-.073.575-.375.557-.72l-.217-5.103 7.776-6.959c.229-.204.264-.552.077-.793z"/>
    </svg>
  </a>
  {/* Dexscreener */}
  <a
    href="https://dexscreener.com/solana/fccy2nds3ubqypwzir5pq1qdaqgkg6qnd6n4nzzvhovh"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Dexscreener"
    className="bg-[#17c671] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    <svg width="1.8em" height="1.8em" viewBox="0 0 36 36" fill="white">
      <rect x="8" y="24" width="4" height="4" rx="1" />
      <rect x="14" y="20" width="4" height="8" rx="1" />
      <rect x="20" y="12" width="4" height="16" rx="1" />
      <rect x="26" y="8" width="4" height="20" rx="1" />
    </svg>
  </a>
  {/* TikTok */}
  <a
    href="https://www.tiktok.com/@thefonduecoin?_t=ZN-8yGCoyqi5Xa&_r=1"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="TikTok"
    className="bg-[#FE2C55] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    <svg width="1.8em" height="1.8em" viewBox="0 0 32 32" fill="white">
      <path d="M21 7.13V18.48A7.5 7.5 0 1 1 13.5 11h.77v3.06h-.77A4.5 4.5 0 1 0 18 18.5v-8.37c1.14.73 2.5 1.18 4 1.22V7.27c-1.18-.04-2.27-.43-3-1.14z"/>
    </svg>
  </a>
  {/* YouTube */}
  <a
    href="https://www.youtube.com/@thefonduecoin"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="bg-[#FF0000] rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    <svg width="1.8em" height="1.8em" viewBox="0 0 32 32" fill="white">
      <path d="M31.2 8.35a3.93 3.93 0 0 0-2.77-2.77C26.06 5 16 5 16 5s-10.06 0-12.43.58a3.93 3.93 0 0 0-2.77 2.77C.22 10.71.22 16 .22 16s0 5.29.58 7.65a3.93 3.93 0 0 0 2.77 2.77C5.94 27 16 27 16 27s10.06 0 12.43-.58a3.93 3.93 0 0 0 2.77-2.77c.58-2.36.58-7.65.58-7.65s0-5.29-.58-7.65zM12.73 21.16V10.84l10.45 5.16-10.45 5.16z"/>
    </svg>
  </a>
  {/* Instagram */}
  <a
    href="https://www.instagram.com/thefonduecoin/?igsh=c3h4bzU5cG42OGg3&utm_source=qr#"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400 rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    <svg width="1.8em" height="1.8em" viewBox="0 0 32 32" fill="white">
      <path d="M16 8.32A7.68 7.68 0 1 0 23.68 16 7.69 7.69 0 0 0 16 8.32zm0 12.72A5 5 0 1 1 21 16a5 5 0 0 1-5 5z"/>
      <circle cx="24.5" cy="7.5" r="1.5"/>
      <path d="M27.58 8.23A6.54 6.54 0 0 0 23.77 4.42C21.52 3.38 18.3 3.25 16 3.25s-5.52.13-7.77 1.17a6.54 6.54 0 0 0-3.81 3.81C3.38 10.48 3.25 13.7 3.25 16s.13 5.52 1.17 7.77a6.54 6.54 0 0 0 3.81 3.81c2.25 1.04 5.47 1.17 7.77 1.17s5.52-.13 7.77-1.17a6.54 6.54 0 0 0 3.81-3.81c1.04-2.25 1.17-5.47 1.17-7.77s-.13-5.52-1.17-7.77zM16 24.09a8.09 8.09 0 1 1 8.09-8.09A8.1 8.1 0 0 1 16 24.09z"/>
    </svg>
  </a>
  {/* Website */}
  <a
    href="https://fonduecoin.com"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Website"
    className="bg-gradient-to-tr from-blue-500 via-cyan-400 to-indigo-400 rounded-full flex items-center justify-center w-12 h-12 shadow-lg hover:scale-110 transition"
  >
    {/* Simple Globe SVG */}
    <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="white">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
      <ellipse cx="12" cy="12" rx="7" ry="10" stroke="white" strokeWidth="2" fill="none"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2"/>
    </svg>
  </a>
</div>

</motion.div>

  </div>
</div>
  );
}
