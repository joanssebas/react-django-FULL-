import React, {useState, useCallback} from "react";
import "./AddEditCategoryForm.scss";
import {Form, Image, Button} from "semantic-ui-react";
import {useDropzone} from "react-dropzone";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useCategory} from "../../../../hooks";

export function AddEditCategoryForm(props) {
  const {onClose, onRefresh} = props;
  const [previewImage, setPreviewImage] = useState(null);
  const {addCategory} = useCategory();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await addCategory(formValue);
        onClose();
        onRefresh();
      } catch (error) {
        console.error(error);
      }
      console.log("formulario enviado");
      console.log(formValue);
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];

    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
    //console.log(file);
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de la categoria"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        Seleccionar archivo...
      </Button>
      <input {...getInputProps()} />

      <Image src={previewImage} fluid />
      <Button type="submit" fluid content="Crear" primary />
    </Form>
  );
}

function initialValues() {
  return {
    title: "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}
