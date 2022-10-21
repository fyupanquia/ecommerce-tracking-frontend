import axios from "axios";
import credentials from "credentials.json";

const baseURL = credentials.SERVER_URL;

export const getProjectByPath = (pathname, defaultPath) => {
  const slug = typeof pathname === "string" ? pathname.split("/")[1] || defaultPath : defaultPath;
  console.log({pathname, slug})
  return axios
    .get(`${baseURL}/projects/${slug}`)
    .then((response) => {
      if (response.status == 200) {
        return response.data;
      }
    })
    .catch((e) => {
      console.log(e);
      return getProjectByPath(defaultPath);
    });
};
