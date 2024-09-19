import React, { useState } from 'react'
import BannerImg from '../components/BannerImg'
import Table from '../components/Table'

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <>
      <section className={`w-full h-screen flex flex-col items-center justify-center ${darkMode ? 'bg-gradient-to-r from-slate-900 to-violet-900' : 'bg-white'}`}>
        <BannerImg />
        <Table darkMode={darkMode} toggleDrkMode={toggleDarkMode} />
      </section>
    </>
  )
}

export default HomePage