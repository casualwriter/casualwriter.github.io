## About Casualwriter

Hello everyone, this is casualwriter from Hong Kong. 

I am an old programmer like all simple thing, coding in spare-time, hope to work out some useful products

It will be my pleasure if the following projects can benifit your work.

* [casual-markdown](https://github.com/casualwriter/casual-markdown) - a regexp-base markdown parser (javascript)

  + [casual-markdown-doc](https://github.com/casualwriter/casual-markdown-doc) - markdown as documenation
  + [casual-markdown-Page](https://github.com/casualwriter/casual-markdown-page) - markdown as web page/site
  + [casual-markdown-Blog](https://github.com/casualwriter/casual-markdown-blog) - markdown as blog
  + [casual-markdown-cv](https://github.com/casualwriter/casual-markdown-cv) - markdown resume
  
* [powerpage](https://github.com/casualwriter/powerpage) - a lightweight protable IE-based web browser for html/javascript application (Powerbuilder 10.5)

  + [powerpage-md-editor](https://github.com/casualwriter/powerpage-md-editor) - a simple markdown editor using Powerpage 
  + [powerpage-web-crawler](https://github.com/casualwriter/powerpage-web-crawler) - a lightweight web crawler using Powerpage.
  + [powerpage-md-document](https://github.com/casualwriter/powerpage-md-document) - A simple document framework, using markdown as document.
  
* [powerchrome](https://github.com/casualwriter/powerchrome) - a portable chromimum-base (cef) web browser for html/javascript desktop application. (powerbuilder 2019R3)

  + in development, going to release on Dec 2022
  + powerchrome-md-editor (in development)
  + powerchrome-web-crawler (in development)

* Misc projects

  + [hta-db-schema](https://github.com/casualwriter/hta-db-schema) - a simple script program to document oracle/mysql database. (hta script)
  + [node-simple-ws](https://github.com/casualwriter/node-simple-ws) - a simple web-service framework for general data retrieval. (node.js)


## Casual-Markdown

[casual-markdown](https://github.com/casualwriter/casual-markdown) is a super lightweight RegExp-based markdown parser, with TOC and scrollspy support

It is a simple javascript library in 190 vanilla code, support all basic syntax, and some [extended syntax]((https://casualwriter.github.io/casual-markdown/casual-markdown-syntax.html)). 

"lightweight, simple" is the source of the power of the small libary. 

* no dependance, vanilla javascript
* work for all all browsers (IE9+, Chrome, Firfox, Brave, etc..)
* straight-forward coding style, hopefully readable (and easy for revision/enhancement)
* builtin TOC and scrollspy support

to use it in html page, just include the file of `casual-markdown.js` and `casual-markdown.css`

```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/casualwriter/casual-markdown/dist/casual-markdown.css">
<script src="https://cdn.jsdelivr.net/gh/casualwriter/casual-markdown/dist/casual-markdown.js"></script>
```

It is easy to use for any browser environment, or embed in html program, or revise for more purpose. for example

### casual-markdown-doc - use markdown as documenation

This project based on the design idea of Strapdown.js. but use casual-markdown parser, build-in css, vanilla javascript without any dependence. (support all browsers include IE9)

just add 4 line code in the header, the markdown document into a nice-look web page.

~~~
<!DOCTYPE html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link  href="https://casualwriter.github.io/dist/casual-markdown-doc.css" rel="stylesheet">
<script src="https://casualwriter.github.io/dist/casual-markdown-doc.js"></script>

<body title="Supported Syntax of Casual-Markdown">

## Heading

content in markdown format

~~~


### casual-markdown-page - use markdown as web page/site

Directly use markdown files as web page or web site (ie. markdown-as-webpage).

Just a single html file index.html to load markdown file into web page by the syntax of ``index.html?file={markdown-file.md}``


### casual-markdown-blog - use markdown as blog

Build blog site by markdown files and single index.html.

### casual-markdown-cv - markdown resume template, or general document

A simple solution for markdown online resume. Some template are available. It also fit for other purpose, e.g. document, agenda, etc..



## Powerpage for Desktop Applications

[**PowerPage**](https://github.com/casualwriter/powerpage) is a lightweight IE-based web browser for html/javascript desktop application development.

![Powerpage Preview](powerpage/powerpage.gif "width=80%")

Powerpage enable HTML page to access window shell, file system, database with additonal application support. 

* (Run) Call External Program
* (File) Access file system
* (DB) Database Accessibility
* (PB) Call Powerbuilder Windows/Functions
* (Misc) Global variables, sessions information

It is a portable solution, very lightweight (about 5M), single executable file, code-and-play, for multiple purpose appliation.

### [Powerpage Markdown Editor](https://github.com/casualwriter/powerpage-md-editor)

a lightweight markdown editor using [*simplemde-markdown-editor*](https://github.com/sparksuite/simplemde-markdown-editor). 
 
It is a simple javascript/html application demonstrating developing application using [Powerpage](https://github.com/casualwriter/powerpage).
 
![Powerpage Markdown Editor](powerpage/pp-md-editor.jpg "width=80%")
  
  
### Powerpage Web Crawler

[**Powerpage Web Crawler**](https://github.com/casualwriter/powerpage-web-crawler) is a lightweight web crawler using **Powerpage**.
 
It is a simple html/js application demonstrating developing application using [Powerpage](https://github.com/casualwriter/powerpage). 

![Powerpage Web Crawler](powerpage/pp-web-crawler.jpg "width=80%")

Powerpage Web Crawler (v0.60) is powerful and easy-to-use web scrawler suitable for blog site crawling and offline-reading. 


### Powerpage Markdown Documents

[**powerpage-md-documents**](https://github.com/casualwriter/powerpage-md-document/) is a simple document framework to present documents from markdown (e.g. github md file).  

![Powerpage Markdown Document](powerpage/pp-md-document.gif "width=80%")

ps: this project is enhanced by [casual-markdown](https://github.com/casualwriter/casual-markdown)


## Misc Projects


### Document DB Schema (by hta script)

[hta-db-schema](https://github.com/casualwriter/hta-db-schema) is a simple hta script to document oracle/mysql tables.

For Oracle, it use OLEDB (driver=MSDAORA)
For MySQL, it use ODBC for MySQL

It is a very simple hta script (275 lines). no dependance. Just click-and-run.

   
### CalibriPage - simple PHP content server

[calibrePage](https://github.com/casualwriter/calibrePage) is simple PHP content server for calibre.

* a single php file
* self-contained, no depandence
* responsive design, fit for mobile and desktop

 
### Simple Node Web-Service

[node-simple-ws](https://github.com/casualwriter/node-simple-ws) is simple web-service program for general data retrieval.

* a single js file in about 60 lines code.
* self-contained, no depandence
* portable, no installation needed
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

