import './App.css';
import Navbar from "./views/Navbar";
import MainPage from "./views/MainPage";
import ProjectView from "./views/ProjectView";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import UserProfile from "./views/UserProfile";
import StartPage from "./views/StartPage";
import KeycloakRoute from "./routes/KeycloakRoute";
import NewProject from "./views/NewProject";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/m" element={<MainPage/>}/>
                    <Route path="/user" element={<KeycloakRoute><MainPage/></KeycloakRoute>}/>
                    <Route path="/project/:id" element={<ProjectView/>}/>
                    <Route path="/profile" element={<KeycloakRoute> <UserProfile/> </KeycloakRoute>}/>
                    <Route path="/startpage" element={<KeycloakRoute><StartPage/></KeycloakRoute>}/>
                    <Route path="/profile" element={<KeycloakRoute><UserProfile/></KeycloakRoute>}/>
                    <Route path="/startpage" element={<KeycloakRoute><StartPage/></KeycloakRoute>}/>
                    <Route path="/new-project" element={<KeycloakRoute><NewProject/></KeycloakRoute>}/>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
