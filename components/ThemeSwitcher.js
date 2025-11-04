'use client'
import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [previousTheme, setPreviousTheme] = useState('1')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (theme) => {
    if (typeof document === 'undefined') return
    
    // Track previous for animation
    const prev = currentTheme === 'light' ? '1' : currentTheme === 'dark' ? '2' : '3'
    setPreviousTheme(prev)
    
    setCurrentTheme(theme)
    localStorage.setItem('theme', theme)
    
    // Remove existing theme attributes
    document.body.removeAttribute('data-theme')
    
    // Set new theme
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark')
    } else if (theme === 'sunset') {
      document.body.setAttribute('data-theme', 'sunset')
    } else {
      document.body.setAttribute('data-theme', 'light')
    }
    
    // Update switcher animation
    const switcher = document.querySelector('.switcher')
    if (switcher) {
      switcher.setAttribute('data-previous', prev)
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* SVG Filter for switcher */}
      <svg style={{ position: 'absolute', width: 0, height: 0, visibility: 'hidden' }}>
        <defs>
          <filter id="switcher">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              seed="2"
              result="turb"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turb"
              scale="15"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div 
        className="switcher" 
        data-previous={previousTheme}
      >
        <fieldset className="switcher__legend">
          <legend>Theme switcher</legend>
        </fieldset>

        <div className="switcher__option" style={{ '--c': 'var(--c-content)' }}>
          <input
            className="switcher__input"
            type="radio"
            name="theme"
            id="theme-light"
            value="light"
            data-option="1"
            checked={currentTheme === 'light'}
            onChange={() => applyTheme('light')}
          />
          <label htmlFor="theme-light" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="switcher__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          </label>
        </div>

        <div className="switcher__option" style={{ '--c': 'var(--c-content)' }}>
          <input
            className="switcher__input"
            type="radio"
            name="theme"
            id="theme-dark"
            value="dark"
            data-option="2"
            checked={currentTheme === 'dark'}
            onChange={() => applyTheme('dark')}
          />
          <label htmlFor="theme-dark" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="switcher__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </label>
        </div>

        <div className="switcher__option" style={{ '--c': 'var(--c-content)' }}>
          <input
            className="switcher__input"
            type="radio"
            name="theme"
            id="theme-sunset"
            value="sunset"
            data-option="3"
            checked={currentTheme === 'sunset'}
            onChange={() => applyTheme('sunset')}
          />
          <label htmlFor="theme-sunset" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="switcher__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
          </label>
        </div>
      </div>
    </>
  )
}
