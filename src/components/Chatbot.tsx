import Image from "next/image";
import NLBot from "./../../public/assets/images/NLBot.png";
import { useEffect, useState } from "react";

interface Props {}

export default function Chatbot({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <main className="fixed bottom-[140px] right-[40px] z-[1]">
      <div className="relative">
        <button 
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close chatbot" : "Open chatbot"}
          title={open ? "Close chatbot" : "Open chatbot"}
        >
          <Image
            src={NLBot}
            alt="NL Bot - Click to chat"
            className="w-[50px] h-[50px] notice-me"
          />
        </button>
        <div
          className={
            "w-[500px] bg-red absolute right-[calc(100%+20px)] bottom-0 rounded-md overflow-hidden shadow-[0_0_10px_rgba(0,0,0,.2)] grid transition-[height] " +
            (open ? "h-[550px]" : "h-0")
          }
        >
          {/*
            DEV 
            <iframe src="http://4.246.226.161/chat/660c9cec8fc9991af06b2ddf" className="w-full h-[550px]" title="Night Login AI Chatbot"></iframe> 
          */}
          <iframe 
            src="https://ai.dundorma.dev/chat/660c9cec8fc9991af06b2ddf" 
            className="w-full h-[550px]"
            title="Night Login AI Chatbot"
            aria-label="Night Login AI Chatbot Interface"
          ></iframe> 
        </div>
      </div>
    </main>
  );
}
