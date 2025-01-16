import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Title from "../../components/ui/typography/Title.tsx";
import {useAuth} from "../../contexts/Auth.tsx";
import {getUserByToken, register} from "../../requests/Auth.ts";
import CustomAlert from "../../components/ui/alert/CustomAlert.tsx";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
});

const Register = () => {
    const {saveAuth, setCurrentUser} = useAuth();
    const [hasErrors, setHasErrors] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (values: RegisterFormValues, {setSubmitting}: any) => {
        try {
            const {data: auth} = await register(values.name, values.email, values.password, values.password_confirmation)

            saveAuth(auth)

            const {data: user} = await getUserByToken(auth.token)
            setCurrentUser(user)
        } catch (error) {
            saveAuth(undefined)
            setHasErrors(true)
            setErrorMessage('These credentials do not match our records.')
            setSubmitting(false)
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white">
            <div className="flex flex-row justify-center mb-10">
                <Title text="Sign up" isHero={true}/>
            </div>

            {hasErrors && <CustomAlert message={errorMessage} color="danger"/>}

            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    {/* Name */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-roboto text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Field
                            name="name"
                            type="text"
                            className="mt-1 p-2 w-full font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm pt-1 font-roboto"/>
                    </div>

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
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm pt-1 font-roboto"/>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-roboto text-sm font-medium text-gray-700">
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

                    <div className="mb-6">
                        <label htmlFor="password_confirmation" className="block font-roboto text-sm font-medium text-gray-700">
                           Confirmation Password
                        </label>
                        <Field
                            name="password_confirmation"
                            type="password"
                            className="mt-1 p-2 w-full font-roboto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="password_confirmation" component="div"
                                      className="text-red-500 text-sm pt-1 font-roboto"/>
                    </div>


                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-custom-blue-violet text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Sign up
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
