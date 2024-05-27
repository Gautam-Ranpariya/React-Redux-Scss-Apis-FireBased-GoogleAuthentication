import { toast } from "react-toastify";


// check validation user data for signup  and forgot password :)
export default function ValidateUserRegistration(data) {
      let isValid = false;
      const email_pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

      if ((data.email === "") || (data.email.length === 0)) {
            toast.error("Please Enter Your Email");
            return isValid;
      }
      else if (!email_pattern.test(data.email)) {
            toast.error("Please Enter a Your Correct Email ");
            return isValid;
      }
      else if ((data.password === "") || (data.password.length === 0)) {
            toast.error("Please Enter Your Password");
            return isValid;
      }
      else if ((data.password.length <= 7)) {
            toast.error("Please Enter more then 7 Character")
            return isValid;
      }
      else if (!password_pattern.test(data.password)) {
            toast.error("Please Enter Strong Password !!")
            return isValid;
      }
      else if ((data.conformPassword === "") || (data.conformPassword.length === 0)) {
            toast.error("Please Enter Your Conform Password")
            return isValid;
      }
      else if (data.password !== data.conformPassword) {
            toast.error("Please Enter Same Password")
            return isValid;
      }
      isValid = true;
      return isValid;
}