import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeUrl = async (url: string): Promise<ScanResult> => {
  const modelId = "gemini-2.5-flash";

  const prompt = `
    تحليل أمني للرابط التالي: "${url}"
    
    قم بدور خبير في الأمن السيبراني. حلل الرابط بحثاً عن علامات التصيد الاحتيالي (Phishing)، والاحتيال، والبرمجيات الخبيثة.
    ابحث عن:
    1. Typosquatting (انتحال أسماء النطاقات المشهورة بأخطاء إملائية).
    2. نطاقات عليا (TLDs) مشبوهة.
    3. استخدام نطاقات فرعية مضللة.
    4. استخدام عناوين IP بدلاً من النطاقات.
    5. علامات التمويه في الرابط.
    
    النتيجة يجب أن تكون دقيقة ومبنية على تحليل هيكلي للرابط ومعرفتك العامة بالنطاقات الموثوقة.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskScore: {
            type: Type.INTEGER,
            description: "Risk score from 0 (Safe) to 100 (Extremely Dangerous)",
          },
          verdict: {
            type: Type.STRING,
            enum: ["آمن", "مشبوه", "خبيث"],
            description: "The final verdict in Arabic",
          },
          summary: {
            type: Type.STRING,
            description: "A short summary of the analysis in Arabic (one sentence)",
          },
          details: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of specific reasons for the verdict in Arabic",
          },
          recommendation: {
            type: Type.STRING,
            description: "Actionable advice for the user in Arabic",
          },
        },
        required: ["riskScore", "verdict", "summary", "details", "recommendation"],
      },
    },
  });

  if (response.text) {
    const data = JSON.parse(response.text);
    return {
      ...data,
      url,
    };
  }

  throw new Error("فشل في تحليل الرابط");
};