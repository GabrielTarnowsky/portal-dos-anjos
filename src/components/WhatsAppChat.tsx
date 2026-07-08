import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  Phone, 
  ChevronDown, 
  Plus, 
  Camera, 
  Mic, 
  CheckCheck,
  Wifi,
  FileText
} from "lucide-react";

export interface Message {
  id: string;
  sender: "user" | "me";
  text: string;
  time: string;
}

export interface WhatsAppChatProps {
  key?: string | number;
  name: string;
  avatar: string;
  status?: string;
  messages: Message[];
  date?: string;
}

export default function WhatsAppChat({ name, avatar, status = "", messages, date = "Hoje" }: WhatsAppChatProps) {
  // Get current mobile-style clock time
  const [mobileTime, setMobileTime] = useState("12:44");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setMobileTime(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[340px] h-[580px] bg-[#1c1c1e] rounded-[48px] p-3 border-[6px] border-[#2c2c2e] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col relative overflow-hidden text-slate-900 font-sans mx-auto select-none">
      
      {/* iPhone Dynamic Island / Notch */}
      <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-black rounded-full z-40 flex items-center justify-between px-3">
        <div className="w-3.5 h-3.5 rounded-full bg-[#111] border border-slate-950" />
        <div className="w-8 h-1 bg-[#111] rounded-full" />
      </div>

      {/* Screen container */}
      <div className="w-full h-full bg-[#efeae2] rounded-[38px] overflow-hidden flex flex-col relative z-10 pt-6">
        
        {/* iOS Top Status Bar - White background matching iOS style */}
        <div className="bg-white text-black text-[11px] px-5 py-2 flex items-center justify-between font-semibold tracking-tight shrink-0 select-none border-b border-slate-100">
          <span>{mobileTime}</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-2.5 pb-[1px]">
              <div className="w-[2px] h-[3px] bg-black rounded-full"></div>
              <div className="w-[2px] h-[5px] bg-black rounded-full"></div>
              <div className="w-[2px] h-[7px] bg-black rounded-full"></div>
              <div className="w-[2px] h-[9px] bg-black rounded-full"></div>
            </div>
            <span className="text-[9px] font-bold tracking-tighter">5G</span>
            <Wifi className="w-3.5 h-3.5 text-black" />
            
            {/* Real Battery Container */}
            <div className="flex items-center gap-[1px]">
              <div className="w-[18px] h-[9px] border border-black/80 rounded-[3px] p-[1px] flex items-center">
                <div className="h-full w-4/5 bg-black rounded-[1px]"></div>
              </div>
              <div className="w-[1.5px] h-[3px] bg-black/80 rounded-r-[1px]"></div>
            </div>
          </div>
        </div>

        {/* iOS White Header Bar with Blue Actions - 100% Matching Screenshot */}
        <div className="bg-[#f6f6f6] border-b border-slate-200 text-black px-3 py-2 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-1.5 overflow-hidden">
            {/* iOS Back arrow with unread badge */}
            <div className="flex items-center text-[#007aff] cursor-pointer hover:opacity-80 shrink-0">
              <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
              <span className="text-[12px] font-medium -ml-1.5">200</span>
            </div>
            
            {/* Avatar */}
            <div className="relative shrink-0 ml-1">
              <img 
                src={avatar} 
                alt={name} 
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-sm" 
              />
            </div>

            <div className="ml-2 text-left flex flex-col justify-center">
              <h4 className="text-[11.5px] font-bold leading-tight text-slate-900 tracking-tight truncate max-w-[100px]">{name}</h4>
              {status && (
                <span className="text-[8.5px] block font-medium leading-none text-slate-500 mt-0.5">
                  {status}
                </span>
              )}
            </div>
          </div>

          {/* iOS Header icon (Phone with tiny chevron down) in Blue */}
          <div className="flex items-center text-[#007aff] shrink-0 pr-1.5 cursor-pointer hover:opacity-80">
            <Phone className="w-4 h-4 stroke-[2.2]" />
            <ChevronDown className="w-3 h-3 stroke-[2.5] ml-0.5" />
          </div>
        </div>

        {/* Chat Area - ABSOLUTELY FIXED SCREENSHOT LOOK, NO SCROLLING, MAX AUTHENTICITY */}
        <div 
          className="flex-1 overflow-hidden px-3.5 py-4 space-y-3 flex flex-col bg-[#efeae2] relative select-none"
          style={{
            backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
            backgroundSize: "contain",
            backgroundBlendMode: "multiply",
            opacity: 0.98
          }}
        >
          {date && (
            <div className="self-center bg-white/70 backdrop-blur-sm text-slate-500 px-2.5 py-0.5 rounded-md text-[8.5px] font-bold tracking-wide uppercase shadow-sm border border-slate-200/30">
              {date}
            </div>
          )}

          {messages.map((msg) => {
            const isMe = msg.sender === "me";
            return (
              <div
                key={msg.id}
                className={`max-w-[85%] rounded-[14px] px-3 py-1.5 text-[11.5px] shadow-[0_1px_0.5px_rgba(0,0,0,0.11)] relative ${
                  isMe
                    ? "bg-[#e2f9cb] text-[#111b21] self-end rounded-tr-none"
                    : "bg-white text-[#111b21] self-start rounded-tl-none"
                }`}
              >
                {/* Micro-Triangle Tail/Beak for absolute iOS realism */}
                {isMe ? (
                  <div className="absolute right-[-5px] top-0 w-2 h-2 overflow-hidden">
                    <div className="w-3 h-3 bg-[#e2f9cb] rotate-45 transform origin-top-left"></div>
                  </div>
                ) : (
                  <div className="absolute left-[-5px] top-0 w-2 h-2 overflow-hidden">
                    <div className="w-3 h-3 bg-white rotate-45 transform origin-top-right"></div>
                  </div>
                )}

                <p className="leading-snug break-words pr-5 pb-0.5 text-[12.5px] text-left text-[#111b21] tracking-normal font-normal">
                  {msg.text}
                </p>
                
                <span className="absolute bottom-1 right-1.5 flex items-center gap-0.5 text-[8px] text-[#8696a0] font-mono select-none">
                  {msg.time}
                  {isMe && (
                    <CheckCheck className="w-3 h-3 text-[#53bdeb] shrink-0" />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* iOS style White Input Footer - Exactly like the screenshot! */}
        <div className="bg-[#f6f6f6] border-t border-slate-200/80 p-2.5 flex items-center gap-3 shrink-0 select-none pb-4">
          {/* iOS Plus icon in Blue */}
          <Plus className="w-6 h-6 text-[#007aff] shrink-0 cursor-pointer hover:opacity-80" />
          
          {/* White Input Pill */}
          <div className="flex-1 bg-white rounded-full px-3 py-1 flex items-center gap-2 shadow-sm border border-slate-200">
            <div className="text-slate-300 text-[12px] flex-1 text-left"></div>
            {/* iOS Document/Sheet icon */}
            <FileText className="w-4 h-4 text-[#007aff] shrink-0 cursor-pointer hover:opacity-80" />
          </div>

          {/* iOS Action Buttons on the Right in Blue */}
          <Camera className="w-5.5 h-5.5 text-[#007aff] shrink-0 cursor-pointer hover:opacity-80" />
          <Mic className="w-5.5 h-5.5 text-[#007aff] shrink-0 cursor-pointer hover:opacity-80" />
        </div>
      </div>
    </div>
  );
}
