# DisplayLayoutDemo
This is a demo using the CineNet API to get displays with layouts.  The layouts can be applied and the wall cleared.



**server.js is used for the demo to serve up the page**
 * To Run
 * 1.  Install Node Js (http://blog.teamtreehouse.com/install-node-js-npm-windows)
 * 2.  Run in command line 'npm install connect serve-static'
 * 3.  In the command lind navigate to the directory .\DisplayLayoutDemo\
 * 4.  Update username, password, and networkMangerUrl to match what CineNet system being used
   * a.  example
   ```
       var username = 'john';
       var password = 'doe';
       var networkManagerUrl = 'https://Deathstar/CineNet/NetworkManager/';
   ```
 * 5.  Run in command line 'node server.js'
 * 6.  The browse to http://localhost:31333/
 
