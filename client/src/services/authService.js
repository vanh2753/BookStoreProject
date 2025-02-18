import axios from '../ultis/axios'

// const register = (username, email, password) => {
//   return axios.post(axios + "users/register", {
//     username,
//     email,
//     password,
//   });
// };

const login = (email, password) => {
  return axios.post(`users/login`, { email, password })
}

const register = (name, phone, email, password, role) => {
  return axios.post(`users/register`, { name, phone, email, password, role })
}

export {
  register,
  login,
  //logout,
};