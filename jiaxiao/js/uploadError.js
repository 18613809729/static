window.onerror = function(msg,url,line,col,error){
    try{
        var data = {};
        col = col || (window.event && window.event.errorCharacter) || 0;
        data.url = url;
        data.line = line;
        data.col = col;
        data.msg = msg;
        if (error && error.stack){
            data.msg = error.stack.toString();
        }
        var div=document.createElement("div");
        div.style.cssText = "position: fixed; background: #FFF0F5; word-break: break-all;  word-wrap: break-word;";
        div.innerText = JSON.stringify(data);
        document.body.appendChild(div);
    } catch(e){
        alert(e);
    }  
    new Image().src = "/log/warn?msg=" + encodeURIComponent(JSON.stringify(data));
    return false;
};