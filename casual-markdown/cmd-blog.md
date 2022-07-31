-----------------------------------------------------------------------------
github  : https://github.com/casualwriter/casual-markdown 
title   : Casual-Markdown-Blog
style   : #header { background: CornflowerBlue }
menu    :    
  Home         : index.md
  cmd-Syntax   : cmd-syntax.md
  cmd-Page     : cmd-page.md
  cmd-Blog     : cmd-blog.md
  [DarkMode]   : javascript:darkmode()  
-----------------------------------------------------------------------------

## {{ title }} 

Build blog site by markdown files.

1. write blog by markdown (e.g. 20220720-use-markdown-for-blog.md)
2. config site at index.md (title, logo, menu, category, style)
3. update blog index at index.md

### Sample Site 

* [Casual-Markdown Sample Blog](./blog)
* [Casualwriter's Blog](../blog)

### Usage Guide

simply put [casual-md-blog.html](https://github.com/casualwriter/casual-markdown/blob/main/source/casual-md-site.html) 
in web server (may rename to `index.html` if like) 

* config site at index.md (title, logo, menu, category, style)
* update blog index at index.md

~~~  
-----------------------------------------------------------------------------
github  : https://github.com/casualwriter/casual-markdown 
title   : Build blog site using Casual-Markdown 
style   : #header { background: CornflowerBlue }
labels  : Javascript, html, css, markdown, database
menu    :   
  javascript : #javascript
  database   : #database   
  about      : about.md
-----------------------------------------------------------------------------

### July 2022
                    
* 2022/07/30: frontmatter for simple YAML     [#markdown,#javascript](20220730-frontmatter.md)
* 2022/07/22: release casual-markdown v0.85   [#markdown,#javascript](20220722-casual-markdown-v0.85.md)
* 2022/07/19: about table-of-content          [#markdown,#javascript](20220719-table-of-content.md)

### Oct 2021

* 2021/10/20: simple markdown parser          [#markdown,#regexp](20211020-simple-markdown-parser.md)

~~~ 


### Modification History

* todo: code casual-md-blog.html for basic blogs site
* todo: more customized options
 