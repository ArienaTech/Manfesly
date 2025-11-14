import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';

if (!apiKey) {
  console.warn('Missing OpenAI API key. Please add VITE_OPENAI_API_KEY to .env file.');
}

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export async function generatePrompt(
  emotionScore: number,
  pastSessions?: Array<{ emotion_score: number; reflection: string }>
): Promise<string> {
  const emotionContext = emotionScore <= 4 
    ? 'feeling low or struggling' 
    : emotionScore <= 7 
    ? 'feeling moderate or neutral'
    : 'feeling positive and energized';

  const pastContext = pastSessions && pastSessions.length > 0
    ? `\n\nRecent patterns: ${pastSessions.slice(0, 3).map(s => 
        `Emotion: ${s.emotion_score}/10, Reflection: "${s.reflection?.substring(0, 100)}"`
      ).join('; ')}`
    : '';

  const systemPrompt = `You are a supportive guide for Manifestly, a neuroscience-based manifestation app. 
Generate a short, powerful reflection prompt (1-2 sentences) that helps users rewire their mind.
The user is currently ${emotionContext}.${pastContext}

Create a prompt that:
- Is compassionate and empowering
- Bridges science and spirituality
- Encourages visualization or reframing
- Feels personal and actionable`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate a reflection prompt for someone feeling ${emotionScore}/10.` }
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    return completion.choices[0]?.message?.content || 
      "Visualize your calmest self today. What would they do differently?";
  } catch (error) {
    console.error('Error generating prompt:', error);
    return "Visualize your calmest self today. What would they do differently?";
  }
}
