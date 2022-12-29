export type LoginResponse = {
  authResponse: {
    accessToken: string;
    userID: string;
    expiresIn: number;
    signedRequest: string;
    graphDomain: string;
    data_access_expiration_time: number;
  };
  status: string;
};

export type LoginStatus = {
  loginSource: string;
} & LoginResponse;
