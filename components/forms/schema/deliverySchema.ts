import * as yup from "yup";

export const deliverySchema = yup.object({
  deliveryAddress: yup.string().required("Address is required"),
  deliveryCategory: yup.string().required("Category is required"),
  deliveryDescription: yup.string().required("Description is required"),
  // deliveryTime: yup.string().required("Time is required"),
  phonenumber: yup.string().required("Phonenumber is required"),
});
