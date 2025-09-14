import { DodoPayments } from './../node_modules/dodopayments/src/client';
export const dodopayments=new DodoPayments({
    bearerToken:process.env.DODO_PAYMENTS_API_KEY!,
    environment:"test_mode",

    
});

