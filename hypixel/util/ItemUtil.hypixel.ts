import { WebScraperMicroservice } from "../../webscraper/WebScraperMicroservice.webscraper";
import { CraftingItem } from "../model/CraftingItem.interface";
import { Item } from "../model/Item.interface";
import { Recipe } from "../model/Recipe.interface";
import { FlipperUtil } from "./FlipperUtil.hypixel";
import fs from 'fs/promises';
import nbt from 'prismarine-nbt';
import { AucItem } from "../model/AucItem.interface";

export class ItemlUtil{
    public static async getItemById(id: string): Promise<Item | undefined>{
        var file: Buffer | void = await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(e =>{console.log(e)});

        if(file){
            var parsedFile = JSON.parse(file.toString())[id];
            if(parsedFile == undefined){
                return undefined;
            }
            if(parsedFile.category.includes("dungeon")){
                
                return {"amount":1,"bazaar":(parsedFile.bazaar) ? true : false,"category":parsedFile.category,"id":id,"numid":parsedFile.item_id,"rarity":parsedFile.tier,"name":parsedFile.name.slice(0,parsedFile.name.indexOf("✪") - 1),"dungeonItem":true,"numberOfStars":0};
            }else{
                return {"amount":1,"bazaar":(parsedFile.bazaar) ? true : false,"category":parsedFile.category,"id":id,"numid":parsedFile.item_id,"rarity":parsedFile.tier,"name":parsedFile.name,"dungeonItem":false,"numberOfStars":0};
            }
           
        }
        

        return undefined;
    }

    public static async GetAllitems(){
       var file: Buffer | void = await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(e =>{console.log(e)});

       if(file){
           return file.toString();
       }
    }

    public static async getItemRecipeById(id: string): Promise<Item | undefined>{

        return undefined;
    }

    public static async getItemByName(name:string): Promise<Item | undefined>{
        var file: Buffer | void = await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(e =>{console.log(e)});

        if(file){
            var parsedFile :any | undefined = JSON.parse(file.toString());
            if(parsedFile == undefined){
                return undefined;
            }
            var fileKeys: string[] = Object.keys(parsedFile);

            for(var i = 0; i < fileKeys.length; i++){
                if(parsedFile[fileKeys[i]].name.toLowerCase().includes(name.toLowerCase()) ){
                    if(parsedFile[fileKeys[i]].category.includes("dungeon")){
                        if(parsedFile[fileKeys[i]].name.indexOf("✪") < 0){
                            return {"amount":1,"bazaar":(parsedFile[fileKeys[i]].bazaar) ? true : false,"category":parsedFile[fileKeys[i]].category,"id":fileKeys[i],"numid":parsedFile[fileKeys[i]].item_id,"rarity":parsedFile[fileKeys[i]].tier,"name":parsedFile[fileKeys[i]].name,"dungeonItem":true,"numberOfStars":0};
                        }else{
                            return {"amount":1,"bazaar":(parsedFile[fileKeys[i]].bazaar) ? true : false,"category":parsedFile[fileKeys[i]].category,"id":fileKeys[i],"numid":parsedFile[fileKeys[i]].item_id,"rarity":parsedFile[fileKeys[i]].tier,"name":parsedFile[fileKeys[i]].name.slice(0,parsedFile[fileKeys[i]].name.indexOf("✪") - 1),"dungeonItem":true,"numberOfStars":0};
                        }
                        
                    }else{
                        return {"amount":1,"bazaar":(parsedFile[fileKeys[i]].bazaar) ? true : false,"category":parsedFile[fileKeys[i]].category,"id":fileKeys[i],"numid":parsedFile[fileKeys[i]].item_id,"rarity":parsedFile[fileKeys[i]].tier,"name":parsedFile[fileKeys[i]].name,"dungeonItem":false,"numberOfStars":0};
                    }
                   
                }
            }


        }
        return undefined;
    }

    public static async getItemIDByName(name:string): Promise<string | undefined>{
        var file: Buffer | void = await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(e =>{console.log(e)});

        if(file){
            var parsedFile :any | undefined = JSON.parse(file.toString());
            if(parsedFile == undefined){
                return undefined;
            }
            var fileKeys: string[] = Object.keys(parsedFile);

            for(var i = 0; i < fileKeys.length; i++){
                if(parsedFile[fileKeys[i]].name.toLowerCase().includes(name.toLowerCase()) ){
                    if(parsedFile[fileKeys[i]].category.includes("dungeon")){
                        if(parsedFile[fileKeys[i]].name.indexOf("✪") < 0){
                            return fileKeys[i];
                        }else{
                            return fileKeys[i];
                        }
                        
                    }else{
                        return fileKeys[i];
                    }
                   
                }
            }


        }
        return undefined;
    }

    public static async getItemByUrl(url: string): Promise<Item | undefined>{
        return undefined;
    }

    public static async getAmountOfStarsOnItemWithIndex(name:string,index:number): Promise<any | undefined>{
        return {"item":name,"stars":name.match(new RegExp("✪","g") || [])?.length,"index":index};
    }

    public static async getAmountOfStarsOnItem(name:string): Promise<any | undefined>{
        return {"item":name,"stars":name.match(new RegExp("✪","g") || [])?.length};
    }

    public static async getItemRecipeByUrl(url: string): Promise<Recipe |Recipe[]| {[status:string]:string} | undefined>{
        var scraped = await WebScraperMicroservice.WebScrapeByUrl(url);

        if(scraped.status == "itemdoesntexist"){
            
            return {"status":"invaliditem"};
        }
        

        if(scraped.set == false){
            var finalItem = await ItemlUtil.getItemByName(scraped.item.toLowerCase());
            if(finalItem !== undefined){
                if(finalItem.id.includes("PET_ITEM")){
                    return {"status":"petitemsnotsupported"};
                }
                
            
               
            }else{
                return {"status":"invaliditem"};
            }
            //var items: any = await slothpixel("items","https://api.slothpixel.me/api/skyblock").catch(e =>{console.log(e)});

            var craft : CraftingItem[] = scraped.recipe;
            var allItems : Item[] = [];

            for(var i = 0; i < craft.length; i++){
                if(craft[i].name == 'none'){
                    allItems.push({"id":"NONE","name":"none","numid":999999,"category":"misc","dungeonItem":false,"rarity":"common","numberOfStars":0,"bazaar":false,amount:1});
                    continue;
                }
                var item = await ItemlUtil.getItemByName(craft[i].name.toLowerCase());
                if(item != undefined){
                    allItems.push({"amount":craft[i].amount,"bazaar":item.bazaar,"category":item.category,"dungeonItem":item.dungeonItem,"id":item.id,"name":item.name,"numberOfStars":item.numberOfStars,"numid":item.numid,"rarity":item.rarity});
                }
            }

            
            //console.log(finalItem)
            if(finalItem != undefined){
                var recipe : Recipe = {"finalItem":finalItem,"slot1":allItems[0],"slot2":allItems[1],"slot3":allItems[2],"slot4":allItems[3],"slot5":allItems[4],"slot6":allItems[5],"slot7":allItems[6],"slot8":allItems[7],"slot9":allItems[8],"slots":allItems};
                return recipe;
            }
           

        }else{
            var recipes : Recipe[] = [];

            for(var i = 0;i < scraped.recipes.length; i++){
                var allItems : Item[] = [];
                var craft : CraftingItem[] = scraped.recipes[i].recipe;
                var finalItem : Item | undefined = undefined;


                for(var j = 0;j < craft.length; j++){
                    if(craft[j].name == 'none'){
                        allItems.push({"id":"NONE","name":"none","numid":999999,"category":"misc","dungeonItem":false,"rarity":"common","numberOfStars":0,"bazaar":false,"amount":1});
                        continue;
                    }
                    var item = await ItemlUtil.getItemByName(craft[j].name.toLowerCase());
                    if(item != undefined){
                        allItems.push({"amount":craft[j].amount,"bazaar":item.bazaar,"category":item.category,"dungeonItem":item.dungeonItem,"id":item.id,"name":item.name,"numberOfStars":item.numberOfStars,"numid":item.numid,"rarity":item.rarity});
                    }
                    

                }
                
                var finalItem = await ItemlUtil.getItemByName(scraped.recipes[i].item);
                

                if(finalItem !== undefined){
                    var recipe : Recipe = {"finalItem":finalItem,"slot1":allItems[0],"slot2":allItems[1],"slot3":allItems[2],"slot4":allItems[3],"slot5":allItems[4],"slot6":allItems[5],"slot7":allItems[6],"slot8":allItems[7],"slot9":allItems[8],"slots":allItems};
                    recipes.push(recipe);

                    //console.log(recipes);
                    //console.log(allItems);
                }else{
                    return {"status":"invaliditem"};
                }


            }
            var end : number = Date.now()

            if(recipes.length != 0){
                return recipes;
            }
        }
    }

    public static RemoveAllDuplicates(arr: Item[]): Item[]{
        var m: Map<string,boolean> = new Map<string,boolean>();
        var newarr = [];
        
        for (var i=0; i<arr.length; i++) {
          var v = arr[i];
          if (!m.get(v.id)) {
            newarr.push(v);
            m.set(v.id,true);
          }
        }
        return newarr;
    }

    public static RemoveAllDuplicatesAuction(arr: AucItem[]):AucItem[]{
        var m: Map<string,boolean> = new Map<string,boolean>();
        var newarr = [];
        
        for (var i=0; i<arr.length; i++) {
          var v = arr[i];
          if (!m.get(v.item)) {
            newarr.push(v);
            m.set(v.item,true);
          }
        }
        return newarr;
    }

    public static async GetPrefixOfItem(item:string,prefix:string):Promise<string>{
        return item.slice(0,item.indexOf(prefix));
    }

    public static async CheckIfPrefixExists(fullitem:string,item: string): Promise<false | number>{
        if(fullitem.toLowerCase().indexOf(item.toLowerCase()) <= 0){
            return false;
        }
        
        return fullitem.toLowerCase().indexOf(item.toLowerCase());
    }

    public static async RemovePrefix(item: string,index:number){
        return item.substring(index,item.split('').length);
    }

    public static async ConvertItemBytesToItemData(itemBytes:string): Promise<any>{
        var item = await nbt.parse(Buffer.from(itemBytes,'base64'));
        return item.parsed.value.i?.value;
    }

    public static async ConvertNBTDataIntoObject(data: any): Promise<any>{

    }

    public static RemoveSpecialCharactersFromItem(item:string): string{
        return item.replace(/\u00A7[0-9A-FK-OR]/ig,'');
    }
    
}

