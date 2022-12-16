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
* syntax2: ``pb.run( {command}, path, style )``
* syntax3: ``pb.api( 'run', { cmd:{command}, path:{path}, style: {style} } )``

##### Parameters

* {command} := window command
* {path} := the file path to run the command
* {style} := [ normal | min | max | hide ] [ +wait ]

##### Return

* for syntax1, returns "1" if it is successful and "-1" if an error occurs.
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

* {file} := file in windows searchable path
* {parm} := parameters 
* {path} := the file path
* {action} := open | print | runas | edit | explorer | find
* {style} :=  normal | min | max | hide 

##### Return

* return a string from `shell32 -> ShellExecute()`, details may refer to [microsoft document](https://learn.microsoft.com/en-us/windows/win32/api/shellapi/nf-shellapi-shellexecutea)
* If the function succeeds, it returns a value greater than 32. 
* If the function fails, it returns an error value that indicates the cause of the failure. 

##### Samples

* open folder in file-explorer ``pb.shell('c:/temp')``
* open a file (same as click on the file in file explorer). ``pb.shell('powerchrome.html')``
* print file. ``pb.api( 'shell', { aciton:'print', file:'c:/temp/output.pdf' } )``


### pb.sendkeys()

send keystrokes by `WScript.Shell -> SendKeys()`

##### Syntax

* syntax1: ``pb.sendkeys( {keystrokes} )`` 
* syntax2: ``pb.api( 'sendkeys', {keystrokes} )``

##### Parameters

{keystrokes} support the following special commands with keystrokes, separated by delimiter "/"

* {keystrokes} := `[run={command}] / [title={title} / [s={seconds}] / [ms={ms}] / [js={JavaScript}
* `run={command}` run dos command, e.g. call notepad.exe
* `title={title}` go to the app/window which title={title}
* `s={seconds}` delay for seconds
* `ms={ms}` delay for millisecond seconds
* `js={JavaScript}` run JavaScript

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

##### Syntax

* syntax1: ``pb.popup()`` 
* syntax2: ``pb.api( 'popup', {} )``

##### Parameters

##### Return

##### Samples


### pb.popup(html)

popup HTML dialog by a string in HTML format.

##### Syntax

* syntax1: ``pb.popup()`` 
* syntax2: ``pb.api( 'popup', {} )``

##### Parameters

##### Return

##### Samples



### pb.close()

close current window/dialog, with string return.

##### Syntax

* syntax1: ``pb.close()``
* syntax2: ``pb.close( {return-string} )`` 
* syntax2: ``pb.api( 'close', {return-string} )``

##### Return

return specified string

##### Samples




## Http Request

### pb.httpSource()

### pb.httpRequest()


## Work with database

### pb.dbConnect()

### pb.dbCommit()

### pb.dbRollback()

### pb.dbQuery()

### pb.dbTabel()

### pb.dbExecute()


## Access file system

### pb.fileexists()

### pb.fileread()

### pb.fileappend()

### pb.filewrite()

### pb.filecopy()

### pb.filemove()

### pb.filedelete()



## Console and Message

### pb.console()

### pb.alert()

### pb.msgbox()

### pb.error()

### pb.status()

## Application / Misc

### pb.property()
### pb.session()
### pb.print()
### pb.printSetup()
### pb.saveas()
### pb.close()

## Work with Powerbuilder

### pb.Window()
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
