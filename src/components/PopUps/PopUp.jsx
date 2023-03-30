
import { useUser } from "../context/UserContext";

const PopUp = ({ handlePopupSubmit }) => {

    const { user } = useUser();


    const handleSubmit = (e) => {
        e.preventDefault();
        handlePopupSubmit();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md shadow-lg">
                <h2 className="text-xl font-semibold mb-2">
                    Welcome {user.full_name}!
                </h2>
                <form onSubmit={handleSubmit} className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        OK
                    </button>
                </form>
            </div>


        </div>
    );
};

export default PopUp;
