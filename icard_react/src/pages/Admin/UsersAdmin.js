import React, {useEffect, useState} from "react";
import {useUser} from "../../hooks";
import {HeaderPage, TableUsers, AddEditUserForm} from "../../components/Admin";
import {Loader} from "semantic-ui-react";
import {ModalBasic} from "../../components/Common";

export function UsersAdmin() {
  const {loading, users, getUsers, deleteUser} = useUser();

  const [titleModal, setTitleModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [refresh, setRefresh] = useState(false);

  //console.log(users);

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const openCloseModal = () => setShowModal((prev) => !prev);
  const onRefresh = () => setRefresh(!refresh);

  const addUser = () => {
    setTitleModal("Nuevo usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefresh={onRefresh} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        onRefresh={onRefresh}
        user={data}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`Eliminar usuario ${data.email}?`);

    if (result) {
      try {
        await deleteUser(data.id);
        onRefresh();
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo usuario"
        btnClick={addUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
        />
      )}

      <ModalBasic
        show={showModal}
        title={titleModal}
        children={contentModal}
        onClose={openCloseModal}
      />
    </>
  );
}
