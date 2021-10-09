import { BookFlipper } from '../../../../hypixel/bookflipping/BookFlipper.hypixel';
import { AuctionUtil } from '../../../../hypixel/util/AuctionUtil.hypixel';
import router from '../../FlipperRouter.router';

export class BestBookFlipByMarginEndpoint{
    public static async BestBookFlipByMargin(){
        router.GetRouter().post("/book/advise/margin",async function(req,res,next){
            var bookcache = await BookFlipper.FindBestBookToFlipByMarginCache();

            if(bookcache == undefined){
                AuctionUtil.GetAllItemsFromAh().then(items =>{
                    if(items == undefined) return undefined;
                    BookFlipper.FindBestBookToFlipByMargin(items).then(final =>{
                        res.json({'status':'success',books:final});
                    });
                }); 
            }else if(bookcache.timesincelastcall > Date.now() - 600000){
                res.json({'status':'success',books:bookcache.books});
            }else{
                AuctionUtil.GetAllItemsFromAh().then(items =>{
                    if(items == undefined) return undefined;
                    BookFlipper.FindBestBookToFlipByMargin(items).then(final =>{
                        res.json({'status':'success',books:final});
                    });
                }); 
            }

           
        });
    }
}