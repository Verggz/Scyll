import { DailyBazaarDocument } from "./DailyBazaarItem.interface";

export interface WeeklyBazaarDocument{
    id:string;
    name: string;

    monthnum: number;
    weeknum:number;

    days: DailyBazaarDocument[];


}