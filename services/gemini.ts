import { GoogleGenAI } from "@google/genai";

// Lazy initialization to prevent runtime crash if API_KEY is missing during module evaluation
// process.env.API_KEY is injected by Vite's define plugin at build time
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getHistoricalInsight = async (emperorName: string, eraName: string, queryType: 'secret' | 'summary' | 'impact') => {
  const ai = getAiClient();

  if (!ai) {
      console.warn("Gemini API Key is missing");
      return "API Key 未配置。请在部署平台（如 Vercel）的环境变量中设置 API_KEY。";
  }

  const modelId = 'gemini-2.5-flash';

  let prompt = "";
  switch (queryType) {
    case 'secret':
      prompt = `告诉我关于清朝皇帝${emperorName}（${eraName}）的一个鲜为人知的历史趣闻或秘密。请用生动的中文讲述，字数在100字左右。`;
      break;
    case 'summary':
      prompt = `请简要总结清朝皇帝${emperorName}（${eraName}）的执政风格和主要成就。请用专业的历史视角，字数在150字左右。`;
      break;
    case 'impact':
      prompt = `分析${emperorName}（${eraName}）对中国历史进程的关键影响（正面或负面）。字数在100字左右。`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "暂时无法获取历史数据。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "历史卷轴似乎破损了，请稍后再试。（API Error）";
  }
};