// Importují se potřebné balíčky pro inicializaci komunikace s OpenAI
// Co importovat a jak to udělat se samozřejmě by se mělo dát najít v dokumentaci
import { OpenAIApi, Configuration } from "openai";

// Nakonfiguruje se spojení s OpenAI pomocí tajného API klíče uloženého v proměnné, která je dostupná jen pro backend
const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
});

// Exportuje se OpenAI pro použití v jiných souborech
export const openai = new OpenAIApi(configuration);