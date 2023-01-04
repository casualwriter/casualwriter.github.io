-----------------------------------------------------------------------------
title     : PowerChrome for Desktop Application
menu      :    
  GetStarted   : get-started.md
  Interface    : interface.md
  Development  : development.md
  <img src='moon.svg' width=20>   : javascript:darkmode()
  <img src='github.svg' width=20> : https://github.com/casualwriter/powerchrome
-----------------------------------------------------------------------------
<style>
  .markdown   { max-width:900px; margin:auto }
  #header     { background: linear-gradient(to bottom right, #06c, #fc0) }
  #left-panel { background: linear-gradient(to bottom right, #eee, #888) } 
  h1, h2      { border-bottom:1px solid grey }
  h2, h3, h4  { color:#06c }
</style>
 
## PowerChrome for Desktop Application

PowerChrome is a portable chromium-base web browser to enable fast and easy development 
of desktop applications using HTML and JavaScript. 

With PowerChrome, you can quickly and easily write and run your own desktop applications, 
providing a seamless user experience for your users.

### Motivation

HTML is great for UI, and JavaScript is awesome for coding. However, developing web-base program 
for desktop is somehow frustrated experience as web browser revoke all accessibility of local 
resources. End-user will not understand why your program cannot access printer, open a file,
run another program or access database. You are hacking problems with hands and legs tied up. 

I had longed for a web browser which has DB connectivity and OS accessibility, so that can 
coding JavaScript/HTML/CSS application like Electron. so thankful that have chance to make one.

### JavaScript Interface

PowerChrome provides a natural approach to HTML and JavaScript application development. 
It allows HTML pages to access the window shell, file system, and database, and provides 
additional application support through the PowerChrome JavaScript Interface (which runs in sync mode).

Examples of the PowerChrome JavaScript Interface include:

* Calling notepad.exe: `pb.run('notepad.exe')`
* Executing a file: `pb.shell('calc.exe')`
* Copying a file: `pb.fileCopy(sourceFile, targetFile)`
* Connecting to an Oracle database: `pb.dbConnect('O90', dbParm, dbServer, logID, logPass)`
* Running a SQL query (in sync mode): `rsStr = pb.dbQuery('select * from tablename')`
* Running a SQL query and converting the results to JSON: `rs = JSON.parse(pb.dbQuery(sql))`
* Getting HTML source (in sync mode): `rs = pb.httpSource('https://hacker-news.firebaseio.com/v0/item/160705.json')`
* Popup an HTML dialog: `pb.popup('sample-dialog.html', {width: 1024, height: 700})`

### Features

* Portable - no installation required
* Chromium-based - can use Chrome/Chromium for testing and debugging
* HTML as the application format and JavaScript ES6 for programming
* API that runs in sync mode - no callback or promise objects
* Work with Powerbuilder for advanced functionality
* Simple console support
* Cloud-app enabled
* Run on Windows 7/8/10/11
  
  
## Get Started
   
### Download and Run

1. Download [powerchrome-0.60-with-runtime.zip](https://casualwriter.github.io/download/powerchrome-0.60-with-runtime.zip) and unzip the all-in-one package.
2. Run `powerchrome.exe`.
3. `powerchrome.html` will be loaded to demonstrate how PowerChrome works with an HTML desktop application.

![](https://casualwriter.github.io/powerchrome/powerchrome.jpg)
   

### Application Startup

PowerChrome loads the startup page using the following sequence:

1. Commandline options: `/app={startup.html}`
1. INI config in the [system] section: `start={startup.html}`
1. `index.html`
1. `powerchrome.html`

After the page is loaded, `powerchrome.js` will be imported to initialize the interface, 
then call the JavaScript function `onPageLoaded()`.

To start coding, simply create an `index.html` file and write your code in any text editor.
   

### Files & Deployment

The following files are included in the downloaded package 
[powerchrome-0.60-with-runtime.zip](https://casualwriter.github.io/download/powerchrome-0.60-with-runtime.zip)

Deploy | File Name       	| Description
-------|--------------------|------------------------
Yes | powerchrome.exe 	| PowerChrome program 
Yes | powerchrome.js		| JavaScript interface
    | powerchrome.ini 	| INI config file (optional, recommended for development only)
    | powerchrome.html	| Default HTML program. it is API quick reference 
    | powerchrome.pbl 	| Source code of Powerbuilder (2019R3)
    | sample*.*      	  | Sample files (HTML and MS Access Database)
Yes | *.dll           	| Powerbuilder-Runtime Libraries
Yes | .\pbcef           | chromium (cef)

PowerChrome is a single execution file (powerchrome.exe), only `powerchrome.exe, powerchrome.js` 
and `Powerbuilder-Runtime` are required. The other files are optional or depends on usage.


### Command-line Options

``powerchrome.exe /app={startup.html} /fullscreen /script={interface.js} /save={name.html} /save={name.pdf} /select={selector}``    

* specify application startup page by ``/app={startup.html}`` or ``/url={startup.html}``
* open application in fullscreen ``/fullscreen`` or ``/kiosk``
* use customized interface script by ``/script={interface.js}``
* crawl page by css-selector, and save to HTML file ``/ulr={link} /save={name.html} /css=selector``
* print page to PDF file ``/ulr={link} /save={name.pdf}``

### Documenation

Sorry that documentation is still in progress, will be available in https://casualwriter.github.io/powerchrome

* [Getting Started](https://casualwriter.github.io/powerchrome/?file=get-started.md)
* [Interface (API)](https://casualwriter.github.io/powerchrome/?file=interface.md)
* [Development Guide](https://casualwriter.github.io/powerchrome/?file=development.md)

or click on the button of [documentaion] within PowerChrome.
   

## Modification History

* 2022/12/09, release v0.60, implement security for cloud mode.
* 2022/12/16, draft document framework (Home, Getting Started, API, Dev)
* 2023/01/02-04, update document - interface.md, get-started.md

### To Do List

* [.] documentation - Get Started
* [.] documentation - Development Guide
* [ ] enable api-call when load document within PowerChrome
* [ ] make use of datawindow for application reporting
* [ ] pb.encode(manner,text), pb.decode(manner,text)
* [ ] local application - markdown editor
* [ ] local application - web crawler
* [ ] cloud application - oracle schema, oracle helper, db-reporting

