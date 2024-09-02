import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import ToggleTheme from "./theme/ToggleTheme";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Server from "./pages/Server.tsx";
import Login from "./pages/Login.tsx";

// Router Configurations
const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={"/"} element={<Home />} />
            <Route path={"/server/:serverId/:channelId?"} element={<Server />} />
            <Route path={"/explore/:categoryName"} element={<Explore />} />
            <Route path={"login"} element={<Login />}/>
        </Route>
    )
);

const App: React.FC = () => {

    return (
        <ToggleTheme>
            <RouterProvider router={Router}/>
        </ToggleTheme>
    )
};

export default App;