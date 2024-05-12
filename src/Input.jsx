import { useState } from "react";



function Input(){

    
    return(
        <div> 
        <center>
        <div style={{
            margin: 20,
            border: "2px solid black",
            width: 500
        }}>
     
            Username <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            Password <TextField id="outlined-basic" label="Outlined" variant="outlined" /> 
            <button type="Submit">Sign Up</button>
           
        </div> 
        </center>
        </div>
    )
}

export default Input;