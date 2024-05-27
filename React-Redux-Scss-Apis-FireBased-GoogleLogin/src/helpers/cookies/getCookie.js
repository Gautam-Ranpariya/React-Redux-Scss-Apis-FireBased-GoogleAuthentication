import Cookie from 'js-cookie';

// get your cookie variables value just pass cookie name :)
const GetCookie = (cookieName) => {
    const token = Cookie.get(cookieName);
    return token;
}

export default GetCookie;
