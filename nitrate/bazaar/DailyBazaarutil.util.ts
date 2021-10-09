import dailycollection from '../collection/DailyBazaarCollection.collection';
import weeklycollection from '../collection/WeeklyBazaarCollection.collection';
import fs from 'fs/promises';
import moment from 'moment';
import { DailyBazaarDocument } from '../model/DailyBazaarItem.interface';
import { BazaarUtil } from '../../hypixel/util/BazaarUtil.hypixel';
import axios from 'axios';
import { WeeklyBazaarDocument } from '../model/WeeklyBazaarItem.interface';
import { Timestamp } from '@google-cloud/firestore';

export class DailyBazaarUtil{
    allItemsPromise: Promise<any>;
    allBazaarPromise: Promise<any>;
    constructor(){
        this.allItemsPromise = fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json").then(buffer =>{
            return JSON.parse(buffer.toString());
        });

        this.allBazaarPromise = fs.readFile(__dirname + "/../../../cache/hypixelcache/bazaar.json").then(buffer =>{
            return JSON.parse(buffer.toString());
        });

    }

    static async GetTimestampFromDate(ms: number){
        return Timestamp.fromMillis(ms);
    }

    //specify the bazaar 
    public async StoreDailyBazaarItemById(allItems: any,bazaar: any | undefined = undefined,id:string): Promise<DailyBazaarDocument | undefined>{
        
        if(bazaar == undefined){
            var newbazaar = await this.allBazaarPromise;
            if(allItems[id] != undefined || allItems[id] != null && allItems[id].bazaar){
                var time: string = moment().utc(false).startOf('day').format("DD-MM-YYYY");
                var weeknum: number = moment(time,"DD-MM-YYYY",).utc(false).isoWeek();
                var timestamp = await DailyBazaarUtil.GetTimestampFromDate(moment().utc(false).startOf('day').valueOf());
                var bazaarItem = newbazaar.products[id];
                if(!bazaarItem.sell_summary[0] || !bazaarItem.buy_summary[0]){
                    return;
                }
                
                var buyorderprice = bazaarItem.sell_summary[0];
                var sellofferprice = bazaarItem.buy_summary[0];
    
                var dailybazaar: DailyBazaarDocument = {"id":id,"name":allItems[id].name,"date":time,"buyorderprice":buyorderprice.pricePerUnit,"sellofferprice":sellofferprice.pricePerUnit,"amountofbuys":bazaarItem.quick_status.buyMovingWeek,"amountofsales":bazaarItem.quick_status.sellMovingWeek,"weeknum":weeknum,"timestamp":timestamp};
                
                dailycollection.SetDocument(id+"-"+time,dailybazaar,{"merge":true});
    
                return dailybazaar;
            }else{
                return undefined;
            }
        }else{
            var newbazaar = bazaar;
            if(allItems[id] != undefined || allItems[id] != null && allItems[id].bazaar){
                var time: string = moment().utc(false).startOf('day').format("DD-MM-YYYY");
                var weeknum: number = moment(time,"DD-MM-YYYY",).utc(false).startOf('day').isoWeek();
                var timestamp = await DailyBazaarUtil.GetTimestampFromDate(moment().utc(false).startOf('day').valueOf());
                var bazaarItem = newbazaar.products[id];

                if(!bazaarItem.sell_summary[0] || !bazaarItem.buy_summary[0]){
                    return;
                }
                
                var buyorderprice = bazaarItem.sell_summary[0];
                var sellofferprice = bazaarItem.buy_summary[0];
    
                var dailybazaar: DailyBazaarDocument = {"id":id,"name":allItems[id].name,"date":time,"buyorderprice":buyorderprice.pricePerUnit,"sellofferprice":sellofferprice.pricePerUnit,"amountofbuys":bazaarItem.quick_status.buyMovingWeek,"amountofsales":bazaarItem.quick_status.sellMovingWeek,"weeknum":weeknum,"timestamp":timestamp};
                
                dailycollection.SetDocument(id+"-"+time+"-"+"daily",dailybazaar,{"merge":true});
                weeklycollection.GetDocumentById(id+"-"+weeknum+"-"+moment().year()+"-"+"weekly").then(doc =>{
                    if(doc){
                        if(doc instanceof Error){
                            return;
                        }
                        var newDoc = doc;
                        for(var i = 0; i < newDoc.days.length; i++){
                            if(newDoc.days[i].date == time){
                                return;
                            }
                        }

                        newDoc.days.push(dailybazaar);

                        weeklycollection.SetDocument(id+"-"+weeknum+"-"+moment().year()+"-"+"weekly",newDoc,{"merge":true});
                        return;
                    }else{
                        var weeklyBazaar: WeeklyBazaarDocument = {"id":id,"name":allItems[id].name,"weeknum":weeknum,"monthnum":moment().month(),days:[dailybazaar]}
                        weeklycollection.SetDocument(id+"-"+weeknum+"-"+moment().year()+"-"+"weekly",weeklyBazaar,{"merge":true});
                        return;
                    }
                })
    
                return dailybazaar;
            }else{
                return undefined;
            }
        }


    }

    public async StoreAllBazaarItems(){
        var bz = (await axios.get("https://api.hypixel.net/skyblock/bazaar")).data;
        
        var bzKeys = Object.keys(bz.products);
        var allItems = await this.allItemsPromise;
        if(bz != undefined){
            for(var i = 0; i < bzKeys.length; i++){
                this.StoreDailyBazaarItemById(allItems,bz,bzKeys[i]);
            }
        }else{
            console.log("store all undefined");
        }
    }
}