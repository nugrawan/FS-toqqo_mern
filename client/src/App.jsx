import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Home from './pages/Home';
import ChangePassword from './pages/ChangePassword';
import { useCookies } from 'react-cookie';
import ErrorPage from 'pages/ErrorPage';
function App() {
    const [cookies, setCookie] = useCookies();

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                {cookies.loggedIn ? (
                    <>
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/orders" element={<Orders />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default App;
