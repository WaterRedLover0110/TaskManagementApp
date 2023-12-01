import { useFormik } from "formik";
import { FormHeader, FormInput } from "../../components";
import { SIGN_UP_FORM } from "../../utils/constant";
import { registerSchema } from "../../utils/yupSchema";
import { RegisterFormState } from "../../types";

const SignUp = () => {
	const {handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirm: ''
    },
    validationSchema: registerSchema,
    validateOnChange: true,
    onSubmit: () => {
      alert(JSON.stringify(values))
    }
  })

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <FormHeader />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              {SIGN_UP_FORM.map((item, index) => (
                <FormInput
                  {...item}
                  key={`sign-up-form-${index}`}
                  value={values[item.name as keyof RegisterFormState]}
                  handleChange={handleChange}
                  errors={errors}
                />
              ))}
              <button
                type="submit"
                className="w-full text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
