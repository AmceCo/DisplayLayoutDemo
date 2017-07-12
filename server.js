/**
 * This is used for the demo to serve up the page
 *
 * To Run
 * 1.  Install Node Js (http://blog.teamtreehouse.com/install-node-js-npm-windows)
 * 2.  Run in command line 'npm install connect serve-static'
 * 3.  In the command lind navigate to the directory where this file exists
 * 4.  Run in command line 'node server.js'
 */
var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic(__dirname)).listen(31333, function(){
    console.log('Server running on 31333...');
});