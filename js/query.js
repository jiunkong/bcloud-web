function getQueryString(){
    let ret = {};
    let query = window.location.href.substr(window.location.href.indexOf('?') + 1);
    let arr = query.split('&');

    for(let i = 0; i < arr.length; i++){
        var temp = arr[i].split('=');
        eval("ret." + temp[0] + " = '" + temp[1] + "'");
    }

    return ret;
}