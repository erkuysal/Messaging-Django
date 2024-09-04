import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

import ToggleTheme from "./theme/ToggleTheme";

import {AuthServiceProvider} from "./context/AuthContext.tsx";

import ProtectedRoute from "./services/ProtectedRoute.tsx";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Server from "./pages/Server.tsx";
import Login from "./pages/Login.tsx";
import TestLogin from "./pages/testLogin";

// Router Configurations
const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={"/"} element={<Home />} />
            <Route path={"/server/:serverId/:channelId?"} element={<Server />} />
            <Route path={"/explore/:categoryName"} element={<Explore />} />
            <Route path={"login"} element={<Login />}/>
            <Route path={"testlogin"} element={
            <ProtectedRoute>
                <TestLogin />
            </ProtectedRoute>
            }/>
        </Route>
    )
);

const App: React.FC = () => {

    return (
        <AuthServiceProvider>
            <ToggleTheme>
                <RouterProvider router={Router}/>
            </ToggleTheme>
        </AuthServiceProvider>
    )
};

export default App;