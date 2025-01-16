import {Route, Routes} from 'react-router-dom'
import {ErrorsLayout} from './ErrorsLayout'
import ErrorPageTemplate from "./ErrorPageTemplate.tsx";

const ErrorsPage = () => (
    <Routes>
        <Route element={<ErrorsLayout/>}>
            <Route path='403' element={<ErrorPageTemplate code={403} title={"Access Denied"}
                                                          message={"It seems that you are trying to access content for which you do not have authorization."}/>}/>
            <Route path='404' element={<ErrorPageTemplate code={404} title={"Resource Not Found"}
                                                          message={"We apologize, but the page you requested cannot be found."}/>}/>
            <Route path='500' element={<ErrorPageTemplate code={500} title={"Server Error"}
                                                          message={"We apologize for the inconvenience, but an internal server error has occurred while processing your request."}/>}/>
            <Route index element={<ErrorPageTemplate code={404} title={"Resource Not Found"}
                                                     message={"We apologize, but the page you requested cannot be found."}/>}/>
        </Route>
    </Routes>
)

export {ErrorsPage}
