import fs from 'fs/promises';

export class CraftUtil{
    public static async FindAllMaterialsByItemNameOrId(item:string){
        if(item.includes("_")){
            var fileBuffer: Buffer | undefined = await fs.readFile(__dirname + `/../../../cache/items/${item}.json`).catch(e =>{
                return undefined;
            });

            if(fileBuffer == undefined){
                return undefined;
            }
            var itemfile = JSON.parse(fileBuffer.toString());

            if(itemfile.recipe){
                var repeateditems: any = {};
                var recipeKeys = Object.keys(itemfile.recipe);

                for(var i = 0; i < recipeKeys.length; i++){
                    if(itemfile.recipe[recipeKeys[i]] == "" || itemfile.recipe[recipeKeys[i]] == null || itemfile.recipe[recipeKeys[i]] == undefined){
                        continue;
                    }
                    var splitrecipe = itemfile.recipe[recipeKeys[i]].split(":");
                    if(!repeateditems[splitrecipe[0]]){
                        repeateditems[splitrecipe[0]] = parseInt(splitrecipe[1]);
                    }else{
                        repeateditems[splitrecipe[0]] += parseInt(splitrecipe[1]);
                    }
                }


                return repeateditems;
            }else{
                return undefined;
            }
        }else{
            var allItems = JSON.parse((await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json")).toString());
            var allItemsKeys = Object.keys(allItems);

            var itemid = "none";

            for(var i = 0; i < allItemsKeys.length; i++){
                if(allItems[allItemsKeys[i]].name.toLowerCase().includes(item.toLowerCase())){
                    itemid = allItemsKeys[i];
                    break;
                }
            }

            if(itemid == "none"){
                return undefined;
            }


            var fileBuffer: Buffer | undefined = await fs.readFile(__dirname + `/../../../cache/items/${itemid}.json`).catch(e =>{
                return undefined;
            });

            if(fileBuffer == undefined){
                return undefined;
            }
            var itemfile = JSON.parse(fileBuffer.toString());

            if(itemfile.recipe){
                var repeateditems: any = {};
                var recipeKeys = Object.keys(itemfile.recipe);

                for(var i = 0; i < recipeKeys.length; i++){
                    if(itemfile.recipe[recipeKeys[i]] == "" || itemfile.recipe[recipeKeys[i]] == null || itemfile.recipe[recipeKeys[i]] == undefined){
                        continue;
                    }
                    var splitrecipe = itemfile.recipe[recipeKeys[i]].split(":");
                    if(!repeateditems[splitrecipe[0]]){
                        repeateditems[splitrecipe[0]] = parseInt(splitrecipe[1]);
                    }else{
                        repeateditems[splitrecipe[0]] += parseInt(splitrecipe[1]);
                    }
                }


                return {"final":itemid,recipe: repeateditems};
            }else{
                return undefined;
            }
        }
    }
}