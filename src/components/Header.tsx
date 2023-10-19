import Logo from "../assets/logo-alt.svg";
import { Timer } from "./Timer";

import { FaArrowRotateRight } from "react-icons/fa6";
import { RiLayout6Fill } from "react-icons/ri";
import { RiFileTextLine } from "react-icons/ri";

export const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 bg-gray-900 border-b border-b-gray-950 h-16">
      <a
        href="https://instruqt.com"
        className="transition-opacity hover:opacity-70"
      >
        <img src={Logo} alt="Instruqt" className="h-8" />
      </a>
      <div className="flex gap-4">
        <button>
          <FaArrowRotateRight className="text-white" />
        </button>
        <button>
          <RiLayout6Fill className="text-white" />
        </button>
        <button>
          <RiFileTextLine className="text-white" />
        </button>
        <Timer value={35} />
      </div>
    </header>
  );
};
