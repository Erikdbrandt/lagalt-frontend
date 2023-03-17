import './App.css';
import Header from "./views/Header";
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

            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route
                        path="/m"
                        element={
                        <KeycloakRoute role={ROLES.offline_access}>
                            <MainPage/>
                    </KeycloakRoute>
                    }
                    />
                    <Route path="/project/:id" element={<ProjectView/>}/>
                    <Route path="/profile" element={<UserProfile/>}/>


                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
