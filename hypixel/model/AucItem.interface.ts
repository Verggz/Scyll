import { Item } from "./Item.interface";

export interface AucItem{
    aucid: string;
    lore:string;
    price: number;
    time: number;
    item:string;
    item_bytes: string;
    bin:boolean;
    bids: any[];
    start:Number;
    end:Number;
}