-----------------------------------------------------------------------------
title     : PowerChrome: Interface
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

## Overview (API)

PowerChrome is written for html/javascript application. Basically it is a chromium-base (cef) web browser with 
interface with Powerbuilder application engine.

The interface provides the following application supports.

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

After interface is initialized, HTML/JavaScript application may call `pb.apiFunctions(..)` for application service.


### API Syntax

There are three forms for an API call. For example,

* api-function: ``pb.run( 'notepad.exe', 'c:/temp' )``
* api-action: ``pb.api( 'run', {cmd: 'notepad.exe', path: 'c:/temp' } )``
* api-url: ``window.webBrowser.ue_interface( 'run?cmd=notepad.exe&path=c:/temp' )``

Notes:

* `api-function` is the javascript functions created in `powerchrome.js` for specified purpose.
* `api-action` is a js function calling API by action, in the syntax `pb.api( {action}, { parm1:value1, parm2:value2, ...}`.
* `api-function` and `api-action` will transform to `api-url` format and pass to interface
* `api-url` is for internal usage only, not recommended to use directly

This document will cover `api-function` and `api-action` only.


## Access window shell

### pb.run()    {run}

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


### pb.shell()    {shell}

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


### pb.sendkeys()   {sendkeys}

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

### pb.popup(url)    {popup}

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


### pb.close()    {close}

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


## Http Request   {http}

### pb.httpSource()    {httpsource}

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


### pb.httpRequest()    {httprequest}

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


## Work with database   {db}

### pb.dbConnect()

connect to database transaction. Please refer to [Get-Started - database](?file=get-started.md#database)

##### Syntax

* syntax1: ``pb.dbConnect( {DBMS}, {dbParm}, {ServerName}, {logID}, {logPass} )`` 
* syntax2: ``pb.api( 'db-connect', { dbms:{DBMS}, dbparm: {dbParm}, servername: {ServerName}, logid: {logID}, logpass: {logPass} )``

##### Parameters

* `{DBMS}` := ORA | O90 | O10 | ODBC | JDBC | ADO | OLE | ...
* `{dbParm}` is the additional parameters for DB drivers
* `{ServerName}` is the database server name
* `{LogID}` is the login user id for database server
* `{logPass}` is the login password for database server

##### Return

* if connect success, return `{ "status":0, "sqlerrtext":"", "dbHandle":106262036 }`
* if connect failed, return `{ "status":-1, "sqlerrtext":"error message", "dbHandle":0 }`

##### Samples

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

##### Syntax

* syntax1: ``pb.dbQuery( {sql} )`` 
* syntax2: ``pb.api( 'db-query', { sql:{sql} } )``

##### Parameters

* `{sql}` is the SQL query script

##### Return

~~~
// if query success, return json string like 
{ "colCount":4 , "rowCount":8 , 
    "colLabels": [ "col-label-1", "col-label-2", "col-label-3", etc... ], 
    "columns":  [ "col-name-1", "col-name-2", "col-name-3", etc.. ] , 
    "data": [ { "col-name-1": row0-val1 , "col-name-2": row0-val2, ""col-name-3": row0-val3, etc..}, 
              { "col-name-1": row1-val1 , "col-name-2": row1-val2, ""col-name-3": row1-val3, etc..}, 
              etc...
            ] 
}

// if query failed, return json string like below
`{ "status":-2, "error": "cannot find table categories...\n\nselect * from categories" }
~~~

##### Samples

* run query, return json string.  ``pb.dbQuery("select * from categories")``
* run query, get json.  ``rs = JSON.parse(pb.dbQuery('select * from categories'))``


### pb.dbTable()

execute SQL query and return string in HTML table format.

##### Syntax

* syntax1: ``pb.dbTable( {sql} )`` 
* syntax2: ``pb.api( 'db-table', { sql:{sql} } )``

##### Parameters

* `{sql}` is the SQL query script

##### Return

return a html table like below 

~~~
<table class=\"pb-table\">
<tr><th>Categoryid</th> <th>Categoryname</th> <th>Description</th> <th>Remarks</th> </tr>
<tr><td>1</td><td>Beverages</td><td>Soft drinks, coffees, teas</td><td>&nbsp;</td></tr>
<tr><td>2</td><td>Condiments</td><td>Sweet and savory sauces</td><td>&nbsp;</td></tr>
<tr><td>3</td><td>Confections</td><td>Desserts, candies, and sweet breads</td><td>&nbsp;</td></tr>
</table>
~~~

##### Samples

* run SQL query, return html table.  ``pb.dbTable('select * from categories')``
* run SQL query, return html table.  ``pb.dbTable('SELECT * FROM NLS_DATABASE_PARAMETERS')``


### pb.dbExecute()

execute SQL statement.

##### Syntax

##### Syntax

* syntax1: ``pb.dbExecute( {sql} )`` 
* syntax2: ``pb.api( 'db-execute', { sql:{sql} } )``

##### Parameters

* `{sql}` is the executable SQL script

##### Return 

* if success, return json string `{ "status": 1, "sqlcode":0, "sqlerrtext":"null" }`
* if error, return json string `{ "status": -1, "sqlcode":-1, "sqlerrtext":"error message..." }

##### Samples

* Update Record. ``pb.dbExecute("update categories set remarks='testing..' where CategoryName='PowerChrome'")``
* Insert Record. ``pb.dbExecute("insert into categories values (99, 'PowerChrome', 'Test Record', '')")``
* Delete Record. ``pb.dbExecute("delete from categories where CategoryName like 'PowerChrome%'")``


## Access file system    {file}

### pb.fileExists()

check file existence, return a string of "true/false"

##### Syntax

* syntax1: ``pb.fileExists( {file} )``
* syntax2: ``pb.api( 'file-exists', {file} )``

##### Parameters

* {file} is the file name or full path

##### Return

return string `"true"` if file exists, `"false"` if not exists

##### Samples

* check file existence. ``pb.fileExists('sample.txt')``
* check file existence. ``pb.api( 'file-exists', 'sample.txt')``

### pb.fileRead()

read a text file. return file content in string.

##### Syntax

* syntax1: ``pb.fileRead( {file} )``
* syntax2: ``pb.api( 'file-read', {file} )``

##### Parameters

* {file} is the file name or full path

##### Return

return file content in string. return empty string if file not found

##### Samples

* read ini file ``pb.fileRead('powerchrome.ini')``
* read js file ``pb.api( 'file-read', 'powerchrome.js')``


### pb.fileAppend()

append to a file in text format. if file not exists, create the file then append text

##### Syntax

* syntax1: ``pb.fileAppend( {file}, {text} )``
* syntax2: ``pb.api( 'file-append', { file: {file}, text: {text} } )``

##### Parameters

* {file} is the file name or full path
* {text} is the text to append

##### Return

return the count of characters appended.

##### Samples

* Append text to file. ``pb.fileAppend('sample.html', '<h3>hello world!</h3>\n')``
* Append text to file. ``pb.api( 'file-append', {file:'sample.html', text:'this is a test message\n'} )``


### pb.fileWrite()

write to a file in text format. overwrite if file exists, create new file if file not exists.

##### Syntax

* syntax1: ``pb.fileWrite( {file}, {text} )``
* syntax2: ``pb.api( 'file-write', { file: {file}, text: {text} } )``

##### Parameters

* {file} is the file name or full path
* {text} is the text to write

##### Return

return the count of characters written.

##### Samples

* Write text. ``pb.fileAppend('sample.html', '<h3>hello world!</h3>\n')``
* Write text. ``pb.api( 'file-write', { file:'sample.html', text:'<h3>hello world!</h3>\n' } )``

### pb.fileCopy()

Copies one file to another.

##### Syntax

* syntax1: ``pb.fileCopy( {source}, {target} )``
* syntax2: ``pb.api( 'file-copy', { source: {source}, target: {target} } )``

##### Parameters

* {source} is the source file name (or full path）
* {target} is the destination to copy file

##### Return

* "1" for Success
* "-1" for error opening source file
* "-2" for error writing target file

##### Samples

* Copy file. ``pb.fileCopy( 'sample.txt', 'sample1.txt' )``
* Copy file. ``pb.api( 'file-copy', {source:'sample1.txt', target:'sample2.txt'} )``

### pb.fileMove()

move a file

##### Syntax

* syntax1: ``pb.fileMove( {source}, {target} )``
* syntax2: ``pb.api( 'file-move', { source: {source}, target: {target} } )``

##### Parameters

* {source} is the source file name (or full path）
* {target} is the destination to copy file

##### Return

* "1" for Success
* "-1" for error opening source file
* "-2" for error writing target file

##### Samples

* Move file. ``pb.fileMove( 'sample.txt', 'sample2.txt' )``
* Move file. ``pb.api( 'file-move', { source:'sample1.txt', target:'sample.txt' } )``


### pb.fileDelete()

delete a file.

##### Syntax

* syntax1: ``pb.fileDelete( {file} )``
* syntax2: ``pb.api( 'file-delete', {file} )``

##### Parameters

* {file} is the file name or full path

##### Return

return string `"true"` if file exists, `"false"` if not exists

##### Samples

* delete file. ``pb.fileDelete('sample1.txt')``
* delete file. ``pb.api( 'file-delete', 'sample2.txt' )``


## Console and Message

### pb.console()

show message in console panel. `console.log()` will be diverted to this function to show message.

##### Syntax

* syntax1: ``pb.console( {args} )``
* syntax2: ``console.log( {args} )``

##### Parameters

{args} is the text/objects to show in console.

##### Return

string of the message showing in console

##### Samples

* show message. ``pb.console( 'hello world!' )``
* show multiple values. ``pb.console( 'hello', 3+4, {status:1, msg:"done"} )``
* use console.log. ``console.log( 'hello', 3+4, {status:1, msg:"done"} )``

### pb.status()

display message in status bar.

##### Syntax

``pb.status( {text} )``

##### Return

return {text}

##### Samples

* prompt message in status-bar ``pb.status('ready')``
* prompt message in status-bar ``pb.status('file sample.ini not found!')``


### pb.alert()

display alert message box. this function call MessageBox() instead of `javascript:alert()`

##### Syntax

``pb.alert( {text} )``

##### Parameters

{text} is the text message for alert box

##### Return

return {text}

##### Samples

* show message ``pb.status('Data has been saved')``
* alert for problem ``pb.status('file sample.ini not found!')``

### pb.msgbox()

display a message box with options 

##### Syntax

``pb.msgbox( {title}, {message}, {options} )``

##### Parameters

* {title} is the title of message box
* {message} is the message of the dialog box
* {options} := ok | yes,no | yes,no,cancel | ok,cancel | retry,cancel | abort,retry,cancel
* {options} := ok | yn | ync | oc | rc | arc  (in short form)

##### Return

return "1"/"2"/"3" depends of selection

##### Samples

* show message with title. ``pb.msgbox( 'ABC system', 'Data has been saved!' )``
* with Yes/No options. ``pb.msgbox( '', 'Save data?', 'yes,no' )``
* with ok/cancel options ``if ( pb.msgbox( 'System', 'Close and exit?', 'ok,cancel' ) == 1 ) pb.close();``

### pb.error()

display error message in console panel.

##### Parameters

* {code} is the error code
* {message} is the error message 

##### Source

this function is defined in `powerchrome.js` by the following code. It will show to console only.

```
pb.error = (code,msg) => { return window.webBrowser.ue_message('console?[error='+code+'] '+msg) }
```

This function is used to standardize error handling. It can be redefined/customized with logging or other 
handling in application.


## Application / Misc

### pb.property()

get or set application properties

### pb.session()    {session}

get or set session variables

### pb.print()      {print}

show print dialog of printing current page. similar to `javascript:window.print()`

### pb.printSetup()

show printer setup dialog

### pb.saveas()     {saveas}

save current page to HTML file or PDF file


## Work with Powerbuilder

### pb.about()      {about}

show about dialog

### pb.login()      {login}

popup login dialog for Windows account authentication.

### pb.window()     {window}

call powerbuilder window entry

### pb.function()   {function}

call powerbuilder global function entry

### pb.datawindow() - in development  {datawindow}

make use of Powerbuilder datawindow for multiple purposes.

1. display datawindow as report, preview and print out.
2. use datawindow to print special labels
3. use datawindow for data input

#### Syntax

* syntax1  ``pb.datawindow( {dwSyntax}, {Options} )``
* syntax2  ``pb.api( 'datawindow', { syntax: {dwSyntax}, {Options} } )``


## Browser Setup    {browser}

### pb.api('position')

### pb.api('console')

### pb.api('minibutton')



## Document History (in progress..)

* 2022/12/16  initial version for v0.60
* 2023/01/02  document db/file functions
* 2023/01/03  update document
