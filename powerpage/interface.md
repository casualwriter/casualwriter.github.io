## Overview (API)

Powerpage open a window with MS Webbrowser Control. When HTML page is loaded, Powerpage will import ``powerpage.js`` 
to initialize ``pb`` javascript object to provide Powerpage interface.

HTML page may via the following channel to talk to main program

1. recommended call by by javascript: ``pb.apiFunction()``, e.g. pb.run('notepad.exe')
2. by url: ``&lt;a href="pb://command/parameters">Text&lt;/a>`` or ``window.location = "pb://command/parameters"``
3. by change title: ``document.title = "pb://command/parameters"``

Powerpage will interpret and execute the command, and pass the result to HTML page by calling js function ``pb.router( result, type, cmd)``

for example:  
  
ps: ``If call within Powerpage, and the following links turn ^^red^^, then it is clickable ^^Powerpage API call^^.``

* Run notepad.exe to edit powerpage.ini -> ``javascript:pb.run('notepad.exe powerpage.ini')`` or ``pb://run/notepad.exe powerpage.ini``
* Run SQL1 and callback showData() -> ``javascript:pb.callback('showData').db.query(sql1)`` or ``pb://callback/showData/db/query/@sql1``  
* Run update SQL2 -> ``javascript:pb.db.execute(sql3)`` or ``pb://db/execute/@sql3``
* Call About window -> ``javascript:pb.window('w_about')`` or ``pb://window/w_about``
 
   
## Global Features  ##
  
``Callback, Prompt/Confirm, @JsVar and Secure Protocol`` are supported in all commands. 
 
   
-----------------------------------------------------------------------------------
### Callback ###

Every command may specify callback function. If not specify, program will call onCallback() as default.

#### Syntax

* url-protocol: **pb://callback**/{callback-function-name}/command 
* javascript : **javascript:pb.callback({callback-function-name})**.apiFunction()

#### Samples

* `pb://callback/mycallback/run/mstsc.exe` 
* `javascript:pb.callback('mycallback').run('mstsc.exe')` 
* `javascript:pb.callback('mycallback').run('cmd=notepad.exe,style=wait')` 

#### Source Code (powerpage.js)

Powerpage will call `pb.rounter()` in powerpage.js to route to callback-function() by ``window[name]( result, type, url )``,

* callback-function should be a window-level function which is accessible by `window[{callback-function-name}]` in javascript.
* if callback-function is specified but not found, program will show alert message. 
* if callback not specify, pb.router() will call onCallback() as default.

~~~ powerpage.js
//=== router function. call from Powerbuilder, divert to callback function
pb.router = function ( name, result, type, url ) {
  try {
    if (typeof window[name] === "function") {
        window[name]( result, type, url );
    } else if (name) {
        alert( 'callback function ' + name + '() not found!\n\n type:' + type + '\n cmd: ' + url 
               + '\n function: '+name + '\n result: \n\n' + result )
    } else if (typeof onCallback === "function") {
        onCallback( result, type, url );
    }
  } catch (e) {
    alert( 'Error in callback! \n\n Name: ' + name + '\nMessage:' + e.message )
  }  
}
~~~
  
 
-----------------------------------------------------------------------------------
### Prompt/Confirm

Prompt for confirmation, then run command
 
#### Syntax

* url-protocol: **pb://?{prompt-message}?/**command 
* javascript : **javascript:pb.confirm({prompt-message})**.apiFunction()
* javascript : **javascript:pb.prompt({prompt-message})**.apiFunction()

#### Samples

* `javascript:pb.confirm('Open notepad?').run('notepad.exe')`
* `pb://?Open notepad?/run/notepad.exe` 

  
-----------------------------------------------------------------------------------
### @js Variable Replacement

Use javascript variable to store long string, and pass to Powerpage interface. 
For string parameter start with "@' (i.e. `@{var}`) will be replace with the value of variable.

#### Samples

* javascript: pb.db.query(`sql1`) 
* javascript: pb.db.query(`'@sql1'`)
* url-protocol: pb://sql/query/`@sql1``

#### Source Code (powerpage.js)

in powerpage.js, declare function pb('@var') to return js variable value.

~~~ powerpage.js
// pb main function, pb('varname') = js.varname, pb('#div') = getElementById
var pb = function (n) { 
  return n[0]=='#'? document.getElementById(n.substr(1)) : window[n]; 
}
~~~
 
    
-----------------------------------------------------------------------------------
### Secured protocol

Once use ``Secured`` protocol, Powerpage will prompt user login by windows account.

#### Syntax

* url-protocol: **ps://**command 
* javascript : **javascript:pb.secure()**.apiFunction()

#### Samples
 
*  `javascript:pb.secure().run('resmon.exe')`
* ps-protocol: `ps://run/resmon.exe` 
 
           
## Run / Shell 
 
Run will call Wscript.run() to run DOS command,
Shell command will be diverted to `shell32.dll ->ShellExecuteW()`
   
   
-----------------------------------------------------------------------------------
### pb.run( command )
### pb.run( cmd, path, style, callback ) 

Run a program, e.g. resmon.exe

#### Syntax

* url-protocol: **pb://run/**{command} 
* javascript : **javascript:pb.run**({command})
* javascript : **javascript:pb.run**( {cmd}, {path}, {style}, callback )
* {command} := cmd={cmd},path={path},style={style}
* {cmd}  := dos command 
* {path} := path to run the command
* {style} := [ normal | min | max | hide | wait ] 

#### Samples

* ``javascript:pb.run('resmon.exe')`` run resmon.exe
* ``javascript:pb.run('notepad.exe powerpage.html')`` run notepad to edit powerpage.html
* pb-protocol: ``pb://run/notepad.exe powerpage.html`` run notepad to edit powerpage.html
* ``javascript:pb.run('powerpage.exe', 'c:\app')`` run powerpage at c:\app
* ``javascript:pb.run('notepad.exe powerpage.html','.','max+wait','alert')`` edit edit powerpage.html and show status 
 

-----------------------------------------------------------------------------------
### pb.shell(command)
### pb.shell(action, file, parm, path, show, callback)

* Description: calling window.shell object to "Open/Run/Print" an file. 
* pb-protocol: `` pb://shell/{command}`` or `` pb://shell/file={file},path={path},show={show},action={action}``

##### Arguments

* {action}  // aciton := [ open | print | runas ]
* {file}  // file name  
* {path}  // path of the file
* {parm}  // parameters passed to the file
* {show}  // show (or style) := [ normal | min | max | hide | wait ] 


##### Samples 

* ``pb.shell('calc.exe')`` // run calc.exe
* ``pb.shell('open','calc.exe')``  // call calc.exe using shell-open (same as start.exe [file])
* ``pb.shell('run', 'c:\\app\\powerpage.exe')`` // shell-run program (similar to runat())
* ``pb://shell/run/c:\powerpage\powerpage.exe`` // shell-run program (similar to runat())    

-----------------------------------------------------------------------------------
### pb.sendkeys(keys)

call sendkeys() function of Wscript Shell to send keystrokes.
 
keys := /js={js-function}/run={cmd}/title={goto Title}/s={delay}/ms={delay ms}/Keystrokes

##### Samples 

* ``javascript:pb.sendkeys('/run=notepad.exe/title=Untitled - Notepad/s=2/this is a test')``
* ``pb://sendkeys/run=notepad.exe/title=Untitled - Notepad/s=2/this is a test``
* ``javascript:pb.sendkeys(keys)``  
* ``javascript:pb.sendkeys('@keys')`` or ``pb://sendkeys/@keys`` pass keystrokes by variable

   
## Database Accessibility
  
Query from database, execute sql or stored procedure.

  
-----------------------------------------------------------------------------------
### pb.db.query( sql, callback )

Run SQL select statement, and return result-set in json string format.

``{ colCount:?, rowCount:?, column: [ col1, col2, ...], data:[ [row1,...], [row2,...], ...] }``

* may use alias ``pb.db.select( sql, callback )`` for same feature.
* callback function may use ``rs = JSON.parse(result)`` to get result-set for process.

#### Samples

* ``javascript:pb.db.query('select CategoryID, CategoryName from Categories')`` run select SQL
* ``javascript:pb.db.select('select date(), now()')`` select current date/time
* ``javascript:pb.db.query(sql1)``  run SQL query from js variable sql1  
* ``javascript:pb.db.query('@sql1')``  run SQL query using js variable replacement  
* ``pb://db/query/@sql1``  run SQL query using js variable sql1   


-----------------------------------------------------------------------------------
### pb.db.html( sql, callback )

run SQL select statement, and return result set in HTML table format.

~~~
<table class="pb-table">
  <tr> <th>ColName1</th> <th>..</th> <th>..</th> </tr>
  <tr> <td>Row1-1<td> <td>Row1-2<td> <td>Row1-3<td> </tr>
  <tr> <td>Row2-1<td> <td>Row2-2<td> <td>Row2-3<td> </tr>
</table>
~~~

#### Samples

* ``javascript:pb.db.html('select CategoryID, CategoryName from Categories')`` run select SQL
* ``javascript:pb.db.html('select date(), now()')`` select current date/time
* ``javascript:pb.db.html(sql1)``  run SQL query from js variable sql1  
* ``javascript:pb.db.html('@sql2')``  run SQL query using js variable replacement  
* ``pb://db/html/@sql2``  run SQL query using js variable sql1  


-----------------------------------------------------------------------------------
### pb.db.execute( sql, callback )

execute SQL statement, and return result in json string format.

* may use alias: ``pb.db.update( sql, callback )`` instead.
* return json string `{status:1, message:"SQL Executed Sucessfully!"}` if done 
* return json string `{status:1, error:?, message:"error message"}` if error 

#### Samples

* ``javascript:pb.db.execute(sql3)`` Execute update statement 
* ``javascript:pb.db.update(sql3)`` Execute update statement 
* ``pb://db/execute/@sql3`` Execute update statement 

-----------------------------------------------------------------------------------
### pb.db.prompt( sql, callback )

prompt SQL statement for confirmation, then execute SQL statement. 

* may use alias: ``pb.db.confirm( sql, callback )`` instead.
* return json string `{status:1, message:"SQL Executed Sucessfully!"}` if done 
* return json string `{status:-1, error:?, message:"error message"}` if error 
* return json string `{status:0, message:"SQL execution cancelled" }` if cancelled 

#### Samples

* ``javascript:pb.db.prompt(sql3)`` confirm then execute update statement 
* ``javascript:pb.db.confirm(sql3)`` confirm then execute update statement 
* ``pb://db/prompt/@sql3`` confirm then execute update statement 


                                                                 
## File Accessibility

Powerpage provide the following function to access file system.   
  
----------------------------------------------------------------------------------
### pb.file.copy(from, to, callback)

copy file {from} to {to}, then activate callback function. 

#### Samples

* ``javascript:pb.file.copy( 'powerpage.ini', 'newfile.ini' )`` Copy powerpage.ini to newfile.ini 
* ``pb://file/copy/powerpage.ini/newfile.ini`` Copy powerpage.ini to newfile.ini 


----------------------------------------------------------------------------------
### pb.file.move(from, to, callback)

move file {from} to {to}, then activate callback function. 

#### Samples

* ``javascript:pb.file.move( 'newfile.ini', 'another.ini' )`` Move newfile.ini to another.ini 
* ``pb://file/move/newfile.ini/another.ini`` Move newfile.ini to another.ini


----------------------------------------------------------------------------------
### pb.file.exists(file, callback)

check file existance, return 'true/false' if found/notFound. 

#### Samples

* ``javascript:pb.file.exists('newfile.ini')``  Check file existance of newfile.ini
* ``javascript:pb.file.exists('another.ini','alert')``  Check file existance of another.ini
* ``pb://file/exists/another.ini`` Check file existance of another.ini

----------------------------------------------------------------------------------
### pb.file.read(file, callback)

read text file and callback with result (in string format). 
return empty string if not found.

#### Samples
 
* ``javascript:pb.file.read('another.ini','alert')`` read file and show by alert()
* ``pb://file/read/another.ini`` read file and show by default callback()


----------------------------------------------------------------------------------
### pb.file.write(file, text, callback)

write text to file, and callback.

* return `{ status:{count}, message:"write to {file}  successfully." }` if done
* return `{ status:{-code}, message:"failed to open file {file}" }` if open error
* return '{ status:-9, message: "failed to write file {file}" } ` if write error

#### Samples
 
* ``javascript:pb.file.write('another.ini',sql1)`` write sql1 to file
* ``javascript:pb.file.write('another.ini','@sql2')`` write sql1 to file (recommended for long string)
* ``pb://file/write/another.ini/@sql1`` write sql1 to file 
* ``pb://callback/alert/file/write/another.ini/@sql2`` write sql1 to file 



----------------------------------------------------------------------------------
### pb.file.append(file, text, callback)

Append text to file, and callback.

* return `{ status:{count}, message:"write to {file}  successfully." }` if done
* return `{ status:{-code}, message:"failed to open file {file}" }` if open error
* return '{ status:-9, message: "failed to write file {file}" } ` if write error
* source code refer to pb.file.write(file, text, callback)

#### Samples
 
* ``javascript:pb.file.append('another.ini',sql2)`` write sql2 to file
* ``javascript:pb.file.append('another.ini','@sql2')`` write sql2 to file (recommended for long string)
* ``javascript:pb.file.read('another.ini','alert')`` read another.ini, show by alert()
* ``pb://file/append/another.ini/@sql3`` append @sql3 to another.ini 

  
----------------------------------------------------------------------------------
### pb.file.delete(file, callback)

delete file, and callback.

#### Samples
 
* ``javascript:pb.file.delete('another.ini')`` delete file another.ini
* ``javascript:pb.file.delete('newfile.ini')`` delete file another.ini 
* ``pb://file/delete/another.ini`` delete file another.ini  

  

----------------------------------------------------------------------------------
### pb.file.opendialog(filter, callback)

open a dialog to select file for **open**. 

#### Filter

A string whose value is a text description of the files to include in the list box 
and the file mask that you want to use to select the displayed files (for example, *.* or *.exe). 
The format for filter is: `description,*.ext

To specify multiple filter patterns for a single display string, use a semicolon to separate the patterns, 
for example: "Graphic Files (*.bmp;*.gif;*.jpg;*.jpeg),*.bmp;*.gif;*.jpg;*.jpeg"

The default is:"All Files (*.*),*.*"

#### Return

* return ``{ status:1, path: {path}, file: {file} }`` if file selected
* return ``{ status:0 }`` if file not selected

#### Samples
 
* ``javascript:pb.file.opendialog('Markdown (*.md),*.md')`` open dialog for markdown file 
* ``javascript:pb.file.opendialog('Javascript (*.js),*.js')`` select js files 
* ``pb://file/opendialog/Ini (*.ini),*.ini`` open dialog for ini   


-----------------------------------------------------
### pb.file.savedialog(filter, callback)

Open a dialog to select file for **save**. 

#### Filter

A string whose value is a text description of the files to include in the list box 
and the file mask that you want to use to select the displayed files (for example, *.* or *.exe). 
The format for filter is: `description,*.ext`

To specify multiple filter patterns for a single display string, use a semicolon to separate the patterns, 
for example: `Graphic Files (*.bmp;*.gif;*.jpg;*.jpeg),*.bmp;*.gif;*.jpg;*.jpeg`

The default is: `All Files (*.*),*.*`

#### Return

* return ``{ status:1, path: {path}, file: {file} }`` if file selected
* return ``{ status:0 }`` if file not selected

#### Samples
 
* ``javascript:pb.file.savedialog('Markdown (*.md),*.md')`` open dialog for markdown file 
* ``javascript:pb.file.savedialog('Javascript (*.js),*.js')`` select js files 
* ``pb://file/savedialog/Ini (*.ini),*.ini`` open dialog for ini   

    
   
## Work with Powerbuilder
  
This program is developed using Powerbuilder 10.5. 
It is supported to call powerbuilder customized window/function from html. 

  
-----------------------------------------------------
### pb.window(win, args, callback)

Open Powerbuilder window with parameters.

#### Samples

* `javascript: pb.window('w_about')` open about dialog  
* `pb://window/w_about` open about dialog  
* `javascript: pb.window('w_power_dialog','left=50,height=500,url=https://google.com')` open google in popup dialog   
* `pb://window/w_power_dialog/top=20,width=800,url=https://google.com` open google in popup dialog  



-----------------------------------------------------
### pb.func(name, args, callback)

call Powerbuilder user-defined function. This is advanced feature for extented PB library. 

1. define extented PB library in ini. e.g. `extLibrary=myapp.pbl`
2. code global function `f_functions( name, parm )` 
3. handle ( name, parm ) within the function, e.g. run SQL, or call other funcitons. 

     
## Misc Features

-----------------------------------------------------
### Session / Global Variables

``pb.session`` serves as session object sharing information between different pages. initialized by ``powerpage.ini``, e.g.

          [session]
          var1 = name: PowerPage 
          var2 = version: version 0.38, updated on 2021/05/05 
          var3 = remarks: this is a test message
          var4 = user: { "id":"admin", "role":"admin", "group":"IT" } 

when page loaded, pb.session will be initialed as 

          pb.session = { name: 'PowerPage', 
                         version: 'version 0.38, updated on 2021/05/05',
                         remarks: 'this is a test message', 
                         user: { "id":"admin", "role":"admin", "group":"IT" } 
                       }

to retrieve session variables, may use `pb.session[{name}]` in javascript, or function ``pb.session({name})`` 
 
to update session variables, may use protocol ``pb://session/remarks/new content`` or by javascript ``pb.session({name}, {new-value})``   


-----------------------------------------------------
### pb.popup( url, callback) 

Pop HTML Dialog within powerpage

#### Syntax

* simple url := {link} 
* complex url := height={height}, width={width}, top={top}, left={left}, url={link}, mode={modeOpts}
* {modeOpts} := print | preview | crawl 
* use alt. delimiter, e.g. `delim=| height={height} | width={width} | top={top} | left={left} | url={link} 
* use alt. delimiter, e.g. `delim=| height={height} | width={width} | top={top} | left={left} | url={link}

#### Samples

* popup dialog by javascript, `javascript:pb.popup('width=800,url=pp-dialog.html')`
* popup dialog by protocol, `pb://popup/height=400,url=pp-dialog.html` 
* popup dialog with callback, by protocol ``pb://callback/mycallback/popup/height=400,url=pp-dialog.html`` or 
* popup dialog with callback, ``javascript:pb.popup('width=500,url=pp-dialog.html','mycallback')``
* popup dialog with callback, ``javascript:pb.callback('mycallback').popup('width=500,url=pp-dialog.html')``
* popup dialog and print preview ``javascript:pb.popup('width=500,url=pp-dialog.html,mode=preview')``

-----------------------------------------------------

### pb.print( opt, callback )

Calling IE print functions. (i.e. print, preview, print immediately, print setup)

* Print (default, with prompt) => ``pb://print`` or js ``pb.print()``
* Print without prompt => ``pb://print/now`` or js ``pb.print('now')``
* Print Preview => ``pb://print/preview`` or js ``pb.print('preview')`` 
* Print Setup => ``pb://print/setup`` or js ``pb.print('setup')``

-----------------------------------------------------
### pb.pdf( opt, parm, callback ) {api-pdf} 

Generate PDF from current html page, for preview or printing. 
This function required `wkhtmltopdf.exe` as pdf-factory. 

#### Syntax

* protocol: ` pb://pdf/{optoins}/{querySelector} `
* javascript: ` pb.pdf( {options}, {querySelector}, {callback})`
* {options} := print | open | dialog | select

#### Samples

* print this document. ``javascript: pb.pdf('print')``
* open this document in pdf-reader. ``javascript: pb.pdf('open')``
* preview index. ``javascript: pb.pdf('dialog', 'h3, h4')``


-----------------------------------------------------
### pb.spider( url, key, callback )

This function mainly developed for [powerpage-web-crawler](https://github.com/casualwriter/powerpage-web-crawler). 

It will load web page in a hidden browser, and calling pb.crawl() to return html result.

~~~ powerpage.js
// powerpage.js
pb.crawl = function ( key ) {
  var i, text='', html='', links=[], divs=[], url  
  try {
    divs = (key=='a'? document.getElementsByTagName('a') : document.querySelectorAll(key||'body'))
    for (i=0; i<divs.length; i++) { 
      text += divs[i].innerText + '\n'
      html += divs[i].outerHTML + '\n'
      if (typeof divs[i].href=="string") links.push( { url: decodeURI(divs[i].href), text:divs[i].innerText } );
    }
  } catch (e) {
    html = text = 'Error: ' + e.message 
  }   
  return JSON.stringify( { url:location.href, title:document.title, text:text, html:html, links:links } )
}
~~~

#### Samples

* crawl goolge ``javascript:pb.spider('https://www.google.com/', '*', 'alert')``
* crawl Powerpage document ``javascript:pb.spider('https://casualwriter.github.io/powerpage/', 'right-panel', 'alert')``

 
-----------------------------------------------------
## Modification History

* 2021/05/11  initial
* 2021/05/31  add print commands
* 2021/09/30  update document using markdown
* 2021/10/05  update document (run/shell)
* 2021/11/03  update document (db/file/pb functions)
* 2022/03/08  update document (Misc Features)
 