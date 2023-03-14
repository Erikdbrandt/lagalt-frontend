import './App.css';
import Header from "./views/Header";
import MainPage from "./views/MainPage";
import ProjectView from "./views/ProjectView";
import {Route, BrowserRouter, Routes} from "react-router-dom";

function App() {
    return (

        <BrowserRouter>

            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/project/:id" element={<ProjectView/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
