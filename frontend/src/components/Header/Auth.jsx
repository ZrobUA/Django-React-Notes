import { useEffect, useState } from "react";
import AuthForm from "./AuthForm";

function Auth(props) {
    const [authClick, setAuthClick] = useState(false);
    const isAuthenticated = props.isAuthenticated;

    useEffect(() => {
        setAuthClick(false);
    }, []);

    const handleAuth = () => {
        setAuthClick(!authClick);
    };

    const handleLogout = () => {
        props.onLogout();

    };

    const handleSubmitSaveForm = (Auth) => {
        handleAuth();
        props.onSubmitSaveForm(Auth);
    };

    return (
        <div className="Auth">
        <button onClick={isAuthenticated ? handleLogout : handleAuth}>
            {isAuthenticated ? "Logout" : "Login"}
        </button>
        {authClick && <AuthForm onSubmitAuthForm={handleSubmitSaveForm} />}
        </div>
    );
}

export default Auth;
