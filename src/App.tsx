import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Lock, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Compass, 
  Coins, 
  Shield, 
  Music, 
  BookOpen, 
  MessageCircle, 
  Star, 
  Flame, 
  Check, 
  ChevronDown, 
  LogOut, 
  Smartphone, 
  FileText,
  User,
  Heart,
  Calendar,
  ChevronRight,
  UserCheck
} from "lucide-react";
import { FAQ_DATA, TESTIMONIALS_DATA, PRODUCT_MODULES } from "./data";
import CheckoutModal from "./components/CheckoutModal";
import { motion, AnimatePresence } from "motion/react";
import WhatsAppChat, { Message } from "./components/WhatsAppChat";

import heroImage from "./assets/images/portal_dos_anjos_hero_1783098923011.jpg";
import plannerImage from "./assets/images/planner_de_sucesso_1783099332423.jpg";
import guiaJudaicoImage from "./assets/images/guia_judaico_enriquecimento_1783099344470.jpg";
import rotinaSucessoImage from "./assets/images/rotina_do_sucesso_1783512771896.jpg";
import guiaCaixaRapidoImage from "./assets/images/guia_caixa_rapido_1783512784634.jpg";

const WHATSAPP_TESTIMONIALS: Array<{ id: string; name: string; avatar: string; status: string; date: string; messages: Message[] }> = [
  {
    id: "chat-1",
    name: "Ana Silva",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    status: "online",
    date: "15 de Fevereiro",
    messages: [
      { id: "m1-3", sender: "user" as const, text: "Gente do céu, vim aqui agradecer de coração 🙏 Eu tava desesperada sem dinheiro nenhum pra pagar o aluguel desse mês, chorando todo dia.", time: "10:23" },
      { id: "m1-4", sender: "user" as const, text: "Aí ouvi a frequência sagrada da prosperidade que vcs mandaram... Menina, parece que limpou os caminhos! No dia seguinte me ligaram pra um trabalho excelente e consegui pagar tudo!", time: "10:25" },
      { id: "m1-5", sender: "me" as const, text: "Que bênção maravilhosa, Ana! Ficamos extremamente felizes por você. Os anjos agem rápido quando nos conectamos.", time: "10:26" },
      { id: "m1-6", sender: "user" as const, text: "Muito obrigada de verdade. Minha vida financeira mudou da água pro vinho. Ouço todo santo dia agora!", time: "10:27" }
    ]
  },
  {
    id: "chat-2",
    name: "Carlos Eduardo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    status: "visto por último às 13:12",
    date: "24 de Março",
    messages: [
      { id: "m2-1", sender: "user" as const, text: "Boa tarde! Olha, eu tava com uma dívida gigante no banco e sem nenhuma perspectiva de dinheiro, super travado e com medo.", time: "13:07" },
      { id: "m2-2", sender: "user" as const, text: "Fiz as orações do portal e comecei a ouvir a vibração do anjo da guarda... Tirou aquele peso e no terceiro dia me chamaram pra um freela que pagou exatamente a minha dívida todinha!", time: "13:09" },
      { id: "m2-4", sender: "user" as const, text: "Estou prosperando demais, as vendas da minha loja simplesmente triplicaram essa semana. Valeu cada centavo!", time: "13:10" }
    ]
  },
  {
    id: "chat-3",
    name: "Beatriz N.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    status: "online",
    date: "12 de Maio",
    messages: [
      { id: "m3-1", sender: "user" as const, text: "Olá! Vim dar meu testemunho. Eu tava muito endividada, sem conseguir dormir de tanta preocupação com dinheiro.", time: "15:33" },
      { id: "m3-2", sender: "user" as const, text: "Comprei o portal meio desconfiada com o resto de dinheiro que tinha, mas senti um toque no meu coração. Comecei a ouvir e a energia mudou na hora.", time: "15:35" },
      { id: "m3-5", sender: "user" as const, text: "Do nada, recebi um dinheiro antigo que estava na justiça há 4 anos e eu já tinha até desistido! Estou prosperando muito, Deus é fiel!", time: "15:37" }
    ]
  }
];

export default function App() {
  const [timer, setTimer] = useState(384); // 6:24 in seconds (384)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  const [checkoutProduct, setCheckoutProduct] = useState({
    name: "Acesso Portal dos Anjos (Completo)",
    priceOriginal: "R$ 97,00",
    priceCurrent: "R$ 24,90"
  });

  const triggerCheckout = (name: string, priceOriginal: string, priceCurrent: string) => {
    setCheckoutProduct({ name, priceOriginal, priceCurrent });
    setIsCheckoutOpen(true);
  };

  // Robust image source fallback states to solve Vercel deploy asset path issues
  const [heroSrc, setHeroSrc] = useState(heroImage);
  const [plannerSrc, setPlannerSrc] = useState(plannerImage);
  const [guiaSrc, setGuiaSrc] = useState(guiaJudaicoImage);
  const [rotinaSrc, setRotinaSrc] = useState(rotinaSucessoImage);
  const [guiaCaixaSrc, setGuiaCaixaSrc] = useState(guiaCaixaRapidoImage);
  
  // Audio state for members area (synthesizer)
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [isPlayingOscillator, setIsPlayingOscillator] = useState(false);
  const [activeFrequency, setActiveFrequency] = useState<number>(432);
  const [synthGain, setSynthGain] = useState<GainNode | null>(null);
  const [synthOscillators, setSynthOscillators] = useState<OscillatorNode[]>([]);
  const [activeTrackName, setActiveTrackName] = useState("Vibração da Cura Emocional");

  // Daily Oracle in members area
  const [dailyOracleFocus, setDailyOracleFocus] = useState("prosperidade");
  const [dailyOracleResult, setDailyOracleResult] = useState<{message: string, affirmation: string} | null>(null);
  const [dailyOracleLoading, setDailyOracleLoading] = useState(false);

  // User details captured in checkout
  const [buyerEmail, setBuyerEmail] = useState("voce@portal.com");

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Synth controls to play actual peaceful healing frequencies inside the members portal!
  const startSacredFrequency = (frequency: number, name: string) => {
    try {
      // Initialize AudioContext if not already done
      let ctx = audioCtx;
      if (!ctx) {
        ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioCtx(ctx);
      }

      // Stop any existing sound
      stopSacredFrequency();

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Create a warm multi-oscillator chord (root + fifth + octave + third)
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5); // Fade in gently

      const rootFreq = frequency;
      const fifthFreq = frequency * 1.5;
      const octaveFreq = frequency * 2;
      const thirdFreq = frequency * 1.25;

      const freqs = [rootFreq, fifthFreq, octaveFreq, thirdFreq];
      const types: OscillatorType[] = ["sine", "triangle", "sine", "triangle"];
      const activeOscs: OscillatorNode[] = [];

      freqs.forEach((f, idx) => {
        const osc = ctx!.createOscillator();
        osc.type = types[idx] || "sine";
        osc.frequency.setValueAtTime(f, ctx!.currentTime);
        
        // Add subtle pitch lfo for a warm chorusing space effect
        const lfo = ctx!.createOscillator();
        lfo.frequency.setValueAtTime(0.15 + idx * 0.05, ctx!.currentTime);
        const lfoGain = ctx!.createGain();
        lfoGain.gain.setValueAtTime(1.5, ctx!.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(gainNode);
        osc.start();
        activeOscs.push(osc);
      });

      // Filter to make it warmer and remove harsh high frequencies
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(600, ctx.currentTime);

      gainNode.connect(lowpass);
      lowpass.connect(ctx.destination);

      setSynthOscillators(activeOscs);
      setSynthGain(gainNode);
      setActiveFrequency(frequency);
      setActiveTrackName(name);
      setIsPlayingOscillator(true);
    } catch (err) {
      console.error("Web Audio not fully supported or blocked:", err);
    }
  };

  const stopSacredFrequency = () => {
    if (synthGain && audioCtx) {
      try {
        // Fade out
        const currentGain = synthGain.gain;
        currentGain.setValueAtTime(currentGain.value, audioCtx.currentTime);
        currentGain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.0);
        
        const oscsToStop = synthOscillators;
        setTimeout(() => {
          oscsToStop.forEach(osc => {
            try { osc.stop(); } catch(e) {}
          });
        }, 1100);
      } catch (err) {
        synthOscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
      }
    } else {
      synthOscillators.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
    }
    setSynthOscillators([]);
    setSynthGain(null);
    setIsPlayingOscillator(false);
  };

  const handleTrackToggle = (freq: number, name: string) => {
    if (isPlayingOscillator && activeFrequency === freq) {
      stopSacredFrequency();
    } else {
      startSacredFrequency(freq, name);
    }
  };

  const handleDrawDailyCard = async (focus: string) => {
    setDailyOracleFocus(focus);
    setDailyOracleLoading(true);
    setDailyOracleResult(null);

    try {
      const response = await fetch("/api/daily-oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focus })
      });
      if (!response.ok) {
        throw new Error("API request failed");
      }
      const data = await response.json();
      setDailyOracleResult(data);
    } catch (e) {
      console.error("Error drawing card, using high-quality local fallback:", e);
      const fallbacks: Record<string, { focus: string; message: string; affirmation: string }> = {
        prosperidade: {
          focus: "prosperidade",
          message: "Hoje, as correntes angelicais de abundância fluem abundantemente em sua direção. Arcanjo Uriel sussurra que a prosperidade espiritual e material se inicia no seu estado interno de gratidão. Ao reconhecer as bênçãos presentes, você abre os portais invisíveis para que mais recursos, conexões e surpresas positivas cheguem ao seu caminho.",
          affirmation: "Eu sou um canal limpo e aberto para a riqueza divina do universo. Tudo de bom vem a mim com facilidade, alegria e glória."
        },
        proteção: {
          focus: "proteção",
          message: "Sinta a presença do Arcanjo Miguel e sua milícia celeste ao seu redor hoje. Um escudo impenetrável de luz azul-celeste envolve seu lar, seus projetos e seus entes queridos. Não tema os obstáculos do caminho, pois qualquer energia de discórdia ou limitação é dissolvida antes mesmo de tocar sua jornada.",
          affirmation: "Estou sob a proteção divina do Arcanjo Miguel. Sigo meu caminho com coragem, segurança e absoluta paz de espírito."
        },
        paz: {
          focus: "paz",
          message: "A suave energia de cura do Arcanjo Rafael repousa sobre seu coração neste dia. Deixe que as tensões acumuladas se desfaçam como névoa sob o sol da manhã. Respire profundamente, sabendo que as turbulências da mente são passageiras, mas o oceano de paz que habita sua essência espiritual é eterno.",
          affirmation: "Eu escolho respirar paz, soltar a ansiedade e repousar na certeza de que tudo está cooperando para o meu bem."
        }
      };
      setDailyOracleResult(fallbacks[focus] || fallbacks.paz);
    } finally {
      setDailyOracleLoading(false);
    }
  };

  const handleSimulatedPurchaseSuccess = () => {
    if (isPurchased) {
      alert(`Sucesso! Sua compra do item "${checkoutProduct.name}" por ${checkoutProduct.priceCurrent} foi aprovada na simulação!\nEste recurso foi adicionado à sua conta de Membro.`);
    } else {
      setIsPurchased(true);
      // Smooth scroll to top of viewport
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen text-slate-100 bg-[#0a1428] relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-900 font-sans">
      {/* Background radial celestial glow */}
      <div className="portal-bg absolute inset-0 pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BAR FOR TIMER */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-red-950 via-amber-600 to-red-950 text-white font-extrabold text-[11px] md:text-xs tracking-widest py-2.5 text-center uppercase border-b border-white/15 flex items-center justify-center gap-2 shadow-md">
        <Clock className="w-4 h-4 animate-pulse" />
        <span>OFERTA ESPECIAL POR TEMPO LIMITADO — {formatTimer(timer)} RESTANTES</span>
      </div>

      <AnimatePresence mode="wait">
        {!isPurchased ? (
          // --- SALES PAGE ---
          <motion.div
            key="sales-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* HERO SECTION */}
            <header className="max-w-6xl mx-auto px-6 pt-6 md:pt-10 pb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] md:text-xs tracking-widest uppercase font-semibold mb-4 animate-pulse">
                <Sparkles className="w-3 h-3" />
                CONEXÃO ESPIRITUAL ANCESTRAL
              </div>
              
              <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide max-w-4xl mx-auto leading-tight">
                Descubra quem é o seu <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">Anjo da Guarda</span> e desperte a energia que atrai prosperidade, proteção e abundância para sua vida.
              </h1>
              
              <p className="mt-4 font-display text-sm md:text-base text-amber-100/90 max-w-3xl mx-auto leading-relaxed">
                Tenha acesso ao Portal dos Anjos e descubra orações, salmos, ensinamentos e práticas espirituais para fortalecer sua conexão com seu Anjo da Guarda e viver sua fé de forma mais profunda.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <button 
                  onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all uppercase tracking-wide text-xs cursor-pointer border border-amber-300 flex items-center justify-center gap-2 btn-pulsate text-center"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  Quero Meu Acesso Agora
                </button>
                <a 
                  href="#conteudo-portal"
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  Ver Conteúdo do Portal
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Decorative Image Banner with golden frame */}
              <div className="mt-8 max-w-4xl mx-auto rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1428] via-transparent to-transparent z-10" />
                <img 
                  src={heroSrc} 
                  alt="Portal dos Anjos Portal Dourado Celestial" 
                  className="w-full h-[180px] md:h-[280px] object-cover filter brightness-90 transition duration-700 group-hover:scale-102"
                  onError={() => {
                    if (heroSrc !== "/assets/images/portal_dos_anjos_hero_1783098923011.jpg" && heroSrc !== "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200") {
                      setHeroSrc("/assets/images/portal_dos_anjos_hero_1783098923011.jpg");
                    } else if (heroSrc === "/assets/images/portal_dos_anjos_hero_1783098923011.jpg") {
                      setHeroSrc("https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200");
                    }
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 z-20 text-left md:flex items-end justify-between bg-[#0a1428]/85 backdrop-blur-md p-4 rounded-xl border border-white/5">
                  <div className="max-w-xl">
                    <span className="text-[9px] text-amber-400 tracking-wider uppercase font-mono font-bold">REVELAÇÃO EXCLUSIVA</span>
                    <h4 className="text-sm md:text-base font-display font-semibold text-white mt-0.5">Descubra a Mensagem e o Nome do Seu Protetor</h4>
                    <p className="text-[10px] text-slate-300 mt-1">Ative o ritual secreto de conexão do Portal dos Anjos para libertar sua vida de bloqueios e atrair abundância financeira, proteção diária e paz profunda.</p>
                  </div>
                  <div className="mt-3 md:mt-0 flex gap-1.5">
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[9px] rounded-full border border-amber-500/20 font-semibold font-mono">432Hz</span>
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-[9px] rounded-full border border-amber-500/20 font-semibold font-mono">528Hz</span>
                  </div>
                </div>
              </div>
            </header>
            {/* WHAT IS PORTAL DOS ANJOS? */}
            <section className="max-w-5xl mx-auto px-6 py-10 md:py-14">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-bold">A Conexão Ancestral</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-wide leading-tight">
                    O que é o Portal dos Anjos?
                  </h2>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Há séculos, diferentes culturas e tradições acreditam que existem forças espirituais que guiam, protegem e abrem caminhos na vida das pessoas — os anjos.
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    O <strong>Portal dos Anjos</strong> é uma experiência guiada que te ajuda a se reconectar com essa energia protetora, atraindo mais paz, prosperidade e segurança para o seu dia a dia.
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wide text-xs cursor-pointer border border-amber-300"
                    >
                      Quero Ativar Meu Acesso
                    </button>
                  </div>
                </div>

                {/* Grid layout illustrating the three key pillars */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="glass-card p-4 flex gap-3 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-amber-300 text-sm">Prosperidade & Fluxo</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Aprenda a sintonizar-se com o fluxo natural de abundância para destravar oportunidades profissionais.</p>
                    </div>
                  </div>

                  <div className="glass-card p-4 flex gap-3 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-indigo-300 text-sm">Proteção & Escudo Celeste</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Sinta-se amparado em suas decisões diárias. Neutralize negatividade e atraia proteção para seu lar.</p>
                    </div>
                  </div>

                  <div className="glass-card p-4 flex gap-3 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-teal-300 text-sm">Clareza & Sabedoria</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Acabe com a confusão mental e indecisões. Ative sua voz intuitiva e receba orientação divina.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* WHO IS THIS FOR? */}
            <section className="bg-slate-900/40 border-y border-white/5 py-10 md:py-14">
              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-8">
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-bold">O Seu Momento de Mudança</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-1">Isso é pra você que quer...</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {[
                    "Atrair mais prosperidade e abundância pra sua vida",
                    "Sentir mais proteção e segurança no dia a dia",
                    "Receber clareza pra tomar decisões importantes",
                    "Se reconectar com sua espiritualidade de forma simples",
                    "Elevar sua energia e afastar bloqueios"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="text-slate-200 text-xs md:text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-6 py-3 rounded-xl shadow-md transition uppercase tracking-wide text-xs cursor-pointer border border-amber-300 btn-pulsate"
                  >
                    Sim, Quero Mudar Minha Realidade
                  </button>
                </div>
              </div>
            </section>

            {/* WHY IT WORKS & WHATSAPP TESTIMONIALS */}
            <section className="max-w-6xl mx-auto px-6 py-10 md:py-14">
              <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
                <span className="text-xs text-amber-400 uppercase tracking-widest font-bold font-mono">
                  Depoimentos de Alunos
                </span>
                
                {/* Visual matching of the uploaded image */}
                <h3 className="text-xl md:text-2xl font-display font-medium text-slate-400 tracking-wide">
                  Portal dos Anjos.
                </h3>
                <h2 className="text-3xl md:text-5xl font-display font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 uppercase">
                  VOCÊ SERÁ O PRÓXIMO?
                </h2>
                
                <div className="pt-4 pb-1 max-w-4xl mx-auto">
                  <p className="text-amber-300 text-lg md:text-2xl font-extrabold tracking-tight leading-tight uppercase animate-pulse">
                    🔥 VEJA ABAIXO OS PRINTS REAIS NO WHATSAPP!
                  </p>
                  <p className="text-slate-200 text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-2">
                    Veja com seus próprios olhos as conversas de quem já está colhendo resultados e colhendo bênçãos diárias com o Portal dos Anjos:
                  </p>
                </div>
              </div>

              {/* REALISTIC WHATSAPP SMARTPHONE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-start justify-center max-w-5xl mx-auto">
                {WHATSAPP_TESTIMONIALS.map((chat) => (
                  <WhatsAppChat
                    key={chat.id}
                    name={chat.name}
                    avatar={chat.avatar}
                    status={chat.status}
                    messages={chat.messages}
                    date={chat.date}
                  />
                ))}
              </div>

              <div className="text-center mt-10 bg-gradient-to-r from-amber-500/10 via-[#0e1b35] to-amber-500/10 border border-amber-500/20 p-6 rounded-2xl max-w-xl mx-auto shadow-xl space-y-3">
                <h3 className="font-display font-semibold text-amber-300 text-base md:text-lg">
                  Nossos alunos já estão colhendo os resultados.
                </h3>
                <p className="text-xs text-slate-400">Conecte-se você também com a energia que protege e atrai prosperidade.</p>
                <button
                  onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                  className="bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-5 py-2.5 rounded-xl shadow-md transition uppercase tracking-wide text-xs cursor-pointer border border-amber-300"
                >
                  Quero Ser o Próximo Abençoado
                </button>
              </div>
            </section>

            {/* WHAT YOU GET TODAY (CURRICULUM/MODULES) */}
            <section id="conteudo-portal" className="bg-slate-900/60 border-y border-white/5 py-10 md:py-14 scroll-mt-20">
              <div className="max-w-5xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-bold">O Conteúdo do Portal</span>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-1">O que você recebe hoje:</h2>
                  <p className="text-slate-400 mt-2 text-xs">
                    Garantindo seu acesso promocional hoje, você terá todo o conhecimento e as ferramentas necessárias para ativar sua sintonia universal de maneira prática.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PRODUCT_MODULES.map((mod, index) => (
                    <div key={mod.id} className="glass-card p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] text-amber-400 tracking-wider font-mono font-bold uppercase px-2 py-0.5 bg-amber-500/10 rounded-full border border-amber-500/20">
                            PRODUTO {index + 1}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{mod.duration}</span>
                        </div>
                        <h3 className="text-base font-display font-bold text-white">{mod.title}</h3>
                        <p className="text-amber-200/80 text-[10px] font-semibold mt-0.5">{mod.subtitle}</p>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{mod.description}</p>

                        <ul className="mt-3 space-y-1">
                          {mod.contents.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                              <span className="w-1 h-1 rounded-full bg-amber-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* List Summary Icons aligned with original copy */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 text-center">
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-xs text-slate-300 block">🔓 Acesso Imediato</span>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-xs text-slate-300 block">🎁 Conteúdo Completo</span>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-xs text-slate-300 block">🎵 Frequências em Áudio</span>
                  </div>
                  <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <span className="text-xs text-slate-300 block">📱 Celular, Tablet, PC</span>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 transition uppercase tracking-wide text-xs cursor-pointer border border-amber-300 btn-pulsate"
                  >
                    Garantir Meu Acesso Vitalício
                  </button>
                </div>
              </div>
            </section>

            {/* DUAL BONUS SECTION */}
            <section className="py-10 bg-[#070d1a] border-b border-white/5 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                {/* Header mimicking the screenshot exactly */}
                <div className="flex flex-col items-center justify-center mb-6">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#9d7cf7] select-none leading-none mb-1 filter drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    + 4 BÔNUS
                  </span>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent mt-2" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6 max-w-5xl mx-auto">
                  {/* Bonus 1 */}
                  <div className="bg-[#111827]/40 rounded-xl p-3 border border-white/5 hover:border-violet-500/30 transition-all duration-300 flex flex-col items-center text-center group h-full">
                    <div className="relative w-24 h-32 mb-3 transition-transform duration-500 group-hover:scale-105 shrink-0">
                      <img 
                        src={plannerSrc} 
                        alt="Planner de sucesso" 
                        className="w-full h-full object-cover rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.6)] border border-white/10"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (plannerSrc !== "/assets/images/planner_de_sucesso_1783099332423.jpg" && plannerSrc !== "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800") {
                            setPlannerSrc("/assets/images/planner_de_sucesso_1783099332423.jpg");
                          } else if (plannerSrc === "/assets/images/planner_de_sucesso_1783099332423.jpg") {
                            setPlannerSrc("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800");
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none rounded-lg" />
                    </div>
                    <h3 className="text-xs font-display font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      Planner de sucesso
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      Sua ferramenta de organização diária e semanal para materializar metas, alinhar intenções e sintonizar energias prósperas.
                    </p>
                  </div>

                  {/* Bonus 2 */}
                  <div className="bg-[#111827]/40 rounded-xl p-3 border border-white/5 hover:border-violet-500/30 transition-all duration-300 flex flex-col items-center text-center group h-full">
                    <div className="relative w-24 h-32 mb-3 transition-transform duration-500 group-hover:scale-105 shrink-0">
                      <img 
                        src={guiaSrc} 
                        alt="Guia Judaico do Enriquecimento Rápido" 
                        className="w-full h-full object-cover rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.6)] border border-white/10"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (guiaSrc !== "/assets/images/guia_judaico_enriquecimento_1783099344470.jpg" && guiaSrc !== "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800") {
                            setGuiaSrc("/assets/images/guia_judaico_enriquecimento_1783099344470.jpg");
                          } else if (guiaSrc === "/assets/images/guia_judaico_enriquecimento_1783099344470.jpg") {
                            setGuiaSrc("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800");
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none rounded-lg" />
                    </div>
                    <h3 className="text-xs font-display font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      Guia Judaico do Enriquecimento Rápido
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      Os princípios ancestrais e códigos de sabedoria milenares utilizados para construir abundância material contínua e farta.
                    </p>
                  </div>

                  {/* Bonus 3 */}
                  <div className="bg-[#111827]/40 rounded-xl p-3 border border-white/5 hover:border-violet-500/30 transition-all duration-300 flex flex-col items-center text-center group h-full">
                    <div className="relative w-24 h-32 mb-3 transition-transform duration-500 group-hover:scale-105 shrink-0">
                      <img 
                        src={rotinaSrc} 
                        alt="Rotina do Sucesso" 
                        className="w-full h-full object-cover rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.6)] border border-white/10"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (rotinaSrc !== "/assets/images/rotina_do_sucesso_1783512771896.jpg" && rotinaSrc !== "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800") {
                            setRotinaSrc("/assets/images/rotina_do_sucesso_1783512771896.jpg");
                          } else if (rotinaSrc === "/assets/images/rotina_do_sucesso_1783512771896.jpg") {
                            setRotinaSrc("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800");
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none rounded-lg" />
                    </div>
                    <h3 className="text-xs font-display font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      Rotina do Sucesso
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      O guia definitivo com hábitos diários de alta vibração para programar sua mente e sintonizar caminhos de prosperidade e proteção ao acordar.
                    </p>
                  </div>

                  {/* Bonus 4 */}
                  <div className="bg-[#111827]/40 rounded-xl p-3 border border-white/5 hover:border-violet-500/30 transition-all duration-300 flex flex-col items-center text-center group h-full">
                    <div className="relative w-24 h-32 mb-3 transition-transform duration-500 group-hover:scale-105 shrink-0">
                      <img 
                        src={guiaCaixaSrc} 
                        alt="Guia do Caixa Rápido" 
                        className="w-full h-full object-cover rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.6)] border border-white/10"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          if (guiaCaixaSrc !== "/assets/images/guia_caixa_rapido_1783512784634.jpg" && guiaCaixaSrc !== "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800") {
                            setGuiaCaixaSrc("/assets/images/guia_caixa_rapido_1783512784634.jpg");
                          } else if (guiaCaixaSrc === "/assets/images/guia_caixa_rapido_1783512784634.jpg") {
                            setGuiaCaixaSrc("https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800");
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none rounded-lg" />
                    </div>
                    <h3 className="text-xs font-display font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      Guia do Caixa Rápido
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-3">
                      Estratégias práticas e imediatas de sintonização espiritual e ações rápidas para destravar receitas financeiras inesperadas em até 5 dias.
                    </p>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <span className="text-[11px] text-slate-400 block mb-2">Todos os 4 livros digitais acima serão inclusos de graça no seu acesso hoje.</span>
                  <button
                    onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-6 py-2.5 rounded-xl shadow-md transition uppercase tracking-wide text-xs cursor-pointer border border-amber-300 btn-pulsate"
                  >
                    Resgatar Meus 4 Bônus Gratuitos
                  </button>
                </div>
              </div>
            </section>

            {/* GUARANTEES SECTIONS */}
            <section className="max-w-4xl mx-auto px-6 py-10 text-center">
              <div className="glass-card p-6 md:p-8 rounded-2xl border border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
                
                <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-3">Garantias que te protegem:</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-white flex items-center gap-2 text-xs md:text-sm">
                      <span className="text-amber-400">🛡️</span> 7 Dias de Garantia
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Se não sentir que fez sentido pra você, devolvemos 100% do seu dinheiro, de imediato e sem burocracias.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-semibold text-white flex items-center gap-2 text-xs md:text-sm">
                      <span className="text-amber-400">🔒</span> Compra 100% Segura
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Ambiente criptografado e seguro com proteção total para seus dados bancários e cadastrais.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-semibold text-white flex items-center gap-2 text-xs md:text-sm">
                      <span className="text-amber-400">⚡</span> Acesso Imediato
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Você recebe as instruções e os códigos de ativação por e-mail no mesmo minuto da confirmação do pagamento.
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/5 pt-4 text-center">
                  <button
                    onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-6 py-2.5 rounded-xl shadow-md transition uppercase tracking-wide text-xs cursor-pointer border border-amber-300 btn-pulsate"
                  >
                    Experimentar Sem Riscos por 7 Dias
                  </button>
                </div>
              </div>
            </section>

            {/* PRICING AND CONVERSION SECTION */}
            <section className="bg-gradient-to-t from-slate-950 via-slate-900 to-[#0a1428] py-10 border-t border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-md mx-auto px-4 relative z-10">
                {/* Premium High-Converting Pricing Card */}
                <div className="bg-[#0b1222]/95 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-4 md:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  {/* Decorative corner glows */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-700" />
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all duration-700" />
                  
                  {/* Glowing border sweep indicator */}
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                  {/* Header Badge */}
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 tracking-widest uppercase font-mono font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping inline-block shrink-0" />
                      Condição Exclusiva: Oferta por Tempo Limitado
                    </span>
                    <h3 className="text-lg md:text-xl font-display font-extrabold text-white mt-2 tracking-tight">
                      O Portal dos Anjos + 4 Super Bônus
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Sua conexão sagrada e destraves financeiros imediatos.
                    </p>
                  </div>

                  {/* What is included list */}
                  <div className="bg-slate-950/50 rounded-xl p-3 md:p-4 border border-white/5 space-y-2 mb-4 text-left">
                    <p className="text-[9px] uppercase font-mono tracking-wider text-slate-500 font-bold border-b border-white/5 pb-1">
                      O que você vai receber hoje:
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block text-xs">Portal Completo (Módulos I ao IV)</span>
                          <span className="text-[9px] text-slate-400">Acesso ilimitado e vitalício à plataforma de áudios e frequências</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-300 border-t border-white/5 pt-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between items-start gap-2">
                          <div>
                            <span className="font-bold text-white block text-xs">Bônus #1: Planner de Sucesso</span>
                            <span className="text-[9px] text-slate-400">Organização diária e semanal para materializar metas</span>
                          </div>
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20 whitespace-nowrap shrink-0">
                            <span className="line-through text-slate-500 mr-1 text-[9px] font-normal">R$ 97</span> GRÁTIS
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-300 border-t border-white/5 pt-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between items-start gap-2">
                          <div>
                            <span className="font-bold text-white block text-xs">Bônus #2: Guia Judaico de Enriquecimento</span>
                            <span className="text-[9px] text-slate-400">Princípios ancestrais de abundância material farta</span>
                          </div>
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20 whitespace-nowrap shrink-0">
                            <span className="line-through text-slate-500 mr-1 text-[9px] font-normal">R$ 147</span> GRÁTIS
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-300 border-t border-white/5 pt-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between items-start gap-2">
                          <div>
                            <span className="font-bold text-white block text-xs">Bônus #3: Livro Rotina do Sucesso</span>
                            <span className="text-[9px] text-slate-400">Hábitos diários de alta vibração ao acordar</span>
                          </div>
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20 whitespace-nowrap shrink-0">
                            <span className="line-through text-slate-500 mr-1 text-[9px] font-normal">R$ 89</span> GRÁTIS
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 text-xs text-slate-300 border-t border-white/5 pt-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="flex-1 flex justify-between items-start gap-2">
                          <div>
                            <span className="font-bold text-white block text-xs">Bônus #4: Livro Guia do Caixa Rápido</span>
                            <span className="text-[9px] text-slate-400">Estratégias práticas para atrair renda extra em 5 dias</span>
                          </div>
                          <span className="text-[9px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20 whitespace-nowrap shrink-0">
                            <span className="line-through text-slate-500 mr-1 text-[9px] font-normal">R$ 119</span> GRÁTIS
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price display section */}
                  <div className="text-center space-y-1 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-slate-400 line-through">De R$ 97,00</span>
                      <span className="text-[9px] bg-red-500/10 text-red-400 font-bold px-1.5 py-0.5 rounded border border-red-500/20 uppercase tracking-wider">
                        -74% de desconto
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-semibold">Hoje, à vista por apenas</span>
                      <div className="text-3xl md:text-4xl font-display font-black text-amber-400 tracking-tight drop-shadow-[0_4px_12px_rgba(245,158,11,0.2)]">
                        R$ 24,90
                      </div>
                    </div>

                    <div className="flex justify-center gap-1.5 text-[8px] text-emerald-400 font-extrabold uppercase tracking-widest pt-1">
                      <span className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        ✓ Acesso Vitalício
                      </span>
                      <span className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                        ✓ Sem Mensalidades
                      </span>
                    </div>
                  </div>

                  {/* Call to Action Button */}
                  <div className="space-y-3">
                    <button
                      onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-[#070d1a] font-black py-3 px-5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] transition-all uppercase tracking-wider text-xs cursor-pointer border border-amber-300 hover:scale-[1.01] active:scale-[0.99] text-center block"
                    >
                      Quero Ativar Minha Frequência de Prosperidade
                    </button>

                    <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed text-center">
                      Garantia de 7 dias sem riscos. Pagamento 100% seguro.
                    </p>
                  </div>

                  {/* Payment logos and trust elements */}
                  <div className="border-t border-white/5 mt-5 pt-4 flex flex-col items-center gap-2">
                    <span className="text-[8px] uppercase font-mono tracking-widest text-slate-500 font-bold">Formas de Pagamento Aceitas:</span>
                    {/* Payment badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] text-slate-400 font-mono">
                      <span className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-slate-300 font-bold">PIX</span>
                      <span className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-slate-300 font-bold">CARTÃO DE CRÉDITO</span>
                      <span className="bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded text-slate-300 font-bold">BOLETO</span>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1 text-[10px]">
                        <Lock className="w-3 h-3 text-amber-500" />
                        Ambiente Criptografado
                      </span>
                      <span className="text-slate-700">•</span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Shield className="w-3 h-3 text-amber-500" />
                        Garantia de 7 Dias
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <section className="max-w-3xl mx-auto px-6 py-10 md:py-12">
              <div className="text-center mb-6">
                <HelpCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h2 className="text-xl md:text-2xl font-display font-bold text-white">Perguntas frequentes</h2>
              </div>

              <div className="space-y-3">
                {FAQ_DATA.map((faq) => (
                  <div key={faq.id} className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden transition">
                    <button
                      onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs md:text-sm font-semibold text-white hover:text-amber-400 transition cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-amber-500 shrink-0 transition-transform ${activeFaq === faq.id ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {activeFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-4 pb-4 pt-1 text-[11px] md:text-xs text-slate-300 border-t border-white/5 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center space-y-3">
                <button
                  onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition uppercase tracking-wider text-xs cursor-pointer border border-amber-300 btn-pulsate text-center inline-block"
                >
                  Quero Garantir Meu Acesso Agora
                </button>
                <p className="text-[10px] text-slate-500">Vagas por tempo limitado nessa condição especial.</p>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/5 py-8 text-center bg-slate-950/60 text-xs text-slate-500 space-y-3">
              <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-display font-bold text-white tracking-wide uppercase text-[9px]">Portal dos Anjos</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-[9px] uppercase tracking-wider">
                  <a href="#conteudo-portal" className="hover:text-amber-400 transition">Conteúdo do Portal</a>
                  <button onClick={() => triggerCheckout("Acesso Portal dos Anjos (Completo)", "R$ 97,00", "R$ 24,90")} className="hover:text-amber-400 transition cursor-pointer">Comprar Portal</button>
                  <span className="text-slate-700">|</span>
                  <span>Frequência Sagrada Solfeggio 2026</span>
                </div>
              </div>
              <p className="max-w-xl mx-auto px-6 text-[9px] leading-relaxed text-slate-600">
                Aviso: O Portal dos Anjos é uma proposta de desenvolvimento pessoal e reconexão meditativa. Os resultados podem variar de pessoa para pessoa. Nenhuma informação aqui substitui aconselhamento médico ou psicológico.
              </p>
            </footer>
          </motion.div>
        ) : (
          // --- MEMBERS AREA (SURPRISE FOR USER!) ---
          <motion.div
            key="members-portal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto px-4 py-8 relative z-10"
          >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  Santuário dos Alunos • Acesso Ativado
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2 mt-2">
                  Portal dos Anjos <span className="text-amber-400 font-mono text-sm uppercase px-2 py-0.5 rounded bg-slate-900 border border-white/15">Membros</span>
                </h1>
                <p className="text-xs text-slate-400">
                  Bem-vindo à sua área sagrada de meditações, conexões angelicais e rituais de prosperidade.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-400">Iniciado como</p>
                  <p className="text-xs font-semibold text-amber-300 font-mono">{buyerEmail || "aluno@portal.com"}</p>
                </div>
                <button
                  onClick={() => {
                    stopSacredFrequency();
                    setIsPurchased(false);
                  }}
                  className="px-4 py-2 bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-500/20 rounded-xl text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sair do Portal
                </button>
              </div>
            </div>

            {/* WELCOME BANNER */}
            <div className="bg-gradient-to-r from-amber-600/20 via-indigo-950 to-amber-600/10 border border-amber-500/20 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-lg md:text-xl font-display font-bold text-amber-300">"Sua jornada de reconexão espiritual e abundância começou!"</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Utilize os fones de ouvido para ouvir as frequências de ressonância solfeggio. Elas estimulam a calma, ativam ondas alfa no cérebro e dissolvem preocupações inconscientes sobre escassez e insegurança.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <span className="text-[10px] text-amber-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md font-mono">✓ Acesso Vitalício</span>
                  <span className="text-[10px] text-amber-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md font-mono">✓ Atualizações Semanais</span>
                </div>
              </div>
            </div>

            {/* MAIN PORTAL GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT & CENTER COLUMN: MEDIA PLAYER & RITUALS */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. INTERACTIVE AUDIO CONTROLLER (FAIXAS DE MEDITAÇÃO) */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5 text-amber-400" />
                      <h3 className="font-display font-bold text-white text-lg">Áudios & Frequências Ativadoras</h3>
                    </div>
                    {isPlayingOscillator && (
                      <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                        Tocando agora
                      </span>
                    )}
                  </div>

                  {/* Active track display */}
                  <div className="bg-slate-950 rounded-2xl p-6 border border-white/5 text-center space-y-4 mb-6">
                    {isPlayingOscillator ? (
                      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                        <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-ping" />
                        <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center">
                          <Volume2 className="w-6 h-6 animate-bounce" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                        <VolumeX className="w-5 h-5" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <h4 className="font-semibold text-white">{activeTrackName}</h4>
                      <p className="text-xs text-amber-400 font-mono">{activeFrequency}Hz — Onda de Sintonização Ativa</p>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                      {isPlayingOscillator ? (
                        <button
                          onClick={stopSacredFrequency}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Pause className="w-3.5 h-3.5" />
                          Pausar Som
                        </button>
                      ) : (
                        <button
                          onClick={() => startSacredFrequency(activeFrequency, activeTrackName)}
                          className="bg-amber-500 hover:bg-amber-400 text-[#0a1428] text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#0a1428]" />
                          Iniciar Som
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Sound tracks table */}
                  <div className="space-y-3">
                    {[
                      { freq: 432, name: "Vibração da Cura Emocional", desc: "Acalma o ritmo cardíaco, ajuda a dissolver mágoas inconscientes.", dur: "Meditação Infinita" },
                      { freq: 528, name: "Ativação do DNA e Milagres", desc: "Sintonia do Arcanjo Rafael. Promove vitalidade, saúde e paz.", dur: "Frequência de Regeneração" },
                      { freq: 741, name: "Frequência da Abundância Fluida", desc: "Sintonia de Uriel. Libera bloqueios de prosperidade financeira.", dur: "Sintonia de Riqueza" },
                      { freq: 963, name: "Desperte sua Luz Superior", desc: "Sintonia de Gabriel. Traz intuição limpa para tomada de decisões.", dur: "Voz Interior Clara" }
                    ].map((track) => (
                      <div 
                        key={track.freq} 
                        onClick={() => handleTrackToggle(track.freq, track.name)}
                        className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between gap-4 ${activeFrequency === track.freq && isPlayingOscillator ? "bg-amber-500/10 border-amber-500/30" : "bg-slate-950/40 border-white/5 hover:border-white/10"}`}
                      >
                        <div className="space-y-0.5">
                          <h5 className="text-sm font-semibold text-white flex items-center gap-2">
                            <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{track.freq}Hz</span>
                            {track.name}
                          </h5>
                          <p className="text-xs text-slate-400">{track.desc}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-slate-500 font-mono hidden sm:block">{track.dur}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${activeFrequency === track.freq && isPlayingOscillator ? "bg-amber-500 text-[#0a1428]" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}>
                            {activeFrequency === track.freq && isPlayingOscillator ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. RITUAL DE PROSPERIDADE ANCESTRAL (MANUAL) */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <h3 className="font-display font-bold text-white text-lg">Guia Prático: O Ritual da Vela Dourada</h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Este é o principal decreto espiritual do <strong>Portal dos Anjos</strong> para ser efetuado pelas manhãs. Realize em um espaço silencioso, de preferência voltando-se para a direção leste.
                  </p>

                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-4 font-serif text-amber-200 text-sm leading-relaxed text-center italic">
                    <p>
                      "Eu me abro agora para o Portal das Bênçãos Invisíveis. Sob o escudo de luz do Arcanjo Miguel, eu dissolvo todo medo, inveja ou limitação. Sob o cajado de ouro de Uriel, eu convido as águas da abundância para irrigarem minha vida financeira e profissional. Eu sou paz, eu sou prosperidade, eu sou amparado."
                    </p>
                    <p className="text-xs text-slate-400 font-sans not-italic">
                      Repita este decreto 3 vezes seguidas de olhos fechados, respirando profundamente.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5 space-y-1">
                      <span className="text-xs text-amber-300 font-semibold uppercase block">✓ Arcanjo da Semana:</span>
                      <p className="text-sm text-white">Uriel — O Fogo Divino</p>
                      <p className="text-[10px] text-slate-400">Excelente para resolver pendências profissionais e trazer sorte.</p>
                    </div>
                    <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5 space-y-1">
                      <span className="text-xs text-amber-300 font-semibold uppercase block">✓ Salmo de Apoio:</span>
                      <p className="text-sm text-white">Salmo 91 — Abrigo Seguro</p>
                      <p className="text-[10px] text-slate-400">Ativa o escudo de luz invisível contra qualquer energia densa.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: DAILY ORACLE BAR */}
              <div className="space-y-8">
                
                {/* DAILY CARD ORACLE */}
                <div className="bg-gradient-to-b from-indigo-950 to-slate-950 border border-amber-500/30 rounded-3xl p-6 shadow-xl text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl animate-pulse" />
                  
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-amber-500/20">
                    <Sparkles className="w-3 h-3 animate-spin-slow" />
                    Oráculo Diário de Luz
                  </div>

                  <h4 className="font-display font-bold text-white text-lg mb-2">Puxe Uma Mensagem de Hoje</h4>
                  <p className="text-xs text-slate-300 mb-6">
                    Selecione qual canal energético você deseja consultar hoje e clique para retirar o seu conselho e afirmação dos Arcanjos.
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { id: "prosperidade", label: "Finanças", icon: "💰" },
                      { id: "proteção", label: "Proteção", icon: "🛡️" },
                      { id: "paz", label: "Paz", icon: "🕊️" }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => handleDrawDailyCard(btn.id)}
                        disabled={dailyOracleLoading}
                        className={`p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1.5 ${dailyOracleFocus === btn.id ? "bg-amber-500/20 border-amber-500 text-amber-300" : "bg-slate-900 border-white/5 text-slate-300 hover:border-white/10"}`}
                      >
                        <span className="text-xl">{btn.icon}</span>
                        <span className="text-[10px] font-semibold block">{btn.label}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {dailyOracleLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 space-y-3"
                      >
                        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-xs text-slate-400 font-mono">Embaralhando conselhos de luz...</p>
                      </motion.div>
                    )}

                    {!dailyOracleLoading && dailyOracleResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-slate-900/80 rounded-2xl p-5 border border-amber-500/15 text-left space-y-3 mt-4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                            Foco: {dailyOracleResult.focus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">
                          "{dailyOracleResult.message}"
                        </p>
                        <div className="bg-slate-950/80 p-3 rounded-xl border border-white/5 mt-2">
                          <span className="text-[9px] uppercase font-bold text-amber-400 tracking-widest block mb-1">Afirmação para Repetir Hoje:</span>
                          <p className="text-[11px] text-white font-medium italic">
                            "{dailyOracleResult.affirmation}"
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {!dailyOracleLoading && !dailyOracleResult && (
                      <div className="py-12 border border-dashed border-white/5 rounded-2xl bg-slate-950/20 text-slate-500 text-xs">
                        Nenhuma carta retirada hoje. Escolha um tema acima para canalizar.
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* DIGITAL PRODUCTS ACCESS & DOWNLOAD FILES */}
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <FileText className="w-5 h-5 text-amber-400" />
                    <h3 className="font-display font-bold text-white text-lg">Seus Manuais PDF</h3>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    Você pode baixar ou ler diretamente do seu navegador os materiais de estudo que acompanham o seu portal.
                  </p>

                  <div className="space-y-3">
                    {[
                      { title: "Manual Completo do Portal dos Anjos", size: "2.4 MB • PDF", link: "#" },
                      { title: "Os Códigos Secretos da Prosperidade", size: "1.8 MB • PDF", link: "#" },
                      { title: "Diário de Sintonização de 30 Dias", size: "950 KB • PDF", link: "#" }
                    ].map((pdf, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <h5 className="text-xs font-semibold text-white">{pdf.title}</h5>
                          <span className="text-[10px] text-slate-500 font-mono">{pdf.size}</span>
                        </div>
                        <button
                          onClick={() => alert(`Simulando download de: ${pdf.title}\nArquivo salvo com sucesso no seu dispositivo!`)}
                          className="px-2.5 py-1.5 bg-amber-500/15 hover:bg-amber-500/20 text-amber-300 text-[10px] font-bold rounded-lg transition shrink-0 cursor-pointer"
                        >
                          Baixar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UPGRADE WIDGET 1: WhatsApp Mentorship */}
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] border border-violet-500/30 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/10 rounded-full blur-2xl animate-pulse" />
                  
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <MessageCircle className="w-4 h-4 text-violet-400" />
                    <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Suporte & Mentoria VIP</h4>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Ative o seu acompanhamento individualizado para tirar dúvidas sobre suas meditações e sintonizações diretamente pelo WhatsApp com nossos guias celestes.
                  </p>

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 line-through block leading-none mb-0.5">R$ 49,90</span>
                      <span className="text-xs font-bold text-violet-400 leading-none">R$ 14,90</span>
                    </div>
                    <span className="text-[8px] bg-violet-500/10 text-violet-300 font-extrabold px-1.5 py-0.5 rounded border border-violet-500/20 uppercase tracking-widest">
                      Acesso Vitalício
                    </span>
                  </div>

                  <button
                    onClick={() => triggerCheckout("Upgrade Mentoria VIP WhatsApp (Mensagens Diretas)", "R$ 49,90", "R$ 14,90")}
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-3 rounded-lg shadow-md transition uppercase tracking-wide text-[9px] cursor-pointer text-center block"
                  >
                    Ativar Suporte VIP no WhatsApp
                  </button>
                </div>

                {/* UPGRADE WIDGET 2: Physical Kit */}
                <div className="bg-gradient-to-br from-[#0f172a] to-[#2d1b11] border border-amber-500/20 rounded-3xl p-5 space-y-3 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl animate-pulse" />
                  
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider">Encomendar Kit Físico</h4>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Receba em casa os manuais impressos do Portal dos Anjos, o Diário de Sintonização de 30 Dias encadernado e o Planner Semanal Impresso. Frete grátis!
                  </p>

                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 line-through block leading-none mb-0.5">R$ 197,00</span>
                      <span className="text-xs font-bold text-amber-400 leading-none">R$ 47,00</span>
                    </div>
                    <span className="text-[8px] bg-amber-500/10 text-amber-400 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/20 uppercase tracking-widest">
                      Frete Grátis
                    </span>
                  </div>

                  <button
                    onClick={() => triggerCheckout("Kit Físico Completo (Enviado para sua Residência)", "R$ 197,00", "R$ 47,00")}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-[#0a1428] font-bold py-2 px-3 rounded-lg shadow-md transition uppercase tracking-wide text-[9px] cursor-pointer text-center block"
                  >
                    Garantir Kit Físico Impresso
                  </button>
                </div>

              </div>

            </div>

            {/* MEMBER AREA FOOTER */}
            <footer className="mt-16 border-t border-white/10 pt-8 pb-12 text-center text-xs text-slate-500 space-y-2">
              <p>Portal dos Anjos © 2026 — Área do Aluno Exclusiva.</p>
              <p className="text-[10px] text-slate-600">Sua sintonização espiritual é um caminho pessoal e pacífico de acolhimento.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL FLOW */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleSimulatedPurchaseSuccess}
        productName={checkoutProduct.name}
        priceOriginal={checkoutProduct.priceOriginal}
        priceCurrent={checkoutProduct.priceCurrent}
      />
    </div>
  );
}
