import React from "react";

import "./ClientLayout.scss";

export function ClientLayout(props) {
  const {children} = props;
  return (
    <div>
      <p>Client layout</p>
      {children}
    </div>
  );
}
