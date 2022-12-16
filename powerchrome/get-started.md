-----------------------------------------------------------------------------
title     : PowerChrome - Getting Started
menu      :    
  Home         : index.md
  Get Started  : get-started.md
  Interface    : interface.md
  Development  : development.md
  github       : https://github.com/casualwriter/powerchrome
-----------------------------------------------------------------------------
<style title="ukraine-color-theme">
#header { background: linear-gradient(to bottom right, #06c, #fc0); }
body { background:#333!important; color:#bbb!important; FONT-FAMILY:CONSOLAS,ARIAL; } 
pre, code { background:#444!important; color:#ddd!important; border-radius:6px;}
a { color:#eee; } 
ul { margin:8px }
th, tr:nth-child(even) { color:#333; background:#aaa!important}
.markdown { max-width:900px; margin:auto }
.toc .active { color:#fc0!important }
.toc li:hover, a:hover{ background:#06c!important }
h1, h2 { border-bottom:1px solid grey }
h2, h3 { color:skyblue!important }
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


### Encrypt sensitive information

`secret-string` is an encrypted string leading with '@'. The string could be used for the following sensitive 
paymasters in command-line or `powerchrome.ini`. 

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

</body>

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

