import { parseJSON } from 'jquery';
import { CheckAccountCookies } from './../cookies/accountCookies'

export class mainRepository {
    constructor() {
        this.request = this.request;
    }

    async request(link, isGet = true, headParams = null, isAuthorized = false, body = null) {
        let url = '' + link;
        let header = {
            'Content-Type': 'application/json;charset=utf-8'
        };

        if (isAuthorized) {
            header.Id = CheckAccountCookies().id;
            header.token = CheckAccountCookies().token;
        }

        if (headParams != null && Array.isArray(headParams)) {
            url += "?";
            let count = 0;
            for (let i in headParams) {
                if (headParams[i].name != null && headParams[i].val != null) {
                    if (count > 0) {
                        url += "&";
                    }
                    url += headParams[i].name + "=" + headParams[i].val;
                    count++;
                }
            }
        }
        let response;
        if (isGet) {
            response = await fetch(url,
                {
                    headers: header,
                    method: 'GET'
                });
        }
        else {
            console.log(JSON.stringify(body));
            response = await fetch(url,
                {
                    headers: header,
                    method: 'POST',
                    body: body != null ? JSON.stringify(body) : "{}"
                });
        }
        let res = await response.text();
        console.log(res == "" ? {} : parseJSON(res));
        return res == "" ? {} : parseJSON(res);
    }
}