import { API_BASE_URL } from "../api-config";

export async function call(api, method, request){
  
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
   headers.append("Authorization", "Bearer " + accessToken);
 }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if(request){
    options.body = JSON.stringify(request);
  }

  return await fetch(options.url, options).then((response) =>{
    if(response.status === 200){
      return response.json();
    }else if(response.status === 403){
      window.location.href ="/login";
    }
  }).catch((error) =>{
    console.log("http error");
    console.log(error);
  });
}

export function signin(userDTO){
  return call("/user/signin", "POST", userDTO)
  .then((response) =>{
    if(response.token){
      sessionStorage.setItem("ACCESS_TOKEN", response.token)
      sessionStorage.setItem("Role", response.role)
      sessionStorage.setItem("userId", response.userId)
      window.location.href = "/";
    }
  })
} 

export function signout(){
  sessionStorage.removeItem("ACCESS_TOKEN")
  sessionStorage.removeItem("Role")
  sessionStorage.removeItem("userId")
  window.location.href = "/";
}

export function signup(userDTO){
  return call("/user/signup", "POST", userDTO)
}

export function getUserId(){
  const userId =sessionStorage.getItem("userId");
  if(userId !== null || userId !== undefined || userId !== ``)
    return sessionStorage.getItem("userId");
}

export function getRole(){
  const Role =sessionStorage.getItem("Role");
  if(Role !== null || Role !== undefined || Role !== ``)
    return Role;
}