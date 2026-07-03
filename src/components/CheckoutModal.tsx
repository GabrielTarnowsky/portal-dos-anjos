import React, { useState } from "react";
import { X, Shield, Lock, CreditCard, Landmark, CheckCircle, Copy, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [step, setStep] = useState<"details" | "pay" | "success">("details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const pixKey = "00020126580014BR.GOV.BCB.PIX0136e7f577b1-0538-42a7-bc0e-50fd8811655e520400005303986540524.905802BR5916Portal dos Anjos6009SAO PAULO62070503***6304D1B9";

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setStep("pay");
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    }, 2000);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative overflow-hidden border border-amber-100 z-10 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-indigo-50/30">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-semibold text-slate-900 text-sm md:text-base">Checkout Seguro</h3>
              <p className="text-xs text-slate-500 font-mono">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Warning notification about simulation */}
        <div className="bg-amber-50 border-b border-amber-100 p-3 flex items-center gap-2.5 text-amber-800 text-[11px] font-medium leading-normal">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <p>
            <strong>MODO DE SIMULAÇÃO:</strong> Este checkout é seguro e totalmente fictício. Nenhum dinheiro real será cobrado. Use dados falsos se preferir para testar e destravar a Área de Membros.
          </p>
        </div>

        {/* Body scroll area */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === "details" && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
                <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                  <span>Produto:</span>
                  <span className="font-medium text-slate-700">Acesso Portal dos Anjos (Completo)</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-800">Total:</span>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through mr-1.5">R$ 97,00</span>
                    <span className="font-bold text-emerald-600">R$ 24,90</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">Nome Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Seu Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">E-mail para Acesso</label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600">CPF (Opcional na Simulação)</label>
                <input
                  type="text"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition text-sm cursor-pointer mt-4"
              >
                Ir para o Pagamento
              </button>
            </form>
          )}

          {step === "pay" && (
            <div className="space-y-6">
              {/* Selector */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setPaymentMethod("pix")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${paymentMethod === "pix" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <Landmark className="w-4 h-4 text-emerald-500" />
                  Pagar via PIX
                </button>
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${paymentMethod === "card" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-500" />
                  Cartão de Crédito
                </button>
              </div>

              {paymentMethod === "pix" ? (
                <div className="text-center space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl inline-block border border-slate-100">
                    {/* Simulated elegant static QR code */}
                    <div className="w-36 h-36 bg-slate-100 flex items-center justify-center border-4 border-white shadow-inner relative mx-auto">
                      {/* Generates a simple beautiful QR code block */}
                      <div className="grid grid-cols-5 gap-1.5 p-2 w-full h-full opacity-85">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-sm ${(i * 7 + 13) % 3 === 0 || i % 6 === 0 || i < 5 || i % 5 === 0 ? "bg-slate-900" : "bg-transparent"}`} 
                          />
                        ))}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">PIX</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Escaneie o QR Code acima no app do seu banco ou copie o código Pix abaixo para simular a compra do Portal.
                    </p>
                    
                    <button
                      onClick={handleCopyPix}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 font-semibold border border-amber-200/50 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedPix ? "Copiado!" : "Copiar Código Pix"}
                    </button>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Aprovando Pagamento de Simulação...
                      </>
                    ) : (
                      "Simular Confirmação de Pagamento PIX"
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs space-y-1 text-slate-500">
                    <p>💡 <strong>Dica:</strong> Pode preencher qualquer número fictício (ex: 4242 4242...) para simular.</p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">Validade</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-indigo-500/15 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processando Cartão...
                      </>
                    ) : (
                      "Confirmar Simulação de Pagamento"
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-lg">Acesso Liberado!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  A simulação foi concluída com sucesso. Destravando a Área de Membros oficial do Portal dos Anjos na sua tela...
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5 font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>CRIPTOGRAFIA SSL 256 BITS</span>
          </div>
          <div>COMPRA 100% GARANTIDA</div>
        </div>
      </div>
    </div>
  );
}
