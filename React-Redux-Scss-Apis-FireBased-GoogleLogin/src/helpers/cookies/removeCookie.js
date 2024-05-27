import Cookie from 'js-cookie';

// remove your cookie variables from cookie :)
const RemoveCookie = (cookieName) => {
    return Cookie.remove(cookieName);
}

export default RemoveCookie;