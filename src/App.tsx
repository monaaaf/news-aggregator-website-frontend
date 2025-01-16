import Header from "./components/layout/Header.tsx";
import Footer from "./components/layout/Footer.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import LoadingIndicator from "./components/ui/loading/LoadingIndicator.tsx";

function App() {

    return (
        <Suspense fallback={<LoadingIndicator/>}>
            <div className="container mx-auto px-6 md:px-0">
                <Header/>

                <Outlet/>

                <Footer/>
            </div>
        </Suspense>
    )
}

export default App
