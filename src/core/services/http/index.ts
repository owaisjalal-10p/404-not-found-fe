import axios from 'axios';

export class Http {
    _channel = null;
    static REQUEST = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
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
