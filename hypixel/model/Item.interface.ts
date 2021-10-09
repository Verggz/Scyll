export interface Item{
    id:string;
    numid: number;
    name: string;
    rarity: string;
    dungeonItem: boolean;
    numberOfStars: number;
    category: string;
    bazaar: boolean | undefined;
    amount: number;
}