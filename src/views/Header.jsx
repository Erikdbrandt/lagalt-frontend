import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-blue-100 h-14 flex items-center justify-between p-2">
            <div className="flex items-center">
                <Link to="/m">
                    <img
                        className="h-14 cursor-pointer"
                        src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-17.png"
                        alt="Reddit Logo"
                    />
                </Link>
                <Link to="/m">
                    <div className="ml-2 text-lg font-bold text-xl cursor-pointer">
                        lagalt
                    </div>
                </Link>
            </div>
            <div className="flex items-center">
                <Link to="/profile">
                    <div className="mr-4 cursor-pointer">Profile</div>
                </Link>
                <div className="cursor-pointer">Login</div>
            </div>
        </div>
    );
};

export default Header;
