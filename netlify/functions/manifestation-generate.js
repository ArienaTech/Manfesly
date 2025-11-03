const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { desire, userId, uiLanguage } = JSON.parse(event.body || '{}');

    if (!desire || !userId) {
      return { statusCode: 400, headers, body: JSON.stringify({ message: 'Missing required fields' }) };
    }

    const { data: user } = await supabase.from('users').select('*').eq('id', userId).single();

    if (!user || user.soul_gems < 1) {
      return { statusCode: 403, headers, body: JSON.stringify({ message: 'Insufficient Soul Gems', soulGems: 0 }) };
    }

    const language = uiLanguage || "English";

    let systemContent = `You are a master manifestation coach creating personalized affirmations that feel electric with possibility.

INSTRUCTIONS:
1. Use their EXACT desire/language and elevate it
2. Write 4-5 powerful sentences in present tense
3. Make it visceral - they should FEEL it in their body
4. Include specific sensory details about what manifesting this feels like
5. Build from "I am" → "I feel" → "I receive" → "I celebrate"
6. Make it so potent they'll want to screenshot and share it
7. End with something that creates certainty and excitement

Use cinematic, emotionally charged language. Make them feel like their manifestation is not just possible but INEVITABLE. Write completely in ${language}.`;

    if (user.religion) {
      systemContent += `\n\nSPIRITUAL CONTEXT: The person follows ${user.religion}. If it feels natural, incorporate relevant spiritual concepts from their tradition.`;
    }

    const affirmationResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemContent },
        { role: "user", content: `Their desire: "${desire}". Create an affirmation in ${language}.` }
      ],
      max_completion_tokens: 350,
      temperature: 0.9,
    });

    const affirmation = affirmationResponse.choices[0].message.content || "I am worthy of my desires. They flow to me naturally. I embrace my divine potential.";

    await supabase.from('users').update({ soul_gems: user.soul_gems - 1 }).eq('id', userId);
    await supabase.from('messages').insert({ 
      user_id: userId, 
      input: desire, 
      ai_response: affirmation, 
      type: 'affirmation' 
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ affirmation, soulGems: user.soul_gems - 1 }),
    };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ message: 'Error: ' + error.message }) };
  }
};
