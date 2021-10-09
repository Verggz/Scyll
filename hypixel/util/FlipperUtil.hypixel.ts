import { Item } from "../model/Item.interface";
import slothpixel from "phoenix-slothpixel";
import axios from "axios";
import { AucItem } from "../model/AucItem.interface";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { ItemlUtil } from "./ItemUtil.hypixel";
import { AuctionUtil } from "./AuctionUtil.hypixel";

export class FlipperUtil{
    public static makingrequest: boolean = false;

    public static async GetLowestPriceOfItem(item: Item){
        if(item.id == "NONE"){
            return undefined;
        }
        //console.log("item id",item.numid)
        //var res = await axios.get("https://api.slothpixel.me/api/skyblock/auctions/" +item.numid)
        var items : AucItem[] | undefined = await FlipperUtil.GetAllBINListingsOfItem(item);
        
        if(items !== undefined){
            
            if(items.length == 0){
                return {"item":item.name,"amount":1};
            }
            items = items.sort((a, b): number =>{
                if(a.price < b.price){
                    return -1;
                }else if(a.price > b.price){
                    return 1;
                }else{
                    return 0;
                }
            });
            var lowest : number = 0;

           return{"item":item.name,"amount":items[0].price};
        }else{
            return undefined;
        }
    }

    public static async GetLowestPriceOfDungeonItem(item: Item,amountOfStars: number){
        if(item.id == "NONE"){
            return undefined;
        }
        var items : AucItem[] | undefined = await FlipperUtil.GetAllBINListingsOfItem(item);
       
        if(item.dungeonItem == true){
            if(items !== undefined){
                var lowest: number = 0;
                items = items.sort((a, b): number =>{
                   if(a.price < b.price){
                       return -1;
                   }else if(a.price > b.price){
                       return 1;
                   }else{
                       return 0;
                   }
               });
               //console.log(items);
               if(items.length == 0){
                return {"item":item.name,"amount":1};
            }
               

               for(var i = 0; i < items.length; i++){
                
                    if(items[i].item.match(new RegExp("✪","g") || [])?.length as number == amountOfStars){
                        //console.log(items[i]);
                        if(items[i].bin == true){
                            lowest = items[i].price;
                            break;
                            
                        }

                    }else if(items[i].item.match(new RegExp("✪","g") || [])?.length as number == undefined && amountOfStars == 0){
                        if(items[i].bin == true){
                            
                            lowest = items[i].price;
                            break;
                        }

                    }
               }

               return {"item":`${item.name}${"✪".repeat(amountOfStars)}`,amount:lowest};

               
    
            }else{
                return undefined;
            }
        }else{

        }
            

    }


    public static async GetAveragePriceOfDungeonItem(item: Item,amountOfStars: number): Promise<{item:string,amount:number} | undefined>{
            if(item.id == "NONE"){
                return undefined;
            }
            var items : AucItem[] | undefined = await FlipperUtil.GetAllBINListingsOfItem(item);
            
            
            if(items !== undefined){
                var averagePrice : number = 0;
                items = items.sort((a, b): number =>{
                   if(a.price < b.price){
                       return -1;
                   }else if(a.price > b.price){
                       return 1;
                   }else{
                       return 0;
                   }
               });
               
                var amount: number = 0;

                for(var i = 0; i < items.length; i++){
                   
                    //console.log("Item: ",items[i].item)
                    if(items[i].item.match(new RegExp("✪","g") || [])?.length as number == amountOfStars){
                        if(items[i].bin == true){
                            amount++;
                        }
                        
                    }else if(items[i].item.match(new RegExp("✪","g") || [])?.length as number == undefined && amountOfStars == 0){
                        if(items[i].bin == true){
                            amount++;
                        }
                        
                    }
                    
                }
                

                if(amount < 10){
                    for(var i = 0; i < amount; i++){
                        averagePrice += items[i].price;
                    }
                    
                    return{"item":`${item.name}${"✪".repeat(amountOfStars)}`,amount: Math.round(averagePrice / amount)};
                    
                }else{
                    for(var i = 0; i < 10; i++){
                        averagePrice += items[i].price;
                    }
                    
                    return{"item":`${item.name}${"✪".repeat(amountOfStars)}`,amount: Math.round(averagePrice / 10)};
                }
                
                
                
            }else{
                return undefined;
            }
    }
    //Get's average price of first 5 items
    public static async GetAveragePriceOfItem(item: Item): Promise<{item:string,amount:number}| undefined>{
        if(item.id == "NONE"){
            return undefined;
        }
        //console.log("item id",item.numid)
        //var res = await axios.get("https://api.slothpixel.me/api/skyblock/auctions/" +item.numid)
        var items : AucItem[] | undefined = await FlipperUtil.GetAllBINListingsOfItem(item);
        
        if(items !== undefined){
            if(items.length == 0){
                return {"item":item.name,"amount":1};
            }
            var averagePrice : number = 0;
           items = items.sort((a, b): number =>{
               if(a.price < b.price){
                   return -1;
               }else if(a.price > b.price){
                   return 1;
               }else{
                   return 0;
               }
           });
           

           if(items.length < 10){
                for(var i = 0; i < items.length; i++){
                    if(items[i].bin == true){
                        averagePrice += items[i].price;
                    }
                   
                }
                return{item:item.name, amount:Math.round(averagePrice / items.length)}
                
           }else{
               
                for(var i = 0; i < 10; i++){
                    if(items[i].bin == true){
                        averagePrice += items[i].price;
                    }
                }
                
                return{item: item.name,amount: Math.round(averagePrice / 10)};
           }
                
            }else{
                return undefined;
            }

            //FlipperUtil.GetAllPriceItems(item);
            //console.log("average price",averageprice);
        

    }

    public static async GetAveragePriceOfItemWithoutAPICall(items:AucItem[]): Promise<number | undefined>{
        if(items !== undefined){
            var averagePrice : number = 0;
           items = items.sort((a, b): number =>{
               if(a.price < b.price){
                   return -1;
               }else if(a.price > b.price){
                   return 1;
               }else{
                   return 0;
               }
           });

           if(items.length < 5){
                for(var i = 0; i < items.length; i++){
                    if(items[i].bin == true){
                        averagePrice += items[i].price;
                    }
                   
                }
                
                return Math.round(averagePrice / items.length)
                
           }else{
                for(var i = 0; i < 5; i++){
                    if(items[i].bin == true){
                        averagePrice += items[i].price;
                    }
                }
                
                return Math.round(averagePrice / 5);
           }
                
            }else{
                return undefined;
            }
    }


    public static async GetAllBINListingsOfItem(item: Item): Promise<AucItem[] | undefined>{
        if(!FlipperUtil.makingrequest){
            var page = await axios.get("https://api.hypixel.net/skyblock/auctions?page=0");
            var allPages: Promise<any>[] = [];
           //console.log(page.data.auctions[10]);
           
           for(var i = 0; i < page.data.totalPages - 1; i++){
               allPages.push(AuctionUtil.KeepIndex(i).then(index =>{
                return axios.get(`https://api.hypixel.net/skyblock/auctions?page=${index}`).then(res =>{
                    var allAucItems : AucItem[]= [];
                    
                    for(var j = 0; j < res.data.auctions.length; j++){
                        if(res.data.auctions[j].item_name.toLowerCase().includes(item.name.toLowerCase()) && res.data.auctions[j].bin == true){
                            allAucItems.push({"aucid":res.data.auctions[j].uuid,"item":res.data.auctions[j].item_name,"price":res.data.auctions[j].starting_bid,"time":res.data.auctions[j].end  - Date.now(),"bin":res.data.auctions[j].bin,"lore":res.data.auctions[j].item_lore,"bids":res.data.auctions[j].bids,"item_bytes":res.data.auctions[j].item_bytes,"start":res.data.auctions[j].start,"end":res.data.auctions[j].end});
                        }
                    }
                    
                    return allAucItems;
                })
               }));
                

                
           }

           

          
           return Promise.all(allPages).then((data: AucItem[][]) =>{
            //FlipperUtil.makingrequest = false;
            var end = Date.now();
            var allactiveItems : AucItem[] = [];

            if(data !== []){
                for(var i = 0; i < data.length; i++){
                    if(data[i].length != 0){
                        for(var j = 0; j < data[i].length; j++){
                            allactiveItems.push({"item":data[i][j].item,"aucid":data[i][j].aucid,"price":data[i][j].price,"bin":data[i][j].bin,"time":data[i][j].time,"lore":data[i][j].lore,"bids":data[i][j].bids,"item_bytes":data[i][j].item_bytes,"start":data[i][j].start,"end":data[i][j].end});
                        }
                        
                        
                    }
                }
                
                return allactiveItems;
            }else{
                return undefined;
            }
            
           });
            //console.log(res);
            
        }else{
            console.log("still making request");
            return undefined;
        }

       
    }

    public static async GetLowestPriceOfItemWithoutAPICall(ah: AucItem[],item:Item){
        ah = ah.sort((a, b): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });


        for(var i = 0; i < ah.length; i++){
            if(ah[i].item.includes(item.name) && ah[i].bin == true){
                return {"item":ah[i].item,"amount":ah[i].price};
            }
        }
    }

    public static async GetLowestPriceOfDungeonItemWithoutAPICall(ah: AucItem[],item:Item,amountOfStars:number){
        
        ah = ah.sort((a, b): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });

        
        

        for(var i = 0; i < ah.length; i++){
            //console.log(ah[i]);
            if(ah[i].item.includes(item.name) && ah[i].bin == true){
                //console.log(ah[i])
                if(ah[i].item.match(new RegExp("✪","g") || [])?.length as number == amountOfStars){
                    
                    return {"item":ah[i].item,"amount":ah[i].price};
                }else if(ah[i].item.match(new RegExp("✪","g") || [])?.length as number == undefined && amountOfStars == 0){
                    return {"item":ah[i].item,"amount":ah[i].price};
                }
            }
        }


    }
    
}