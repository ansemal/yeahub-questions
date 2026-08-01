import './header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <nav className="header__nav">
            <img src="/yeahub-logo.svg" alt="Logo" />
            <ul>
              <li>
                <a href="#!">База вопросов</a>
              </li>
              <li>
                <a href="#!">Тренажер</a>
              </li>
              <li>
                <a href="#!">Материалы</a>
              </li>
              <li>
                <a href="#!">Навыки (hh)</a>
              </li>
            </ul>
          </nav>
          <div className="header__auth">
            <button className="btn colorBlue">Вход</button>
            <button className="btn-registr">Регистрация</button>
          </div>
        </div>
      </div>
    </header>
  );
}
