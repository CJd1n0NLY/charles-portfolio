"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function uploadAndAnalyzeCertificate(formData: FormData) {
  const title = formData.get("title") as string;
  const issuer = formData.get("issuer") as string;
  const imageUrl = formData.get("imageUrl") as string; 

  let status = "PENDING";
  let notes = "Awaiting vision analysis.";

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }

    // 1. Fetch the image from the URL to send to Gemini
    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = imageResponse.headers.get("content-type") || "image/jpeg";

    // 2. Call Gemini 1.5 Flash (or Pro)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this certificate. Return ONLY a raw JSON object with no markdown formatting. The JSON must have these exact keys: "hasLegibleText" (boolean), "detectedIssuer" (string or null), "detectedRecipient" (string or null), "hasDate" (boolean), "tamperingConcerns" (string or null), "confidenceScore" (number 1-100). Check if the recipient name plausibly matches "Charles Jacob Postrado". Look for visual signs of tampering like inconsistent fonts or artifacts.`,
                },
                {
                  inline_data: { mime_type: mimeType, data: base64Image },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json();
    
    if (!geminiResponse.ok) {
      throw new Error(data.error?.message || "Gemini API call failed");
    }

    // 3. Parse the JSON from the LLM
    const rawText = data.candidates[0].content.parts[0].text;
    const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const analysis = JSON.parse(cleanJson);

    // 4. Determine status based on actual AI response
    const nameMatches = analysis.detectedRecipient && analysis.detectedRecipient.toLowerCase().includes("charles");
    
    if (analysis.hasLegibleText && nameMatches && !analysis.tamperingConcerns) {
      status = "LOOKS_VALID";
      notes = `Verified. Issuer: ${analysis.detectedIssuer}. Confidence: ${analysis.confidenceScore}/100.`;
    } else {
      status = "FLAGGED_FOR_REVIEW";
      notes = `Flagged. Name match: ${nameMatches}. Tampering concerns: ${analysis.tamperingConcerns || "None"}.`;
    }

  } catch (error: any) {
    status = "FLAGGED_FOR_REVIEW";
    notes = `Automated flag: Analysis failed. Error: ${error.message}`;
  }

  await prisma.certificate.create({
    data: {
      title,
      issuer,
      imageUrl,
      reviewStatus: status as any,
      reviewNotes: notes,
    },
  });

  revalidatePath("/admin/certificates");
  revalidatePath("/about");
}