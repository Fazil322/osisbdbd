import { GoogleGenAI } from "@google/genai";

/**
 * Generates a summary for a news article using Gemini.
 */
export const generateNewsSummary = async (articleContent: string): Promise<string> => {
  try {
    // Moved initialization inside the function to prevent startup crashes.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following article for a student news feed in one short paragraph: ${articleContent}`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating news summary:", error);
    return "Could not generate summary at this time.";
  }
};


/**
 * Generates a draft response to a student's aspiration.
 */
export const generateAspirationResponse = async (aspirationTitle: string, aspirationContent: string): Promise<string> => {
  const prompt = `
    A student has submitted the following aspiration for the student council (OSIS):
    Title: "${aspirationTitle}"
    Content: "${aspirationContent}"

    As a helpful and professional member of the student council, write a constructive and encouraging initial response.
    Acknowledge the idea, thank the student for their submission, and mention that the council will review it.
    Keep the tone positive and respectful. The response should be in Indonesian.
  `;

  try {
    // Moved initialization inside the function to prevent startup crashes.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating aspiration response:", error);
    return "Terima kasih atas aspirasi Anda. Kami akan segera meninjaunya.";
  }
};