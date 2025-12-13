import React, { useEffect, useMemo, useRef, useState } from 'react'
import img1 from "../assets/d.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/header_img.png"
import photo1 from "../assets/photo1.JPG"
import photo2 from "../assets/photo2.PNG"
import photo3 from "../assets/header_img.png"
import {motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'

const useIsMobile=(query = "(max-width:639px)")=>{
  const [isMobile,setIsMobile]=useState(typeof window!=="undefined" && window.matchMedia(query).matches)

  useEffect(()=>{
    if(typeof window === "undefined") return ;
    const mql=window.matchMedia(query);
    const handler=(e)=>setIsMobile(e.matches);

    mql.addEventListener("change",handler);

    setIsMobile(mql.matches);
    
    return ()=>mql.removeEventListener("change",handler);
    },[query])
    return isMobile;
}




const Project = () => {


const isMobile=useIsMobile()
const sceneRef=useRef(null);
const projects = useMemo(
    () => [
      {
        title: "Me & Guys",
        link: "https://saloon-frontend-blond.vercel.app/",
        bgColor: "#000000",
        image: isMobile ? photo1 : img1, // use mobile or desktop image
      },
      {
        title: "College Grievance System",
        link: "https://biasonlinegrievancesystem.vercel.app/",
        bgColor: "#000000",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Tomato",
        link: "https://food-del-beta-ebon.vercel.app/",
        bgColor: "#000000",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile] // re-run only when `isMobile` changes
  );


  const {scrollYProgress}=useScroll({
target:sceneRef,
offset:["start start","end end"]
  })
  const thresholds=projects.map((_,i)=>(i+1)/projects.length);
  const [activeIndex,setActiveIndex]=useState(0);
  useMotionValueEvent(scrollYProgress,"change",(v)=>{
    const idx=thresholds.findIndex((t)=>v<=t);
    setActiveIndex(idx===-1?thresholds.length -1:idx)
  })

const activeProject=projects[activeIndex];



  return (
    <section ref={sceneRef} id="projects" className="relative text-white"
    style={{height:`${100*projects.length}vh`,background:activeProject.bgColor,transition:"background-color 400ms ease"}}>
      

<div className=" sticky top-0 h-screen flex flex-col items-center justify-center ">
  <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile?"mt-4 ":"mt-8"}`}>My Work</h2>



  <div className={`  relative w-full flex-1 flex items-center justify-center ${isMobile?"-mt-4":""}`}>{
    projects.map((project,idx)=>(

<div style={{width:"85%", maxWidth:"1200px"}} key={projects.tittle} className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex===idx?"opacity-100 z-20":"opacity-0 z-0 sm:z-10" }`}>

<AnimatePresence mode="wait">
  {activeIndex===idx && (

<motion.h3 key={project.title} 
initial={{opacity:0,y:-30}}
animate={{opacity:1,y:0}}
exit={{opacity:0,y:30}}
transition={{duration:0.5,ease:"easeOut"}}
className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%] sm:mb-0 italic font-semibold ${isMobile?"-mt-24 ":""}`}
style={{zIndex:5,textAlign:isMobile?"center":"left"}}
>{project.title}</motion.h3>

  )}
</AnimatePresence>

<div className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile?"mb-6 rounded-lg ":"mb-10 sm:mb-12 rounded-xl"} h-[62vh] sm:h-[66vh]`}
style={{zIndex:10,transition:"box-shadow 250ms ease"}}
>
  <img src={project.image} alt={project.title} className="w-full h-full  drop-shadow-xl md:drop-shadow-2xl " 
  style={{position:"relative",zIndex:10,filter:"drop-shadow(0 16px 40px rgba(0,0,0,0.65)",transition:"filter 200ms ease"}}
  loading="lazy"
   />
</div>

</div>

    ))
  }</div>




<div className={`absolute ${isMobile?"bottom-20 ":"bottom-10"}`}>
  <a target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all  " href={activeProject?.link}>View Project</a>
</div>


</div>

    </section>
  )
}

export default Project
