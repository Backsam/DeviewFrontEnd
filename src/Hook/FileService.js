import { API_BASE_URL } from "../api-config";

export async function fileCall(api, method, request){
  
    let headers = new Headers({
        //"Content-Type": `multipart/form-data`,
    });

    const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
     headers.append("Authorization", "Bearer " + accessToken);
   }

   let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
    body : request
  };

  return await fetch(options.url, options).then((response) =>{
    if(response.status === 200){
      if(response.headers.get("Content-Type") ==="application/pdf"){
        console.log("pdf-type")
        return response;
      }
      return response.json();
    }
  }).catch((error) =>{
    console.log("http error");
    console.log(error);
  });
}