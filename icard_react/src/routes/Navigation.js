import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import routes from "./routes";
import {map} from "lodash";

export function Navigation() {
  console.log(routes);
  return (
    <BrowserRouter>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <route.layout>
                <route.component />
              </route.layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
