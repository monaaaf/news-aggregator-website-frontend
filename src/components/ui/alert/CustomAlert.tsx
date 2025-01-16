import React from 'react';

interface Props {
    title?: string;
    message?: string;
    color?: 'warning' | 'danger' | 'success' | 'info' | 'default';
}

const alertStyles = {
    warning: {
        text: 'text-yellow-800',
        bg: 'bg-yellow-50',
    },
    danger: {
        text: 'text-red-800',
        bg: 'bg-red-50',
    },
    success: {
        text: 'text-green-800',
        bg: 'bg-green-50',
    },
    info: {
        text: 'text-blue-800',
        bg: 'bg-blue-50',
    },
    default: {
        text: 'text-gray-800',
        bg: 'bg-gray-50',
    },
};

const CustomAlert: React.FC<Props> = ({
                                          title,
                                          message,
                                          color = 'warning'
                                      }) => {
    const {text, bg} = alertStyles[color] || alertStyles.default;

    return (
        <div className={`p-4 mb-4 text-sm ${text} rounded-lg ${bg}`} role="alert">
            {title && <span className="font-medium">{title}</span>}
            &nbsp;
            {message}
        </div>
    );
};

export default CustomAlert;
