import { dodopayments } from '@/lib/dodo-payments';
import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

const validator = z.object({
  email: z.string().email(),
  productId: z.string(),
});

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const parser = validator.safeParse(body);

  if (!parser.success) {
    return NextResponse.json(parser.error, { status: 400 });
  }

  const { email, productId } = parser.data;

  try {
    const payment = await dodopayments.payments.create({
      billing: { city: '', country: 'KZ', state: '', street: '', zipcode: '' },
      customer: { email, name: '' },
      payment_link: true,
      return_url: process.env.DODO_PAYMENTS_RETURN_KEY!,
      product_cart: [{ product_id: productId, quantity: 1 }],
    });

    return NextResponse.json(payment, { status: 200 });
  } catch (e) {
    const dodopaymentsError = e as ApiError;
    return NextResponse.json(
      { message: dodopaymentsError.message }
      // { status: dodopaymentsError.status }
    );
  }
};
