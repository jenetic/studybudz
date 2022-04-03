import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

export const setTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

export const keepTheme = () => {
  if (localStorage.getItem('theme')) {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  } else {
    setTheme('theme-light');
  }
}

const Toggle = () => {
  const [togClass, setTogClass] = useState('light');
  let theme = localStorage.getItem('theme');
  
  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTogClass('dark');
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTogClass('light');
    }
  }, [theme])

  const toggleTheme = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      setTogClass('light');

    } else {
      setTheme('theme-dark');
      setTogClass('dark');
    }
  }

  return (
    <div>
      {togClass === 'light' ? (
        <button id="toggleThemeButtonSun" className="toggleThemeButton" onClick={toggleTheme}>
          <FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
        </button>
      ):(
        <button id="toggleThemeButtonMoon" className="toggleThemeButton" onClick={toggleTheme}>
          <FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
        </button>
      )}
    </div>
  )
}

export default Toggle;

