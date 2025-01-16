import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {AppRoutes} from "./routes/AppRoutes.tsx";
import {AuthInit, AuthProvider} from "./contexts/Auth.tsx";
import axios from "axios";
import {setupAxios} from "./helpers/AuthHelpers.ts";

setupAxios(axios)

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <AuthInit>
                <AppRoutes/>
            </AuthInit>
        </AuthProvider>
    </StrictMode>,
)
