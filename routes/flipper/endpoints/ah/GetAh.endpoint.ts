import { AuctionUtil } from '../../../../hypixel/util/AuctionUtil.hypixel';
import router from '../../FlipperRouter.router';

function roughSizeOfObject( object : any ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

export class GetAhEndpoint{
    static async GetAh(){
        router.GetRouter().get("/ah/get",async function(req,res,next){
            AuctionUtil.GetAllItemsFromAh().then(ah =>{
                
                res.json({'status':'success'});
                
            })
        });
    }
}