## Casual-Markdown

### casual-markdown parser

[casual-markdown](https://github.com/casualwriter/casual-markdown) is a super lightweight RegExp-based markdown parser, with TOC and scrollspy support

It revises from simple-markdown-parser of [Powerpage Markdown Document](https://github.com/casualwriter/powerpage-md-document) 
for the following features

* simple, super lightweight (less than 180 lines)
* vanilla javascript, no dependance
* support all browsers (IE9+, Chrome, Firfox, Brave, etc..)
* straight-forward coding style, hopefully readable.
* support [basic syntax](https://casualwriter.github.io/casual-markdown/casual-markdown-syntax.html) according [Basic Markdown Syntax (markdownguide.org)](https://www.markdownguide.org/basic-syntax/)  
* support subset of [extended-syntax](https://casualwriter.github.io/casual-markdown/casual-markdown-syntax.html#enhanced-syntax)
* TOC and scrollspy support
* highlight comment and keyword in code-block
* extendable (by override md.before, md.after, md.formatCode)

### casual-markdown viewer

### casual-markdown document

### casual-markdown blog
  

## Powerpage & Applications
  
### Powerpage for Desktop Applications

[**PowerPage**](https://github.com/casualwriter/powerpage) is a lightweight web browser with DB capability and windows accessibility, for rapid development of javascript/html/css application.

![Powerpage Preview](powerpage/powerpage.gif "width=80%")

Powerpage will connect to database, load startup page using Microsoft web-browser control (equivalent to IE11), and communicate 
with html/js page by pb:// or ps:// protocol to provide below features

* (Run) Call External Program
* (File) Access file system
* (DB) Database Accessibility
* (PB) Call Powerbuilder Windows/Functions
* (Misc) Global variables, sessions information

#### Features

* Portable solution. No installation
* Single execute file. No deployment.
* No dependance, pure js/html/css
* Code-and-Play instantly
* Make use of all javascript library (which support IE11)
* Command Line for multiple purpose (e.g. save url page, generate PDF)
* Work with Powerbuilder (e.g. call powerbuilder window/function/datawindow)

ps: due to the limitation of Microsoft web-browser control, Powerpage web browser is equivalent to IE11 (not chrome)!
  
  
### Powerpage Markdown Editor

[**Powerpage Markdown EditorPowerPage**](https://github.com/casualwriter/powerpage-md-editor)`` is a lightweight markdown editor using **Powerpage** with 
 js library of [*simplemde-markdown-editor*](https://github.com/sparksuite/simplemde-markdown-editor). 
 
 It is a simple javascript/html application demonstrating developing application using [Powerpage](https://github.com/casualwriter/powerpage).
 
![Powerpage Markdown Editor](powerpage/pp-md-editor.jpg "width=80%")
  
  
### Powerpage Web Crawler

[**Powerpage Web Crawler**](https://github.com/casualwriter/powerpage-web-crawler) is a portable lightweight web crawler using **Powerpage**.
 
It is a simple html/js application demonstrating developing application using [Powerpage](https://github.com/casualwriter/powerpage). 

![Powerpage Web Crawler](powerpage/pp-web-crawler.jpg "width=80%")

Powerpage Web Crawler (v0.60) is powerful and easy-to-use web scrawler suitable for blog site crawling and offline-reading. 

Just simply define below

* base-url := the home page of favor blog site
* index-pattern := RegExp of the url pattern of category page
* page-pattern := RegExp of the url pattern of category page
* content-css := css selector for blog content 

Program will
 
* crawl all category page.
* find out all url of content pages. 
* crawl content for one page, or all pages. 
* save setting and links ato database (support multiple sites)
* save content pages to local files.
* off-line reading from local files.

  
### Powerpage Markdown Documents

[**powerpage-md-documents**](https://github.com/casualwriter/powerpage-md-document/) is a simple document framework to present documents from markdown (e.g. github md file). 

![Powerpage Markdown Document](powerpage/pp-md-document.gif "width=80%")

#### Motivation

Documentation is always a boring job for developer. When working on the document of [Powerpage](https://github.com/casualwriter/powerpage), 
There are some markdown files composed for github (e.g. README.md). Wanna to setup a document framework to serve multiple purposes by 
**same copy** of markdown files.

* use **github** to edit/show document (git markdown layout)
* show in **web site** by copy markdown files to web hosting (web page).
* call within Powerpage with API enabled .

#### Solution

A simple javascript/html/css page works fine for above purposes, in **pure javascript without any dependancy**.

Simply edit or submit markdown files to github, the documentation is already available by using CDN

* github raw: https://github.com/casualwriter/powerpage/tree/main/source/doc 
* github page: https://casualwriter.github.io/powerpage 
* via rawgit.org: https://ghcdn.rawgit.org/casualwriter/powerpage/main/source/doc/index.html 
* via gitHack:    https://raw.githack.com/casualwriter/powerpage/main/source/doc/index.html 
  
  
### Powerpage Report Utility

developing...
  
  

## Misc Projects


### Document DB Schema (by hta script)

[hta-db-schema](https://github.com/casualwriter/hta-db-schema) 
is a simple html application to document oracle/mysql tables.

For Oracle, it use OLEDB (driver=MSDAORA)
For MySQL, it use ODBC for MySQL
no more dependance.

   
### CalibriPage - simple PHP content server

[calibrePage](https://github.com/casualwriter/calibrePage) is simple PHP content server for calibre.

* Single php file
* Self-contained, no depandence
* Responsive design, fit for mobile and desktop

It is a single PHP program in beginner coding style, provides the following features

* List latest books
* List books by labels, author or publisher
* Search book by keyword
* show details of selected books
* download books
  
 
### Simple Node Web-Service

[node-simple-ws](https://github.com/casualwriter/node-simple-ws) is simple web-service program for general data retrieval.

* Single js file in about 60 lines code.
* Self-contained, no depandence
* Portable, no installation needed
* Simple SQL definition for general purpose
* Connect via OLE DB driver for Oracle, MSSQL, MS Access, MySql, ODBC, etc..
  
  
## History and Activities

* 2021/05/07, [Powerpage](https://github.com/casualwriter/powerpage) first release, beta version, v0.41 
* 2021/05/14, Release Powerpage Markdown Editor. [powerpage-md-editor](https://github.com/casualwriter/powerpage-md-editor)
* 2021/07/02, Release Powerpage web Crawle. [powerpage-web-crawler](https://github.com/casualwriter/powerpage-web-crawler)
* 2021/10/06, code document framework. [powerpage-md-document](https://github.com/casualwriter/powerpage-md-document)
* 2021/10/14, align powerpage packages to version, v0.60
* 2021/10/21, setup github page. https://casualwriter.github.io/
* 2021/11/03, move/update document to github page. https://casualwriter.github.io/powerpage
* 2022/03/08, update document of powerpage - interface. https://casualwriter.github.io/powerpage/?file=interface.md
* 2022/07/06, release [hta-db-schema](https://github.com/casualwriter/hta-db-schema) v0.70, for Oracle DB
* 2022/07/11, release [hta-db-schema](https://github.com/casualwriter/hta-db-schema) v0.80, for mysql DB
* 2022/07/21, release [casual-markdown](https://github.com/casualwriter/casual-markdown) v0.82

