import { dodopayments } from "@/lib/dodo-payments"
import { NextResponse } from "next/server";

export const GET =async()=>{


    const products=await dodopayments.products.list();
    return NextResponse.json(products.items);
    

}