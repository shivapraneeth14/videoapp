import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Themechange } from './Store/Themeslice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

function Button() {
    const dispatch = useDispatch();
   const usertheme = useSelector(state=>state.theme)
   


   function changetheme() {
    const newtheme = usertheme === "light" ? "dark" : "light";
    dispatch(Themechange({ theme: newtheme }));
   
}

  return (
    <div>
      <button
      onClick={changetheme}
      ><FontAwesomeIcon icon={faMoon} style={{ color: 'white' }}  /></button>
    </div>
  )
}

export default Button
