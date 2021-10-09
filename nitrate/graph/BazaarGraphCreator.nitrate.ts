import {CanvasRenderService} from 'chartjs-node-canvas';
import Chart from 'chart.js';
import moment from 'moment';
import dailycollection from '../collection/DailyBazaarCollection.collection';

export class BazaarGraphCreator{

    public static async GetDataWithinDayTimespan(item:string,min:string,max:string){
        var jsmindate: Date = moment(min,"DD-MM-YYYY").utc().toDate();
        //dev = .add(1,"days")
        var jsmaxdate: Date =  moment(max,"DD-MM-YYYY").utc().toDate();

        var allDocs = await dailycollection.collection.where("id",'==',item).where('timestamp','>=',jsmindate).where('timestamp','<=',jsmaxdate).get().then(docs =>{
            if(docs.empty){
                return false;
            }else{
                return docs.docs;
            }
        }).catch(err =>{
            return undefined;
        });
        if(!allDocs){
            if(allDocs == undefined){
                return false;
            }
            console.log("empty");
            return;
        }
        var allDocsData: any[] = [];
        for(var i = 0; i < allDocs.length; i++){
            allDocsData.push(allDocs[i].data());
        }

        return allDocsData;

        
    }



    async GetDataWithinWeekTimespan(){

    }
    
    public static async Render(type:string,data:any){
        if(type == "DAILY"){
            var datalabels: any[] = [];
            var buyorderpricedata: any[] = [];
            var sellofferpricedata: any[] = [];

            for(var i = 0; i < data.length; i++){
                datalabels.push(data[i].date);
                buyorderpricedata.push(data[i].buyorderprice);
                sellofferpricedata.push(data[i].sellofferprice);
            }
            
            var config: any = {
                type: "line",
                data:{
                    labels: datalabels,
                    datasets: [
                        {
                            label:"buy order price",
                            data:sellofferpricedata,
                            backgroundColor: "rgba(250,128,114, 1)",
                            tension: 0.1
                        },
                        {
                            label:"sell offer price",
                            data:buyorderpricedata,
                            backgroundColor: "rgba(75, 192, 192,1)",
                            tension: 0.1
                        },

                    ]
                },
                options:{
                    legend:{
                        labels:{
                            fontColor:"white",
                        }
                    },
                    scales:{
                        xAxes:[{stacked:false,scaleLabel:{
                            display:true,
                            labelString: "Coins Per",
                          },
                          ticks:{fontcolor:"white"}
                        }],

                        yAxes: [{
                          stacked: true,
                          scaleLabel:{
                            display:true,
                            labelString: "Coins Per",
                          },
                          ticks: {
                            beginAtZero: true,
                            fontcolor:"white"
                          },
                        }]
                    }
                }

            }

            var renderservice = new CanvasRenderService(640,480);

            return await renderservice.renderToBuffer(config);
        }
    }
}