import React, { useEffect, useRef, useState } from 'react'
import { FaHtml5 } from "react-icons/fa";
import { FaCss3 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaNode } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { DiMongodb } from "react-icons/di";
import { DiMysql } from "react-icons/di";
import { FaReact } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { motion, useMotionValue } from 'framer-motion';

const Skills = () => {


const skills=[{icon:<FaHtml5/>,name:"html"},
  {icon:<FaCss3/>,name:"CSS"},
  {icon:<IoLogoJavascript/>,name:"java script"},
  {icon:<RiTailwindCssFill/>,name:"Tailwind CSS"},
  {icon:<FaNode/>,name:"Node.js"},
  {icon:<SiExpress/>,name:"Express"},
  {icon:<DiMongodb/>,name:"Mongo DB"},
  {icon:<DiMysql/>,name:"Mysql"},
  {icon:<FaReact/>,name:"React.js"},
  {icon:<FaGithub/>,name:"Github"},
  {icon:<FaBootstrap/>,name:"Bootstrap"}
]

const repeated = [...skills, ...skills]

const [dir,setDir]=useState(-1)
const [active,setActive]=useState(false);
const sectionRef=useRef(null);
const trackRef=useRef(null);
const touchY=useRef(null);
const x=useMotionValue(0)


useEffect(()=>{

const el=sectionRef.current;
if(!el) return;

const io=new IntersectionObserver(([entry])=>{

  setActive(entry.isIntersecting && entry.intersectionRatio>0.1)
},
{threshold:[0.1]}
)

io.observe(el);
return()=> io.disconnect();

},[])


useEffect(()=>{

if(!active) return;

const onWheel=(e)=> setDir(e.deltaY>0?-1:1);
const onTouchStart=(e)=> ( touchY.current = e.touches[0].clientY);
const onTouchMove=(e)=> {
  if(touchY.current==null  ) return;

  const delta=e.touches[0].clientY-touchY.current;
  setDir(delta>0?1:-1);
  touchY.current=e.touches[0].clientY;
}

window.addEventListener('wheel',onWheel,{passive:true});
window.addEventListener("touchStart",{passive:true});
window.addEventListener("touchmove",onTouchMove,{passive:true})

return()=>{

  window.removeEventListener("wheel",onWheel);
  window.removeEventListener("touchStart",onTouchStart);
  window.removeEventListener("touchmove",onTouchMove)
}

},[active])


useEffect(()=>{

let id;
let last=performance.now();
const SPEED=80
const trick=(now)=>{
  const dt=(now-last)/1000;
  last=now;
  let next=x.get()+SPEED*dir*dt;
  const loop=trackRef.current?.scrollWidth/2 || 0;
  if(loop){
    if(next<= -loop) next+=loop;
    if(next>=0) next-=loop;

  }
x.set(next);
id=requestAnimationFrame(trick)
}
id=requestAnimationFrame(trick)
return()=>cancelAnimationFrame(id)

},[dir,x])

  return (
    <section ref={sectionRef} id="skills" className="h-1/2 w-full pb-8 flex flex-col items-center justify center relative bg-black text-white overflow-hidden">
      
<div className="absolute inset-0 pointer-events-none ">

<div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#003f8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse " />
<div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#003f8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500"/>


</div>


<motion.h2 className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10 "
initial={{opacity:0,y:-30}}
whileInView={{opacity:1,y:0}}
transition={{delay:0.1,duration:0.5}}
>My Skills</motion.h2>

<motion.p className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10 "
initial={{opacity:0,y:-10}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.5 , delay:0.1}}
>Modern Application | Modern Technologies </motion.p>

<div className="relative w-full overflow-hidden">
<motion.div style={{x,whiteSpace:"norap",willChange:"transform"}} ref={trackRef} className="flex gap-10 text-6xl text-[#1cd8d2]  ">
{repeated.map((s,i)=>(
  <div key={i} aria-label={s.name} tittle={s.name} className="flex flex-col items-center gap-2 min-w-[120px]  ">
    <span className="hover:scale-125 transition-transform duration-300">
      {s.icon}
    </span>
    <p className="text-sm">{s.name}</p>
  </div>
))}
</motion.div>
</div>

    </section>
  )
}

export default Skills
