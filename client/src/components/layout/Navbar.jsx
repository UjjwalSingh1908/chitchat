import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import { Link } from "react-router-dom"

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    const logout = async () => {
        try {
            const res = await fetch('http://localhost:5000/logout', {
                credentials: 'include',
            });
            const data = res.json();
            console.log('logout data', data);
            setUser(null)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <nav className="teal">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">ChitChat</Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">

                        {user ? (
                            <li className="sidenav-close" onClick={logout}><Link to="#">Logout</Link></li>
                        ) : (
                            <>
                                <li className="sidenav-close" ><Link to="/login">Login</Link></li>
                                <li className="sidenav-close" ><Link to="/signup">Sigup</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">

                {user ? (
                    <li className="sidenav-close" onClick={logout}><Link to="#">Logout</Link></li>
                ) : (
                    <>
                        <li className="sidenav-close" ><Link to="/login">Login</Link></li>
                        <li className="sidenav-close" ><Link to="/signup">Sigup</Link></li>
                    </>
                )}

            </ul>
        </>
    )
}

export default Navbar
