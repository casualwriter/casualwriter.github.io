-----------------------------------------------------------------------------
title     : PowerChrome - Getting Started
menu      :    
  GetStarted  : get-started.md
  Interface   : interface.md
  Development : development.md
  <img src='sun.svg' width=20>  : javascript:darkmode()
  <img src='home.svg' width=20> : index.md
-----------------------------------------------------------------------------
<style>
  .markdown   { max-width:900px; margin:auto }
  #header     { background: linear-gradient(to bottom right, #06c, #fc0) }
  #left-panel { background: linear-gradient(to bottom right, #eee, #888) }
  h1, h2      { border-bottom:1px solid grey }
  h2, h3, h4  { color:#06c }
</style>

## Introduction

PowerChrome is a powerful and portable web browser that uses the Chromium engine to enable 
fast and easy development of desktop applications using HTML and JavaScript. 

With PowerChrome, you can quickly and easily write and run your own desktop applications, 
providing a seamless user experience for your users.


### Files

The following files are included in the downloaded package 
[powerchrome-0.60-with-runtime.zip](https://casualwriter.github.io/download/powerchrome-0.60-with-runtime.zip)

File Name       	| Description
--------------------|------------------------
powerchrome.exe 	| PowerChrome program 
powerchrome.js		| JavaScript interface
powerchrome.ini 	| INI config file (optional, recommended for development only)
powerchrome.html	| Default HTML program. it is API quick reference 
powerchrome.pbl 	| Source code of Powerbuilder (2019R3)
sample*.*      	  | Sample files (HTML and MS Access Database)
*.dll           	| Powerbuilder-Runtime Libraries
.\pbcef           | chromium (cef)

PowerChrome is a single execution file (powerchrome.exe), only `powerchrome.exe, powerchrome.js` 
and `Powerbuilder-Runtime` are required. The other files are optional or depends on usage.


### Download and Run

1. Download [powerchrome-0.60-with-runtime.zip](https://casualwriter.github.io/download/powerchrome-0.60-with-runtime.zip) and unzip the all-in-one package.
2. Run `powerchrome.exe`.
3. `powerchrome.html` will be loaded to demonstrate how PowerChrome works with an HTML desktop application.

![](https://casualwriter.github.io/powerchrome/powerchrome.jpg)


### Application Startup

PowerChrome load the startup page by the following sequence:

1. commandline options: `/app={startup.html}`
2. ini config at [system] section: `start={startup.html}`
3. index.html 
4. powerchrome.html

after page loaded, `powerchrome.js` will be imported to initialize interface, then call js function `onPageRead()`

To start coding, just simply create ``index.html`` and write your code in any text editor


### Code first application

Let's make a hello world program. Please save below code to "index.html".

```
<h2>hello world</h2>
<button onclick="pb.alert('hello')"> Hello </button>
<button onclick="pb.msgbox('title','hello world')"> MsgBox </button>
<button onclick="pb.api('console')"> Toggle Console </button>
```

and run `pwerchrome.exe` again. 

![](powerchrome-sample1.jpg)



## PowerChrome Parameters

PowerChrome accepts parameters from `command-line`  -> `powerchrome.ini` -> `JavaScript API`


### Command-line Options

``powerchrome.exe /app={startup.html} /fullscreen /script={interface.js} /save={name.html} /save={name.pdf} /select={selector}``    

* specify application startup page by ``/app={startup.html}`` or ``/url={startup.html}``
* open application in fullscreen ``/fullscreen`` or ``/kiosk``
* use customized interface script by ``/script={interface.js}``
* crawl page by css-selector, and save to HTML file ``/ulr={link} /save={name.html} /css=selector``
* print page to PDF file ``/ulr={link} /save={name.pdf}``


### powerchrome.ini 

PowerChrome will load initial setting from `powerchrome.ini`. For example

~~~
[System]
start   = {startup-page}
script  = {powerpage.js}
icon    = {icon-name}
watch   = [debug][api][sql][js]
console = {400px}

[browser]
top    = 100
left   = 20
width  = 1024
height = 700

[database]
DBMS=ODBC
DBParm=connectstring='DRIVER={Microsoft Access Driver (*.mdb)};DBQ=sample.mdb'
ServerName = 
LogId   = 
logPass = 
~~~

All setting can be reconfigured by JavaScript API. It is recommended use `powerchrome.ini` in development 
environment, and use JavaScript to configure application in production.


### Encrypt sensitive information  {secret-string}

`secret-string` is an encrypted string leading with '@'. The string could be used for the following sensitive 
parameter in command-line or `powerchrome.ini`. 

for example, use "secret-string" for startup URL in command line. 

~~~
powerchrome.exe /app=@fmdmnmeqlqdqargpdqmpjtduftkpfppobpmp
powerchrome.exe /app=https://google.com
~~~

for database connection in `powerchrome.ini`

~~~
[database]
DBMS = O90
ServerName = tnsname
LogId  = @secretstring
logPass= @secretstring
DBParm = @secretstring
~~~

to generate `secret string`, please call out console in PowerChrome, and run 

~~~
pb.api( 'secret', keystring )
pb.api( 'secret', 'https://google.com' )
~~~


### Mini Button

Up to 6 mini-buttons are available in the bottom-right corner. 

Normally, it is setup in the event of `onPageReady()`

~~~
function onPageReady() {

  // clear all mini-buttons
  pb.api( 'minibutton', 'clear' )
  
  // add mini-button of "toggle console panel"
  pb.api( 'minibutton', {script:"console", title:'Console', icon:'tile!'} )
  
  // add mini-button to show about dialog
  pb.api( 'minibutton', {script:'pb.about()', title:'About', icon:'toolkitabout!'} )
  
}  

~~~

The parameter of "script" could be any valid JavaScript, or below predefined action:

* `console`: toggle console panel
* `refresh`: refresh the page. => `location.reload()`
* `back`: go back to previous page. => `history.back()`
* `forward`: go forward. => `history.forward()`
* `about`: popup about-dialog. => `pb.about()` 
* `login`: popup login-dialog. => `pb.login()`


## Connect to Database  {database}

PowerChrome connects to major database using native driver or using JDBC/ODBC/ADO/OLE-DB to 
connect to all kind of database.

The database driver is provided by following file in `Powerbuilder 2019R3 Run-time`. 

File        | DBMS | Description
------------|------|--------------
pbin9.dll   | IN9  | INFORMIX I-Net 9
pbi10.dll   | I10  | INFORMIX I-Net 10 and 12
pbo90.dll   | O90  | Oracle 9i
pbo10.dll   | O10  | Oracle 10g
pbora.dll   | ORA  | Oracle 11g and later (12c, 18c, and 19c)
pbsnc.dll   | SNC  | SQL Native Client for Microsoft SQL Server
pbmsoledbsql.dll | MSO |  Microsoft OLE DB Driver for SQL Server
pbdir.dll   | DIR  | DirectConnect
pbase.dll   | ASE  | Adaptive Server Enterprise CT-LIB for Adaptive Server 15 only
pbsyc.dll   | SYC  | Adaptive Server Enterprise CT-LIB
pbodb.dll   | ODBC | Microsoft ODBC driver 
pbole.dll   | OLE  | OLE DB interface
pbado.dll, pbrth.dll | ADO | ADO.NET database interface
pbjdb.dll   | JDBC | JDBC database interface

Connection parameters can be defined in the [database] section of `powerchrome.ini`

~~~
[database]
DBMS = ORA
ServerName = {tnsname}
LogId  = {login Id}  
logPass= {login password}
DBParm = {connectstring or DB parameters}
~~~

or connect database by JavaScript `pb.dbConnect(...)` in startup page.

* Syntax: `pb.dbConnect( {dbms}, {dbParm}, {dbServer}, {logId}, {logPass} )`
* return: dbHandle if connected successfully.

### Connect to Oracle

PowerChrome may connect to oracle by native driver, JDBC, OLDDB, ODBC.

* Native O90 `pb.dbConnect( 'O90', '', 'XE', 'scott', 'tiger' )`
* Native ORA `pb.dbConnect( 'ORA', '', 'Oracle19DB', '@jpbpepcqbp', '@lpaqmpmpap' )`
* JDBC `pb.dbConnect( "JDBC", "Driver='oracle.jdbc.driver.OracleDriver',URL='jdbc:oracle:thin:scott/tiger@192.168.1.20:1521/xe'" )`
* OLE DB `pb.dbConnect('OLE', "Provider='OraOLEDB.Oracle'; DataSource='XE'", '.', 'tiger', 'scott')
* OLE DB `pb.dbConnect('OLE', "Provider='MSDAORA'; DataSource='XE'", '.', 'tiger', 'scott')

or defined in `powerchrome.ini` using [secret-string](#secret-string) if necessary.

~~~
[database]
DBMS      = O90
SeverName = XE
LogId     = scott
logPass   = tiger

[database]
DBMS      = ORA
SeverName = Oracle19DB
LogId     = @jpbpepcqbp
logPass   = @lpaqmpmpap

[database-jdbc]
DBMS   = JDBC
dbParm = Driver='oracle.jdbc.driver.OracleDriver',URL='jdbc:oracle:thin:scott/tiger@192.168.1.20:1521/xe'

[database-ole1]
DBMS    = OLE
LogId   = scott
logPass = tiger
dbParm  = Provider='MSDAORA'; DataSource='XE'

[database-ole2]
DBMS    = OLE
LogId   = scott
logPass = tiger
dbParm  = Provider='OraOLEDB.Oracle'; DataSource='XE'

~~~

### Connect to MS SQL

### Connect to MySQL



## Sample application

let's make a markdown editor

### Basic Programming Skeleton

let's start up with a HTML programming skeleton

~~~
<!DOCTYPE html>
<head>
	<title>PowerChrome Sample</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<!-------------- css style section ------------->
<style>
	body   { line-height:1.5; margin:auto; padding:0; ... }  
	header { background:grey; color:white; height:20px; padding:12px; }
	sql    { display:none }
	div    { font-size:14px; margin:0; padding:0; }
	.....
</style>

<!-------------- html layout -------------------->
<body>
<header>
  <div id="heading" style="float:left;font-size:14px;font-weight:bold">Let's make a markdown editor</div>
  <div id="topmenu" style="float:right">
    <button onclick="app.open()">Open</button>
    <button onclick="app.save()">Save</button>
	....
  </div>  
</header>
<div id="content"> 
....
</div>
</body>

<!------------- SQL or data (optional) ------------>
<sql id="sql-load-list"> ... </sql>
<sql id="sql-save-data"> ... </sql>

<!------------- script section -------------------->
<script>

// when powerchrome page ready, setup mini button and open console 
function onPageReady() {
  pb.api( 'minibutton', 'clear' )
  pb.api( 'minibutton', {script:'refresh', title:'Refresh', icon:'Synchronizer1!'} )
  pb.api( 'minibutton', {script:'pb.about()', title:'About', icon:'toolkitabout!'} )
  pb.api( 'minibutton', {script:"console", title:'Console', icon:'tile!'} )
}  

// prompt message before page close 
function onPageClose() { return 'Close window and exit?' }

// application event/function
const app = { name: "application service" }

app.open = () => { 
   pb.fileOpenDialog()
}

</script>
~~~

### Code Basic Layout by HTML

### Add functionality

### Debug in chrome browser

### Run within PowerChrome

## Deployment

### quick deployment (same folder)

* deploy `powerchrome.exe, powerchrome.js` to client's folder
* deploy `powerbuilder runtime` to same folder
* copy html program to the same folder

### deploy runtime to another folder

* deploy `powerbuilder runtime` to a folder, e.g. c:\app\pb2019-runtime
* add the folder to PATH, `PATH=c:\app\pb2019-runtime;%PATH%`
* deploy `powerchrome.exe, powerchrome.js` and html program to any folder

### deploy application

HTML application would be deployed to different folder of powerchrome.exe, and run by `powerchrome.exe /app={url}`

~~~
powerchrome.exe /app=c:\app\myprogram\index.html
powerchrome.exe /app=\\it-server\app\myprogram\index.html
powerchrome.exe /app=http://192.168.1.20:8080/myprogram/index.html
~~~



## Document History (in progress)

* 2022/12/16  initial version for v0.60, in progress..
* 
* to-do: sample program - markdown editor
* to-do: document for deployment

