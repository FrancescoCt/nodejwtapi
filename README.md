<h1 align="center">NodeJWTApi</h1>
<p align="center">
  <i>Un servizio API in PHP per una agenzia di viaggio</i>
  <br/><br/>
  <img width="400" alt="Xampp" src="https://github.com/FrancescoCt/francescoct.github.io/blob/master/assets/img/lavagna.jpg"/>
  <br/><br/>
  <b><a href="#features">Features</a></b> | <b><a href="#getting-started">How it works</a></b> | <b><a href="https://francescoct.github.io/">About me</a></b>
  <br/><br/>
  <a href="https://github.com/FrancescoCt/nodejwtapi/blob/main/CHANGELOG.md"><img src="https://img.shields.io/badge/version-0.1-blue" alt="Current Version"/></a>
  <a target="_blank" href="https://github.com/FrancescoCt/nodejwtapi"><img src="https://img.shields.io/github/last-commit/francescoct/nodejwtapi?logo=github&color=609966&logoColor=fff" alt="Last commit"/></a>
</p>
<div align="center">
  <img src="https://github.com/FrancescoCt/nodejwtapi/blob/master/Thumbnail.png" alt="Thumbnail" width="100%"/>
</div>
<br/><br/>

<details>
  <summary><b>Table of Contents</b></summary>

* [Features](#-features)
* [How it works](#-how-it-works)
* [How to test it](#-how-to-test-it)
</details>

<h2 id="features">🎯 Features</h2> 

* 🔍 **API REST**. Custom API which use Rest standard.
* 📱**JWT**. You can only use the apis if you are registered in database. When you login you will be given a token that will grant you access to the other pages of the site.
* 📅**Database**. Manipulate data in a SQL database and perform API calls.
* 💻 **Languages**. NodeJS, MySQL, HTML, CSS, Javascript (helper) <br/>
  <img width="24" height="24" alt="SQL" src="https://github.com/FrancescoCt/francescoct.github.io/blob/master/assets/favicons/mysql.png"/><img width="24" height="24" alt="Html" src="https://github.com/FrancescoCt/francescoct.github.io/blob/master/assets/favicons/html.png"/><img width="24" height="24" alt="Css" src="https://github.com/FrancescoCt/francescoct.github.io/blob/master/assets/favicons/css.png"/><img width="24" height="24" alt="Javascript" src="https://github.com/FrancescoCt/francescoct.github.io/blob/master/assets/favicons/javascript.png"/>

<h2 id="getting-started">🔍 How it works</h2>
<p>
  First you need to set up an .env file in which you define dbhost, dbuser, dbname, dbpassword, port, domain and adminusername and adminpassword. <br>
  All operations are performed on a local SQL DB (you have to create one first via mysql) with , you can call it for example nodejsserverjwt. The structure of the database 
  is reported   in the file migrations.sql. You should create the .env file accordingly. <br>
  Once the DB is set you should be able to access it with a server like Apache and perform the calls via Forms or via Postman. <br>
  If you want to use XAMPP like I did, take this Repository and copy paste it in the htdocs repository of Xampp resources explorer, it will work just fine. <br>
  So, when you download the repository, make sure to have the database created, the .env file with your credentials defined to access that db, and all the modules  in package.json loaded with npm install on your cmd. Then you can start the server with node app.js. <br>
  Once the server is started you can access the main page at the following local link: http://localhost:9600/home <br>
  You'll notice that you need to be logged in to access the apihelper (otherwise it will popup an unhautorized access page).<br> 
  If it's the first time you are logging in, you should go to the sign up page and put your credentials and email there. <br>
  Then, go to login page and get the token (after you login successfully the token will be set in a cookie that will grant you access to the others pages and apis and you can use them normally). 
  <br>We are talking about the same apis of nodejstravelapi project (https://github.com/FrancescoCt/NodejsTravelApi), but this time with jwt token implementation and better use of ejs for the pages. <br>
  For quick explanation of basic instruction have a look at note.txt file, if you prefer visual info instead, checkout the schema.png file.

</p>

## 💻 How to test it
In summary here there are the steps:

* Download xampp with default settings, then download the current repository and put it in htdocs repository. Here is the [link to Xampp](https://www.apachefriends.org/it/index.html).
* Create the database using migration.sql and define credentials in an .env file accordingly
* Load the missing node modules with npm install on your cmd pointed at repository level (node required)
* Start the app on cmd using the command line: node app.js
* Go to browser at following url: [link](http://localhost:9600/home)
* You'll notice you don't have access to all pages -> go to Sign in page and define your credentials, then login to retrieve your token : you now have access to all the other pages of the site
* Enjoy the apis :)
