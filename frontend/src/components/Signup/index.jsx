import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setData({...data, [input.name] : input.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const URL = 'http://localhost:4000/api/users';
            const { data: res } = await axios.post(URL, data);
            navigate('/login');
            console.log(res.message);
        }

        catch (err) {
            if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                setError(err.response.message);
            }
        }

    }
    return (
        <>
            <h1>Welcome to Sign Up Page</h1>

            <Link to="/login">Go to Login</Link>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" name='firstName' onChange={handleChange} value={data.firstName} required />
                <input type="text" placeholder="Last Name" name='lastName' onChange={handleChange} value={data.lastName} required />
                <input type="email" placeholder="Email" name='email' value={data.email} onChange={handleChange} required />
                <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChange} required />
                {error && <div>{error}</div>}
                <button type="submit">Sign Up</button>
            </form>
        </>
    )
}

export default SignUp;