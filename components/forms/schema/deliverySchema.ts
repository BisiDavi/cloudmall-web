import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const deliverySchema = yup.object({
  address: yup.string().required("Address is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  time: yup.string().required("Time is required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
