﻿import { GetCookie } from './../cookies/mainCookie'

const TokenCookieName = "mtkn";
const UserIDCookieName = "uid";

export function CheckAccountCookies(forReload) {
    let authInfo = {
        token: GetCookie(TokenCookieName),
        id: GetCookie(UserIDCookieName)
    }

    if ((authInfo.token == "" || authInfo.id == "") && forReload) {
        document.location = "/auth";
    }

    return authInfo;
}

export function UpdateAccountCookies(token, userId) {
    document.cookie = TokenCookieName + "=" + token + "; path=/;max-age=604800";
    document.cookie = UserIDCookieName + "=" + userId + "; path=/;max-age=604800";
}