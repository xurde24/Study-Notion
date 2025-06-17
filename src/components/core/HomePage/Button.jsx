import React from 'react'
import {Link} from "react-router-dom"

const Button = ({children, active, linkto,css}) => {
  return (
    <Link to={linkto}>

        <div className={`text-center text-[16px] px-6 py-3 rounded-md font-medium shadow-custom
        ${active ? "bg-yellow-50 text-black  shadow-[2px_2px_0px_0px_rgba(255, 235, 135,0.2)]"
        :" bg-richblack-800 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"}
        hover:scale-95 hover:shadow-none transition-all duration-200
        `}>
            {children}
        </div>

    </Link>
  )
}

export default Button
