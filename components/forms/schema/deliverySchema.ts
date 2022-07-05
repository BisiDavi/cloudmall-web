import * as yup from "yup";

const phoneRegExp =
  /^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/;

export const deliverySchema = yup.object({
  address: yup.string().required("Address is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  time: yup.string().required("Time is required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});
