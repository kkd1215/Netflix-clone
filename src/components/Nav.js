import React, { useState, useEffect } from "react";
import '../includes/Nav.css'

function Nav() {
  const [show, handleShow] = useState(false);
  const links = ['Home', 'TV Shows', 'Movies', 'Latest', 'My List']

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    })
    return () => {
      window.removeEventListener("scroll");
    };
  },[]);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
      className="nav__logo"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
      alt="Netflix Logo"
      />
      <div className='nav__link'>
      <ul className='nav__list'>
        {links.map(link => (
          <div className='nav__listItem'>
            <li>
              <a href='/'>{link}</a>
            </li>
          </div>
        ))}
      </ul>
      </div>
      <img
      className="nav__avatar"
      src="https://i.pinimg.com/originals/fb/8e/8a/fb8e8a96fca2f049334f312086a6e2f6.png"
      alt="Avatar Logo"
      />
    </div>
  )
}

export default Nav;
