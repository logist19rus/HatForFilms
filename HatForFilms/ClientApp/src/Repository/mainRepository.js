import { parseJSON } from 'jquery';
import { CheckAccountCookies } from './../cookies/accountCookies'

export class mainRepository {
    constructor() {
        this.request = this.request;
    }

    async request(link, isGet = true, headParams = null, isAuthorized = false) {
        let url = '' + link;
        let header = {};
        let met = 'GET';

        if (!isGet) {
            met = 'POST';
        }

        if (isAuthorized) {
            header = CheckAccountCookies();
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

        let response = await fetch(url,
            {
                headers: header,
                method: met
            });
        let res = await response.text();
        console.log(res == "" ? {} : parseJSON(res));
        return res == "" ? {} : parseJSON(res);
    }
}