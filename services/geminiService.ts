import { GoogleGenAI, Type } from "@google/genai";
import { SmartParseResult } from "../types";
import { PRODUCT_DATABASE } from "../constants";

// Initialize Gemini
// NOTE: API Key is accessed via process.env.API_KEY as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface AiParseResponse {
  items: SmartParseResult[];
  destination?: string | null;
}

export const parseOrderInput = async (text: string, imageBase64?: string | null): Promise<AiParseResponse> => {
  try {
    const validSkus = PRODUCT_DATABASE.map(p => p.sku).join(', ');

    const systemPrompt = `
      You are a logistics assistant. 
      Analyze the user's text or the provided image (e.g., a chat screenshot or shipping list).
      
      Your tasks:
      1. Extract product SKUs and quantities.
      2. Extract the shipping destination (City or Province) if present.

      Product Database SKUs: ${validSkus}.
      
      Rules:
      1. SKUs: Map fuzzy product names to the closest valid SKU. Ignore invalid ones.
      2. Quantities: Convert Chinese numbers (e.g., "十箱") to integers.
      3. Destination: Look for city or province names (e.g., "发往苏州", "收件人地址: 北京市...", "上海"). Extract just the city/province name (e.g., "苏州", "北京"). If none found, return null.
      4. Output: Return a strictly formatted JSON object.
    `;

    const parts: any[] = [];

    // Add Image Part if exists
    if (imageBase64) {
      // Extract base64 data
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      let mimeType = "image/png";
      if (base64Data.startsWith('/9j/')) mimeType = "image/jpeg";

      parts.push({
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      });
    }

    // Add Text Part
    const promptText = text.trim() || "Analyze this image for products, quantities, and destination address.";
    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: parts },
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sku: { type: Type.STRING },
                  quantity: { type: Type.INTEGER }
                },
                required: ["sku", "quantity"]
              }
            },
            destination: {
              type: Type.STRING,
              description: "The extracted destination city or province name, or null if not found.",
              nullable: true
            }
          },
          required: ["items"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AiParseResponse;
    }
    return { items: [] };
  } catch (error) {
    console.error("Gemini parse error:", error);
    throw new Error("AI parsing failed. Please check your API key or input.");
  }
};