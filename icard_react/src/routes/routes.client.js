import {ClientLayout} from "../layouts";
import {Home} from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: ClientLayout,
    component: Home,
  },
];

export default routesClient;
