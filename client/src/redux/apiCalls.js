import { loginFailure, loginStart, loginSuccess } from "./userSlice"
import axios from "axios"

export const login=async(dispatch,user)=>{
    dispatch(loginStart());
    try {
        const res=await axios.post("http://localhost:5000/api/user/loginUser",user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}