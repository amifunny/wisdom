import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Auth from './pages/Auth'
import SignIn from './pages/Auth/SignIn'
import Success from './pages/Auth/Success'
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                {/* Redirect to SignIn page */}
                <Route exact path="/" element={<Navigate to="/signin" />} />
                <Route path='/' element={<Auth />}>
                    <Route index path='signin' element={<SignIn />} />
                    <Route path='success' element={<Success />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
