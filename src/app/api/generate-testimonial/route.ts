import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const prompt = `
      Create a client testimonial (maximum 200 words) based on the survey response.

      Important context:
      - The testimonial should be written from the client's perspective
      - For the attribution, if the person is an employee of a company, list their company
      - If they're representing a client, use that client's name instead

      If only basic information is provided (name/company):
      Generate a natural, professional testimonial about the service quality:
      Example: "The service provided was exceptional. Their professional team delivered quality throughout our event. They demonstrated strong expertise and a clear commitment to client satisfaction. Their attention to detail and responsive approach made the entire process smooth and effective." - John Doe, Example Corp

      If detailed information is provided:
      - Lead with overall impression
      - Include 3-4 specific highlights from positive ratings
      - If neutral/negative feedback exists, include one or two key constructive points
      - End with overall satisfaction and future intentions
      
      Keep the tone:
      - Authentic and balanced
      - Professional but conversational
      - Direct and clear
      - Honest while constructive

      No matter how much information is provided, never:
      - Mention lack of information
      - Say unable to generate
      - Create an overly generic corporate response
      - Use placeholder text

      Survey Response:
      ${JSON.stringify(data, null, 2)}

      Format: 
      "[Testimonial]" - [First Name] [Last Name], [Company/Client Name]
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that creates authentic client testimonials about Digital Events' services. Generate testimonials from the client's perspective, whether they're a company employee or representing another client. Focus on specific experiences and feedback while maintaining a natural, conversational tone. Always include the appropriate company or client name in the attribution.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 350,
    });

    const testimonial = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ testimonial });
  } catch (error) {
    console.error("Error generating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to generate testimonial" },
      { status: 500 }
    );
  }
}
