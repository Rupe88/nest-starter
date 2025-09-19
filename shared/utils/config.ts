export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// When creating a payment intent/session
const returnUrl = `${BASE_URL}/checkout/success`;
