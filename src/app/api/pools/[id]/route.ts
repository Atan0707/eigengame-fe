import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const GRAPH_API_KEY = "12589ca3ff518e5b28c67803618255c9";
const GRAPH_API_URL = "https://gateway.thegraph.com/api/" + GRAPH_API_KEY + "/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const poolId = resolvedParams.id.toLowerCase();

    const query = `
    {
      pool(id: "${poolId}") {
        id
        token0 {
          id
          symbol
          name
          decimals
        }
        token1 {
          id
          symbol
          name
          decimals
        }
        feeTier
        liquidity
        sqrtPrice
        tick
        totalValueLockedUSD
        volumeUSD
      }
    }
    `;

    const response = await fetch(GRAPH_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    if (!data.data.pool) {
      return NextResponse.json({
        success: false,
        error: 'Pool not found',
        timestamp: new Date().toISOString(),
      }, {
        status: 404,
        headers: corsHeaders,
      });
    }

    return NextResponse.json({
      success: true,
      data: data.data.pool,
      timestamp: new Date().toISOString(),
    }, {
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch data',
      timestamp: new Date().toISOString(),
    }, {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
} 