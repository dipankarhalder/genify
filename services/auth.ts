import { httpAxios } from "@/config/httpBase";
import { UserSigninInfo, UserFormInfo } from "@/interface";

export async function super_admin_signin(payload: UserSigninInfo) {
  try {
    const res = await httpAxios.post("/api/auth/signin", payload);
    const data = res.data;
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}


export async function super_admin_signup(payload: UserFormInfo) {
  try {
    const res = await httpAxios.post("/api/auth/signup", payload);
    const data = res.data;
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}