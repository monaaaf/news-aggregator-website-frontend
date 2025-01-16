import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
    code: number;
    title: string;
    message: string;
}

const ErrorPageTemplate: React.FC<Props> = ({code, title, message}) => {
    return (
        <>
            <h1 className="font-poppins font-bold text-2xl text-gray-900">{code}</h1>
            <h3 className="font-poppins font-normal text-xl mb-4">{title}</h3>
            <div className="font-roboto font-semibold text-base text-gray-500 mb-7">
                {message}
            </div>

            <div className="mb-0">
                <Link to='/' className='rounded-2xl bg-custom-blue-violet text-white font-roboto text-base font-medium px-6 py-2'>
                    Return Home
                </Link>
            </div>
        </>
    );
}

export default ErrorPageTemplate;