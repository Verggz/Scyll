import { CollectionReference, DocumentData, FieldValue, Firestore, SetOptions, Timestamp, WhereFilterOp } from "@google-cloud/firestore";

var db : Firestore = new Firestore({"projectId":"yourprojectid","keyFilename":"keyfilename.json"});

export abstract class NitrateCollection{
    public collection : CollectionReference;

    constructor(collection: string){
        this.collection = db.collection(collection);
    }

    public async SetDocument(id:string,data: any,opts:SetOptions): Promise<boolean | Error>{
        return this.collection.doc(id).set(data,opts).then(doc =>{
            return true;
        }).catch(err =>{
            return new Error(err);
        });
    }
    
    public async GetDocumentById(id:string): Promise<false | DocumentData | Error | undefined> {
        return this.collection.doc(id).get().then(doc =>{
            if(doc.exists){
                return doc.data();
            }else{
                return false;
            }
        }).catch(e =>{
            return new Error(e);
        });
    }
    public async GetDocumentByParams(params: string,comp: WhereFilterOp,res:string): Promise<false | DocumentData[]>{
        return this.collection.where(params,comp,res).get().then(docs =>{
            if(docs.empty){
                return false;
            }else{
                return docs.docs;
            }
        });
    }

    public async GetAllDocuments():Promise<false | DocumentData[]> {
        return this.collection.get().then(docs =>{
            if(!docs.empty){
                return docs.docs;
                
            }else{
                return false;
            }
        })
    }

    public async DeleteDocumentById(id:string){
        return await this.collection.doc(id).delete();
    }

    public async UpdateDocumentById(id:string,key:string,data:any){
        return await this.collection.doc(id).update(data);
    }

}