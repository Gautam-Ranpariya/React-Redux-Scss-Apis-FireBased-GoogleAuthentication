import Cookie from 'js-cookie';

const RemoveCookie = (cookieName) => {
    return Cookie.remove(cookieName);
}

export default RemoveCookie;