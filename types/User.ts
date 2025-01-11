export interface User {
    token: string;
    identifier: string;
    name: string;
    email: string;
    phoneNumber: string;
    firstlogin: boolean;
    profilePicture: string;
  }
  
export interface SignInResponse {
  token: string;
  user: {
    identifier: string;
    name: string;
    email: string;
    phoneNumber: string;
    firstlogin: boolean;
    profilePicture: string;
  };
}
export interface RecoverPasswordResponse {
  status: number;
  message: string;
}
export interface UpdateProfilePictureResponse {
  message: string;
  profilePicture: string;
}

  