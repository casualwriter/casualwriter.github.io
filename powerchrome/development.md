-----------------------------------------------------------------------------
title     : PowerChrome: Development 
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

## Side-Application

There are some interesting scenarios for PowerChrome Applications

### demonstration

make use of ``pb.sendkeys()`` to interact with existing web page

### web crawler

it is so easy to write a web crawler by using ``pb.popup()``

### Ajax -> Sjax

using ``pb.httpRequest()``, a similar way to call ajax for web service/

* run in synchronization mode.
* no concern for cross-domain

### Automation

it is quite simple to inject javascript for automation by ``pb.popup()``


## Local-Application

Local-application would be deployed to same folder of powerchrome.exe, 

or deploy to different folder and run by `powerchrome.exe /app={url}`

~~~
powerchrome.exe /app=c:\app\myprogram\index.html
powerchrome.exe /app=\\it-server\app\myprogram\index.html
powerchrome.exe /app=http://192.168.1.20:8080/myprogram/index.html
~~~



## Cloud-Application

Similar to run application from lcoal web server, but run from internet.

### startup page


### security issue

### pros & cons


## Notes

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
  


### Document History (in progress..)

* 2022/12/16, document for v0.60, in progress...

