import React, { useState } from "react";


//function to fetch the messages from the server
export function FetchMessages() {
	const [messages, setMessages] = useState([])


      async function fetchData() {
        try {
        const response = await fetch('http://localhost:8081/messages');
        const json = await response.json();

        setMessages(json)
          }

          catch (error) {
            console.log("error", error);
          }
    }


      //for the first run
      React.useEffect(function effectFunction() {
           fetchData();
    }, []);


      if(window.$updateMessages)
         fetchData();




      return messages

	}
  





  //helper function to check if an object is empty
  export function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }




//helper function to convert the "tags array"  (The field "tags" inside "details", in our messages)
export function jsonToCleanString(jsonDict)
{
  let str = JSON.stringify(jsonDict)

  str = str.substring(str.indexOf("[") + 1);

  str = str.replaceAll("{" ,"");

  str = str.replaceAll("}" ,"");

  str = str.replace("\"name\"" ,"Name");
  str = str.replace("\"size\"" ,"Size");
  str = str.replace("\"region\"" ,"Region");
  str = str.replace("\"type\"" ,"Type");
  str = str.replace("\"tag\"" ,"Tag");

  str = str.replaceAll("\"" ,"");

  str = str.replace("]" ,"");

  return str;
}