let PreviousPage = new Stack(),
    NextPage = new Stack(),
    Path = "/",
    cert = false,
    isNavOpen = false,
    Session = '',
    Id = '',
    UploadCount = 0,
    SelectedItems = new Array(),
    isShiftPressed = false,
    isCtrlPressed = false,
    MenuTarget,
    CutItems = new Array();


// File list
let fileList = new Array();

toastr.options = {
    //"escapeHtml" : true,
    "closeButton" : true,
    "newestOnTop" : true,
    "progressBar": false,
    "timeOut" : 2000,
    "positionClass": "toast-bottom-right",
}

function fileDropDown(){
    if (!cert) return;

    let dropZone = $("#dropZone");

    dropZone.on('dragenter', function(e){
        e.stopPropagation();
        e.preventDefault();
        dropZone.css('background-color', '#E3F2FC');
    });
    dropZone.on('dragleave', function(e){
        e.stopPropagation();
        e.preventDefault();
        dropZone.css('background-color','#FFFFFF');
    });
    dropZone.on('dragover', function(e){
        e.stopPropagation();
        e.preventDefault();
        dropZone.css('background-color','#E3F2FC');
    });
    dropZone.on('drop',function(e){
        e.preventDefault();
        dropZone.css('background-color','#FFFFFF');
        
        let files = e.originalEvent.dataTransfer.files;

        for(let i = 0; i < files.length; i++)
        {
            if (files[i].type === "" && files[i].size === 0) {
                toastr.error('폴더를 업로드 할 수 없습니다');
                return;
            }
        }

        for(let i = 0; i < files.length; i++){
            fileList[i] = files[i];
        }

        uploadFile();
    });
}

function onFileChange(){
    if (!cert) return;

    let files = document.uploadForm.file.files;

    for(let i = 0; i < files.length; i++)
    {
        if (files[i].type === "" && files[i].size === 0) {
            toastr.error('폴더를 업로드 할 수 없습니다');
            return;
        }
    }

    for(let i = 0; i < files.length; i++){
        fileList[i] = files[i];
    }

    document.uploadForm.file.value = "";
    uploadFile();
}

// Upload file
function uploadFile(){
    // File list to upload

    if (fileList.length < 1) {
        toastr.error('파일이 없습니다');
        return;
    }

    for(let i = 0; i < fileList.length; i++){
        if(fileList[i].name.indexOf() !== -1){
            toastr.error('파일 이름에 /를 사용할 수 없습니다');
            return;
        }
    }

    if (fileList.length === 1) {
        $.ajax({
            url:"https://raw.bcloud.kro.kr:3000/beforeupload",
            data : {
                id : Id,
                key : Session,
                dir : Path,
                name : fileList[0].name,
                ext : fileList[0].name.substr(fileList[0].name.lastIndexOf('.'))
            },
            method : 'POST',
            success : function(json){
                if (json.result) {
                    Session = json.session.key;

                    let target = document.uploadForm;
                    target.key.value = json.uploadSession.key;
                    target.id.value = Id;

                    let filePath = Path;

                    let formData = new FormData(target);

                    formData.append('file', fileList[0]);

                    toastr.info('파일 업로드 시작<br><a onclick="openUploadProgressModal()" >[업로드 보기]</a>');

                    $.ajax({
                        url:"https://raw.bcloud.kro.kr:3000/uploadsingle",
                        data : formData,
                        type : 'POST',
                        enctype : 'multipart/form-data',
                        processData : false,
                        contentType : false,
                        dataType : 'json',
                        cache : false,
                        xhr: function() {
                            let target = document.getElementById('UploadProgressList');

                            if (target.children[0].innerText === '업로드한 파일이 없습니다') target.innerText = '';

                            target.innerHTML = `<div style="padding-bottom: 20px;">
                            <div class="notextover">경로 : ${filePath}</div>
                            <span class="notextover progressText progressName">${fileList[0].name}</span>
                            <span class="notextover progressText progressPercent" id="Percent-${UploadCount}">0%</span>
                            <div class="progress" style="height: 20px;" id="Progress-${UploadCount}">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" id="Volume-Bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
                            </div>
                            <span id="Time-${UploadCount}">계산 중...</span>
                        </div>
                        ` + target.innerHTML;

                            let temp = UploadCount;
                            UploadCount++;

                            let start = new Date().getTime();

                            let xhr = $.ajaxSettings.xhr();
                            xhr.upload.onprogress = function(e) {
                                let percent = e.loaded * 100 / e.total;

                                if (percent !== 100) {
                                    var timestr = getTimeRemaining(percent, start);
                                } else {
                                    var timestr = '업로드 완료됨';
                                    document.getElementById(`Progress-${temp}`).children[0].classList.remove('progress-bar-animated');
                                }

                                document.getElementById(`Percent-${temp}`).innerText = percent.toFixed(1) + '%';
                                document.getElementById(`Progress-${temp}`).children[0].style.width = percent + '%';
                                document.getElementById(`Time-${temp}`).innerText = timestr;
                            };
                            return xhr;
                        },
                        success : function(json){
                            fileList = new Array();
                            if (json.result) {
                                showLoading(true);
                                reloadFileList().then(() => {
                                    checkItemCut();
                                    showLoading(false);
                                })
                                toastr.success('파일 업로드 완료!');
                            } else {
                                toastr.error('파일 업로드 실패');
                            }
                        }
                    });

                } else {
                    toastr.error('파일 업로드 실패');
                    return;
                }
            }
        });
    } else {
        let arr_name = new Array(),
            arr_ext = new Array();

        for (let i = 0; i < fileList.length; i++) {
            arr_name.push(fileList[i].name);
            arr_ext.push(fileList[i].name.substr(fileList[i].name.lastIndexOf('.')));
        }

        $.ajax({
            url:"https://raw.bcloud.kro.kr:3000/beforeupload",
            data : {
                id : Id,
                key : Session,
                dir : Path,
                name : arr_name,
                ext : arr_ext
            },
            method : 'POST',
            success : function(json){
                if (json.result) {
                    Session = json.session.key;

                    let target = document.uploadForm;
                    target.key.value = json.uploadSession.key;
                    target.id.value = Id;

                    let filePath = Path;

                    let formData = new FormData(target);

                    for (var i = 0; i < fileList.length; i++){
                        formData.append('files', fileList[i]);
                    }

                    toastr.info('파일 업로드 시작<br><a onclick="openUploadProgressModal()" >[업로드 보기]</a>');

                    $.ajax({
                        url:"https://raw.bcloud.kro.kr:3000/uploadmultiple",
                        data : formData,
                        type : 'POST',
                        enctype : 'multipart/form-data',
                        processData : false,
                        contentType : false,
                        dataType : 'json',
                        cache : false,
                        xhr: function(){
                            let target = document.getElementById('UploadProgressList');

                            if (target.children[0].innerText === '업로드한 파일이 없습니다') target.innerText = '';

                            let filenames = '';
                            for(let i = 0; i < fileList.length; i++){
                                if(i !== 0) filenames += ', ';
                                filenames += fileList[i].name;
                            }

                            target.innerHTML = `<div style="padding-bottom: 20px;">
                            <div class="notextover">경로 : ${filePath}</div>
                            <span class="notextover progressText progressName">${filenames}</span>
                            <span class="notextover progressText progressPercent" id="Percent-${UploadCount}">0%</span>
                            <div class="progress" style="height: 20px;" id="Progress-${UploadCount}">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" id="Volume-Bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
                            </div>
                            <span id="Time-${UploadCount}">계산 중...</span>
                        </div>
                        ` + target.innerHTML;

                            let temp = UploadCount;
                            UploadCount++;

                            let start = new Date().getTime();

                            let xhr = $.ajaxSettings.xhr();
                            xhr.upload.onprogress = function(e) {
                                let percent = e.loaded * 100 / e.total;

                                if (percent !== 100) {
                                    var timestr = getTimeRemaining(percent, start);
                                } else {
                                    var timestr = '업로드 완료됨';
                                    document.getElementById(`Progress-${temp}`).children[0].classList.remove('progress-bar-animated');
                                }

                                document.getElementById(`Percent-${temp}`).innerText = percent.toFixed(1) + '%';
                                document.getElementById(`Progress-${temp}`).children[0].style.width = percent + '%';
                                document.getElementById(`Time-${temp}`).innerText = timestr;
                            };
                            return xhr;
                        },
                        success : function(json){
                            fileList = new Array();
                            if (json.result) {
                                showLoading(true);
                                reloadFileList().then(() => {
                                    checkItemCut();
                                    showLoading(false);
                                })
                                toastr.success('파일 업로드 완료!');
                            } else {
                                toastr.error('파일 업로드 실패');
                            }
                        }
                    });

                } else {
                    toastr.error('파일 업로드 실패');
                    return;
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
        closeNav();
    })

    document.addEventListener("keydown", function(){
        if(Number(event.keyCode) === 27){
            cancelAllItemCut();
        }

        if(Number(event.keyCode) === 46){
            openRemoveModal();
        }

        if(Number(event.keyCode) === 113){
            openRenameModal();
        }

        if(Number(event.keyCode) === 88 && event.ctrlKey){
            clickItemCut();
        }

        if(Number(event.keyCode) === 86 && event.ctrlKey){
            clickItemPaste();
        }

        if(Number(event.keyCode) === 76 && event.shiftKey){
            openUploadProgressModal();
        }

        if(Number(event.keyCode) === 85 && event.shiftKey){
            RaiseFileInputClick();
        }

        if(Number(event.keyCode) === 78 && event.shiftKey){
            openCreateFolderModal();
        }
    })

    $("[data-toggle='tooltip']").tooltip();

    document.addEventListener("deviceready", onDeviceReady, false);

    $.ajax({
        url : "https://raw.bcloud.kro.kr:3000/checksession",
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
                reloadFileList().then(() => {
                    checkItemCut();
                    showLoading(false);
                })
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
    event.stopPropagation();
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
                if (FileListView.children[i].style.backgroundColor !== "unset") continue;

                FileListView.children[i].style.backgroundColor = "rgb(173, 222, 255)";
                SelectedItems.push(GetSpanByFileListDiv(FileListView.children[i]));
            }
        } else if (previousIdx < nowIdx) {
            for(let i = previousIdx; i <= nowIdx; i++){
                if (FileListView.children[i].style.backgroundColor !== "unset") continue;

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

    if (span.dataset.ext === '') {

        showLoading(true);

        PreviousPage.push(Path);

        if(Path.charAt(Path.length - 1) !== '/') Path += '/'; 

        Path += span.innerText;

        NextPage.clear();

        document.getElementById("DirInput").value = Path;

        reloadFileList().then(() => {
            checkItemCut();
            showLoading(false);
        });
        checkDisable();

    } else {
        clickDownload();
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

    let share = document.getElementsByClassName('menu-share');
    if (share !== null) {
        if (SelectedItems.length < 1) {
            for(let i = 0; i < share.length; i++){
                share[i].classList.add('disabled');
            }
        } else {
            for(let i = 0; i < share.length; i++){
                share[i].classList.remove('disabled');
            }
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