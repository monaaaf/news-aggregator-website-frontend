import {Route, Routes} from 'react-router-dom'
import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";


const AuthRoutes = () => (
    <Routes>
        <Route>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route index element={<Login/>}/>
        </Route>
    </Routes>
)

export {AuthRoutes}
