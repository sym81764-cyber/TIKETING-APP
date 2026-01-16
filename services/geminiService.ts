
import { GoogleGenAI, Type } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not defined");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getSmartRecommendations = async (interests: string[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggère 3 descriptions de concerts fictifs pour quelqu'un intéressé par : ${interests.join(', ')}. Réponds en français. Retourne un tableau JSON d'objets avec artistName, venue, date, et hypeDescription.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              artistName: { type: Type.STRING },
              venue: { type: Type.STRING },
              date: { type: Type.STRING },
              hypeDescription: { type: Type.STRING }
            },
            required: ['artistName', 'venue', 'date', 'hypeDescription']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getArtistNews = async (artist: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Génère une mise à jour réaliste pour les réseaux sociaux pour un musicien nommé ${artist}. Le ton doit être celui d'une tournée ou d'une sortie d'album. Réponds exclusivement en français.`,
    });
    return response.text || "Un grand projet arrive bientôt ! Restez connectés.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "En tournée actuellement ! Revenez pour plus d'infos.";
  }
};

export const getFriendVibeSummary = async (name: string, genres: string[]) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Crée un résumé court et stylé de la "Vibe Musicale" pour une personne nommée ${name} dont les genres préférés sont ${genres.join(', ')}. Maximum une phrase. Réponds en français.`,
    });
    return response.text || `${name} vit pour la musique.`;
  } catch (error) {
    console.error("Gemini Error:", error);
    return `${name} est à fond dans les vibrations ${genres[0]}.`;
  }
};
