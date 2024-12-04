import { httpAxios } from "@/config/httpBase";
import { UserSigninInfo, UserFormInfo } from "@/interface";

/* login / sign-in api end-point */
export async function auth_signin(payload: UserSigninInfo) {
  try {
    const res = await httpAxios.post("/api/signin", payload);
    const data = res.data;
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}

/* register / sign-up api end-point */
export async function auth_signup(payload: UserFormInfo) {
  try {
    const res = await httpAxios.post("/api/signup", payload);
    const data = res.data;
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}

/* logout api end-point */
export async function auth_logout() {
  try {
    const res = await httpAxios.post("/api/logout");
    const data = res.data;
    return data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return error.response.data;
  }
}