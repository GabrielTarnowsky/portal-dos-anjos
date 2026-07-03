export interface AngelReading {
  angelName: string;
  angelTitle: string;
  color: string;
  stone: string;
  message: string;
  ritual: string;
}

export interface DailyOracle {
  focus: string;
  message: string;
  affirmation: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  status: string; // e.g. "Aluna de São Paulo", "Online"
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProductModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // Lucide icon name
  duration: string;
  contents: string[];
}
