import { useState } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark', !isDark);
    };

    return (
        <button onClick={toggleTheme} className="text-white p-2">
            {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default ThemeToggle;
