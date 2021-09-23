import { mainRepository } from "./mainRepository";

export class AccountRepository extends mainRepository {
    async Auth(login, password) {
        let params = [];
        params.push({ name: 'login', val: login });
        params.push({ name: 'pass', val: password });
        return await this.request('api/identify/Authorize', true, params, false, null);
        //let response = await fetch('/api/identify/Authorize?login=' + login + '&pass=' + password);
        //if (response.ok) {
        //    let resp = await response.json();
        //    return { succes: true, value: JSON.parse(resp.value) };
        //}
        //else {
        //    return { succes: false, value: "Not succes response" };
        //}
    }

    async Register(login, password) {
        let response = await fetch('/api/identify/Reg',
            {
                method: 'POST',
                headers: {
                    login: login,
                    pass: password
                }
            });

        return await response.json();
    }

    async GetMe() {
        return await this.request('api/identify/GetMe', true, null, true, null);
    }
}