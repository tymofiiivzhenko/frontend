export interface User {
  id?: number;
  email: string;
  password?: string;
  username?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
