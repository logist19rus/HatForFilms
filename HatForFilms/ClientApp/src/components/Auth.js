import React, { useState } from 'react'
import { AccountRepository } from './../Repository/AccountRepository'
import { UpdateAccountCookies } from "./../cookies/accountCookies"
import { parseJSON } from 'jquery';

export function Authorize(props) {
    console.log(props);
    var accRep = new AccountRepository();

    const inputClasses = {
        login: 'loginInput',
        pass: 'loginPass'
    };

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    function onInputChange(e) {
        let target = e.target;
        let val = '';
        if (target == null) {
            return;
        }
        val = target.value;

        var targetClass = target.className;

        if (targetClass == inputClasses.login) {
            setLogin(x => x = val);
        }
        else if (targetClass == inputClasses.pass) {
            setPass(x => x = val);
        }
    }

    function reg() {
        console.log('reg');
        accRep.Register(login, pass);
    }

    function auth() {
        console.log('auth');
        console.log(login);
        accRep.Auth(login, pass).then((res) => {
            console.log(res);
            let creds = parseJSON(res);
            UpdateAccountCookies(creds.token, creds.id);
        });
    }

    return (
        <form>
            <input className={inputClasses.login} type='text' value={login} onChange={onInputChange} />
            <input className={inputClasses.pass} type='text' value={pass} onChange={onInputChange} />
            <input type='button' value="зайти" onClick={auth} />
            <input type='button' value="reg" onClick={reg} />
        </form>
    );
}