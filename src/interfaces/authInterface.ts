export interface loginRequest {
  username: string;
  password: string;
}
export interface registerRequest extends loginRequest {
  email: string;
}
