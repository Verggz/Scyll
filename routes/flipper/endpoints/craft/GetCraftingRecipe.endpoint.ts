import { Recipe } from '../../../../hypixel/model/Recipe.interface';
import { ItemlUtil } from '../../../../hypixel/util/ItemUtil.hypixel';
import router from '../../FlipperRouter.router';

export class GetCraftingRecipeEndpoint{
    public static async GetCraftingRecipe(): Promise<void>{
        router.GetRouter().get("/recipe/get",async function(req,res,next){
            
            if(req.query.url == undefined && req.query.name != undefined){
                var name = req.query.name as string;

                var finalName = encodeURIComponent(name.toLowerCase().replace(/ /g,"_").replace(/(^|_)(\S)/g, s=>s.toUpperCase()));
                var recipe = await ItemlUtil.getItemRecipeByUrl("https://hypixel-skyblock.fandom.com/wiki/" + finalName);

                if(recipe !== undefined){

                    var newItem = recipe as Recipe[];
                    if(newItem.length == undefined){
                        var nextItem = recipe as {[status: string]:string};
                        if(nextItem.status == undefined){
                            recipe = recipe as Recipe;
                            //console.log(item)
                           
                            res.json({'status':'success','recipe':recipe});
                        }else{
                            
                            res.json(nextItem);
                        }
                    }else{
                        
                        res.json({'status':'success','recipe':newItem});
                    }
                }else{
                    res.json({'status':'unvavailable'});
                }
                
               
            }else if(req.query.url != undefined && req.query.name == undefined){
                var recipe = await ItemlUtil.getItemRecipeByUrl(req.query.url as string);

                if(recipe !== undefined){

                    var newItem = recipe as Recipe[];
                    if(newItem.length == undefined){
                        var nextItem = recipe as {[status: string]:string};
                        if(nextItem.status == undefined){
                            recipe = recipe as Recipe;
                            //console.log(item)
                           
                            res.json({'status':'success','recipe':recipe});
                        }else{
                            
                            res.json(nextItem);
                        }
                    }else{
                        
                        res.json({'status':'success','recipe':newItem});
                    }
                }
            }else{
                res.json({'status':'unvavailable'});
            }
        });
    }
}