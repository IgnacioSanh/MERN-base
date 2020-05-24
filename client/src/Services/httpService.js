import axios from "axios";

function setJwt(jwt) {
  // Common is for all methods (get, post, put, delete)
  axios.defaults.headers.common["x-auth"] = jwt;
  // The following case is for sending the header only in post methods
  // axios.defaults.headers.post["x-auth-token"] = auth.getJwt();
}

export default {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
  setJwt,
};
