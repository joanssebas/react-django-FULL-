import React from "react";
import "./LoginForm.scss";
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {loginApi} from "../../../api/user";
import {toast} from "react-toastify";
import {useAuth} from "../../../hooks";

export function LoginForm() {
  const {login} = useAuth();

  //console.log(useAuth());
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        const response = await loginApi(formValue);
        const {access} = response;
        //console.log(access);
        login(access);
        toast.success("Login exitoso");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <Form className="login-form-admin" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        placeholder="Contraseña"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Button type="submit" content="Iniciar sesión" primary fluid />
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
