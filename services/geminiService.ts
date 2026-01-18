
import { GoogleGenAI, Type } from "@google/genai";
import { DirectionData, RoomType, VastuRemedy } from '../types';

export const getVastuRemedy = async (
  direction: DirectionData,
  room: RoomType
): Promise<VastuRemedy> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze the Vastu compliance of placing a ${room.label} in the ${direction.fullName} direction. 
  The direction significance is: ${direction.significance}.
  
  Provide:
  1. A compatibility score out of 100.
  2. A brief assessment of why this is or isn't ideal.
  3. 3-4 specific remedies if the placement is bad, or enhancement tips if it's good.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            assessment: { type: Type.STRING },
            remedies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "assessment", "remedies"]
        }
      }
    });

    const text = response.text.trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Vastu analysis error:", error);
    return {
      score: 50,
      assessment: "Analysis temporarily unavailable. Traditionally, Vastu placement depends on specific elemental balances.",
      remedies: ["Consult a Vastu expert.", "Ensure natural light flow.", "Keep the area clean."]
    };
  }
};
