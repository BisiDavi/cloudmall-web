import * as yup from "yup";

export const deliverySchema = yup.object({
  address: yup.string().required("Address is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  time: yup.string().required("Time is required"),
  phonenumber: yup.string().required("Phone number is required"),
});
