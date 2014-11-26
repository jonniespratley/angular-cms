#!/bin/sh

#start the mongo db and server
mongod --dbpath db --rest --jsonp;

#start the api server
node server;

#start the web server
grunt serve;
