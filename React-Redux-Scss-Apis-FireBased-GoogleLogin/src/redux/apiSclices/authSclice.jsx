import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Instance from '../../axios/axiosInstance';
import { authHeader } from "../../helpers/headerAxios/headerAxios";


const auth = {
    
    user: {
        email: "",
        password: "",
        conformPassword: "",
    },  // userData states :)   

    loading: "init",    // api calling states :)

    userOtp: "init",    // verify user :)

    forgotEmail : "",   // forgorPassword :)

    forgotPasswordUser : {
        resetPassword : "", 
        reserConfromPassword : "",
    },   // reset password :)

    error : null, // error message :)
}


// Check already user :)
export const alreadyUser = createAsyncThunk(
    'auth/alreadyUser',
    async (initialUserData) => {
        const body = {
            email: initialUserData,
        }
        try {
            const response = await Instance.post('user/already-user', body, {headers : authHeader()})
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
)

// Send mail thunk :)
export const sendOtpMail = createAsyncThunk(
    'auth/sendOtpMail',
    async initialUserMail => {
        const body = {
            email: initialUserMail
        }
        try {
            const response = await Instance.post('otp/send', body, { headers: authHeader() })
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
)

// Sign up user thunk :)
export const signUpUser = createAsyncThunk(
    'auth/signUpUser',
    async initialUserData => {
        const body = {
            email: initialUserData.user.email,
            otp: Number(initialUserData.userOtp),
            password: initialUserData.user.password,
        }
        console.log('initial user data', body);
        try {
            const response = await Instance.post('user/singup', body, { headers: authHeader() })
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
)

// Login user thunk :)
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async initialUserData => {
        const body = {
            email: initialUserData.email,
            password: initialUserData.password
        }
        try {
            const response = await Instance.post('user/login', body, { headers: authHeader() })
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
)

// Verify user forgot password & otp thunk :)
export const verifyForgotPasswordData = createAsyncThunk(
    'auth/verifyForgotPasswordData',
    async initialUserData => {
        const body = {
            email: initialUserData.forgotPassEmail,
            otp: Number(initialUserData.userOtp),
        }
        try {
            const response = await Instance.post('otp/varified', body, { headers: authHeader() })
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
)

// Forgot password thunk :)
export const forgorPassword = createAsyncThunk(
    'auth/forgorPassword',
    async initialUserData => {
        const body = {
            email: initialUserData.email,
            otp: Number(initialUserData.otp),
            newPassword :initialUserData.password,
        }
        try {
            const response = await Instance.put('user/forget-password', body, { headers: authHeader() })
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    }
)



// ******************************** User Registration Sclice ********************************
export const authSclice = createSlice({
    name: 'auth',
    initialState: auth,
    reducers: {
        // Set new user data :)
        setNewUserData: (state, action) => {
            const { name, value } = action.payload;
            state.user[name] = value;
        },

        // Reset user data :)
        resetUserData(state) {
            state.user = auth.user;
        },

        // Login user data :)
        loginUserData(state, action) {
            const { name, value } = action.payload;
            state.user[name] = value;
        },

        // set otp data :)
        setUserOtp(state, action) {
            const {otp} = action.payload;
            state.userOtp = otp;
        },

        // forgotPassword Email data :)
        setForgotPasswordEmailData(state, action){
            state.forgotEmail = action.payload;
        },

         // forgotPassword resetPassword data :)
         setForgotPasswordData(state, action){
            const {name , value} = action.payload;
            state.forgotPasswordUser[name] = value;
            // state.resetPassword = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            // check already user or not :)
            .addCase(alreadyUser.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(alreadyUser.fulfilled, (state, action) => {
                state.loading = "success";
            })
            .addCase(alreadyUser.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error;
                console.log("🚀 ~ .addCase ~ action.error:", action.error)
            })


            // check Mail send or not :)
            .addCase(sendOtpMail.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(sendOtpMail.fulfilled, (state, action) => {
                state.loading = "success";
            })
            .addCase(sendOtpMail.rejected, (state, action) => {
                state.loading = "failed";
            })


            // sign up user :)
            .addCase(signUpUser.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = "success";
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = "failed";
            })


             // login user :)
             .addCase(loginUser.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = "success";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = "failed";
            })


             // verify forgot password data email & otp :)
             .addCase(verifyForgotPasswordData.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(verifyForgotPasswordData.fulfilled, (state, action) => {
                state.loading = "success";
            })
            .addCase(verifyForgotPasswordData.rejected, (state, action) => {
                state.loading = "failed";
            })


             // forgot password data :)
             .addCase(forgorPassword.pending, (state, action) => {
                state.loading = "pending";
            })
            .addCase(forgorPassword.fulfilled, (state, action) => {
                state.loading = "success";
            })
            .addCase(forgorPassword.rejected, (state, action) => {
                state.loading = "failed";
            })
    }
})

export const { setNewUserData, resetUserData, loginUserData, setUserOtp, setForgotPasswordEmailData ,setForgotPasswordData } = authSclice.actions;
export default authSclice.reducer;