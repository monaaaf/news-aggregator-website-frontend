import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../contexts/Auth.tsx";

const Header = () => {
    const {currentUser} = useAuth()
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-white">
            <div className="mx-auto flex items-center justify-between h-28">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="font-poppins text-2xl font-bold text-[#524cf1]">
                        DailyHub
                    </Link>
                </div>

                {/* Authentication */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/articles"
                        className={`font-poppins text-base text-gray-700 transition-all duration-200 hover:text-custom-blue-violet font-medium ${isActive('/articles') ? 'text-custom-blue-violet' : 'text-gray-700'}`}
                    >
                        Articles
                    </Link>
                    {currentUser ? (
                        <>
                            {/* Profile Name */}
                            <Link
                                className={`font-poppins text-base text-gray-700 transition-all duration-200 hover:text-custom-blue-violet font-medium ${isActive('/profile') ? 'text-custom-blue-violet' : 'text-gray-700'}`}
                                to="/profile">
                                Profile
                            </Link>
                            <Link
                                className="font-poppins text-base text-gray-700 transition-all duration-200 hover:text-custom-blue-violet font-medium"
                                to="/logout">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/auth/login"
                                className={`font-poppins text-base text-gray-700 transition-all duration-200 hover:text-custom-blue-violet font-medium ${isActive('/auth/login') ? 'text-custom-blue-violet' : 'text-gray-700'}`}
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className={`font-poppins text-base text-gray-700 transition-all duration-200 hover:text-custom-blue-violet font-medium ${isActive('/auth/register') ? 'text-custom-blue-violet' : 'text-gray-700'}`}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
