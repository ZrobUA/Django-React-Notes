import Auth from "./Auth";


function Header(props) {
    const handleSubmitSaveForm = (Auth) => {
        props.onSubmitSaveForm(Auth);
    };

    const handleLogout = () => {
        props.onLogout();
    };
    
    return (
        <header className="Header">
            <Auth
                onSubmitSaveForm={handleSubmitSaveForm}
                isAuthenticated={props.isAuthenticated}
                onLogout={handleLogout}
            />
        </header>
    );
}

export default Header;
