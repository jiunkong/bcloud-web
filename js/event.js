function RaiseClickOnChild() {
    if (event.shiftKey) isShiftPressed = true;
    else isShiftPressed = false;

    if (event.ctrlKey) isCtrlPressed = true;
    else isCtrlPressed = false;

    let target = event.toElement.parentElement;
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

    let target = event.toElement.parentElement.parentElement;
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    target.dispatchEvent(custom);
    event.stopPropagation();
}

function RaisedblClickOnGrandParent() {
    let target = event.toElement.children[0].lastElementChild;
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnParent() {
    let target = event.toElement.lastElementChild;
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnSibling() {
    let target = event.toElement.nextElementSibling;
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnParentSibling() {
    let target = event.toElement.previousElementSibling.lastElementChild;
    target.dispatchEvent(new Event('dblclick'));
    event.stopPropagation();
}

function RaisedblClickOnParentSiblingChild() {
    let target = event.toElement.parentElement.previousElementSibling.lastElementChild;
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
    let target = event.toElement.parentElement;

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
    let target = event.toElement.parentElement.parentElement;

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