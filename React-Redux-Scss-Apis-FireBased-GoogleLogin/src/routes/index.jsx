import React , { Suspense , lazy}  from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Loader from '../shared/common/loader';
import { ProtectedRoute } from './protectedRoute';

const Home = lazy(() => import('../app/home'));
const Error = lazy(() => import('../app/error'));
const Profile = lazy(() => import('../app/profile'));
const Login = lazy(() => import('../auth/login'));
const SignUp = lazy(() => import('../auth/signup'));
const VerificationCode = lazy(() => import('../auth/verificationCode'));
const ForgotPassword = lazy(() => import('../auth/forgotPassword'));
const ResetPassword = lazy(() => import('../auth/resetPassword'));



export default function RouterComponents() {
  return (
    <div>
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path ='/verificationCode' element={<VerificationCode />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/resetPassword' element={<ResetPassword />} />
                    <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </Suspense> 
        </Router>
    </div>
  )
}
