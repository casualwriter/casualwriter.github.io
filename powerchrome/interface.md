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
h2, h3 { color:skyblue!important }
</style>

## Overview (API)

PowerChrome is written for html/jsvascript application. Basically it is a chromimum-base (cef) web browser with 
interface with Powerbuilder application engine.

The interface provides the following all application supports.

* access `window shell` to run/execute command
* access `file system` 
* access `database`  
* make `Http Request`
* application property and variables
* application services (e.g. call html-dialog)
* printing, and reporting service

Please note that interface call is running in **Synchronization Modes**. no need to consider `callback` or `promise.js`.


### How it works

PowerChrome will load startup html page with builtin chromimum-base webbrowser, and import `powerchrome.js` 
to initialize interface, then call `window.onPageReady()` for application start.

After interface is initialized, html/javascript application may call `pb.apiFunctions(..)` to application service.


### API Syntax

There are three forms for an API call.

* api-function: ``pb.run( 'notepad.exe', 'c:/temp' )``
* api-raw: ``pb.api( 'run', {cmd: 'notepad.exe', path: 'c:/temp' } )``
* api-url: ``window.webBrowser.ue_interface( 'run?cmd=notepad.exe&path=c:/temp' )``

It is recommended to use ``api-function`` to access the interface. (``api-url`` is for internal usage)

This document will only cover `api-function` and `api-raw`.


## Access window shell

### pb.run()

### pb.shell() 

### pb.sendkeys()

## Html Dialog

### pb.popup(url)
### pb.popup(html)
### pb.close()

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




## Modification History

* 2022/12/03  initial version for v0.56
