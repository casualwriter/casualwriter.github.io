-----------------------------------------------------------------------------
title     : PowerChrome - Get Started
menu      :    
  Home         : index.md
  Get Started  : get-started.md
  Interface    : interface.md
  Development  : development.md
  github       : https://github.com/casualwriter/powerchrome
-----------------------------------------------------------------------------
<style title="ukraine color theme">
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

Powerchrome is a single execution file (powerchrome.exe), only `powerchrome.exe, powerchrome.js` 
and `Powerbuilder-Runtime` is requried. The other files are options or depends on usage.

File Name       | Description
----------------|------------------------
powerchrome.exe | Powerchrome progam 
powerchrome.ini | ini config file (optional, recommeded for development only)
powerchrome.js  | javascript interface
powerchrome.html| html program of introduction an quick reference
powerchrome.pbl | source code of Powerbuilder (2019R3)
sample.mdb      | sample database (MS access)
sample-dialog.html | sample html dialog 
sample-dialog.js  | sample javascript for html dialog 

### Run PowerChrome

1. Download [powerchrome-0.60-with-runtime.zip](https://casualwriter.github.io/download/powerchrome-0.60-with-runtime.zip) and unzip the all-in-one package.
2. Run `powerchrome.exe`.
3. `powerchrome.html` will be loaded to demonstrate how PowerChrome works with an HTML desktop application.

![](https://casualwriter.github.io/powerchrome/powerchrome.jpg)

### Application Startup

Powerchrome load the startup page by the following sequence:

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

and run pwerchrome.exe again. 

![](powerchrome-sample1.jpg)


## PowerChrome Parameters

### Commandline Options

``powerchrome.exe /app={startup.html} /fullscreen /script={interface.js} /save={name.html} /save={name.pdf} /select={selector}``    

* specify application startup page by ``/app={startup.html}`` or ``/url={startup.html}``
* open application in fullscreen ``/fullscreen`` or ``/kiosk``
* use customized interface script by ``/script={interface.js}``
* crawl page by css-selector, and save to html file ``/ulr={link} /save={name.html} /css=selector``
* print page to pdf file ``/ulr={link} /save={name.pdf}``

### powerchrome.ini 

~~~
[System]
start   = {startup-page}
script  = powerpage.js
icon    = {icon}
watch   = [debug][api][sql][js]
console = 400px

[browser]
top    = 100
left   = 20
width  = 1024
height = 700

[database]
DBMS=ODBC
DBParm=connectstring='DRIVER={Microsoft Access Driver (*.mdb)};DBQ=sample.mdb'
~~~

### Mini Button

Up to 6 mini-buttons are available in the bottom-right cornor. 

~~~
function onPageReady() {
  pb.api( 'minibutton', 'clear' )
  pb.api( 'minibutton', {script:"console", title:'Console', icon:'tile!'} )
  pb.api( 'minibutton', {script:'pb.about()', title:'About', icon:'toolkitabout!'} )
}  
~~~


## Sample application

let's make a markdown editor...


## Deployment

### deploy to same folder

* Deploy `powerchrome.exe, powerchrome.js` to client's folder
* Deploy `powerbuilder runtime` to same folder
* copy html program to the same folder

### deploy runtime to another folder

* Deploy `powerbuilder runtime` to a folder, e.g. c:\app\pb2019-runtime
* add the folder to PATH, `PATH=c:\app\pb2019-runtime;%PATH%`
* Deploy `powerchrome.exe, powerchrome.js` and html program

### HTML Application

HTML application would be deployed to different folder of powerchrome.exe, and run by `powerchrome.exe /app={url}`

~~~
powerchrome.exe /app=c:\app\myprogram\index.html
powerchrome.exe /app=\\it-server\app\myprogram\index.html
powerchrome.exe /app=http://192.168.1.20:8080/myprogram/index.html
~~~


### Encrypt sensitive information

* use for database connection
* use for startup url

call out console, run ``pb.api('secret', keystring)``


## To-Be-Continue...
