import {
  BASE_URL,
  POST,
  ADD_USER,
  REQUEST_OTP,
  VERIFY_OTP,
  UPDATE_PASSWORD,
} from "./constants";
import { statusParsing, jsonParsing } from "../API/utilis";
import axios from "axios";

// export const post = (params = {}) => {
//   let userDetail = {
//     email: params.email,
//     password: params.password,
//     phoneNumber: params.mobile,
//   };

//   const resource = `${BASE_URL}${ADD_USER}`;
//   return axios
//     .post(resource, userDetail, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(statusParsing)
//     .then(jsonParsing)
//     .catch(error => {
//       error ? alert(error) : '';
//     });
// };
export const post = (params = {}) => {
  console.log(params, 'ldmlamdlamlmlamldmlamlmlml');
  
  let userDetail = {
    email: params.email,
    password: params.password,
    number: params.mobile,
  };

  const resource = `https://api.confidateapp.com/api/register`;
  return axios
    .post(resource, userDetail, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(statusParsing)
    .then(jsonParsing)
    .catch((error) => {
      error ? alert("User Already Exist") : "";
    });
};

export const getOtp = (params = {}) => {
  return axios
    .post(`${BASE_URL}${REQUEST_OTP}`, params, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(statusParsing)
    .then(jsonParsing)
    .catch((err) => {
      console.log("err", err);
    });
};
// export const verifyOtp = (params = {}) => {
//   return axios
//     .post(`${BASE_URL}${VERIFY_OTP}`, params, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then(statusParsing)
//     .then(jsonParsing)
//     .catch(err => {
//       console.log('err', err);
//     });
// };
export const verifyOtp = (params = {}) => {
  let id = params.id;
  let verifycode = {
    email: params.email,
    verifiedCode: params.otp,
  };
  // console.log("verifycode", verifycode,id);
  return axios
    .put(`https://api.confidateapp.com/api/conformCode/${id}`, verifycode, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(statusParsing)
    .then(jsonParsing)
    .catch((err) => {
      console.log("err", err);
    });
};

export const changePassword = (params = {}, headers) => {
  return (
    axios
      // .post(`${BASE_URL}${UPDATE_PASSWORD}`, params, { headers })
      .put(`https://api.confidateapp.com/api/changePassword`, params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(statusParsing)
      .then(jsonParsing)
      .catch((err) => {
        console.log("err", err);
      })
  );
};
