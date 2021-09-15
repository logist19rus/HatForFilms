export class AccountRepository {
    async Auth(login, password) {
        let response = await fetch('/api/identify/Authorize?login=' + login + '&pass=' + password);
        let data = '';
        if (response.ok) {
            data = await response.text();
        }
        return data;
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

        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    }
}