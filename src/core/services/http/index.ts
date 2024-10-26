import axios from 'axios';

export class Http {
    _channel = null;
    static REQUEST = axios.create({
        baseURL: 'https://361f-180-149-216-45.ngrok-free.app/v1/',
        // baseURL: 'http://b1-api-dev.herokuapp.com'
    });
    static axios = axios;

    constructor() {
        this.handleRequest();
        this.handleResponse();
    }

    async requestHandler(request: any) {
        request.headers['Content-Type'] = 'application/json';
        return request;
    }

    errorHandler(error: any) {
        return Promise.reject({ ...error });
    }

    successHandler(response: any) {
        return response;
    }

    handleRequest() {
        Http.REQUEST.interceptors.request.use(async request => {
            return await this.requestHandler(request);
        });
    }

    handleResponse() {
        Http.REQUEST.interceptors.response.use(
            response => this.successHandler(response),
            error => this.errorHandler(error),
        );
    }
}
