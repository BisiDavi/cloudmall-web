export type submitHandlerType = {
  emailOrPhone: string;
  password: string;
};

export type loginType = submitHandlerType & {
  userType: "USER";
};

export type userLoginType = {
  userType: string;
  email?: string;
  phonenumber?: string;
  password: string;
};

export type googleSigninType = {
  code: string;
  cartId: string;
};