import Auth from "./Auth";
import Search from "./Search";
import { useState } from "react";


function Header(props) {
    const [showSearch, setShowSearch] = useState(true);

    const handleSubmitSaveForm = (Auth) => {
        props.onSubmitSaveForm(Auth);
    };

    const handleLogout = () => {
        props.onLogout();
    };

    const handleSearch = (searchQuery) => {
        props.onSearch(searchQuery);
    };

    const handleClickAuthButton = () => { 
        setShowSearch(!showSearch);
    }
    
    return (
        <header className="Header">
            <Auth
                onSubmitSaveForm={handleSubmitSaveForm}
                isAuthenticated={props.isAuthenticated}
                onLogout={handleLogout}
                onClickAuthButton={handleClickAuthButton}
            />
            {showSearch ?
                <Search
                    onSearch={handleSearch}
                    className={showSearch && 'hidden'}
                /> : null}
        </header>
    );

}

export default Header;
