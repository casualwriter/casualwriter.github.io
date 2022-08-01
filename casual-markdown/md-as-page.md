-----------------------------------------------------------------------------
github  : https://github.com/casualwriter/casual-markdown 
title   : Markdown-as-Page
style   : #header { background: RoyalBlue }
menu    :    
  Home            : index.md
  Supported Syntax: md-syntax.md
  md-as-Doc       : md-as-doc.md
  md-as-Page      : md-as-page.md
  md-as-Blog      : md-as-blog.md
  [DarkMode]      : javascript:darkmode()
-----------------------------------------------------------------------------

## {{ title }} 

Casual-Markdown provides the solution by a single file ``casual-md-page.html``, which is used to 
show web page from markdown files. 

It is very handy to build simple web-site from markdown files (like this page!!), for example, 

* https://github.com/casualwriter/casual-markdown
* https://github.com/casualwriter/

### Usage Guide

simply put [casual-md-page.html](https://github.com/casualwriter/casual-markdown/blob/main/source/casual-md-page.html)
and your markdown files to a folder of web server. (sometimes, may rename casual-md-page.html to index.html for quick access)

* by default, it will load `index.md` as home page.
* use frontmatter for page config (title, menu, navigation), for example

~~~  
-----------------------------------------------------------------------------
github  : https://github.com/casualwriter/casual-markdown 
title   : Show web page from markdown file
style   : #header { background: RoyalBlue }
menu    :    
  Home         : index.md
  cmd-Syntax   : cmd-syntax.md
  cmd-Page     : cmd-page.md
  cmd-Blog     : cmd-blog.md
  DarkMode     : javascript:darkmode()  
-----------------------------------------------------------------------------
~~~ 

**Shortuct**

* alt-s to show markdown html for developer
* alt-k to showpage in dark mode

### Modification History

* 2022/08/01, v0.60, initial release.
 