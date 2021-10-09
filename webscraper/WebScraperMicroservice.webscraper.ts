import * as axios from 'axios';

//DEPRECATED, DONT USE
export class WebScraperMicroservice{
    constructor(){

    }

    static async WebScrapeByUrl(url:string):  Promise<any>{
        var res = await axios.default.get(`https://projectscyll-webscraping.herokuapp.com/api/v1/getrecipe?url=${url}`);
        
        return res.data;
        
    }
}