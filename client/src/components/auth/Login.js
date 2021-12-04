
import React, { useState, useContext } from 'react'
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';


const Login = () => {
    const { user, setUser } = useContext(UserContext);

    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const submitHandler = async e => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            console.log(data);
            if(data.errors){
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
       
            }
            if (data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (user) {
        return <Redirect to="/" />
    }
    return (

        <div className="row">
            <h2>Login</h2>
            <div className="name error red-text">{ emailError || passwordError } </div>
            <form className="col s12" onSubmit={submitHandler}>
                
                <div className="row">
                    <div className="input-field col s12">
                        <input id="email" type="email" className="validate"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <span class="helper-text" data-error="correct email is required"></span>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="password" type="password" className="validate"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        <span class="helper-text" data-error="required"></span>
                        <label htmlFor="password">Password</label>
                    </div>
                </div>

                <button className="btn">Login</button>
            </form>
        </div>

    )
}


export default Login
