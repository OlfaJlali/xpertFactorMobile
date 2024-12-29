export interface User {
    token: string;
    identifier: string;
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface SignInResponse {
    token: string;
    user: {
      identifier: string;
      name: string;
      email: string;
      phoneNumber: string;
    };
  }
  