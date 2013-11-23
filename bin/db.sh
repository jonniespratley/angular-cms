#!/bin/sh
rm ../db/mongod.lock 
mongod --dbpath db --rest --jsonp;