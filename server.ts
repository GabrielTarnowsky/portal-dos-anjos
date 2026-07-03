import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini if key exists
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini API initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize Gemini API:", err);
  }
} else {
  console.log("No GEMINI_API_KEY found. Falling back to local content generators.");
}

// Helper to generate elegant fallback readings if Gemini is unavailable
function getLocalAngelReading(name: string, birthdate: string, focus: string) {
  const angels = [
    { name: "Miguel", title: "O Arcanjo da Proteção e Coragem", color: "Azul-Celeste", stone: "Lápis Lazúli" },
    { name: "Uriel", title: "O Arcanjo da Prosperidade e Sabedoria", color: "Dourado", stone: "Olho de Tigre" },
    { name: "Rafael", title: "O Arcanjo da Cura, Harmonia e Paz", color: "Verde Esmeralda", stone: "Quartzo Verde" },
    { name: "Gabriel", title: "O Arcanjo da Revelação, Clareza e Orientação", color: "Branco Cristalino", stone: "Selena" }
  ];

  // Pick angel based on name length or birth month or focus
  let angel = angels[0];
  const lowercaseFocus = (focus || "").toLowerCase();
  if (lowercaseFocus.includes("prosperidade") || lowercaseFocus.includes("financeiro") || lowercaseFocus.includes("abundância")) {
    angel = angels[1]; // Uriel
  } else if (lowercaseFocus.includes("paz") || lowercaseFocus.includes("cura") || lowercaseFocus.includes("harmonia") || lowercaseFocus.includes("saúde")) {
    angel = angels[2]; // Rafael
  } else if (lowercaseFocus.includes("clareza") || lowercaseFocus.includes("direção") || lowercaseFocus.includes("decisão")) {
    angel = angels[3]; // Gabriel
  } else {
    // Default or random selection based on name
    const charCodeSum = Array.from(name || "").reduce((sum, char) => sum + char.charCodeAt(0), 0);
    angel = angels[charCodeSum % angels.length];
  }

  return {
    angelName: angel.name,
    angelTitle: angel.title,
    stone: angel.stone,
    color: angel.color,
    message: `Olá, ${name}. A vibração angelical que envolve a sua vida neste momento é guiada por ${angel.title}. Com base na sua data de nascimento (${birthdate}), identificamos que a sua energia está passando por um ciclo de alinhamento profundo com o campo da ${focus || "vida"}. 

A presença desse mensageiro de luz em sua jornada indica que você não está só. Nos momentos em que a incerteza parecer grande, feche os olhos e sintonize-se com a chama ${angel.color.toLowerCase()} deste grande guardião. Há um fluxo contínuo de amparo e orientação desenhando-se à sua volta para trazer clareza para os seus próximos passos.

O momento atual pede que você liberte velhas preocupações e permita que a abundância natural do universo o encontre. A proteção espiritual que o envolve agora é um escudo contra energias densas, abrindo portas e suavizando o seu caminhar diário. Confie no processo divino e na sua própria intuição.`,
    ritual: `Para sintonizar com essa energia hoje, acenda uma vela de cor suave (ou mentalize uma luz dourada ao seu redor) e repita três vezes: "Estou seguro, amparado e pronto para receber a abundância que me pertence por direito divino."`
  };
}

// 1. Personalized Angel Reading API Endpoint
app.post("/api/angel-reading", async (req, res) => {
  const { name, birthdate, focus } = req.body;

  if (!name || !birthdate) {
    return res.status(400).json({ error: "Nome e Data de Nascimento são obrigatórios." });
  }

  // If Gemini is initialized, call it!
  if (ai) {
    try {
      const prompt = `Você é o oráculo espiritual oficial do 'Portal dos Anjos'. Escreva uma leitura de Anjo da Guarda personalizada, acolhedora e inspiradora para ${name}, nascido em ${birthdate}, cujo foco principal atual é ${focus || 'alinhamento geral de vida'}.
      
      Por favor, retorne a resposta estritamente no formato JSON usando o seguinte esquema:
      {
        "angelName": "Nome do Arcanjo/Anjo correspondente (ex: Miguel, Uriel, Rafael, Gabriel)",
        "angelTitle": "Título honorífico do anjo (ex: O Arcanjo da Proteção e Força Divina)",
        "color": "Cor ou chama angelical (ex: Azul-Celeste, Dourada, Verde-Esmeralda)",
        "stone": "Cristal associado a esta sintonia (ex: Lápis Lazúli, Olho de Tigre, Citrino)",
        "message": "Uma mensagem canalizada de 3 parágrafos médios direcionada ao usuário. Fale sobre os desafios relacionados ao foco (${focus}), a presença de amparo invisível, a abertura de caminhos e o fluxo de prosperidade e paz.",
        "ritual": "Um ritual simples de 1 a 2 frases para se conectar com esta frequência hoje (ex: visualização criativa, afirmação diária ou entonação)."
      }
      
      Use um tom místico, amoroso, terapêutico e profundamente encorajador em português do Brasil.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "";
      const result = JSON.parse(responseText.trim());
      return res.json(result);
    } catch (error) {
      console.error("Gemini reading error, falling back to local generator:", error);
      // Fallback on error
      const localResult = getLocalAngelReading(name, birthdate, focus);
      return res.json(localResult);
    }
  } else {
    // Generate fallback response
    const localResult = getLocalAngelReading(name, birthdate, focus);
    return res.json(localResult);
  }
});

// 2. Daily Angelic Oracle Endpoint
app.post("/api/daily-oracle", async (req, res) => {
  const { focus } = req.body;

  const themes = ["prosperidade", "proteção", "paz"];
  const selectedFocus = focus || themes[Math.floor(Math.random() * themes.length)];

  if (ai) {
    try {
      const prompt = `Você é o oráculo do 'Portal dos Anjos'. Escreva uma bela e inspiradora mensagem angelical do dia focada em ${selectedFocus}.
      Retorne a resposta estritamente no formato JSON:
      {
        "focus": "${selectedFocus}",
        "message": "A mensagem angelical do dia com 2 parágrafos reconfortantes em português.",
        "affirmation": "Uma afirmação positiva curta em português para o usuário repetir ao longo do dia."
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const result = JSON.parse((response.text || "").trim());
      return res.json(result);
    } catch (error) {
      console.error("Gemini daily oracle error:", error);
    }
  }

  // Fallback daily messages
  const fallbacks: Record<string, { message: string, affirmation: string }> = {
    prosperidade: {
      message: "Hoje, as correntes angelicais de abundância fluem abundantemente em sua direção. Arcanjo Uriel sussurra que a prosperidade espiritual e material se inicia no seu estado interno de gratidão. Ao reconhecer as bênçãos presentes, você abre os portais invisíveis para que mais recursos, conexões e surpresas positivas cheguem ao seu caminho.",
      affirmation: "Eu sou um canal limpo e aberto para a riqueza divina do universo. Tudo de bom vem a mim com facilidade, alegria e glória."
    },
    proteção: {
      message: "Sinta a presença do Arcanjo Miguel e sua milícia celeste ao seu redor hoje. Um escudo impenetrável de luz azul-celeste envolve seu lar, seus projetos e seus entes queridos. Não tema os obstáculos do caminho, pois qualquer energia de discórdia ou limitação é dissolvida antes mesmo de tocar sua jornada.",
      affirmation: "Estou sob a proteção divina do Arcanjo Miguel. Sigo meu caminho com coragem, segurança e absoluta paz de espírito."
    },
    paz: {
      message: "A suave energia de cura do Arcanjo Rafael repousa sobre seu coração neste dia. Deixe que as tensões acumuladas se desfaçam como névoa sob o sol da manhã. Respire profundamente, sabendo que as turbulências da mente são passageiras, mas o oceano de paz que habita sua essência espiritual é eterno.",
      affirmation: "Eu escolho respirar paz, soltar a ansiedade e repousar na certeza de que tudo está cooperando para o meu bem."
    }
  };

  const selectedFallback = fallbacks[selectedFocus] || fallbacks.paz;
  return res.json({
    focus: selectedFocus,
    ...selectedFallback
  });
});

// Setup Vite Dev Server / Static Files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server mounted as middleware.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static files in production mode.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
