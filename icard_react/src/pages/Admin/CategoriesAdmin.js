import React, {useEffect, useState} from "react";
import {
  HeaderPage,
  TableCategoryAdmin,
  AddEditCategoryForm,
} from "../../components/Admin";
import {useCategory} from "../../hooks";
import {Loader} from "semantic-ui-react";
import {ModalBasic} from "../../components/Common";

export function CategoriesAdmin() {
  const {loading, categories, getCategories} = useCategory();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refresh, setRefresh] = useState(false);
  //console.log(categories);

  useEffect(() => {
    getCategories();
  }, [refresh]);

  const openCloseModal = () => {
    setShowModal((prev) => !prev);
  };
  const onRefresh = () => {
    setRefresh(!refresh);
  };

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefresh={onRefresh} />
    );
    openCloseModal();
  };

  return (
    <>
      <HeaderPage
        title="Categories"
        btnTitle="Nueva categoria"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategoryAdmin categories={categories} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
