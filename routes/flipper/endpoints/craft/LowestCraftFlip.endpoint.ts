import { CraftFlipper } from '../../../../hypixel/craftflipping/CraftFlipper.hypixel';
import { CraftFlipperCalculator } from '../../../../hypixel/craftflipping/CraftFlipperCalculator.hypixel';
import { AucItem } from '../../../../hypixel/model/AucItem.interface';
import { AuctionUtil } from '../../../../hypixel/util/AuctionUtil.hypixel';
import router from '../../FlipperRouter.router';
import fs from 'fs/promises';
import { BinUtil } from '../../../../hypixel/util/BinUtil.hypixel';

import { Storage } from "@google-cloud/storage";

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class LowestCraftFlipEndpoint{
    public static async LowestCraftFlip(): Promise<void>{
        router.GetRouter().post('/craft/lowest',async function(req,res,next){
            if(req.body.index === false){
                var curtime = Date.now();
                if(BinUtil.bin.lastupdates == undefined  && BinUtil.isupdating == false||BinUtil.bin.lastupdates == 0  &&  BinUtil.isupdating == false|| BinUtil.bin.lastupdates + 600000 <= curtime  &&  BinUtil.isupdating == false){
                    console.log("ooof");
                    BinUtil.isupdating = true;
                    await BinUtil.SaveAllBinsToGCS();
                    var getBinCache = async  () => new Promise((resolve,reject) =>{
                        let buf = "";
            
                        storage.bucket("projectscyllcache").file("bincache.json")
                        .createReadStream()
                        .on('data', d=> {buf += d})
                        .on('end',() => resolve(JSON.parse(buf)));
                    });
                    var tempFile: any = await getBinCache();
                    
                    BinUtil.bin.lastupdates = tempFile.timesincelastcall;
                    BinUtil.bin.auctions = tempFile.auctions;
                    BinUtil.isupdating = false;
                }
                var ah: AucItem[] = BinUtil.bin.auctions;
                if(req.body.amountOfStars != undefined && parseInt(req.body.amountOfStars) >= 0){
                    if(req.body.amountOfStars > 5){
                        req.body.amountOfStars = 5;
                    }
                    CraftFlipperCalculator.CalculateAllLowestResourcePricesOfItem(ah,req.body.recipe,req.body.amountOfStars).then(e =>{
                        CraftFlipper.CompareItemPriceToRecipeAhLowest(ah as AucItem[],req.body.recipe,e,req.body.amountOfStars).then(flipped =>{
                            fs.readFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json",{"encoding":"utf-8"}).then(file =>{
                                if(file == "{}" || !file){
                                    var finalfile: any = {};
                                    finalfile[flipped.finalitem.name.toLowerCase()] = {"name":flipped.finalitem.name,"id":flipped.finalitem.id,"profit":flipped.profit,"itemcost":flipped.itemcost,"matcost":flipped.matcost};

                                    fs.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json",JSON.stringify(finalfile));
                                    return;
                                }

                                var oldfile = JSON.parse(file);
                                if(oldfile[flipped.finalitem.name.toLowerCase()] != undefined || oldfile[flipped.finalitem.name.toLowerCase()] != null){
                                    oldfile[flipped.finalitem.name.toLowerCase()] = {"name":flipped.finalitem.name,"id":flipped.finalitem.id,"profit":(flipped.profit + oldfile[flipped.finalitem.name.toLowerCase()].profit) / 2,"itemcost":(flipped.itemcost + oldfile[flipped.finalitem.name.toLowerCase()].itemcost) / 2,"matcost":(flipped.matcost + oldfile[flipped.finalitem.name.toLowerCase()].matcost) / 2};
                                    fs.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json",JSON.stringify(oldfile));
                                }else{
                                    oldfile[flipped.finalitem.name.toLowerCase()] = {"name":flipped.finalitem.name,"id":flipped.finalitem.id,"profit":flipped.profit,"itemcost":flipped.itemcost,"matcost":flipped.matcost};

                                    fs.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json",JSON.stringify(oldfile));
                                }
                            });
                            res.json(flipped);
                        });
                    });
                }else{
                    res.json({'status':'invalidamountofstars'});
                }

            }else{
                var curtime: number = Date.now();
                if(BinUtil.bin.lastupdates == undefined  && BinUtil.isupdating == false||BinUtil.bin.lastupdates == 0  &&  BinUtil.isupdating == false|| BinUtil.bin.lastupdates + 600000 <= curtime  &&  BinUtil.isupdating == false){
                    console.log("ooof");
                    BinUtil.isupdating = true;
                    await BinUtil.SaveAllBinsToGCS();
                    var getBinCache = async  () => new Promise((resolve,reject) =>{
                        let buf = "";
            
                        storage.bucket("projectscyllcache").file("bincache.json")
                        .createReadStream()
                        .on('data', d=> {buf += d})
                        .on('end',() => resolve(JSON.parse(buf)));
                    });
                    var tempFile: any = await getBinCache();
                    
                    BinUtil.bin.lastupdates = tempFile.timesincelastcall;
                    BinUtil.bin.auctions = tempFile.auctions;
                    BinUtil.isupdating = false;
                }
                var ah: AucItem[] = BinUtil.bin.auctions;

                if(ah == undefined){
                    res.json({'status':'auctioncrashed'});
                    return;
                }
                if(req.body.recipe.length -1 >= parseInt(req.body.index)){
                    if(req.body.amountOfStars != undefined && parseInt(req.body.amountOfStars) >= 0 && parseInt(req.body.amountOfStars) < 6){
                        CraftFlipperCalculator.CalculateAllLowestResourcePricesOfItem(ah,req.body.recipe[parseInt(req.body.index)],req.body.amountOfStars).then(e =>{
                            CraftFlipper.CompareItemPriceToRecipeAhLowest(ah as AucItem[],req.body.recipe[parseInt(req.body.index)],e,req.body.amountOfStars).then(flipped =>{
                                fs.readFile( __dirname +"/../../../../../cache/hypixelcache/craftcache.json",{"encoding":"utf-8"}).then(file =>{
                                    //console.log(file);
                                    if(file == "{}" || !file){
                                        var finalfile: any = {};
                                        finalfile[flipped.finalitem.name.toLowerCase()] = {"name":flipped.finalitem.name,"id":flipped.finalitem.id,"profit":flipped.profit,"itemcost":flipped.itemcost,"matcost":flipped.matcost};
    
                                        fs.writeFile(__dirname +"/../../../../../cache/hypixelcache/craftcache.json",JSON.stringify(finalfile));
                                        return;
                                    }
    
                                    var oldfile = JSON.parse(file);
                                    console.log(oldfile[flipped.finalitem.name.toLowerCase()])
                                    if(oldfile[flipped.finalitem.name.toLowerCase()] != undefined || oldfile[flipped.finalitem.name.toLowerCase()] != null){
                                        oldfile[flipped.finalitem.name.toLowerCase()] = {"name":flipped.finalitem.name,"id":flipped.finalitem.id,"profit":(flipped.profit + oldfile[flipped.finalitem.name.toLowerCase()].profit) / 2,"itemcost":(flipped.itemcost + oldfile[flipped.finalitem.name.toLowerCase()].itemcost) / 2,"matcost":(flipped.matcost + oldfile[flipped.finalitem.name.toLowerCase()].matcost) / 2};
                                        fs.writeFile(__dirname +"/../../../../../cache/hypixelcache/craftcache.json",JSON.stringify(oldfile));
                                    }else{
                                        oldfile[flipped.finalitem.name.toLowerCase()] = {"name":flipped.finalitem.name,"id":flipped.finalitem.id,"profit":flipped.profit,"itemcost":flipped.itemcost,"matcost":flipped.matcost};
    
                                        fs.writeFile(__dirname +"/../../../../../cache/hypixelcache/craftcache.json",JSON.stringify(oldfile));
                                    }
                                });
                                res.json(flipped);
                            });
                        });
                    }else{
                        res.json({'status':'invalidamountofstars'});
                    }

                }else{
                    res.json({'status':"invalidindex"});
                }

            }



        });
    }
}