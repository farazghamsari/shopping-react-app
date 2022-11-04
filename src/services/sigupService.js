import http from "./httpService";

const signupUser = (user)=>{
    return http.post('/user/register',user)
}
export default signupUser;