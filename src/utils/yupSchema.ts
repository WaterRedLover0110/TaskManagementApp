import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required!"),
  password: Yup.string().required("The password is required"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required!"),
  name: Yup.string().required("The field is required."),
  password: Yup.string().required("The password is required"),
  confirm: Yup.string().required("The field is required"),
});

export const newTaskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Description is required!"),
  dueDate: Yup.string().required("Due date is required!"),
  type: Yup.string().required("Type is required."),
  urgency: Yup.string().required("Urgency is required"),
})