import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useState} from "react";
import Title from "../../components/ui/typography/Title.tsx";
import {useAuth} from "../../contexts/Auth.tsx";
import {getUserByToken, login} from "../../requests/Auth.ts";
import CustomAlert from "../../components/ui/alert/CustomAlert.tsx";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Login = () => {
    const {saveAuth, setCurrentUser} = useAuth();
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        setHasErrors(false)
        setErrorMessage('')

        try {
            const {data: auth} = await login(values.email, values.password)

            saveAuth(auth)

            const {data: user} = await getUserByToken(auth.token)
            setCurrentUser(user)
        } catch (error) {
            saveAuth(undefined)
            setHasErrors(true)
            setErrorMessage('These credentials do not match our records.')
            setSubmitting(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white">
            <div className="flex flex-row justify-center mb-10">
                <Title text="Login" isHero={true}/>
            </div>

            {hasErrors && <CustomAlert message={errorMessage} color="danger"/>}

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({isSubmitting, isValid}) => (
                        <Form>
                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-roboto text-sm  font-medium text-gray-700">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="mt-1 p-2 w-full font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="div"
                                              className="text-red-500 text-sm pt-1 font-roboto"/>
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label htmlFor="password"
                                       className="block font-roboto text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="mt-1 p-2 w-full font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="password" component="div"
                                              className="text-red-500 text-sm pt-1 font-roboto"/>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-full bg-custom-blue-violet text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                                    disabled={isSubmitting || !isValid}
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};

export default Login;
