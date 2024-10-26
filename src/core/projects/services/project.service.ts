import { Http } from "../../services/http"

export class ProjectService{
    createProjectLOE = (payload: any) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const createdLOEResponse = await Http.REQUEST.post('loe/', payload);
                resolve(createdLOEResponse);
            } catch (error) {
                reject(error);
            }
        })
    }

    getProjectLOEList = () => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const createdLOEResponse = await Http.REQUEST.get('loe', {
                    headers: {
                        'ngrok-skip-browser-warning': '69420'
                    }
                });
                resolve(createdLOEResponse.data);
            } catch (error) {
                reject(error);
            }
        })
    }
}