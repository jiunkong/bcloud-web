function getQueryString(){
    let ret = {};
    let arguments = window.location.href.indexOf('?');

    if (arguments === -1) window.location.href = 'index.html';

    let query = window.location.href.substr(arguments + 1);
    let arr = query.split('&');

    for(let i = 0; i < arr.length; i++){
        var temp = arr[i].split('=');
        eval("ret." + temp[0] + " = '" + temp[1] + "'");
    }

    return ret;
}