import './App.css';
import React, { useState } from "react";

import {CustomizedAccordion} from './components/accordion';

import {FetchMessages} from './components/functions'



  
window.$updateMessages = true //global variable that tells the "FetchMessages" function if to fetch or not


 
window.$expanded = "no panel was expanded yet"   //This global variable, is used in order to tell which panel of the accordion is opened. only one pnael can be opened at one time 

const App = () => {
  
  let messages = FetchMessages()
  
  //now, reinitalize window.$updateMessages to false
  window.$updateMessages = false

 
 
  const [update, setUpdate] = React.useState(false);   //used in order to update the screen, to rerender

  const handlePanelEvent = (panel) => () => {     

    if (window.$expanded === panel)     //only when "window.$expanded === panel", the panel is being expanded
        window.$expanded = "close it";   //so when the window.$expanded, exualls to "close it", the panel doesn't expanding
    else
          window.$expanded = panel;      //now this specific panel will be expanded
        
          setUpdate(!update);            //rerender
  }


  const handleUpdate = ()=> {            //The state is updated, and a call to FetchMessages will be done, so that we will update our messages array 
        window.$updateMessages = true
        setUpdate(!update);
  }


   // This jsx maps on the messages array, and creates a "CustomizedAccordion " element,for every "messsage"
   const ShowMssages = (
    messages.map((data, index) => (
      <CustomizedAccordion 
      data ={data}
      index={index} 
      handlePanelEvent = {handlePanelEvent}
      />
    ))
  );

  //A bit of jsx , for the "update" button, and the "Total errors" counter"
  const UpdateAndTotalErrors =  (<section class ="updateAndErrors">
  <button onClick={handleUpdate}>Update</button>      
  <p class="errors_title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{messages.length} Total </p>;
   </section>);
    
  
  
  

  return(
    
    <header>
    {UpdateAndTotalErrors}
    {ShowMssages}
    </header>
  )
};

export default App;







































