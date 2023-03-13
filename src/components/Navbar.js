
const Navbar = () => {

    return (
        <li class="bg-amber-500 flex justify-between items-center p-4 sticky top-0 w-full">
            <span class="font-bold">Lagalt collaborate case</span>
            <ul class="flex px-4 py-4">
                <li class="px-4"><a>Project</a></li>
                <li><a href="/login">Login/Sign up</a></li>
            </ul>
        </li>
    )
}
export default Navbar