import React from "react";
import "./AdminLayout.scss";
import {LoginAdmin} from "../../pages/Admin/LoginAdmin";
import {useAuth} from "../../hooks";
import {TopMenu, SideMenu} from "../../components/Admin";

export function AdminLayout(props) {
  const {children} = props;

  //console.log(useAuth());
  const {auth} = useAuth();
  //const auth = null;

  if (!auth) return <LoginAdmin />;

  return (
    <div className="admin-layout">
      <div className="admin-layout_menu">
        <TopMenu />
      </div>
      <div className="admin-layout_main-content">
        <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
}
