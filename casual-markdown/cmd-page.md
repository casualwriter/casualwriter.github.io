-----------------------------------------------------------------------------
github  : https://github.com/casualwriter/casual-markdown 
title   : Casual-Markdown-Page
style   : #header { background: RoyalBlue }
menu    :    
  Home         : index.md
  cmd-Syntax   : cmd-syntax.md
  cmd-Page     : cmd-page.md
  cmd-Blog     : cmd-blog.md
  [DarkMode]   : javascript:darkmode()  
-----------------------------------------------------------------------------

## {{ title }} 

Show web page from markdown files. very handy to build document site using markdown files (like this page!)

### Usage Guide

simply put [casual-md-page.html](https://github.com/casualwriter/casual-markdown/blob/main/source/casual-md-page.html)
in web server(or simply host in github page), then may call `casual-md-page.html?file={mdfile}` to show markdown page.

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

* 2022/07/31, v0.60, initial release.
 