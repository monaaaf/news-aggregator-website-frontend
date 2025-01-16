import React, {FC, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import App from "../App";
import {useAuth} from "../contexts/Auth.tsx";
import {ErrorsPage} from "../components/errors/ErrorsPage.tsx";
import {Logout} from "../pages/auth/Logout.tsx";
import {AuthRoutes} from "./AuthRoutes.tsx";
import Home from "../pages/Home.tsx";
import Articles from "../pages/Articles.tsx";
import SingleArticle from "../pages/Article.tsx";

const {PUBLIC_URL} = import.meta.env;
const PrivateRoutes = lazy(() => import('./PrivateRoutes'));

const AppRoutes: FC = () => {
    const {currentUser} = useAuth();

    return (
        <BrowserRouter basename={PUBLIC_URL}>
            <Routes>
                <Route element={<App/>}>
                    {/* Error Page */}
                    <Route path="error/*" element={<ErrorsPage/>}/>

                    {/* Logout */}
                    <Route path="logout" element={<Logout/>}/>

                    {/* Public Routes */}
                    <Route path="/" element={<Home/>}/>
                    <Route path='articles' element={<Articles/>}/>
                    <Route path='articles/:id' element={<SingleArticle/>}/>

                    {/* Conditional Routes */}
                    {currentUser ? (
                        // Add PrivateRoutes as the element
                        <Route path="/*" element={<PrivateRoutes/>}/>
                    ) : (
                        <Route path="auth/*" element={<AuthRoutes/>}/>
                    )}

                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/auth/login"/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export {AppRoutes};
