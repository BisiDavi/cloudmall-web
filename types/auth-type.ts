export type submitHandlerType = {
  emailOrPhone: string;
  password: string;
};

export type loginType = submitHandlerType & {
  userType: "USER";
};
