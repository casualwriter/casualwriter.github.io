-----------------------------------------------------------------------------
title     : PowerChrome: Interface
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
h2, h3, h5 { color:skyblue!important }
</style>

## Overview (API)

PowerChrome is written for html/javascript application. Basically it is a chromium-base (cef) web browser with 
interface with Powerbuilder application engine.

The interface provides the following all application supports.

* access `windows shell` to run/execute command
* access `file system` 
* access `database`  
* make `http request`
* application property and variables
* application services (e.g. call html-dialog)
* printing, and reporting service

Please note that interface call is running in **Synchronization Modes**. no need to consider `callback` or `promise.js`.


### How it works

PowerChrome will load startup HTML page with builtin chromium-base web browser, and import `powerchrome.js` 
to initialize interface, then call `window.onPageReady()` for application startup.

After interface is initialized, HTML/JavaScript application may call `pb.apiFunctions(..)` to application service.


### API Syntax

There are three forms for an API call.

* api-function: ``pb.run( 'notepad.exe', 'c:/temp' )``
* api-action: ``pb.api( 'run', {cmd: 'notepad.exe', path: 'c:/temp' } )``
* api-url: ``window.webBrowser.ue_interface( 'run?cmd=notepad.exe&path=c:/temp' )``

It is recommended to use ``api-function`` to access the interface. (``api-action`` is for internal usage)

This document will cover `api-function` and `api-action` only.


## Access window shell

### pb.run()

execute DOS command by `WScript.Shell -> run()`

##### Syntax

* syntax1: ``pb.run( {command} )`` 
* syntax2: ``pb.run( {command}, {path}, {style} )``
* syntax3: ``pb.api( 'run', { cmd:{command}, path:{path}, style: {style} } )``

##### Parameters

* `{command}` window command
* `{path}` the file path to run the command
* `{style}` := [ normal | min | max | hide ] [ +wait ]

##### Return

* for syntax1, returns "1" for success, and "-1" if an error occurs.
* for syntax2/syntax3, return "0"

##### Sample

* run notepad ``pb.run( 'notepad.exe' ) => ``pb.api('run','notepad.exe')``
* run notepad to edit file ``pb.run('notepad.exe powerchrome.html')``
* run notepad (maximized)  ``pb.run('notepad.exe powerchrome.html','','max')``
* run notepad and wait ``pb.run('notepad.exe','','wait')`` 
* run from a path ``pb.run('notepad2.exe', 'c:/temp')``
* call windows "Control Panel".  ``pb.run('control')``
* call windows "Group Policy". ``pb.shell( 'gpedit.msc')``


### pb.shell() 

execute command using window shell. this function will windows library `shell32 -> ShellExecute()`

##### Syntax

* syntax1: ``pb.shell( {file}, {parm}, {path}, {action}, {style} )`` 
* syntax2: ``pb.api( 'shell', { file:{file}, parm:{parm}, path:{path}, action:{action}, style:{style} } )``

##### Parameters

* `{file}` filename in windows searchable path
* `{parm}` parameters
* `{path}` directory of the file
* `{action}` := open | print | runas | edit | explorer | find
* `{style}` :=  normal | min | max | hide 

##### Return

* return a string from `shell32 -> ShellExecute()`, details may refer to [microsoft document](https://learn.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-shellexecutea)
* If the function succeeds, it returns a value greater than 32. 
* If the function fails, it returns an error value that indicates the cause of the failure. 

##### Samples

* open folder in file-explorer ``pb.shell('c:/temp')``
* open a file (same as click on the file in file explorer). ``pb.shell('powerchrome.html')``
* print file. ``pb.api( 'shell', { aciton:'print', file:'c:/temp/output.pdf' } )``


### pb.sendkeys()

send keystrokes by `WScript.Shell -> SendKeys()` with the following enhancement.

1. execute DOS command (e.g. may activate an external program)
2. go to window program for specified title, so that to send keystrokes to this program.
3. delay for seconds, or milliseconds
4. execute JavaScript. (e.g. use JavaScript to show hints dialog) 

##### Syntax

* syntax1: ``pb.sendkeys( {keystrokes} )`` 
* syntax2: ``pb.api( 'sendkeys', {keystrokes} )``

##### Parameters

{keystrokes} support the following special commands with keystrokes, separated by delimiter "/"

* {keystrokes} := `[/run={command}] [/title={title}] [/s={seconds}] [/ms={ms}] [/js={JavaScript}
* `/run={command}` run dos command, e.g. call notepad.exe
* `/title={title}` go to window program for specified title text
* `/s={seconds}` delay for seconds
* `/ms={ms}` delay for milliseconds
* `/js={JavaScript}` run JavaScript

##### Return

return string "1"

##### Samples

* run notepad. ``pb.sendkeys('run=notepad.exe/title=Untitled - Notepad/s=1/hello!\n/ms=800/Have a nice day!')``
* run javascript with keystrokes. ``pb.sendkeys('run=notepad.exe/s=2/Hello/js=alert("hello world")')``


## HTML Dialog

### pb.popup(url)

popup HTML dialog for multiple usages.

* open a HTML dialog
* crawl a web page
* print a web page
* save a web page to HTML or PDF
* inject JavaScript

##### Syntax

* syntax1: ``pb.popup( {url}, {left:{left}, top:{top}, width:{width}, height:{height}, script:{script}, import:{jsFile} } )`` 
* syntax2: ``pb.api( 'popup', { url:{url}, {left:{left}, top:{top}, width:{width}, height:{height}, script:{script}, import:{jsFile}  } )``

* syntax3: ``pb.popup( {url}, { save:{file}, select:{selector}, mode:{mode} )``
* syntax4: ``pb.api( 'popup', { url:{url}, save:{file}, select:{selector}, mode:{mode} )``

##### Parameters

* `{width}, {height}` assign the width/height of popup window
* `{left}, {top}` assign left/top position of popup window. center the window if no specified.
* `{file}` is the output filename. (filename.html for html format, or filename.pdf for PDF output)
* `{mode} := min | max | hide`, "min/hide" mode may useful for save/crawling web-page.
* `{select} := css-selector` for crawling web page. return string if no output file specified.
* `{script} := JavaScript` to execute JavaScript after page loaded.
* `{import} := jsFile` to import js library after page loaded.

##### Return

* return file name if output to html/pdf file
* return string in html format for crawling web-page
* return string by `pb.close( {return-string} )` for popup html dialog

##### Samples

* open url in html dialog ``pb.popup('https://news.ycombinator.com/')``
* popup dialog in specified width/height ``pb.popup('https://html5test.com/', {width:1024, height:700} )``
* popup dialog in specified position ``pb.popup('https://html5test.com/', {left:200, top:300, width:400, height:200})``
* load web page, and save to file ``pb.popup( 'https://html5test.com/', {save:'html5test.html', select:'table'} )``
* load web page, and save to PDF ``pb.popup( 'https://html5test.com/', {save:'./html5test.pdf', mode:'min'} )``
* crawl selected html for url  ``pb.popup( 'https://news.ycombinator.com/front', {select:'table'} )``
* execute JavaScript after page loaded ``pb.popup( 'sample-dialog.html', {script:"pb.alert('welcome')"} )``
* import JS library after page loaded ``pb.popup( 'sample-dialog.html', {import:"sample-dialog.js"} )``


### pb.popup(html)

popup HTML dialog, render page by specified HTML string.

##### Syntax

* syntax1: ``pb.popup( html, {left:{left}, top:{top}, width:{width}, height:{height}, script:{script}, import:{jsFile}  } )`` 
* syntax2: ``pb.api( 'popup', { url:{html}, left:{left}, top:{top}, width:{width}, height:{height}, script:{script}, import:{jsFile}  } )``

##### Parameters

* `{html}` is the string to render page in HTML format.
* `{width}, {height}` assign the width/height of popup window
* `{left}, {top}` assign left/top position of popup window. center the window if no specified.
* `{script} := JavaScript` to inject JavaScript after page loaded.
* `{import} := jsFile` to import js library after page loaded.

##### Return

* return string by `pb.close( {return-string} )`

##### Samples

* render page of hello-world ``pb.popup( '<h2>Hello World!</h2>', { width:300, height:200 } )``
* render page by html string ``pb.popup( pb('sub-page').innerHTML, { width:500, height:300 } )``


### pb.close()

close current window/dialog, with string return.

##### Syntax

* syntax1: ``pb.close()``
* syntax2: ``pb.close( {return-string} )`` 
* syntax3: ``pb.api( 'close', {return-string} )``

##### Return

return specified string

##### Samples

* close and return input value  ``pb.close( pb('user_name').value )`` 
* close with options  ``pb.close( 'yes' )``, ``pb.close( 'no' )``  


## Http Request

### pb.httpSource()

get the source of specified link, for multiple purpose

1. get html source for html page
2. get json result for web-service (cross-domain is ok)
3. get result in other format

##### Syntax

* syntax1: ``pb.httpSource( {url} )`` 
* syntax2: ``pb.api( 'http-source', {url} )``

##### Parameters

* `{url}` is the link to get HTML source.

##### Return

a string of the url source (html format, or JSON format, or other format)

##### Samples

* get source of url  ``html = pb.httpSource('https://casualwriter.github.io')``
* get json data ``rs = pb.httpSource('https://hacker-news.firebaseio.com/v0/item/2921983.json')``


### pb.httpRequest()

Send http-request. 

##### Syntax

* syntax1: ``pb.httpRequest( {method}, {url}, {data}, {contentType} )`` 
* syntax2: ``pb.api( 'http-request', { method: {method}, url: {url}, content: {contentType}, data: {data} } )``

##### Parameters

* `{method}` := GET | POST | PUT | DELETE 
* `{url}` is the link to send request.
* `{data}` is the parameter for POST/PUT action
* `{contentType}` assign the content type in request header

##### Return

a string in json format. e.g. `{ "status":200, "code": 1 "result":"....." }`

##### Samples

* send http Request ``rs = pb.httpRequest('GET','https://www.google.com/search?q=html')``
* send POST request. ``rs = pb.httpRequest('GET','https://localhost:8080/myWebService.jsp', {id:"1024"} )``


## Work with database

### pb.dbConnect()

connect to database transaction.

##### Syntax

* syntax1: ``pb.dbConnect( {DBMS}, {dbParm}, {ServerName}, {logID}, {logPass} )`` 
* syntax2: ``pb.api( 'db-connect', { dbms:{DBMS}, dbparm: {dbParm}, servername: {ServerName}, logid: {logID}, logpass: {logPass} )``

##### Parameters

##### Return

* if connect success, return `{ "status":0, "sqlerrtext":"", "dbHandle":106262036 }`
* if connect failed, return `{ "status":-1, "sqlerrtext":"error message", "dbHandle":0 }`

##### Code Samples

~~~
// connect to Oracle (native O90) 
let rtn = JSON.parse( pb.dbConnect( 'O90', '', 'XE', 'scott', 'tiger' ) )

if (rtn.status < 0 ) {
  pb.alert( 'Error! Cannot connect to database\nMessage:' + rtn.sqlerrtext )
  return
}
~~~

~~~
// connect to Oracle (native for 11g - 19c) 
pb.dbConnect( 'ORA', '', 'Oracle19DB', '@jpbpepcqbp', '@lpaqmpmpap' )

// connect to Oracle via JDBC 
pb.dbConnect( "JDBC", "Driver='oracle.jdbc.driver.OracleDriver',URL='jdbc:oracle:thin:scott/tiger@192.168.1.20:1521/xe'" )

// connect to Oracle via OLEDB (OraOLEDB.Oracle)
pb.dbConnect('OLE', "Provider='OraOLEDB.Oracle'; DataSource='XE'", '.', 'tiger', 'scott')

// connect to Oracle via OLEDB (MSDAORA) 
pb.dbConnect('OLE', "Provider='MSDAORA'; DataSource='XE'", '.', 'tiger', 'scott')

// connect to MS Access via ODBC 
pb.dbConnect( "ODBC", "connectstring='DRIVER={Microsoft Access Driver (*.mdb)};DBQ=sample.mdb'" )
~~~

### pb.dbCommit()

commit database transaction. 

### pb.dbRollback()

rollback database transaction. 

### pb.dbQuery()

execute SQL query and return string in json format.

### pb.dbTabel()

execute SQL query and return string in HTML table format.

### pb.dbExecute()

execute SQL statement.


## Access file system

### pb.fileExists()

check file existence.

### pb.fileRead()

read a text file.

### pb.fileAppend()

append to a text file 

### pb.fileWrite()

write to a text file

### pb.fileCopy()

copy file.

### pb.fileMove()

move file

### pb.fileDelete()

delete file


## Console and Message

### pb.console()

show message in console panel.

### pb.alert()

display alert message box. 

### pb.msgbox()

display a message box. 

### pb.error()

display error message in console panel.

### pb.status()

display message in status bar.


## Application / Misc

### pb.property()

### pb.session()

### pb.print()

### pb.printSetup()

### pb.saveas()

### pb.close()


## Work with Powerbuilder

### pb.window()

### pb.about()

### pb.login()

### pb.function()

### pb.datawindow()


## Browser Setup

### pb.api('position')

### pb.api('console')

### pb.api('minibutton')



## Document History (in progress..)

* 2022/12/16  initial version for v0.60, in progress..
* 
* to-do: execute sample command within PowerChrome
* to-do: document for file API
* to-do: document for database API
