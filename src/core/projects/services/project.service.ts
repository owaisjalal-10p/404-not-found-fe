import { Http } from "../../services/http"

export class ProjectService{
    createProjectLOE = (payload: any) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const createdLOEResponse = await Http.REQUEST.post('', payload);
                resolve(createdLOEResponse);
            } catch (error) {
                reject(error);
            }
        })
    }
}