# Platform-Task
Platform-Task is a node-react system, that get "messages", and also send the "messages" to clients (using react)


## Set up
To set up the project you need to install all the node modules in both of the projects

```sh
cd Platform-Task/client
npm install
cd ../server
npm install
```

## Running the projects
For this to work you need to have both the node server and the react project running.
### Start the server
To start the server you need to call these commands
```sh
cd Platform-Task/server
node server.js
```
This server should now be running on port 8081.


### Start the client
To start the app you need to call 
```sh
cd Platform-Task/client
npm start
```
This will start the react application on port 3000.


## Build
If you want to build the client , you need to call
```sh
cd Platform-Task/client
npm run build
```

This will build the react application .
start the server, open  http://localhost:8081, and the index.html will be sent from the server.



## Making post requests
