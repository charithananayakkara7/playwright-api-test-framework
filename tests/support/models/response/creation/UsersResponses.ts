export {CreateUserDetailsResponse,GetUserDetailsResponse};

interface CreateUserDetailsResponse{
  [x: string]: any;
  "id":string;
  "name": string;
  "email": string;
  "gender": string;
  }

  interface GetUserDetailsResponse{
    [x: string]: any;
    "id":string;
    "name": string;
    "email": string;
    "gender": string;
  }
  