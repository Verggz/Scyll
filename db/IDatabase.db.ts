import { CollectionReference, DocumentData, Firestore, SetOptions, WhereFilterOp } from "@google-cloud/firestore";

export class IDatabase{
    private db: Firestore;
    public collection : CollectionReference;

    constructor(collection:string){
        this.db = new Firestore({'projectId':'yourprojectid','keyFilename':'./yourkeyfile.json'});
        this.collection = this.db.collection(collection);
    }

    async SetDocument(id:string,data: any,opts:SetOptions): Promise<boolean | Error>{
        return this.collection.doc(id).set(data,opts).then(doc =>{
            return true;
        }).catch(err =>{
            return new Error(err);
        });
    }
    
    async GetDocumentById(id:string): Promise<false | DocumentData | Error | undefined> {
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
    async GetDocumentByParams(params: string,comp: WhereFilterOp,res:string): Promise<false | DocumentData[]>{
        return this.collection.where(params,comp,res).get().then(docs =>{
            if(docs.empty){
                return false;
            }else{
                return docs.docs;
            }
        });
    }

    async GetAllDocuments():Promise<false | DocumentData[]> {
        return this.collection.get().then(docs =>{
            if(!docs.empty){
                return docs.docs;
                
            }else{
                return false;
            }
        })
    }

    async DeleteDocumentById(id:string){
        return await this.collection.doc(id).delete();
    }

    async UpdateDocumentById(id:string,key:string,data:any){
        return await this.collection.doc(id).update(data);
    }
}