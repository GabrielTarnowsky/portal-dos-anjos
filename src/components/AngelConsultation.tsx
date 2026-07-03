import React, { useState } from "react";
import { Sparkles, Calendar, User, Heart, Compass, Shield, Coins, AlertCircle } from "lucide-react";
import { AngelReading } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface AngelConsultationProps {
  onBuyClick: () => void;
}

export default function AngelConsultation({ onBuyClick }: AngelConsultationProps) {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [focus, setFocus] = useState("prosperidade");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AngelReading | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadingPhrases = [
    "Sintonizando com as esferas celestes...",
    "Calculando os alinhamentos de nascimento...",
    "Consultando os Arcanjos da prosperidade e luz...",
    "Canalizando sua mensagem e ritual personalizado..."
  ];

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Por favor, digite seu nome.");
      return;
    }
    if (!birthdate) {
      setError("Por favor, selecione sua data de nascimento.");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);
    setLoadingStep(0);

    // Cycle through loading steps for a mystical feel
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingPhrases.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    try {
      const response = await fetch("/api/angel-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthdate, focus })
      });

      if (!response.ok) {
        throw new Error("Erro na conexão com o oráculo.");
      }

      const data = await response.json();
      
      // Delay resolution slightly to make the experience feel mystical and genuine
      setTimeout(() => {
        clearInterval(interval);
        setResult(data);
        setLoading(false);
      }, 6000);

    } catch (err: any) {
      clearInterval(interval);
      setError("Infelizmente, houve uma instabilidade na vibração celestial. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4" id="oraculo-guardian">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-amber-100 shadow-xl glow-gold relative overflow-hidden">
        
        {/* Subtle decorative celestial elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-200/10 rounded-full blur-3xl" />

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-200/50">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            Revelação de Sintonia Celestial
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 tracking-tight mb-4">
            Descubra Qual Arcanjo Guia Seus Passos
          </h2>
          <p className="text-slate-600">
            Digite seus dados abaixo para que nosso oráculo faça a leitura numerológica e astrológica de sintonização, revelando qual Arcanjo protetor está guiando sua jornada de prosperidade e proteção neste exato momento.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!loading && !result && (
            <motion.form
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              onSubmit={handleConsult}
              className="space-y-6 max-w-xl mx-auto"
            >
              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 p-4 rounded-xl text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-500" />
                  Seu Nome Completo
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maria Aparecida da Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Seu Foco Espiritual Atual
                  </label>
                  <select
                    value={focus}
                    onChange={(e) => setFocus(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition"
                  >
                    <option value="Prosperidade e Riqueza">Prosperidade e Riqueza</option>
                    <option value="Proteção e Livramento">Proteção e Livramento</option>
                    <option value="Paz Interior e Harmonia">Paz Interior e Harmonia</option>
                    <option value="Clareza Mental e Decisões">Clareza Mental e Direção</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-4 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Sparkles className="w-5 h-5 text-amber-100" />
                Gerar Minha Revelação Espiritual
              </button>
            </motion.form>
          )}

          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center space-y-6 max-w-md mx-auto"
            >
              {/* Spinning Sacred Geometry Simulation */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-amber-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <div className="absolute w-12 h-12 border border-indigo-400/30 rounded-full animate-pulse flex items-center justify-center bg-indigo-50/50">
                  <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-amber-700 font-semibold text-lg tracking-wide animate-pulse h-8">
                  {loadingPhrases[loadingStep]}
                </p>
                <p className="text-slate-400 text-sm">
                  Aguarde. O alinhamento com as correntes celestes exige silêncio e paciência...
                </p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="border-b border-amber-100 pb-6 text-center">
                <div className="text-sm uppercase tracking-widest text-slate-500 mb-1">Seu Guardião Revelado</div>
                <h3 className="text-3xl md:text-4xl font-display font-semibold text-amber-600">
                  Arcanjo {result.angelName}
                </h3>
                <p className="text-slate-600 font-medium italic mt-1">
                  {result.angelTitle}
                </p>
                
                {/* Spiritual Attributes Badge */}
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
                  <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    Chama: <strong>{result.color}</strong>
                  </span>
                  <span className="bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block" />
                    Cristal Sintonizador: <strong>{result.stone}</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-slate-700 text-base leading-relaxed max-w-3xl mx-auto">
                {result.message.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 max-w-2xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-br-xl">
                  Prática Diária de Conexão
                </div>
                <h4 className="font-semibold text-amber-800 text-lg mb-2 mt-2">Seu Pequeno Ritual de Hoje:</h4>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "{result.ritual}"
                </p>
              </div>

              {/* Conversion hook connected to Sales Page */}
              <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-2xl p-8 text-center text-white max-w-2xl mx-auto relative shadow-2xl overflow-hidden mt-8">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
                
                <h4 className="text-xl md:text-2xl font-display font-semibold mb-3 text-amber-300">
                  Sua Reconexão Não Para Por Aqui.
                </h4>
                <p className="text-indigo-200 text-sm leading-relaxed mb-6 max-w-md mx-auto">
                  Este ritual e leitura são apenas um vislumbre do alinhamento celestial. Ao garantir seu acesso hoje ao <strong>Portal dos Anjos</strong>, você receberá áudios nas frequências exatas dos Arcanjos, decretos secretos de prosperidade e blindagem espiritual para a sua vida financeira e emocional.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={onBuyClick}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all btn-pulsate cursor-pointer text-sm"
                  >
                    Ativar Portal Completo por R$ 24,90
                  </button>
                  <button
                    onClick={() => {
                      setName("");
                      setBirthdate("");
                      setResult(null);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-200 transition underline tracking-wider"
                  >
                    Fazer Nova Consulta
                  </button>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
