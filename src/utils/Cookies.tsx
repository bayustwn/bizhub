import { useCookies } from "react-cookie";
import { CookiesValue } from "../models/cookie";

export const useToken = () => {
  const [cookies, setCookies] = useCookies<'session', CookiesValue>(['session']);

  const getToken = (): string => {
    return cookies.session;
  };

  const setToken = (token: string) => {
    setCookies('session', token, { path: '/' });
  };

  const removeToken = () => {
    setCookies('session', '', { path: '/', expires: new Date(0) });
  };

  return { getToken, setToken, removeToken};
};
