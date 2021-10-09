import { AucItem } from "./AucItem.interface";

export interface AuctionHouse{
    lastupdates: number;
    auctions:AucItem[];
}