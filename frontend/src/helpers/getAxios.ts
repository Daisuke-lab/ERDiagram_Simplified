import axios from "axios";
import { CustomSessionType } from "../../types";

export default function getAxios(session:CustomSessionType | null) {
  let headers = {"Content-Type": "application/json"}
  if (session !== null) {
    headers["Authorization"] = `Bearer ${session?.accessToken}`
  }
  const backendAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    responseType: "json",
    headers: headers,
  });
  return backendAxios
}




