const Main = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }
    return(
        <>
            <h1>Welcome to home page</h1>
            <button onClick={handleLogout}>Log Out</button>
        </>
    )
};

export default Main;