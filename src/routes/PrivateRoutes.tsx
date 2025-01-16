import {Navigate, Route, Routes} from 'react-router-dom'
import Profile from "../pages/Profile.tsx";
import {MasterProvider} from "../contexts/MasterLayout.tsx";

const PrivateRoutes = () => {
    return (
       <MasterProvider>
           <Routes>
               {/* Prevent access to /auth if already logged in */}
               <Route path="auth/*" element={<Navigate to="/" />} />

               <Route path='profile' element={<Profile/>}/>

               {/* Catch-all for unknown routes */}
               <Route path="*" element={<Navigate to="/error/404" />} />
           </Routes>
       </MasterProvider>
    )
}

export default PrivateRoutes;
