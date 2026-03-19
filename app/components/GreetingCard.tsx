"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Sparkles, MailOpen, Mail, ChevronRight, Heart, Send, MessageSquare, X } from "lucide-react";

interface Variation {
  id: string;
  label: string;
  title: string;
  body: string;
}

const variations: Variation[] = [
  {
    id: "forgiveness",
    label: "Permohonan Maaf",
    title: "Ketulusan Hati",
    body: "Di hari yang fitri ini, aku ingin menyampaikan permohonan maaf yang paling tulus. Atas segala salah, ego, dan luka yang mungkin pernah kutinggalkan. Semoga pintu maafmu terbuka untukku. from Agung Prayogi"
  },
  {
    id: "gratitude",
    label: "Terima Kasih",
    title: "Kenangan Indah",
    body: "Terima kasih pernah sebaik itu sama aku. Meskipun kita sering misskomunikasi dan ternyata hal yang dilakukan berdasarkan kasih sayang, aku tetap bersyukur atas setiap pelajaran yang kita lalui bersama. Selamat merayakan hari berkemenangan."
  },
  {
    id: "wishes",
    label: "Doa Tulus",
    title: "Semoga Bahagia",
    body: "Aku mendoakan yang terbaik untukmu dan keluargamu. Semoga Idul Fitri ini membawa kedamaian dan kebahagiaan yang berlimpah di perjalanan barumu. Taqabbalallahu minna wa minkum, minal aidzin wal faidzin, mohon maaf lahir dan batin. from Agung Prayogi and family"
  }
];

export default function GreetingCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVar, setSelectedVar] = useState<Variation>(variations[0]);
  const [displayText, textUpdate] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      if (timerRef.current) clearInterval(timerRef.current);

      let i = 0;
      textUpdate("");
      const bodyText = selectedVar.body;

      timerRef.current = setInterval(() => {
        if (i < bodyText.length) {
          const nextChars = bodyText.slice(0, i + 1);
          textUpdate(nextChars);
          i++;
        } else {
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 40);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isOpen, selectedVar]);

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;

    const emailTo = "agungprayogi693@gmail.com";
    const subject = encodeURIComponent("Balasan Kartu Ucapan Idul Fitri");
    const body = encodeURIComponent(`Halo, ini balasan untuk kartu ucapanmu:\n\n"${replyMessage}"\n\n(Dikirim via Kartu Ucapan Digital)`);

    // Deteksi apakah user menggunakan mobile atau desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Di mobile, lebih baik pakai mailto agar membuka aplikasi Gmail/Mail bawaan
      window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    } else {
      // Di desktop, pakai link Gmail web agar tidak muncul popup Windows Mail
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
    }

    setIsReplying(false);
    setReplyMessage("");
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-lg mx-auto p-4 z-20">

      {/* Variation Selectors */}
      <div className="flex gap-2.5 flex-wrap justify-center mb-6">
        {variations.map((v) => (
          <button
            key={v.id}
            onClick={() => { setSelectedVar(v); setIsOpen(false); setIsReplying(false); }}
            className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] transition-all duration-500 uppercase flex items-center gap-2 border ${selectedVar.id === v.id
                ? "bg-amber-400 text-emerald-950 border-amber-400 shadow-[0_0_20px_rgba(255,191,0,0.4)] scale-105"
                : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
          >
            {selectedVar.id === v.id && <Heart size={8} fill="currentColor" className="md:w-2.5 md:h-2.5" />}
            {v.label}
          </button>
        ))}
      </div>

      <div className="relative w-full h-[480px] md:h-[500px] flex items-center justify-center perspective-1000">

        {/* Envelope Base */}
        <motion.div
          onClick={() => !isOpen && setIsOpen(true)}
          className={`relative w-full max-w-[320px] md:max-w-sm h-52 md:h-60 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${!isOpen ? "cursor-pointer group hover:scale-[1.02] overflow-hidden" : "overflow-visible"} border border-amber-400/30 transition-transform duration-500`}
        >
          {/* Subtle Texture Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

          {/* Envelope Flap (Front) */}
          <motion.div
            animate={{ rotateX: isOpen ? 160 : 0, zIndex: isOpen ? 0 : 50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 w-full h-full bg-amber-500 origin-top shadow-2xl border-b border-amber-400/50"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 60%)', backfaceVisibility: 'hidden' }}
          />

          {/* Envelope Flap (Inner) */}
          <motion.div
            animate={{ rotateX: isOpen ? 160 : 0, zIndex: isOpen ? 5 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-0 left-0 w-full h-full bg-amber-700 origin-top"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 60%)', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
          />

          {/* Letter / Card Reveal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 200, opacity: 0, scale: 0.8 }}
                animate={{ y: isReplying ? -80 : -140, opacity: 1, scale: 1 }}
                exit={{ y: 200, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
                className={`absolute left-1/2 -translate-x-1/2 w-[92vw] max-w-[360px] md:max-w-sm ${isReplying ? "h-[500px]" : "h-[460px] md:h-[480px]"} glass rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center z-10 border border-white/20 shadow-[-20px_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 overflow-hidden`}
              >
                {!isReplying ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center w-full"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      className="mb-4 p-2.5 md:p-3 rounded-full bg-white/5 border border-white/10"
                    >
                      <Sparkles className="text-amber-400 w-6 h-6 md:w-8 md:h-8" />
                    </motion.div>

                    <h3 className="text-xl md:text-2xl font-arabic font-bold text-amber-400 mb-3 md:mb-4 drop-shadow-sm">{selectedVar.title}</h3>

                    <div className="relative min-h-[140px] md:min-h-[160px] flex items-center justify-center">
                      <p className="text-[13px] md:text-base text-white/90 leading-relaxed font-outfit font-light italic tracking-wide px-2 md:px-4">
                        "{displayText}"
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-0.5 h-3.5 md:h-4 bg-amber-400 ml-1 translate-y-1"
                        />
                      </p>
                    </div>

                    <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/10 w-full flex flex-col items-center gap-5 md:gap-6">
                      <span className="text-[8px] md:text-[9px] text-white/30 tracking-[0.3em] md:tracking-[0.4em] uppercase font-black">Minal Aidin Wal-Faizin</span>

                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setIsReplying(true);
                        }}
                        className="w-full py-3.5 md:py-4 bg-amber-400 text-emerald-950 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] flex items-center justify-center gap-2.5 md:gap-3 hover:bg-amber-300 transition-all active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.3)] group pointer-events-auto"
                      >
                        <MessageSquare size={16} className="md:w-[18px] md:h-[18px] group-hover:scale-110 transition-transform" />
                        Kirim Balasan via Email
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-full flex flex-col items-center pt-2 md:pt-4"
                  >
                    <div className="w-full flex justify-between items-center mb-4 md:mb-6">
                      <div className="text-amber-400 uppercase text-[9px] md:text-[10px] font-black tracking-widest">Tulis Email Balasan</div>
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setIsReplying(false);
                        }}
                        className="text-white/40 hover:text-white transition-colors p-2"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <textarea
                      value={replyMessage}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyMessage(e.target.value)}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      placeholder="Apa pesan emosionalmu hari ini?..."
                      className="w-full flex-grow bg-white/10 border border-white/10 rounded-xl p-4 md:p-5 text-white placeholder:text-white/30 text-[13px] md:text-sm focus:outline-none focus:border-amber-400/50 transition-colors resize-none font-outfit leading-relaxed pointer-events-auto"
                    />

                    <div className="mt-4 md:mt-6 w-full">
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          handleSendReply();
                        }}
                        disabled={!replyMessage.trim()}
                        className="w-full py-4 md:py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.2em] flex items-center justify-center gap-2.5 md:gap-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-300 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-auto"
                      >
                        <Send size={14} />
                        Kirim Sekarang via Email
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Body Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {!isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="flex flex-col items-center text-amber-900/60"
                >
                  <Mail size={48} strokeWidth={0.5} />
                  <span className="text-[8px] md:text-[9px] font-black mt-3 md:mt-4 tracking-[0.4em] md:tracking-[0.5em] uppercase opacity-70">Tap to Reveal</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* Main Action Button */}
      {!isReplying && (
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 group relative overflow-hidden px-10 md:px-14 py-4 md:py-5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-emerald-950 font-black rounded-full shadow-[0_20px_40px_rgba(255,191,0,0.2)] transition-all flex items-center gap-2.5 md:gap-3 border border-amber-200/50"
        >
          <span className="relative z-10 uppercase tracking-[0.1em] md:tracking-[0.15em] text-[10px] md:text-xs">
            {isOpen ? "Simpan Pesan" : "Buka Pesan Terakhir"}
          </span>
          {isOpen ? (
            <MailOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
          )}

          {/* Shine Animation */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
          />
        </motion.button>
      )}

    </div>
  );
}
