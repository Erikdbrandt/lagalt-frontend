import './App.css';
import Navbar from "./views/Navbar";
import MainPage from "./views/MainPage";
import ProjectView from "./views/ProjectView";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import UserProfile from "./views/UserProfile";
import StartPage from "./views/StartPage";
import KeycloakRoute from "./routes/KeycloakRoute";
import {ROLES} from "./const/roles";

function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/user" element={<KeycloakRoute role={ROLES.offline_access}><MainPage/></KeycloakRoute>}/>
                    <Route path="/project/:id" element={<ProjectView/>}/>
                    <Route path="/profile" element={<KeycloakRoute role={ROLES.offline_access}><UserProfile/></KeycloakRoute>}/>
                    <Route path="/startpage" element={<KeycloakRoute role={ROLES.offline_access}><StartPage/></KeycloakRoute>}/>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
