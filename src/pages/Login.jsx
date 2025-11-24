import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(4, "Password too short").required("Password is required"),
  });

  const handleSubmit = (values) => {
    const user = login(values.email, values.password);
    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    // Redirect based on role
    if (user.role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.1),transparent_70%)]" />

      <div className="relative bg-gray-900 p-8 rounded-3xl shadow-[0_0_30px_rgba(255,215,0,0.5)] w-96 z-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, values }) => (
            <Form className="flex flex-col gap-4">
              <Input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="email@gmail.com"
                autoComplete="email"/>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />

              <Input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"/>
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />

              <Button type="submit" text="Login" className="bg-yellow-400 hover:bg-yellow-500 text-black mt-2 w-full" />
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center text-gray-300">
          No account?{" "}
          <span className="text-yellow-400 cursor-pointer hover:text-yellow-300" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
