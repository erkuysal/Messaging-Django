import {BrowserRouter, Route, Routes} from "react-router-dom";

import ToggleTheme from "./theme/ToggleTheme";

import {AuthServiceProvider} from "./context/AuthContext.tsx";

import ProtectedRoute from "./services/ProtectedRoute.tsx";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Server from "./pages/Server.tsx";
import Login from "./pages/Login.tsx";
import TestLogin from "./pages/testLogin";


const App: React.FC = () => {

    return (
        <BrowserRouter>
            <AuthServiceProvider>
                <ToggleTheme>
                    <Routes>
                        <Route path={"/"} element={<Home />} />

                        <Route path={"/server/:serverId/:channelId?"} element={<ProtectedRoute><Server /></ProtectedRoute>} />

                        <Route path={"/explore/:categoryName"} element={<Explore />} />

                        <Route path={"login"} element={<Login />}/>

                        <Route path={"testlogin"} element={
                            <ProtectedRoute>
                                <TestLogin />
                            </ProtectedRoute>}
                        />

                    </Routes>
                </ToggleTheme>
            </AuthServiceProvider>
        </BrowserRouter>
    )
};

export default App;