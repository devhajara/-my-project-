// src/components/Logo.jsx
import fondueLogo from "../assets/fondue-logo-ezgif.com-gif-maker.gif";

export default function Logo() {
  return (
    <div className="flex justify-center my-4">
      <img
        src={fondueLogo}
        alt="Fondue Logo"
        className="w-36 h-36 object-contain"
        draggable={false}
      />
    </div>
  );
}
