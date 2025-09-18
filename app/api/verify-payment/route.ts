import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get('paymentId');

    console.log('🔍 API called with paymentId:', paymentId);

    if (!paymentId) {
      console.log('❌ Missing paymentId parameter');
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 });
    }

    // Environment variables
    const DODO_API_BASE_URL = process.env.DODO_API_BASE_URL;
    const DODO_API_KEY = process.env.DODO_PAYMENTS_API_KEY;

    console.log('🔑 Environment check:', {
      hasBaseUrl: !!DODO_API_BASE_URL,
      hasApiKey: !!DODO_API_KEY,
      baseUrl: DODO_API_BASE_URL || 'MISSING',
    });

    if (!DODO_API_BASE_URL || !DODO_API_KEY) {
      console.error('❌ Missing Dodo Payments environment variables');
      console.error(
        'DODO_API_BASE_URL:',
        DODO_API_BASE_URL ? 'SET' : 'MISSING'
      );
      console.error('DODO_PAYMENTS_API_KEY:', DODO_API_KEY ? 'SET' : 'MISSING');

      return NextResponse.json(
        {
          error: 'Server misconfiguration: missing environment variables',
          debug: {
            hasBaseUrl: !!DODO_API_BASE_URL,
            hasApiKey: !!DODO_API_KEY,
          },
        },
        { status: 500 }
      );
    }

    // Try multiple possible endpoints
    const possibleUrls = [
      `${DODO_API_BASE_URL}/v1/payments/${paymentId}`,
      `${DODO_API_BASE_URL}/payments/${paymentId}`,
      `${DODO_API_BASE_URL}/v2/payments/${paymentId}`,
    ];

    // Also try production if currently using test
    if (DODO_API_BASE_URL.includes('test')) {
      const prodUrl = DODO_API_BASE_URL.replace('test.', '');
      possibleUrls.push(
        `${prodUrl}/v1/payments/${paymentId}`,
        `${prodUrl}/payments/${paymentId}`,
        `${prodUrl}/v2/payments/${paymentId}`
      );
    }

    console.log('🔗 Trying Dodo payment endpoints for:', paymentId);
    console.log('📋 Environment:', DODO_API_BASE_URL);

    for (const url of possibleUrls) {
      try {
        console.log(`🔍 Trying: ${url}`);

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${DODO_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        const text = await res.text();
        let data: any;

        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }

        console.log(
          `📊 Response [${res.status}]:`,
          JSON.stringify(data).substring(0, 200)
        );

        if (res.ok) {
          // Found the payment!
          console.log('✅ Payment found at:', url);

          if (data.status === 'succeeded') {
            return NextResponse.json({
              status: 'succeeded',
              raw: data,
              foundAt: url,
            });
          }

          return NextResponse.json({
            status: data.status,
            raw: data,
            foundAt: url,
          });
        }

        // Log 404s but continue trying
        if (res.status === 404) {
          console.log(`❌ 404 at: ${url}`);
          continue;
        }

        // For other errors, log and continue
        console.error(`❌ Error ${res.status} at ${url}:`, data);
      } catch (err: any) {
        console.error(`❌ Fetch error for ${url}:`, err.message);
        continue;
      }
    }

    // If we get here, none of the URLs worked
    console.log('❌ Payment not found at any endpoint');
    return NextResponse.json(
      {
        error: 'Payment not found at any endpoint',
        paymentId,
        triedUrls: possibleUrls,
        suggestion: 'Check if payment ID exists in the correct environment',
      },
      { status: 404 }
    );
  } catch (globalError: any) {
    // Catch any unexpected errors
    console.error('❌ Unexpected error in verify-payment API:', globalError);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: globalError.message,
        stack:
          process.env.NODE_ENV === 'development'
            ? globalError.stack
            : undefined,
      },
      { status: 500 }
    );
  }
}
