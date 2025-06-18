import OpenAI from "openai";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const propertyAIChat = asyncHandler(async (req, res) => {
  const { property, question } = req.body;

  if (!property || !question) {
    throw new ApiError(400, "Property and question are required");
  }

  const prompt = `
  Property Title: ${property.title}
  Location: ${property.location}
  Price: ₹${property.price}
  Description: ${property.description || "N/A"}

  User asked: "${question}"

  Respond with helpful, friendly, property-related info.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = response.choices[0].message.content.trim();

    res.status(200).json({ success: true, answer });
  } catch (error) {
    console.warn("OpenAI error:", error.message);

    // ✅ Fallback if OpenAI fails (quota exceeded or others)
    const mockAnswer = "We're currently unable to process your request. Please call or message the property seller directly for urgent queries.";
    res.status(200).json({ success: true, answer: mockAnswer });
  }
});
