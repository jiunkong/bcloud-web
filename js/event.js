function RaiseClickOnChild() {
    if (event.shiftKey) isShiftPressed = true;
    else isShiftPressed = false;

    if (event.ctrlKey) isCtrlPressed = true;
    else isCtrlPressed = false;

    if (!CRS) {
        var target = event.toElement.parentElement;
    } else {
        var target = event.currentTarget.parentElement;
    }
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaiseClickOnGrandChild() {
    if (event.shiftKey) isShiftPressed = true;
    else isShiftPressed = false;

    if (event.ctrlKey) isCtrlPressed = true;
    else isCtrlPressed = false;

    if (!CRS) {
        var target = event.toElement.parentElement.parentElement;
    } else {
        var target = event.currentTarget.parentElement.parentElement;
    }
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaisedblClickOnGrandParent() {
    if (!CRS) {
        var target = event.toElement.children[0].lastElementChild;
    } else {
        var target = event.currentTarget.children[0].lastElementChild;
    }
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnParent() {
    if (!CRS) {
        var target = event.toElement.lastElementChild;
    } else {
        var target = event.currentTarget.lastElementChild;
    }
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnSibling() {
    if (!CRS) {
        var target = event.toElement.nextElementSibling;
    } else {
        var target = event.currentTarget.nextElementSibling;
    }
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnParentSibling() {
    if (!CRS) {
        var target = event.toElement.previousElementSibling.lastElementChild;
    } else {
        var target = event.currentTarget.previousElementSibling.lastElementChild;
    }
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnParentSiblingChild() {
    if (!CRS) {
        var target = event.toElement.parentElement.previousElementSibling.lastElementChild;
    } else {
        var target = event.currentTarget.parentElement.previousElementSibling.lastElementChild;
    }
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function GetImgSrcBySpan(span) {
    let src = span.previousElementSibling.src;
    return src.substr(src.lastIndexOf('/') + 1);
}

function GetSpanByFileListDiv(div) {
    return div.children[0].lastElementChild;
}

function RaiseFileInputClick() {
    let target = document.getElementById('input_file');
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    target.dispatchEvent(custom);
}

function RaiseMouseDownOnChild() {
    if (!CRS) {
        var target = event.toElement.parentElement;
    } else {
        var target = event.currentTarget.parentElement;
    }

    let opt = {
        bubbles: true,
        cancelable: true,
        clientX: event.x,
        clientY: event.y
    }
    if ((Number(event.button) === 2) || (Number(event.which) === 3)) opt.button = 2;

    let custom = new MouseEvent('mousedown', opt);
    
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaiseMouseDownOnGrandChild() {
    if (!CRS) {
        var target = event.toElement.parentElement.parentElement;
    } else {
        var target = event.currentTarget.parentElement.parentElement;
    }

    let opt = {
        bubbles: true,
        cancelable: true,
        clientX: event.x,
        clientY: event.y
    }
    if ((Number(event.button) === 2) || (Number(event.which) === 3)) opt.button = 2;

    let custom = new MouseEvent('mousedown', opt);

    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaiseTouchStartOnChild() {
    let target = event.srcElement.parentElement;
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("touchstart", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaiseTouchStartOnGrandChild() {
    let target = event.srcElement.parentElement.parentElement;
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("touchstart", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaiseTouchEndOnChild() {
    let target = event.srcElement.parentElement;
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("touchend", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaiseTouchEndOnGrandChild() {
    let target = event.srcElement.parentElement.parentElement;
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("touchend", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}