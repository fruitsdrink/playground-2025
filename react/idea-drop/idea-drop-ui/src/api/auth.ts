import api from "@/lib/axios";

export const registerUser = async(data: {
  name:string;
  email: string;
  password: string
})=>{
  try{
    const res = await api.post('/auth/register', data);
    return res.data
  }catch(err: any){
    console.error(err)
    const message = err.resonse?.message || "Failed to register"
    throw new Error(message)
  }
}

export const loginUser = async(data: {
  email: string;
  password: string
})=>{
  try{
    const res = await api.post('/auth/login', data);
    return res.data
  }catch(err: any){
    console.error(err)
    const message = err.resonse?.message || "Failed to login"
    throw new Error(message)
  }
}

export const logoutUser = async()=>{
  try{
    await api.post('/auth/logout');
  }catch(err: any){
    console.error(err)
    const message = err.resonse?.message || "Failed to logout"
    throw new Error(message)
  }
}

export const refresAccessToken = async ()=>{
  try{
    const res = await api.post('/auth/refresh');
    return res.data
  }catch(err: any){
    console.error(err)
    const message = err.resonse?.message || "Failed to refresh access token"
    throw new Error(message)
  }
}