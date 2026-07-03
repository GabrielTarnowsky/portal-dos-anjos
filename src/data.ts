import { Testimonial, FAQItem, ProductModule } from "./types";

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Preciso ter alguma crença específica pra isso funcionar?",
    answer: "Não. O Portal dos Anjos foi feito para qualquer pessoa que busca mais paz, proteção e prosperidade na vida, independente de religião ou crença específica. As energias celestes e os arquétipos angelicais são universais e representam amor, abundância e sabedoria."
  },
  {
    id: "faq-2",
    question: "Como recebo o acesso?",
    answer: "Como este é um ambiente interativo completo, você receberá acesso imediato à Área de Membros diretamente aqui nesta página logo após simular a sua compra! Na vida real, o acesso com os materiais em áudio e manuais em PDF é enviado de imediato por e-mail."
  },
  {
    id: "faq-3",
    question: "E se eu não gostar?",
    answer: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo sentir que o Portal dos Anjos não fez sentido para a sua jornada, basta solicitar o reembolso que devolvemos 100% do seu investimento, sem perguntas."
  },
  {
    id: "faq-4",
    question: "Quais são os materiais inclusos no Portal?",
    answer: "O portal inclui o Manual Completo do Portal dos Anjos, rituais ancestralizados para atração de prosperidade, invocações diárias de proteção, e as Frequências Angelicais Ativadoras (áudios de meditação guiada e ondas de cura em 432Hz e 528Hz)."
  },
  {
    id: "faq-5",
    question: "A compra é segura?",
    answer: "Sim. A transação é realizada em um ambiente 100% criptografado e seguro, garantindo a proteção total dos seus dados."
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "test-1",
    name: "Mariana Souza",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    message: "Gente, estou chocada com o que aconteceu! Fiz a sintonização do Portal na segunda e hoje recebi um PIX inesperado de uma comissão de 6 meses atrás que eu já achava perdida! Sinto uma paz tão grande no meu quarto agora.",
    time: "Hoje, 09:42",
    status: "Aluna - São Paulo"
  },
  {
    id: "test-2",
    name: "Carlos Eduardo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    message: "Sempre fui um pouco cético, mas estava muito ansioso no trabalho. O áudio de frequência angelical com fone de ouvido salvou minhas noites. Durmo como um anjo e os caminhos financeiros parecem estar fluindo mais leves.",
    time: "Ontem, 18:15",
    status: "Aluno - Rio de Janeiro"
  },
  {
    id: "test-3",
    name: "Beatriz Nogueira",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    message: "Fiz o oráculo do meu anjo e a leitura foi certeira demais pra minha decisão profissional! Senti uma segurança que há tempos não sentia. Recomendo de olhos fechados, o valor de R$24,90 é simbólico pelo bem que traz.",
    time: "Ontem, 11:30",
    status: "Aluna - Belo Horizonte"
  }
];

export const PRODUCT_MODULES: ProductModule[] = [
  {
    id: "mod-1",
    title: "Módulo I: O Alinhamento Ancestral",
    subtitle: "Reconexão e Desbloqueio",
    description: "Entenda as bases espirituais das frequências angelicais e como dissolver bloqueios emocionais inconscientes que barram a sua felicidade e prosperidade.",
    icon: "Compass",
    duration: "4 aulas - 45 min totais",
    contents: [
      "A ciência das frequências e o plano angelical",
      "Identificando e limpando travas financeiras herdadas",
      "Como calibrar sua energia para atrair oportunidades",
      "Meditação guiada de abertura de caminhos"
    ]
  },
  {
    id: "mod-2",
    title: "Módulo II: O Ritual da Prosperidade",
    subtitle: "Atração e Abundância",
    description: "Aprenda rituais ancestrais simples utilizando elementos cotidianos para sintonizar a frequência do Arcanjo Uriel, atraindo caminhos profissionais e financeiros fartos.",
    icon: "Coins",
    duration: "5 aulas - 60 min totais",
    contents: [
      "Os segredos materiais e espirituais da abundância",
      "O Ritual de 3 dias do Arcanjo Uriel",
      "Criação do seu altar ou âncora de prosperidade",
      "Decreto diário para ativar ganhos inesperados"
    ]
  },
  {
    id: "mod-3",
    title: "Módulo III: Escudo de Luz e Proteção",
    subtitle: "Segurança e Paz Diária",
    description: "Métodos práticos de blindagem energética para o seu lar, sua mente e sua família. Sinta o amparo constante do Arcanjo Miguel e neutralize inveja ou discórdia.",
    icon: "Shield",
    duration: "4 aulas - 40 min totais",
    contents: [
      "O Escudo de Luz Azul do Arcanjo Miguel",
      "Como limpar energeticamente sua casa de influências densas",
      "Sintonização de proteção contra inveja e ataques psíquicos",
      "Decreto noturno para um sono regenerador livre de pesadelos"
    ]
  },
  {
    id: "mod-4",
    title: "Bônus: Frequências Angelicais Ativadoras",
    subtitle: "Solfeggio & Conexão Harmônica",
    description: "Áudios em alta definição combinando ondas solfeggio (432Hz e 528Hz) com visualizações conduzidas para induzir estados alfa, propiciando paz imediata e sonhos lúcidos.",
    icon: "Music",
    duration: "6 faixas de áudio premium",
    contents: [
      "Frequência da Cura Emocional (432Hz)",
      "Ativação do DNA e Milagres (528Hz)",
      "Conexão Angélica Profunda (963Hz)",
      "Paz Mental e Alívio da Ansiedade imediato"
    ]
  }
];
