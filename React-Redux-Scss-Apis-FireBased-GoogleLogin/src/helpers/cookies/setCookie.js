import Cookie from 'js-cookie';


// set your cookie variable just pass cookie name and value :)
const SetCookie = (cookieName, accessToken) => {
    Cookie.set(cookieName, accessToken, {
        expires: 1,      // expires in 1 days :)        // if you pass 1/24 then it's expires in 1 hour :)
        secure:true,
        sameSite:'strict',
        secure: true,   
        path: '/'   
    })
}

export default SetCookie;