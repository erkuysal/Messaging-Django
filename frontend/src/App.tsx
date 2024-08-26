import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import {ThemeProvider} from "@mui/material";
import {createMuiTheme} from "./theme/light";
import ToggleTheme from "./theme/ToggleTheme";

import Home from "./pages/Home";
import Explore from "./pages/Explore";

// Router Configurations
const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={"/"} element={<Home />} />
            <Route path={"/explore/:categoryName"} element={<Explore />} />
            {/*<Route path={"/route1"} element={<Home />} />*/}
            {/*<Route path={"/route2"} element={<Home />} />*/}
            {/*<Route path={"/route3"} element={<Home />} />*/}
            {/*<Route path={"/route4"} element={<Home />} />*/}
        </Route>
    )
);

const App: React.FC = () => {

    return (
        <ToggleTheme>
            <RouterProvider router={Router}/>;
        </ToggleTheme>
    )
};

export default App;