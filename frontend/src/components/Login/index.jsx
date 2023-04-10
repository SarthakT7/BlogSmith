import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('');
    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name] :  input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const URL = 'http://localhost:4000/api/auth';
            const { data: res } = await axios.post(URL, data);
            localStorage.setItem('token', res.data);
            window.location = '/'



            
        }

        catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setError(err.response.message);
            }
        }

    }
    return (
        <>
            <h1>Welcome to Log In Page</h1>
            <Link to="/signup">Go to Sign Up Page</Link>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name='email' value={data.email} onChange={handleChange} required />
                <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} required />
                {error && <div>{error}</div>} 
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}

export default Login;