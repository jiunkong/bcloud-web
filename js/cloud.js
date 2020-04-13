let PreviousPage = new Stack();
let NextPage = new Stack();
let Path = "/";
let cert = false;
let Session = '';
let Id = '';
let SelectedItems = new Array();
let isShiftPressed = false;
let isCtrlPressed = false;
let MenuTarget;
let CutItems = new Array();

function fileDropDown(){
    if (!cert) return;

    var dropZone = $("#dropZone");
    var dropColor = $("#dropColor");

    dropZone.on('dragenter', function(e){
        e.stopPropagation();
        e.preventDefault();
        dropColor.css('opacity','1');
    });
    dropZone.on('dragleave', function(e){
        e.stopPropagation();
        e.preventDefault();
        dropColor.css('opacity','0');
    });
    dropZone.on('dragover', function(e){
        e.stopPropagation();
        e.preventDefault();
        dropColor.css('opacity','1');
    });
    dropZone.on('drop', function(e){
        e.preventDefault();
        dropColor.css('opacity','0');
        
        var files = e.originalEvent.dataTransfer.files;

        if (files != null) {
            if (files.length < 1) {
                alert("폴더 업로드 불가");
                return;
            }

            var form = $('#uploadForm');
            var formData = new FormData(form);
            for(var i = 0; i < uploadFileList.length; i++){
                formData.append('files', fileList[uploadFileList[i]]);
            }
        
            $.ajax({
                url : "업로드 경로",
                data : formData,
                type : 'POST',
                enctype : 'multipart/form-data',
                processData : false,
                contentType : false,
                dataType : 'json',
                cache : false,
                success : function(result) {
                    if(result.data.length > 0) {
                        alert("성공");
                        location.reload();
                    } else {
                        alert("실패");
                        location.reload();
                    }
                }
            });
        } else {
            alert("ERROR");
        }
    });
}

function uploadFile(){
    var uploadFileList = Object.keys(fileList);

    if(uploadFileList.length == 0){
        // 파일등록 경고창
        alert("파일이 없습니다.");
        return;
    }
        
    if(confirm("등록 하시겠습니까?")){
        // 등록할 파일 리스트를 formData로 데이터 입력
        var form = $('#uploadForm');
        var formData = new FormData(form);
        for(var i = 0; i < uploadFileList.length; i++){
            formData.append('files', fileList[uploadFileList[i]]);
        }
        
        $.ajax({
            url:"업로드 경로",
            data:formData,
            type:'POST',
            enctype:'multipart/form-data',
            processData:false,
            contentType:false,
            dataType:'json',
            cache:false,
            success:function(result){
                if(result.data.length > 0){
                    alert("성공");
                    location.reload();
                }else{
                    alert("실패");
                    location.reload();
                }
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', function(){
    document.addEventListener('contextmenu', function() {
        event.preventDefault();
    });

    document.addEventListener('mousedown', function() {
        if ((Number(event.button) === 2) || (Number(event.which) === 3)) {
            checkMenuDisable();
            setPageMenuPosition(event.clientX, event.clientY)
            showPageMenu(true);
        }
    });

    document.addEventListener("click", function(e) {
        showMenu(false);
    })

    document.addEventListener("deviceready", onDeviceReady, false);

    $.ajax({
        url : "http://bcloudapi.kro.kr:3000/checksession",
        data : {
            key : getQueryString().session
        },
        method : "POST",
        success : function(json){
            if(json.result){
                Id = json.id;
                $("#nav-id").html(Id + "님");
                cert = true;
                Session = json.session.key;
                document.getElementById("DirInput").value = Path;
                checkDisable();
                fileDropDown();
                reloadFileList().then(() => reloadVolume().then(() => {
                    showLoading(false);
                }))
            } else {
                window.location.href = 'index.html';
                return;
            }
        }
    })

    var input = document.getElementById("DirInput");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            clickCheck();
        }
    });
})

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    clickPrevious();
}

function openNav(){
    if (!cert) return;
    document.getElementById("mySidenav").style.width = "300px";
}
  
function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
}

function checkDisable(){
    let pvbtns = document.getElementsByClassName('previous-btn');
    if (PreviousPage.empty()) {
        for(let i = 0; i < pvbtns.length; i++){
            pvbtns[i].disabled = 'disabled';
        }
    } else {
        for(let i = 0; i < pvbtns.length; i++){
            pvbtns[i].disabled = false;
        }
    }

    let nxbtns = document.getElementsByClassName('next-btn');
    if (NextPage.empty()) {
        for(let i = 0; i < nxbtns.length; i++){
            nxbtns[i].disabled = 'disabled';
        }
    } else {
        for(let i = 0; i < nxbtns.length; i++){
            nxbtns[i].disabled = false;
        }
    }

    let upbtns = document.getElementsByClassName('up-btn');
    let hmbtns = document.getElementsByClassName('hm-btn');
    if (Path === '/') {
        for(let i = 0; i < upbtns.length; i++){
            upbtns[i].disabled = 'disabled';
        }
        for(let i = 0; i < hmbtns.length; i++){
            hmbtns[i].disabled = 'disabled';
        }
    } else {
        for(let i = 0; i < upbtns.length; i++){
            upbtns[i].disabled = false;
        }
        for(let i = 0; i < hmbtns.length; i++){
            hmbtns[i].disabled = false;
        }
    }
}

function showLoading(status) {
    if (status) document.getElementById("Loading").style.display = 'unset';
    else document.getElementById("Loading").style.display = 'none';
}

function onMouseDown() {
    event.stopPropagation();

    if ((Number(event.button) === 2) || (Number(event.which) === 3)) {
        MenuTarget = event.toElement;
        checkMenuDisable();
        setMenuPosition(event.clientX, event.clientY)
        showMenu(true);
    }
}

function onClick() { 
    event.stopPropagation();

    showMenu(false);

    let FileListView = event.toElement.parentElement;

    if (isShiftPressed || event.shiftKey) {

        if (SelectedItems.length < 1) {
            event.toElement.style.backgroundColor = "rgb(173, 222, 255)";
            SelectedItems.push(GetSpanByFileListDiv(event.toElement));
        }

        let previousIdx = Array.from(FileListView.children).findIndex(function(element){
            return element === SelectedItems[SelectedItems.length - 1].parentElement.parentElement;
        })

        let nowIdx = Array.from(FileListView.children).findIndex(function(element){
            return element === event.toElement;
        })

        if (previousIdx > nowIdx) {
            for(let i = previousIdx; i >= nowIdx; i--){
                FileListView.children[i].style.backgroundColor = "rgb(173, 222, 255)";
                SelectedItems.push(GetSpanByFileListDiv(FileListView.children[i]));
            }
        } else if (previousIdx < nowIdx) {
            for(let i = previousIdx; i <= nowIdx; i++){
                FileListView.children[i].style.backgroundColor = "rgb(173, 222, 255)";
                SelectedItems.push(GetSpanByFileListDiv(FileListView.children[i]));
            }
        }

        isShiftPressed = false;

    } else if (isCtrlPressed || event.ctrlKey) {

        if (event.toElement.style.backgroundColor !== "unset") {
            event.toElement.style.backgroundColor = "unset";
            let idx = SelectedItems.findIndex(function(element){
                return element === GetSpanByFileListDiv(event.toElement);
            })
            if (idx > -1) SelectedItems.splice(idx, 1);
        } else {
            event.toElement.style.backgroundColor = "rgb(173, 222, 255)";
            SelectedItems.push(GetSpanByFileListDiv(event.toElement));
        } 

        isCtrlPressed = false;

    } else {
        CancelAllSelection();

        event.toElement.style.backgroundColor = "rgb(173, 222, 255)";
        SelectedItems.push(GetSpanByFileListDiv(event.toElement));
    }
}

function showMenu(status, inshowPageMenu) {
    if (!inshowPageMenu) showPageMenu(false, true);

    let menu = document.getElementById('Menu');
    if (status) {
        menu.style.display = 'unset';
    } else {
        menu.style.display = 'none';
        MenuTarget = undefined;
    }
}

function setMenuPosition(x, y) {
    let menu = document.getElementById('Menu');
    if (window.innerWidth < 769) {
        menu.style.top = (y - 152) + "px";
        menu.style.left = x + "px";
    } else {
        menu.style.top = (y - 118) + "px";
        menu.style.left = x + "px";
    }
}

function showPageMenu(status, inshowMenu) {
    if (!inshowMenu) showMenu(false, true);

    let menu = document.getElementById('PageMenu');
    if (status) {
        menu.style.display = 'unset';
    } else {
        menu.style.display = 'none';
    }
}

function setPageMenuPosition(x, y) {
    let menu = document.getElementById('PageMenu');
    if (window.innerWidth < 769) {
        menu.style.top = (y - 152) + "px";
        menu.style.left = x + "px";
    } else {
        menu.style.top = (y - 118) + "px";
        menu.style.left = x + "px";
    }
}

function CancelAllSelection() {
    SelectedItems = new Array();

    let list = document.getElementsByClassName('FileList');

    for(let i = 0; i < list.length; i++){
        list[i].style.backgroundColor = 'unset';
    }
}

function ondblClick(){
    event.stopPropagation();

    let span = event.srcElement;

    if (GetImgSrcBySpan(span) === 'folder.png') {

        showLoading(true);

        PreviousPage.push(Path);

        if(Path.charAt(Path.length - 1) !== '/') Path += '/'; 

        Path += span.innerText;

        NextPage.clear();

        document.getElementById("DirInput").value = Path;

        reloadFileList().then(() => showLoading(false));
        checkDisable();

    } else {

    }
}

function checkMenuDisable(){
    // Check All Menus
    let paste = document.getElementsByClassName('menu-paste');
    if (CutItems.length < 1) {
        for(let i = 0; i < paste.length; i++){
            paste[i].classList.add('disabled');
        }
    } else {
        for(let i = 0; i < paste.length; i++){
            paste[i].classList.remove('disabled');
        }
    }

    // Check PageMenu & MobileMenu
    let cut = document.getElementsByClassName('menu-cut');
    if (SelectedItems.length < 1) {
        for(let i = 0; i < cut.length; i++){
            cut[i].classList.add('disabled');
        }
    } else {
        for(let i = 0; i < cut.length; i++){
            cut[i].classList.remove('disabled');
        }
    }

    // Check MobileMenu
    let download = document.getElementsByClassName('mobilemenu-download');
    let _delete = document.getElementsByClassName('mobilemenu-delete');
    let rename = document.getElementsByClassName('mobilemenu-rename');
    if (SelectedItems.length < 1) {
        for(let i = 0; i < download.length; i++){
            download[i].classList.add('disabled');
        }
        for(let i = 0; i < _delete.length; i++){
            _delete[i].classList.add('disabled');
        }
        for(let i = 0; i < rename.length; i++){
            rename[i].classList.add('disabled');
        }
    } else {
        for(let i = 0; i < download.length; i++){
            download[i].classList.remove('disabled');
        }
        for(let i = 0; i < _delete.length; i++){
            _delete[i].classList.remove('disabled');
        }
        for(let i = 0; i < rename.length; i++){
            rename[i].classList.remove('disabled');
        }
    }
}