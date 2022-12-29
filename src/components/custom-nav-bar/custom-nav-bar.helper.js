import { HttpGet } from "../../services/api-services";
import { BASE_URI, GET_USER } from "../../constants/endpoints";

export const fetchLoggedInUserDetails = async () => {
  try {
      let credentials = "Bearer " + localStorage.getItem("token");
      let apiUrl = BASE_URI + GET_USER + localStorage.getItem("loginId");
      let headers = {
          "Authorization": credentials
      }
      let response = await HttpGet(apiUrl, {}, headers)
    //   let response = {
    //       data: {
    //           "usersDto": [
    //               {
    //                   "loginId": "shubham@gmail.com",
    //                   "firstName": "shubham",
    //                   "lastName": "g",
    //                   "emailId": "shubham@gmail.com",
    //                   "password": "shubham",
    //                   "contactNumber": 9867452321,
    //                   "loggedIn": null
    //               }
    //           ]
    //       }
    //   }
      return response.data.usersDto[0];
  } catch (e) {
      throw e;
  }
}
