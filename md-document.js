//######################################################################################
// Program: Markdown parser for powerpage documentation 
// Author: CK Hung
// Github: https://github.com/casualwriter/powerpage-md-document
// Last updated on 2022/07/18, v0.70, enhance table syntax
//######################################################################################
// simpleTOC( srcElementId, tocElementId, title, scrollspy )
// simpleMarkdown ( mdText )
//######################################################################################

//=== simpleTOC: show Table of Content (updated on 2021/10/21)
function simpleTOC( srcDiv, tocDiv, title, scrollSpy  ) {

  // retrieve he,h3[,h4,h5] DOM elements
  var toc = document.getElementById(srcDiv).querySelectorAll('h2,h3')
  var html = (title? '<h4> '+title+' </h4>':'') + '<ul id="toc">';
  
  for (var i=0; i<toc.length; i++ ) {
  
    // assign id if not defined 
    if (!toc[i].id) toc[i].id = "toc-item-" + i;
    
    // generate indented list by h2,h3,h4  
    if (toc[i].nodeName === "H2" && toc[i].id.substr(0,6)!=="no-toc") {
      html += '<li style="background:#f6f6f6" title="#' + toc[i].id + '" onclick="location=this.title">' + toc[i].innerText + '</a></li>';
    } else if (toc[i].nodeName === "H3" && toc[i].id.substr(0,6)!=="no-toc") {
      html += '<li style="margin-left:12px" title="#' + toc[i].id + '" onclick="location=this.title">' + toc[i].innerText + '</a></li>';
    } else if (toc[i].nodeName === "H4" && toc[i].id.substr(0,6)!=="no-toc") {
      html += '<li style="margin-left:24px" title="#' + toc[i].id + '" onclick="location=this.title">' + toc[i].innerText + '</a></li>';
    }
    
  }
  
  document.getElementById(tocDiv||'toc-panel').innerHTML = html 
  
  //=== scrollspy := 'none | bold | style'  (updated on 2021/10/22)
  if ( (scrollSpy||'bold') !== 'none' ) {
    document.getElementById(srcDiv).onscroll = function () {
      // get links and get viewport position   
      var list = document.getElementById(tocDiv||'toc-panel').querySelectorAll('li')
      var divScroll = document.getElementById(srcDiv).scrollTop - 10
      var divHeight = document.getElementById(srcDiv).offsetHeight
      
      // loop for each header element, highlight if within viewport
      for (var i=0; i<list.length; i++) {
        var div = document.getElementById( list[i].title.substr(1) )
        var pos = (div? div.offsetTop - divScroll : 0 )  
        list[i].style['font-weight'] = ( pos>0 && pos<divHeight ? 600 : 400 )
      }
    }
  }
  
}

//=== simple markdown parser (updated on 2021/11/03, v0.68, minor fix)
function simpleMarkdown(mdText) {

  // function for REGEXP to convert html tag. ie. <TAG> => &lt;TAG*gt;  
  var formatTag = function (html) { return html.replace(/</g,'&lt;').replace(/\>/g,'&gt;'); }
  
  // function for REGEXP to format code-block, highlight remarks/keywords 
  var formatCode = function(m,p1,p2){
    p2 = p2.replace(/</g,'&lt;').replace(/\>/g,'&gt;').replace(/\t/g,'   ')
    p2 = p2.replace(/^\/\/(.*)/gm,'<rem>//$1</rem>').replace(/\s\/\/(.*)/gm,' <rem>//$1</rem>')   
    p2 = p2.replace(/(\s)(function|return|var|let|const|if|then|else|elseif|end|for|next|do|while|loop|continue|break|case|switch|try|catch|finally)(\s)/gim,'$1<b>$2</b>$3')
    return '<pre title="' + p1 + '"><code>'  + p2 + '</code></pre>'
  }

  // function to convert mdString into HTML string  
  var formatMD = function( mdstr ) {
      // table syntax
      mdstr = mdstr.replace(/\n(.+?)\n.*?\-\-\|\-\-.*?\n([\s\S]*?)\n\s*?\n/g, function (m,p1,p2) {
          var thead = '<thead>\n<tr><th>' + p1.replace(/\|/g,'<th>') + '</th></thead>'
          var tbody = p2.replace(/(.+)/gm,'<tr><td>$1</td></tr>').replace(/\|/g,'<td>')
          return '\n<table>' + thead + '\n<tbody>' + tbody + '\n</tbody></table>\n\n' 
      } )  
    
      // horizontal rule => <hr> 
      mdstr = mdstr.replace(/^-{3,}|^\_{3,}|^\*{3,}$/gm, '<hr>').replace(/\n\n<hr\>/g, '\n<br><hr>')

      // header => <h1>..<h5> 
      mdstr = mdstr.replace(/^##### (.*?)\s*#*$/gm, '<h5>$1</h5>')
                .replace(/^#### (.*?)\s*#*$/gm, '<h4>$1</h4>')
                .replace(/^### (.*?)\s*#*$/gm, '<h3>$1</h3>')
                .replace(/^## (.*?)\s*#*$/gm, '<h2>$1</h2>')
                .replace(/^# (.*?)\s*#*$/gm, '<h1>$1</h1>')
                .replace(/^<h(\d)\>(.*?)\s*{(.*)}\s*<\/h\d\>$/gm, '<h$1 id="$3">$2</h$1>')
      
      // inline code-block: `code-block` => <code>code-block</code>    
      mdstr = mdstr.replace(/``(.*?)``/gm, function(m,p){ return '<code>' + formatTag(p).replace(/`/g,'&#96;') + '</code>'} ) 
      mdstr = mdstr.replace(/`(.*?)`/gm, '<code>$1</code>' )
      
      // blockquote, max 2 levels => <blockquote>{text}</blockquote>
      mdstr = mdstr.replace(/^\>\> (.*$)/gm, '<blockquote><blockquote>$1</blockquote></blockquote>')
      mdstr = mdstr.replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
      mdstr = mdstr.replace(/<\/blockquote\>\n<blockquote\>/g, '\n<br>' )
      mdstr = mdstr.replace(/<\/blockquote\>\n<br\><blockquote\>/g, '\n<br>' )
                
      // image syntax: ![title](url) => <img alt="title" src="url" />          
      mdstr = mdstr.replace(/!\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<img alt="$1" src="$2" $3 />')
      mdstr = mdstr.replace(/!\[(.*?)\]\((.*?)\)/gm, '<img alt="$1" src="$2" width="90%" />')
                
      // links syntax: [title](url) => <a href="url" title="title">text</a>          
      mdstr = mdstr.replace(/\[(.*?)\]\((.*?) "new"\)/gm, '<a href="$2" target=_new>$1</a>')
      mdstr = mdstr.replace(/\[(.*?)\]\((.*?) "(.*?)"\)/gm, '<a href="$2" title="$3">$1</a>')
      mdstr = mdstr.replace(/([<\s])(http[s]\:\/\/.*?)([\s\>])/gm, '$1<a href="$2">$2</a>$3')
      mdstr = mdstr.replace(/\[(.*?)\]\(\)/gm, '<a href="$1">$1</a>')
      mdstr = mdstr.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2">$1</a>')
                
      // unordered/ordered list, max 2 levels  => <ul><li>..</li></ul>, <ol><li>..</li></ol>
      mdstr = mdstr.replace(/^[\*+-][ .](.*)/gm, '<ul><li>$1</li></ul>' )
      mdstr = mdstr.replace(/^\d[ .](.*)/gm, '<ol><li>$1</li></ol>' )
      mdstr = mdstr.replace(/^\s{2,6}[\*+-][ .](.*)/gm, '<ul><ul><li>$1</li></ul></ul>' )
      mdstr = mdstr.replace(/^\s{2,6}\d[ .](.*)/gm, '<ul><ol><li>$1</li></ol></ul>' )
      mdstr = mdstr.replace(/<\/[ou]l\>\n<[ou]l\>/g, '\n' )
      mdstr = mdstr.replace(/<\/[ou]l\>\n<[ou]l\>/g, '\n' )
                
      // text decoration: bold, italic, underline, strikethrough, highlight                
      mdstr = mdstr.replace(/\*\*\*(\w.*?[^\\])\*\*\*/gm, '<b><em>$1</em></b>')
      mdstr = mdstr.replace(/\*\*(\w.*?[^\\])\*\*/gm, '<b>$1</b>')
      mdstr = mdstr.replace(/\*(\w.*?[^\\])\*/gm, '<em>$1</em>')
      mdstr = mdstr.replace(/___(\w.*?[^\\])___/gm, '<b><em>$1</em></b>')
      mdstr = mdstr.replace(/__(\w.*?[^\\])__/gm, '<u>$1</u>')
      // mdstr = mdstr.replace(/_(\w.*?[^\\])_/gm, '<u>$1</u>')  // NOT support!! 
      mdstr = mdstr.replace(/~~(\w.*?)~~/gm, '<del>$1</del>')
      mdstr = mdstr.replace(/\^\^(\w.*?)\^\^/gm, '<ins>$1</ins>')
                
      // line break and paragraph => <br/> <p>                
      mdstr = mdstr.replace(/  \n/g, '\n<br/>').replace(/\n\s*\n/g, '\n<p>\n')
      
      // indent as code-block          
      mdstr = mdstr.replace(/^ {4,10}(.*)/gm, function(m,p) { return '<pre><code>' + formatTag(p) + '</code></pre>'} )
      mdstr = mdstr.replace(/^\t(.*)/gm, function(m,p) { return '<pre><code>' + formatTag(p) + '</code></pre>'} )
      mdstr = mdstr.replace(/<\/code\><\/pre\>\n<pre\><code\>/g, '\n' )

      // Escaping Characters                
      return mdstr.replace(/\\([`_~\*\+\-\.\^\\\<\>\(\)\[\]])/gm, '$1' )
  }
   
  // first, handle syntax for code-block
  var pos1=0, pos2=0, mdHTML = ''
  mdText = mdText.replace(/\r\n/g, '\n').replace(/\n~~~/g,'\n```')
  mdText = mdText.replace(/\n``` *(.*?)\n([\s\S]*?)\n``` *\n/g, formatCode )
  
  // split by "<code>", skip for code-block and process normal text
  while ( (pos1 = mdText.indexOf('<code>')) >= 0 ) {
    pos2 = mdText.indexOf('</code>', pos1 )
    mdHTML += formatMD( mdText.substr(0,pos1) ) + mdText.substr(pos1+6, (pos2>0? pos2-pos1-6 : mdtext.length) )
    mdText = mdText.substr( pos2 + 7 )
  }
   
  return mdHTML + formatMD( mdText )
}
