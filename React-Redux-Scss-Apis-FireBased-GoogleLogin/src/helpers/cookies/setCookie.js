import Cookie from 'js-cookie';

const SetCookie = (cookieName, accessToken) => {
    Cookie.set(cookieName, accessToken, {
        expires: 1, // expires in 1 days
        secure:true,
        sameSite:'strict',
        secure: true,   
        path: '/'   
    })
}

export default SetCookie;