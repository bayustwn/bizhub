import { Cookies, useCookies } from "react-cookie";
import { CookiesValue } from "../models/cookie";

export const useToken = () => {
  const [cookies, setCookies] = useCookies<'session'| 'posisi', CookiesValue>(['session', 'posisi']);

  const getToken = (): string => {
    return cookies.session;
  };

  const getPosisi = (): string => {
    return cookies.posisi;
  };
  
  const setToken = (token: string) => {
    setCookies('session', token, { path: '/' });
  };

  const setPosisi = (posisi: string) => {
    setCookies('posisi', posisi, { path: '/' });
  };

  const removeToken = () => {
    setCookies('session', '', { path: '/', expires: new Date(0) });
  };

  const removePosisi = () => {
    setCookies('posisi', '', {path: '/', expires: new Date(0)});
  };

  return { getToken, setToken, removeToken, getPosisi, setPosisi, removePosisi };
};
