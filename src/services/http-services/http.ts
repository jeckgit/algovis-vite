import axios from 'axios';

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  // axiosClient.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   }, 
  //   function (error) {
  //     let res = error.response;
  //     if (res.status == 404) {
  //       // 404 erer
  //       window.location.href = `${process.env.FRONTEND_BASE_URL}404`;
  //     }
  //     console.error("Looks like there was a problem. Status Code: " + res.status);
  //     return Promise.reject(error);
  //   }
  // );

  export { httpClient };