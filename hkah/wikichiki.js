
function wikichiki( s ) {
// remove comment and self-script.
s = s.replace( /<!--(.+)-->/g, '' )
s = s.replace( /<SCRIPT(.+)wikichiki.js"><\/SCRIPT>/g, '' )

// use ``nowiki code`` as '<nowiki>' tag at same line 
s = s.replace( /``([^`]*)``/g, '<NOWIKI>$1</NOWIKI>' )

// handle nowiki
var pos1 = s.indexOf('<NOWIKI>')
var pos2 = 0
var part1, part2
if (pos1>0) {
   part1 = s.substr(0,pos1)
   part2 = s.substr(pos1+8)
   pos2 = part2.indexOf('</NOWIKI>')
   if (pos2>0) {
      s = wikichiki(part1) + part2.substr(0,pos2) + wikichiki(part2.substr(pos2+9 ))
      return (s)  
   }   
}

// handle XMP
var pos1 = s.indexOf('<XMP>')
var pos2 = 0
var part1, part2
if (pos1>0) {
   part1 = s.substr(0,pos1)
   part2 = s.substr(pos1)
   pos2 = part2.indexOf('</XMP>')
   if (pos2>0) {
      s = wikichiki(part1) + part2.substr(0,pos2+6) + wikichiki(part2.substr(pos2+7 ))
      return (s)  
   }   
}

// handle bulleted List
MaxLoop=0
while ( (pos1 = s.indexOf('\n*')) > 0 ) {
  part1 = s.substr(0,pos1)+'<ul>'
  part2 = s.substr(pos1+1)
  while ((part2.substr( 0, 2 ) == '* ') && (MaxLoop<200)) {
     pos2 = part2.indexOf('\n')
     part1 += '<li>' + part2.substr(1, pos2-1)
     part2 = part2.substr(pos2+1)
     MaxLoop++
   } 
   s = part1 + '\n</ul>' + part2
}

MaxLoop=0
while ( (pos1 = s.indexOf('\n#')) > 0 ) {
  part1 = s.substr(0,pos1)+'<ol>'
  part2 = s.substr(pos1+1)
  while ((part2.substr( 0, 2 ) == '# ') && (MaxLoop<200)) {
     pos2 = part2.indexOf('\n')
     part1 += '<li>' + part2.substr(1, pos2-1)
     part2 = part2.substr(pos2+1)
     MaxLoop++
   } 
   s = part1 + '\n</ol>' + part2
}

// syntax at line begin
s = s.replace( /\n-{4,99}([\s+])/g, '\n<hr>$1' );
s = s.replace( /\n---([\s])/g, '\n<hr size=1>$1' );
s = s.replace( /\n=======(.+)=======/g, '\n<h5>$1</h5>' )
s = s.replace( /\n======(.+)======/g, '\n<h5>$1</h5>' )
s = s.replace( /\n=====(.+)=====/g, '\n<h4>$1</h4>' )
s = s.replace( /\n====(.+)====/g, '\n<h3>$1</h3>' )
s = s.replace( /\n===(.+)===/g, '\n<h2>$1</h2>' )
s = s.replace( /\n==(.+)==/g, '\n<h1>$1</h1>' )
s = s.replace( /\n\{\{(.+):/g, '\n<blockquote class=$1>' )
s = s.replace( /\n\{\{/g, '\n<blockquote>' )
s = s.replace( /\}\}[\r\n]/g, '</blockquote>\n' )
s = s.replace( /\n (.*)\r/g, '\n<PRE>$1</PRE>\r' )

// handle table
s = s.replace( /\n\/\/-{2,}([^-]*)-{2,}\\\\/g, '\n<table border=1 cellspacing=0 cellpadding=2><caption>$1</caption>' )
s = s.replace( /\n\/[Cc|+]-{2,}([^-]*)-{2,}\\\\/g, '\n<table border=1 cellspacing=0 cellpadding=2 align=center><caption>$1</caption>' )
s = s.replace( /\n\/[Rr]-{2,}([^-]*)-{2,}\\\\/g, '\n<table border=1 cellspacing=0 cellpadding=2 align=right><caption>$1</caption>' )
s = s.replace( /\n\/[Ll]-{2,}([^-]*)-{2,}\\\\/g, '\n<table border=1 cellspacing=0 cellpadding=2 align=left><caption>$1</caption>' )
s = s.replace( /\n\\\\-{2,}\/\//g, '\n</table>' )
s = s.replace( /\|\$/g, '<th>' )
s = s.replace( /\|\|[\r\n]/g, '</tr>\n' )
s = s.replace( /\n\|\|/g, '<tr>||' )
s = s.replace( /\|{8}/g, '<td colspan=4>' )
s = s.replace( /\|{6}/g, '<td colspan=3>' )
s = s.replace( /\|{4}/g, '<td colspan=2>' )
s = s.replace( /\|\|/g, '<td>' )
s = s.replace( /\|\</g, '<td align=left>' )
s = s.replace( /\|\>/g, '<td align=right>' )
s = s.replace( /\|\+/g, '<td align=center>' )
s = s.replace( /\n\|\$/g, '<tr><th>' )

// syntax anywhere
s = s.replace( /'''([^']+)'''/g, '<b>$1</b>' );
s = s.replace( /\*\*([^\*]+)\*\*/g, '<b>$1</b>' );
s = s.replace( /''([^']+)''/g, '<i>$1</i>' );
s = s.replace( /\/\/([^\/]+)\/\//g, '<i>$1</i>' );
s = s.replace( /__([^_]+)__/g, '<u>$1</u>' )
s = s.replace( /--([^-]+)--/g, '<s>$1</s>' )
s = s.replace( /\^\^([^\^]+)\^\^/g, '<sup>$1</sup>' )
s = s.replace( /\,\,([^\,]+)\,\,/g, '<sub>$1</sub>' )
s = s.replace( /\$\$([^\$]+)\$\$/g, '<big>$1</big>' )
s = s.replace( /\r\n\s*\r\n/g, '</p>\n<p>' )
s = s.replace( /\n\s*\n/g, '</p>\n<p>' )

// handle linking to document or to resource 
s = s.replace( /\[\[[\s]*ID=([^\|\]]+) \| ([^\]]+)\]\]/g, '<a href="[$1]">$2</a>' )
s = s.replace( /\[\[([^\|\]]+)\|([^\]]+)\]\]/g, '<a href="$1">$2</a>' )
s = s.replace( /\[\[([^\^\]]+)\!([^\]]+)\]\]/g, '<a href="$1" target=new>$2</a>' )
s = s.replace( /\[\[([^\]]+)\]\]/g, '<a href="$1">$1</a>' )

// handle color
s = s.replace( /##([a-zA-Z]+)[,\/]([a-zA-Z]+):([^#]+)##/g, '<span style="color:$1;background-color:$2">$3</span>' )

s = s.replace( /##[rR]:([^#]+)##/g, '<span style="color:red">$1</span>' )
s = s.replace( /##[bB]:([^#]+)##/g, '<span style="color:blue">$1</span>' )
s = s.replace( /##[gG]:([^#]+)##/g, '<span style="color:green">$1</span>' )
s = s.replace( /##[sS]:([^#]+)##/g, '<span style="color:0088FF">$1</span>' )

s = s.replace( /##(\D+):([^#]+)##/g, '<span style="color:$1">$2</span>' )
s = s.replace( /##([0-9a-fA-F]+):([^#]+)##/g, '<span style="color:$1">$2</span>' )
s = s.replace( /##([^#]+)##/g, '<span style="color:#990000">$1</span>' )

return s
}

window.dwocolumn = '@font.face="Calibri" @font.height="-9"'
window.dwoheader  = '@color="8388608" @font.face="Arial" @font.weight="700" @font.height="-9"'
window.dwosummary = 'color="250" font.face="Arial" font.height="-10" font.weight="700" font.underline="1"'
window.remarks = 'Copyright 2007-2024, All rights are reserved.'

// remove the <pre> </pre> at begin and end
s = document.body.innerHTML
document.body.innerHTML = wikichiki( s.substr(5) )

