import {useState} from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    const onChangeInput = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3030/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            
            if (response.ok) {
                console.log(data);
                localStorage.setItem('token', JSON.stringify(data));
                navigate('/');    
            }
            return data;
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col d-flex flex-column justify-content-center align-items-center">
                    <h2 className="mb-5">Sign In</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={onChangeInput}
                                name="email"
                                type="email"
                                className="form-control"
                                aria-describedby="email"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">password</label>
                            <input
                                onChange={onChangeInput}
                                name="password"
                                type="password"
                                className="form-control"
                                aria-describedby="password"
                                placeholder="Enter password"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;