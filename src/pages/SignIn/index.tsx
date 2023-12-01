import { useFormik } from "formik";

import { FormExtra, FormHeader, FormInput } from "../../components";
import { LoginFormState } from "../../types";

import { loginSchema } from "../../utils/yupSchema";
import { SIGN_IN_FORM } from "../../utils/constant";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const {handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    onSubmit: async () => {
      try {
        const result = await authService.signIn(values);
        alert("Successfully Logged In!");
        navigate('/');
      } catch (error) {
        alert(JSON.stringify(error));
      }
    }
  })

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <FormHeader />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {SIGN_IN_FORM.map((item, index) => (
                <FormInput
                  {...item}
                  key={`sign-in-form-${index}`}
                  value={values[item.name as keyof LoginFormState]}
                  handleChange={handleChange}
                  errors={errors}
                />
              ))}
              <FormExtra />
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
