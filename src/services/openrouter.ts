import { PoolData } from "@/components/PoolDataCard";

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function getAISummary(poolData: PoolData[]) {
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000', // Replace with your site
        'X-Title': 'Pool Analysis App'
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-distill-llama-70b:free",
        messages: [{
          role: "user",
          content: `Analyze this liquidity pool data and provide a concise summary of key insights, trends, and notable patterns. Focus on TVL, volume, and significant token pairs: ${JSON.stringify(poolData)}`
        }]
      })
    });

    const data = await response.json();
    
    // Add error handling for API response
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    // Check if response has the expected structure
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Unexpected API response format');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('AI Summary Error:', error);
    throw error; // Propagate error to component for proper handling
  }
} 