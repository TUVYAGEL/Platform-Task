
var express = require('express');
const path = require('path');
var cors = require('cors');
var app = express();

app.use(express.static(path.join(__dirname, '../server/build')));


app.use(cors());  //we need it for the communication betweeen react and node.js
app.use(express.json());


const fs = require('fs');  //for reading files
const Joi = require('joi');   //for validating data


//extract our data.json file, full with old "messages"
let rawdata = fs.readFileSync('data.json');

let messegesArray = JSON.parse(rawdata);

//adding a date field to every massage (convert the time stamp to American date)
messegesArray.map((data, index) => (
   messegesArray[index]["date"] = timestampToDate(Number( messegesArray[index]["creation_date"]))
))




//This responds to post request, with a new message:
app.post('', function (req, res) {
   console.log("Got a Post request");

   
   //essential arguments that must be sent:
   response = validateMeaages(req.query)

   if(response.error)
   {  
      console.log(response.error.details)
      res.send("Failed to insert! Some of the arguments are missing!");  
       return;
   }   

  

   errors = 1;                               //default value is 1
   if(req.query.errors)                          
       errors = req.query.errors; 
       
   //validity check to errors:  
   if (isNaN(errors))
   {
      res.send("Failed to insert! The 'arrors' argument is not valid");  //for example, if the size is zero
      return;
   }


   //vailidity check to details      todo:i need to find a way, to check if a string contains array
   details = {}

   if(req.query.tags && req.query.severity && req.query.status)
   {
     
      details = {"severity":req.query.severity, "status":req.query.status, "tags":eval(req.query.tags)}
      
      response = validateDetails(details)

      if(response.error)
      {  

         console.log(response.error.details)
         console.log("some of the details are invaild")
         details = {}
      } 

   }  
     

  messegesArray.push( //insert the incoming message, to our array of messages                                          
   {
      "resource": req.query.resource,
      "category": req.query.category,
      "creation_date": req.query.creation_date,
      "errors": errors, 
      "details":details,
      "date": timestampToDate(Number(req.query.creation_date))
                  }) 

  
   res.send( "The data has been added to the array DB.");  
   
  
})

   


//This responds to a GET request for index html
app.get('/', function (req, res) {
     
    console.log("Got a GET request for index.html");
    res.sendFile(path.join(__dirname, '../server/build/index.html'));
   
 })


 //This responds to a GET request for the massages array
 app.get('/messages', function (req, res) {
     
   console.log("Got a GET request for the messages array");
   res.send(messegesArray);
  
})
 

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
}) 



//function to convert a timestamp, to American date
function timestampToDate(timestamp) {
   const firstValentineOfTheDecade = new Date(timestamp); // 1 for February
   const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
   year:  'numeric',
   month: 'long',
   day:   'numeric',
});

return longEnUSFormatter.format(firstValentineOfTheDecade)
 }






  
//function to validate essential arguments
//req.query.resource || !req.query.category|| !req.query.creation_date
function validateMeaages(data)
{
   
    const JoiSchema = Joi.object({
      
      resource: Joi.string()
                  .min(1)
                  .max(500)
                  .required(),
                    
      category: Joi.string()
               .valid('IAM')
               .valid('Logging')
               .valid('Monitoring')
               .valid('Networking')
               .valid('Kubernetes')
               .valid('General')
               .valid('Serverless')
               .valid('Elasticsearch')
               .valid('Elasticsearch')
               .valid('Storage')
               .valid('Secrets')
               .valid('Public')
               .valid('Vulnerabilities') 
               .required(), 
                 
         creation_date: Joi.date()
               .required(), 
                         
       
    }).options({ allowUnknown: true, abortEarly: false });
  
    return JoiSchema.validate(data)
}

  


//req.query.tags || !req.query.severity|| !req.query.status

//function to vaildate the details
function validateDetails(details)
{
    const JoiSchema = Joi.object({
                    
      severity: Joi.string()
               .valid('critical')
               .valid('high')
               .valid('medium')
               .valid('low') 
               .required(), 

      status: Joi.string()
               .valid('error')
               .valid('suppressed')
               .valid('passed')
               .required(), 


      tags: Joi.array().items(Joi.object({
         name:  Joi.string().optional(),
         size: Joi.string().optional(),
         region: Joi.string().optional(),
         type: Joi.string().optional(),
         tag: Joi.string().optional(),
     }))
                        


    }).options({  abortEarly: false });
  
    return JoiSchema.validate(details)
}
 

