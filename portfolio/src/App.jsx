import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About.jsx'
import Skills from './pages/Skills'
import Project from './pages/Project'
import Experience from './pages/Experience'
import Testimonial from './pages/Testimonial'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import ParticlesBackground from './components/ParticlesBackground.jsx'
import CustomCursor from "./components/CustomCursor.jsx"
import IntoAnimation from './components/IntoAnimation.jsx'

const App = () => {

const [introDone,setIntroDone]=useState(false);

  return (

    <>

{!introDone && <IntoAnimation onFinish={()=> setIntroDone(true) }/> }

{introDone && (  


    <div className="relative gradient  text-white ">

<CustomCursor/>

<Navbar />
<Home/>
<About/>
<Skills/>
<Project/>
{/* <Experience/> */}
<Testimonial/>
<Contact/>
<Footer/>

    </div>

 )}

    </>
  )
}

export default App
