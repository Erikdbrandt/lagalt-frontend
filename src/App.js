import './App.css';
import Header from "./views/Header";
import MainPage from "./views/MainPage";
import Project from "./views/Project";
import Profile from "./views/Profile";
import Login from "./views/Login";
import {Route, BrowserRouter, Routes} from "react-router-dom";

function App() {
    return (

        <BrowserRouter>

            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    {/*<Route path="/" element={<MainPage/>}/>*/}
                    {/*<Route path="/project/:id" element={<Project/>}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
