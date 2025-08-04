import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Flame, ArrowRightLeft, Hourglass } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Let it Simmer", path: "/stake", icon: <Hourglass size={18} /> },
  { name: "Burn to Mint", path: "/burn", icon: <Flame size={18} /> },
  { name: "FondueSwap", path: "/swap", icon: <ArrowRightLeft size={18} /> },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const sidebarRef = useRef(null);

  // Close sidebar on Esc key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Focus trap when sidebar is open (keyboard nav)
  useEffect(() => {
    if (!open || !sidebarRef.current) return;
    const focusableEls = sidebarRef.current.querySelectorAll("a,button");
    if (focusableEls.length) focusableEls[0].focus();
    const handleTab = (e) => {
      if (!open) return;
      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [open]);

  // Disable scroll behind sidebar on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a1a1a] rounded"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={28} className="text-yellow-400" />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 w-64 h-screen bg-[#1a1a1a] z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:block
        `}
        tabIndex={-1}
      >
        {/* Close button for mobile */}
        <div className="flex items-center justify-between md:hidden p-4">
          <span className="text-xl font-bold text-yellow-400">🍲 Fondue</span>
          <button onClick={() => setOpen(false)} aria-label="Close sidebar">
            <X size={28} className="text-yellow-400" />
          </button>
        </div>
        {/* Logo for desktop */}
        <div className="hidden md:flex p-6 pb-0 text-xl font-bold text-yellow-400">
          🍲 Fondue
        </div>
        <nav className="flex flex-col gap-2 p-6">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-2 py-2 px-4 rounded-lg transition
                  ${active
                    ? "bg-yellow-400 text-[#1a1a1a] font-bold"
                    : "text-yellow-400 hover:bg-[#292929] hover:text-yellow-200"}
                `}
                tabIndex={0}
              >
                <span className={active ? "text-[#1a1a1a]" : "text-yellow-400"}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      
    </>
  );
}
