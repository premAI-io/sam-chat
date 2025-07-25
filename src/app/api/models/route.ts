import { NextResponse } from 'next/server';
import PremAI from '@premai/premai';
import { createApiError } from '../../../types/errors';

export async function GET() {
  try {
    if (!process.env.PREMAI_API_KEY || process.env.PREMAI_API_KEY === 'your_api_key_here') {
      return NextResponse.json({ error: 'PremAI API key not configured' }, { status: 500 });
    }

    const client = new PremAI({
      apiKey: process.env.PREMAI_API_KEY,
    });

    const response = await client.models.list();
    
    // Filter for fine-tuned models only
    const fineTunedModels = response.data.filter(model => 
     
      model.owned_by !== 'premai'
    );

    // Format models for frontend
    const formattedModels = fineTunedModels.map(model => ({
      id: model.id,
      name: model.id.replace('ft-', '').replace('-', ' ').toUpperCase() + ' (Fine-tuned)',
      created: model.created ? new Date(model.created * 1000).toLocaleDateString() : null
    }));

    return NextResponse.json({ models: formattedModels });

  } catch (error: unknown) {
    const apiError = createApiError(error, 'Failed to fetch models');
    console.error('Models API error:', apiError);
    return NextResponse.json({ 
      error: 'Failed to fetch models',
      details: apiError.message
    }, { status: 500 });
  }
} 