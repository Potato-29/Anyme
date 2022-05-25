import React from "react";
import { useEffect, useState } from "react";
import {FaArrowCircleUp} from 'react-icons/fa'



const BackToTop = () => {


    const [backtopbutton, setBacktotopbutton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100) {
                setBacktotopbutton(true)
            } else {
                setBacktotopbutton(false)
            }
              
        })
    }, [])


    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (  
        <div>

            {backtopbutton && (
                <button className="scroll" onClick={scrollUp} style={{
                    

                }}><FaArrowCircleUp /></button>
            )}
        </div>
    );
}
 
export default BackToTop;