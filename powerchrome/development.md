-----------------------------------------------------------------------------
title     : PowerChrome: Development 
menu      :    
  GetStarted  : get-started.md
  Interface   : interface.md
  Development : development.md
  <img src='moon.svg' width=20> : javascript:darkmode()
  <img src='home.svg' width=20> : index.md
-----------------------------------------------------------------------------
<style>
  .markdown   { max-width:900px; margin:auto }
  #header     { background: linear-gradient(to bottom right, #06c, #fc0) }
  #left-panel { background: linear-gradient(to bottom right, #eee, #888) } 
  h1, h2      { border-bottom:1px solid grey }
  h2, h3, h4  { color:#06c }
</style>

## Side-Application

There are some interesting scenarios for PowerChrome Applications

### Display Board

It is very simple and easy to code a HTML application for display board. 
 
1. Connect to database 
2. Retrieve data from database
3. Render data by JavaScript
4. run in fullscreen mode by command: `powerchrome.exe /kiosk /app=sample-board.html`

##### Sample Code

~~~
<!DOCTYPE html>
<style>
	body   { line-height:1.5; margin:auto; padding:0; font-family:Verdana,arial }  
	header { background:darkgrey; color:white; height:20px; padding:12px; }
  h1     { margin-top:200px; font-size:40px; text-align:center; }
</style>

<!-------------- html layout -------------------->
<body>
<header>
  <div id="heading" style="float:left;font-size:14px;font-weight:bold">Sample DisplayBoard</div>
  <div id="info" style="float:right;font-size:8px" onclick="window.close()">click to close</div>
</header>
<div id="content"></div>
</body>

<!------------- SQL or data (optional) ------------>
<template id="sql-data1" title="SQL to retrieve data from DB">
select now() as current
</template>

<!------------- script section -------------------->
<script>

// when powerchrome page ready, connect database, and go to data retrieval
function onPageReady() {
  pb.dbConnect('ODBC',"connectstring='DRIVER={Microsoft Access Driver (*.mdb)};DBQ=sample.mdb'")
  loadData()
  setInterval( loadData, 1000 );
}  

// load data and render page
function loadData() {

  // load data (from database or web service) 
  let rs = JSON.parse( pb.dbQuery( document.getElementById('sql-data1').innerHTML ) )

  // then render page
  pb('info').innerHTML = new Date().toISOString()
  document.getElementById('content').innerHTML = '<h1>' + rs.data[0].current + '</h1>'

}
</script>
~~~

### Demonstration

make use of ``pb.sendkeys()`` to interact with existing web page

1. make a javascript file. e.g. `sample-demo.js`
2. code js function of showing hints. e.g. `showHints()`
3. send keystrokes, with calling `showHints()`
4. navigate to the web page, and send keystrokes. `powchrome.exe /url={link} /script=sample-demo.js`


### Web Crawler

it is so easy to write a web crawler by using ``pb.popup( {url}, { select:{selector} } )``

~~~
// crawl README content from PowerChrome github-repo
let html = pb.popup( 'https://github.com/casualwriter/powerchrome', {select:'.markdown-body'} )

// crawl content from PowerChrome Document
html = pb.popup( 'https://casualwriter.github.io/powerchrome', {select:'#right-panel'} )
~~~

### Ajax -> Sjax

using ``pb.httpRequest()``, a similar way to call ajax for web service/

* run in synchronization mode.
* no concern for cross-domain

### Automation

inject javascript for automation by ``pb.popup( {url}, { script:'import.js' } )``


## Local-Application


### Deployment

Local-application would be deployed to same folder of powerchrome.exe, or deploy to different 
folder and run by `powerchrome.exe /app={url}`

~~~
-- run index.html from same folder
powerchrome.exe

-- run main.html from same folder
powerchrome.exe /app=main.html

-- run html application in another folder
powerchrome.exe /app=c:\app\myprogram\index.html

-- run html application in network share folder
powerchrome.exe /app=\\it-server\app\myprogram\index.html
~~~


## Cloud-Application

HTML application can be deployed to internal web server, or external web server. 

~~~
// local web server
powerchrome.exe /app=https://localhost:8080/cms

// external web server
powerchrome.exe /app=https://app.myserver.com/cms

// use secret-string
powerchrome.exe /app=@ppgpfqducqopcqftdpppmlamlmplhpcqjufpcqcqjtduftkpfppobpmp
~~~

### cloud mode

Application run in `cloud mode` if startup url starts with `https://` or `http://` 

In cloud mode, **PowerChrome-JavaScript-Interface** is available for the URL in **SAME DOMAIN**. 

for example, run `chromechrome.exe` for web-application:

```
powerchrome.exe /app=https://app.mycompany.com/crm/index.html
```

API will only available for URL start with ``https://app.mycompany.com/crm/``.

If navigate to another domain, PowerChrome works like **normal chromium browser**.

### security issue

Be aware the security concern if HTML application is deployed to external web server. 

It is highly recommended to 

1. Not use local `powerchrom.ini`
2. use `pb.dbConnect()` to connect DB. use `secret-string` for DB connection parameters.
3. use `secret-string` for startup url

~~~
-- command line
powerchrome.exe /app=@ppgpfqducqopcqftdpppmlamlmplhpcqjufpcqcqjtduftkpfppobpmp

-- javascript for main page, connect database
function onPageReady() {
  
  // connect to database, close if failed.
  let rs = JSON.parse( pb.dbConnect( 'ORA', '', 'Oracle19DB', '@jpbpepcqbp', '@lpaqmpmpap' ) )

  if ( rs.status < 0 ) {
    pb.alert( 'falied to connect database! \n' + rs.sqlerrtext )
    pb.close()
    return
  }
  
  // application startup...
}

~~~


### pros & cons
   
   
  
## Notes

### About Powerbuilder

**No need to know anything about Powerbuilder** if just develop HTML/JavaScript application.

PowerChrome is developed using `Powerbuilder 2019R3`. PowerChrome inherits some features from Powerbuilder.

#### Connect DB by native driver

PowerChrome uses **native driver** to connect major database server (i.e. Oracle, Sybase, MS SQL Server, Informix), 
which is more stable and efficient than JDBC/ODBC/ADO, as long as still can use JDBC/ODBC/ADO/OLE-DB to connect 
all kind of database.

#### Datawindow and Report Builder

PowerChrome will make use of `Datawindow` for reporting. Any version of Powerbuilder IDE could be used 
as a report builder. 

#### Interact with PB objects

PowerChrome is able to call window/function/datawindow/userobject in Powerbuilder Libraries. 
  

### Compare with Powerpage

PowerChrome is rewritten based on same design idea of [Powerpage](https://github.com/casualwriter/powerpage) 
with significant improvement.

| Comparison       | PowerChrome         | PowerPage
|------------------|---------------------|----------
| Web Engine       | Chromimum           | IE 11
| Installation     | portable            | portable
| Package Size     | 170M                | 14M
| API (javascript) | sync mode           | async mode
| Developed By     | powerbuilder 2019R3 | powerbuilder 10.5
| Capability       | all purposes        |  simple application
  

### Problems & Solutions

Status | Problem | solution / remarks
-------|---------|----------------------------------------
v | synchronization mode   | no callback or promise.js
v | access window shell    | api [pb.run()](?file=interface.md#run), [pb.shell](?file=interface.md#shell)
v | access file system     | api [pb.file???()](?file=interface.md#file)
v | access database        | api [pb.db???()](?file=interface.md#db)
v | access printer         | api [pb.print(), pb.printSetup()](?file=interface.md#print)
v | save to PDF / HTML     | api [pb.saveas()](?file=interface.md#saveas)
v | session, app variables | api [pb.session()](?file=interface.md#session), [pb.property()](?file=interface.md#property)
v | html pages interaction | api [pb.popup()](?file=interface.md#popup), [pb.session()](?file=interface.md#session)
v | web-crawling           | api [pb.popup()](?file=interface.md#popup), [pb.httpSource()](?file=interface.md#httpsource)
v | ajax, corss-domain ajax| api [pb.httpSource(), pb.httpRequest()](?file=interface.md#httpsource)
v | login by window account| api [pb.login()](?file=interface.md#login)
v | send keystrokes        | api [pb.sendkeys()](?file=interface.md#sendkeys)
v | make use of pb windows | api [pb.window()](?file=interface.md#window)
v | security for cloud-app | api works for same domain only 
  | more control for cloud-app | api `pb.consent()`,  in development
  | reporting using datawindow | api `pb.datawindow()`, in development
  | simple app framework       | 
  
## More Information

More documentation can be found at https://casualwriter.github.io/powerchrome

* [Document Home](?file=index.md)
* [Getting Started](?file=get-started.md)
* [Interface (API)](?file=interface.md)
* [Development Guide](?file=development.md)
