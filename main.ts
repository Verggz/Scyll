import express,{Express} from 'express';
import { AuctionUtil } from './hypixel/util/AuctionUtil.hypixel';
import FlipperRouter from './routes/flipper/FlipperRouter.router';
import UserRouter from './routes/users/UserRouter.router';
import {setIntervalAsync} from 'set-interval-async/dynamic';
import cachedb from './db/CacheDatabase.db';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import NitrateRouter from './routes/nitrate/NitrateRouter.router';
import ModRouter from './routes/mod/ModRouter.router';
import BotRouter from './routes/bot/BotRouter.router';
import { BinUtil } from './hypixel/util/BinUtil.hypixel';

var app : Express = express();

app.use(rateLimit({"windowMs":5*60*1000,"max":75}));
app.use(express.json({'limit':'5mb'}));
app.use(express.urlencoded({'extended':true,'limit':'5mb','parameterLimit':500000}));
app.use(compression());

app.use('/api/v1/nitric',FlipperRouter.GetRouter());
app.use('/api/v1/users',UserRouter.GetRouter());
app.use('/api/v1/nitrate',NitrateRouter.GetRouter());
app.use('/api/v1/bot',BotRouter.GetRouter());
app.use('/api/v1/mod',ModRouter.GetRouter());


app.get("/",async function(req,res,next){
    res.send("Scyll server API");
});

app.listen(process.env.PORT || '8080',() =>{
    if(process.env.PORT){
        console.log("listening on port: " + process.env.PORT);
    }else{
        console.log("listening on port: " + '8080');
    }

});
var start = Date.now();
BinUtil.SaveAllBinsToFile().then(file =>{
    BinUtil.SaveAllSecondLowestSnipeToFile().then(final =>{
        console.log(`${(Date.now() - start) / 1000}s`)
    });
})
var isCalling = false;
setIntervalAsync(async () =>{
    console.log("called");

    if(isCalling == true){
        console.log("still calling");
        return;
    }

    isCalling = true;
    await BinUtil.SaveAllBinsToFile().then(file =>{

    })
    await BinUtil.SaveAllSecondLowestSnipeToFile().then(final =>{
        console.log(`${(Date.now() - start) / 1000}s`)
    });

    isCalling = false;
},120000);

    // console.log("not main");
    setIntervalAsync(async () =>{
        AuctionUtil.GetAllAuctionsEnded().then(res =>{
            if(res == undefined){
                return undefined;
            }


            AuctionUtil.SaveAllEndedAuctionsToCache(res).then(file =>{

                cachedb.SetDocument("auctionprices",file,{"merge":true});
            });

            AuctionUtil.SaveAllEndedAuctionsToCachev2(res).then(file =>{
                cachedb.SetDocument("auctionpricesv2",file,{"merge":true});
            });
        });
    },60000);
    AuctionUtil.GetAllAuctionsEnded().then(res =>{
        if(res == undefined){
            return undefined;
        }

        AuctionUtil.SaveAllEndedAuctionsToCache(res).then(file =>{
            cachedb.SetDocument("auctionprices",file,{"merge":true});
        });

        AuctionUtil.SaveAllEndedAuctionsToCachev2(res).then(file =>{
            cachedb.SetDocument("auctionpricesv2",file,{"merge":true});
        })
        //console.log(res);
    });
