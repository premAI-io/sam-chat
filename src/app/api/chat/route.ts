import { NextRequest, NextResponse } from 'next/server';
import PremAI from '@premai/premai';
import { createApiError } from '../../../types/errors';

export async function POST(request: NextRequest) {
  try {
    const { message, model } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!model) {
      return NextResponse.json({ error: 'Model selection is required' }, { status: 400 });
    }

    if (!process.env.PREMAI_API_KEY || process.env.PREMAI_API_KEY === 'your_api_key_here') {
      return NextResponse.json({ error: 'PremAI API key not configured' }, { status: 500 });
    }

    const client = new PremAI({
      apiKey: process.env.PREMAI_API_KEY,
    });

    const response = await client.chat.completions({
      messages: [{ role: 'user', content: message }],
      model: model
    });

    const reply = response.choices[0].message.content;
    return NextResponse.json({ reply });

  } catch (error: unknown) {
    const apiError = createApiError(error, 'Failed to get response from AI');
    console.error('Chat API error:', apiError);
    return NextResponse.json({ 
      error: 'Failed to get response from AI',
      details: apiError.message
    }, { status: 500 });
  }
} 