import './App.css';
import Header from "./views/Header";
import MainPage from "./views/MainPage";
import ProjectView from "./views/ProjectView";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import UserProfile from "./views/UserProfile"
import StartPage from "./views/StartPage"

function App() {
    return (

        <BrowserRouter>

            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<StartPage/>}/>

                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/project/:id" element={<ProjectView/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>


                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
