import {Link} from "react-router-dom"

const Header = () => {
    return (
        <Link to="/">
        <div className="bg-blue-100 h-14 flex items-center p-2 ">
            <img className="h-14" src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-17.png" alt="Reddit Logo" />
            <div className="ml-2 text-lg font-bold text-xl">lagalt</div>

            <div className="ml-auto"> Login </div>
        </div>
        </Link>
    )
}

export default Header