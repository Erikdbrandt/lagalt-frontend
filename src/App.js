import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditProductPage from "./pages/EditProductPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/navbar/Navbar";
import KeycloakRoute from "./routes/KeycloakRoute";
import { ROLES } from "./const/roles";
import Header from "./Header";
import MainPage from "./views/MainPage";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/products" element={<MainPage />} />
                    {/*<Route path="/products/:productId" element={<EditProductPage />} />*/}
                    <Route
                        path="/profile"
                        element={
                            <KeycloakRoute role={ ROLES.User }>
                                <ProfilePage />
                            </KeycloakRoute>
                        }
                    />
                </Routes>
            </main>
        </BrowserRouter>
        // <div className="App">
        //
        //     <Header/>
        //     <MainPage/>
        //
        //
        // </div>
    );
}

export default App;
