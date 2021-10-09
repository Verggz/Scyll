export interface QuickStatus{
    sellprice:number;
    sellvolume:number;

    weeklysales:number;
    dailysales:number;

    sellorders:number;

    
    buyprice:number;
    buyvolume:number;

    weeklybuys:number;
    dailybuys: number;

    buyorders:number;
}

export interface BazaarProduct{
    id:string;
    quickstatus:QuickStatus;
    buysummary: any[];
    sellsummary:any[];
}
