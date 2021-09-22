import React from 'react'

const Navbar = () => {
    return (
        <>
            <nav className="teal">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">ChitChat</a>
                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Sigup</a></li>
                        <li><a href="#">Logout</a></li>
                    </ul>
                </div>
            </nav>

            <ul class="sidenav" id="mobile-demo">
                <li><a href="#">Login</a></li>
                <li><a href="#">Sigup</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </>
    )
}

export default Navbar
