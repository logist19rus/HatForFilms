import React, { useState, useEffect } from 'react'
import { AccountRepository } from './../Repository/AccountRepository'
import { UpdateAccountCookies, CheckAccountCookies } from "./../cookies/accountCookies"
import '../components/Auth/auth.css'
import { parseJSON } from 'jquery';


export function Authorize(props) {
    console.log(props);
    var accRep = new AccountRepository();
    let selectedClass = "heder-signin-selected";

    const inputClasses = {
        login: 'loginInput',
        pass: 'loginPass'
    };

    const [isAuth, setIsAuth] = useState(false);

    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [loginType, setLoginType] = useState(selectedClass);
    const [regType, setRegType] = useState("");

    const [user, setUser] = useState({});

    function onInputChange(e) {
        let target = e.target;
        let val = '';
        if (target == null) {
            return;
        }
        val = target.value;

        var targetClass = target.className;

        if (targetClass.includes(inputClasses.login)) {
            setLogin(x => x = val);
        }
        else if (targetClass.includes(inputClasses.pass)) {
            setPass(x => x = val);
        }
    }
    function CheckCoockie() {
        let creds = CheckAccountCookies(false);
        if (!!creds.id && !!creds.token) {
            return true;
        }
        else {
            return false;
        }
    }

    function reg() {
        accRep.Register(login, pass).then((res) => {
            if (res.succes) {
                auth();
            }
            else {
                alert(res.value);
            }
        });
    }

    function auth() {
        accRep.Auth(login, pass).then((res) => {
            if (res.succes) {
                let creds = parseJSON(res.value);
                UpdateAccountCookies(creds.token, creds.id);
                setIsAuth(x => x = true);
                setLogin(x => x = "");
                setPass(x => x = "");
                loadAccount();
            }
            else {
                console.log(res.value);
            }
        });
    }

    function SetSignInType(stat) {
        if (stat === 1) {
            setRegType(x => x = "");
            setLoginType(x => x = selectedClass);
        }
        else if (stat === 2) {
            setRegType(x => x = selectedClass);
            setLoginType(x => x = "");
        }
    }

    function exit() {
        UpdateAccountCookies("", "");
        setIsAuth(x => x = false);
        setUser(x => x = {});
    }

    function loadAccount() {
        accRep.GetMe().then((res) => {
            let user = parseJSON(res.value);
            console.log(user);
            setUser(x => x = user);
        });
    }

    function submitForm() {
        if (regType == "") {
            auth();
        }
        else {
            reg();
        }
    }

    useEffect(() => {
        if (CheckCoockie()) {
            loadAccount();
            setIsAuth(x => x = true);
        }
    }, [])

    return (
        <div className="auth-page">
            {!isAuth ?
                (<div>
                    <div className="header-signin-type">
                        <div className={loginType} onClick={() => { SetSignInType(1); }}>Вход</div>
                        <div className={regType} onClick={() => { SetSignInType(2); }}>Регистрация</div>
                    </div>
                    <form className='auth-form' onSubmit={submitForm}>
                        <input className={'auth-input ' + inputClasses.login} type='text' value={login}
                            onChange={onInputChange} placeholder='Логин' />
                        <input className={'auth-input ' + inputClasses.pass} type='text' value={pass}
                            onChange={onInputChange} placeholder='Пароль' />
                        {regType == "" ?
                            (<input className='auth-btn' type='submit' value="Войти"/>) :
                            (<input className='auth-btn' type='submit' value="Зарегистрироваться"/>)}
                    </form>
                </div>) :
                (<div>
                    <div className='user-form-row'>
                        <div className='user-form-name'>Ваш ID в системе</div>
                        <div className='user-form-val'>{user.Id}</div>
                    </div>
                    <div className='user-form-row'>
                        <div className='user-form-name'>Ваш логин</div>
                        <div className='user-form-val'>{user.login}</div>
                    </div>
                    <div className='user-form-footer'>
                        <button className='exit-btn' onClick={exit} >Выйти</button>
                    </div>
                </div>)}
        </div>
    );
}