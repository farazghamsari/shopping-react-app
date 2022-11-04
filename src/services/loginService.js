import http from "./httpService";

const loginUser = (user)=>{
    return http.post('/user/login',user)
}

export default loginUser;