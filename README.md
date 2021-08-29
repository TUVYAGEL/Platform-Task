# Platform-Task
Platform-Task is a node-react system, that get "messages", and also send the "messages" to clients (using react)



In order to run this project, you have to first clone it.

There are two folders inside.

One for the React(client), and second for the Node(server)


The dependencies in the pachage.json aren't installed yet!!!


Open each of the folders in your vs code (for the convenience, you can do this from the cmd too), than open the terminal and write : npm install .
It will automotically install all the needed dependencies.

Once you have done that, you can run the project!

In the server side , write in the termianl : node server.js.  
Now the server will start running , on port 8081.


On the client side, wtire in the terminal: npm start


Now , a chrome window will be open on port 3000, showing the client side.

That it.



Script for post requests:
If you want to make post requests to the server, with new messages, i had a python script for that, attached to this repo.




If you want to run it all from the server side:
(
so that when you make a simple get request in localhost:8081, the server will send you back an "index.html" that does the react.

which means that you don't need npm start.)


You have to first build the "client".

in order to to this, just run the command : npm run build , (on the client side).

Make sure that both the server and the client directories are under one father dir.

Once you did that everything is ready. 
you can run it all from the server side.   (please notice that every time you change the react, you have to rebuild)
enjoy
