import { jwtDecode } from "jwt-decode";
interface UserPayload {
  Email: string;
  Password: string;
  UserName: string;
  imageProfile: string;
  isAdmin: boolean;
  _id: string;
  __v: number;
}
interface DecodedToken {
  user: UserPayload;
  iat: number;
}
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};