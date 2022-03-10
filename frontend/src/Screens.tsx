import NavBar from "core/components/Navbar";
import Home from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Screens = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={ <Home /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default Screens;