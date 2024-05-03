import { useState } from "react";


function Input(){

    function submitFn(){
        console.log(document.getElementById("title").value);
    }
    return(
        <div>
            <input type = "text" placeholder="Enter the title" id="title"></input>
            <input type = "text" placeholder="Enter description" id="desc" ></input>
            <button type="submit" onClick={submitFn}>Submit</button>
          
        </div>
    )
}

export default Input;