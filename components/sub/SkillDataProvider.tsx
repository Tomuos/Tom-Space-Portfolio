"use client"

import React from 'react'
import {motion} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface Props {
    src: string;
    width: number;
    height: number;
    index: number;
}


const SkillDataProvider = ({src, width, height, index } : Props) => {
    const {ref, inView} = useInView({
        threshold: 0.2,
        triggerOnce: true,
    })
    const imageVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {delay: index * 0.2, duration: 0.5}}
    }

    const animationDelay = 0.3

  return (
    <motion.div
    ref={ref}
    initial="hidden"
    variants={imageVariants}
    animate={inView ? "visible" : "hidden"}
    custom={index}
    transition={{delay: index * animationDelay}}
    >
        <Image
        src={src}
        width={width}
        height={height}
        alt="skill Image"
        
        />

    </motion.div>
  )
}

export default SkillDataProvider