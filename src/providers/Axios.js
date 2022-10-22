import axios from "axios";
import credentials from "credentials.json";

const baseURL = credentials.SERVER_URL;

export const getProjectByPath = (pathname, defaultPath) => {
  const slug = typeof pathname === "string" ? pathname.split("/")[1] || defaultPath : defaultPath;
  return axios
    .get(`${baseURL}/projects/slug/${slug}`)
    .then((response) => {
      if (response.status == 200) {
        return response.data;
      }
    })
    .catch((e) => {
      window.location = `/${defaultPath}`;
    });
};
