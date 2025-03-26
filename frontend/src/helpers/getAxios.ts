import axios from "axios";
import { CustomSessionType } from "../../types";
import isClient from "./isClient";

export default function getAxios(session:CustomSessionType | null) {
  let headers = {"Content-Type": "application/json"}
  if (session !== null) {
    headers["Authorization"] = `Bearer ${session?.accessToken}`
  }
  const baseURL = isClient() ? process.env.NEXT_PUBLIC_CLIENT_API_URL : process.env.NEXT_PUBLIC_SSR_API_URL
  const backendAxios = axios.create({
    baseURL: baseURL,
    responseType: "json",
    headers: headers,
  });
  return backendAxios
}




