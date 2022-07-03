import * as yup from "yup";

export const loginSchema = yup.object({
  emailOrPhone: yup
    .string()
    .required("Enter your Email/Phone Number")
    .test("test-name", "Enter Valid Phone/Email", function (value) {
      const phoneRegExp: any =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
      const emailRegex: any =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      let isValidEmail = emailRegex.test(value);
      let isValidPhone = phoneRegExp.test(value);

      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    }),
  password: yup.string().required("Password is required"),
});
