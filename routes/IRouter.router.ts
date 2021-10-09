import Express, { Router } from "express";

export class IRouter{
    private router: Router;
    constructor(){
        this.router = Express.Router();
    }

    GetRouter() : Router{
        return this.router;
    }

    GetRequest(endpoint: string,cb: (req: any,res:any,next:any) => Promise<void>): void{
        this.router.get(endpoint,cb);
        
    }

    PostRequest(endpoint: string, cb: (req: any,res:any,next:any) => Promise<void>) : void{
        this.router.post(endpoint,cb);
    }
}