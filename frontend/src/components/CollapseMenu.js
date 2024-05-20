import React, { useState, useEffect } from 'react';
import { Collapse } from 'bootstrap'
import '../css/CollapseMenu.css'

export default function CollapseMenu(props) {
    var [toggle, setToggle] = useState(false);
    
    useEffect(() => {
        var myCollapse = document.getElementById(props.id)
        var bsCollapse = new Collapse(myCollapse, {toggle: false})
        toggle ? bsCollapse.show() : bsCollapse.hide()
    })

  return (
    <>
        <button className={props.className_btn} onClick={() => setToggle(toggle => !toggle)}>
            {props.text}
        </button>
        <div className={`collapse ${props.className_show}`}  id={props.id}>
            {props.children}
        </div>
    </>
  )
}