import { GoogleGenAI } from "@google/genai";

export const askMaqamExpert = async (question: string): Promise<string> => {
  // Inisialisasi AI dipindahkan ke sini untuk mencegah crash saat pemuatan awal.
  // Ini memastikan API Key hanya diakses saat fungsi ini dipanggil.
  const apiKey = process.env.API_KEY || '';
  if (!apiKey) {
    return "Maaf, API Key belum dikonfigurasi. Silakan hubungi administrator.";
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `Anda adalah pakar ahli dalam seni Tilawah Al-Quran dan Maqam (Nagham). 
        Tugas anda adalah menjelaskan tentang 7 Maqam (Bayati, Shoba, Hijaz, Nahawand, Rast, Sika, Jiharkah) kepada pengguna yang bertanya.
        Berikan jawaban yang sopan, edukatif, dan bernuansa Islami. 
        Gunakan Bahasa Indonesia yang baik.
        Jika pengguna bertanya tentang teknik vokal atau tajwid, berikan saran singkat.`,
        temperature: 0.7,
      }
    });

    return response.text || "Maaf, saya tidak dapat memproses pertanyaan saat ini.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi kesalahan saat menghubungi asisten AI.";
  }
};