import { useState } from 'react';
import './header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          
          <a className="header__logo">
            <img src="/yeahub-logo.svg" alt="Logo" />
          </a>

          <button 
            className={`header__burger ${isOpen ? 'is-open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`header__menu ${isOpen ? 'is-open' : ''}`}>
            <nav className="header__nav">
              <ul>
                <li><button className="nav-link-disabled" disabled>База вопросов</button></li>
                <li><button className="nav-link-disabled" disabled>Тренажер</button></li>
                <li><button className="nav-link-disabled" disabled>Материалы</button></li>
                <li><button className="nav-link-disabled" disabled>Навыки (hh)</button></li>
                {/* <li><a href="#!" onClick={toggleMenu}>База вопросов</a></li>
                <li><a href="#!" onClick={toggleMenu}>Тренажер</a></li>
                <li><a href="#!" onClick={toggleMenu}>Материалы</a></li>
                <li><a href="#!" onClick={toggleMenu}>Навыки (hh)</a></li> */}
              </ul>
            </nav>
            
            <div className="header__auth">
              <button className="btn-login" disabled>Вход</button>
              <button className="btn-registr" disabled>Регистрация</button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
