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

* [v] access window shell
* [v] access file system
* [v] access database 
* [v] output html, pdf, printing
* [v] session, application variables
* [v] html pages interaction
* [v] synchronization mode
* [v] web-crawling
* [v] ajax, corss-domain ajax
* [v] login by window account
* [ ] security alert for cloud-app
* [ ] reporting support (using datawindow)


### Document History (in progress..)

* 2022/12/16, document for v0.60, in progress...

