import {Outlet} from 'react-router-dom'

const ErrorsLayout = () => {

    return (
        <div className='flex flex-col w-full items-center justify-center'>
            <Outlet/>
        </div>
    )
}

export {ErrorsLayout}
