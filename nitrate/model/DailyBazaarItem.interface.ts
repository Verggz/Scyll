import { Timestamp } from "@google-cloud/firestore";

export interface DailyBazaarDocument{
    id:string;
    name: string;
    date: string;
    weeknum: number;

    buyorderprice: number;
    sellofferprice: number;
    amountofsales: number;
    amountofbuys: number;

    timestamp:Timestamp;

    
}