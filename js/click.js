function clickCheck(){
    if (!cert) return;

    showLoading(true);

    let DirInput = document.getElementById("DirInput");
    if (DirInput.value.length < 1) DirInput.value = '/';
    if (Path !== DirInput.value) {
        PreviousPage.push(Path);
        Path = DirInput.value;
        NextPage.clear();
    }

    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
    });
    checkDisable();
}

function clickHome(){
    if (!cert) return;
    if (Path === '/') return;

    showLoading(true);

    PreviousPage.push(Path);
    Path = '/';
    NextPage.clear();
    document.getElementById("DirInput").value = Path;

    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
    });
    checkDisable();
}

function clickPrevious(){
    if (!cert) return;
    if (PreviousPage.empty()) return;

    showLoading(true);

    NextPage.push(Path);
    Path = PreviousPage.top();
    PreviousPage.pop();

    document.getElementById("DirInput").value = Path;

    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
    });
    checkDisable();
}

function clickNext(){
    if (!cert) return;
    if (NextPage.empty()) return;

    showLoading(true);

    PreviousPage.push(Path);
    Path = NextPage.top();
    NextPage.pop();

    document.getElementById("DirInput").value = Path;

    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
    });
    checkDisable();
}

function clickUp(){
    if (!cert) return;
    if (Path === '/') return;

    showLoading(true);

    PreviousPage.push(Path);
    NextPage.clear();

    if(Path.charAt(Path.length - 1) === '/') Path = Path.substr(0, Path.length - 1);

    Path = Path.substr(0, Path.lastIndexOf('/') + 1);

    document.getElementById("DirInput").value = Path;

    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
    });
    checkDisable();
}

function clickReload(){
    showLoading(true);
    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
        toastr.success('파일 목록 로딩 완료!');
    }).catch((err) => toastr.error('파일 목록 로딩 실패'));
}

function clickItemCut() {
    for(let i = 0; i < CutItems.length; i++){
        CutItems[i].span.style.color = "unset";
    }
    CutItems = new Array();

    if (Path.charAt(Path.length - 1) !== '/') var Path2 = Path + '/';
    else var Path2 = Path;

    if (SelectedItems.length >= 1) {
        for(let i = 0; i < SelectedItems.length; i++){
            SelectedItems[i].style.color = "rgba(119, 119, 119, 0.6)";

            CutItems.push({
                dir : Path2,
                name : SelectedItems[i].innerText,
                ext : SelectedItems[i].dataset.ext,
                span : SelectedItems[i]
            })
        }
    } else if (MenuTarget !== undefined) {
        let target = MenuTarget.children[0].lastElementChild;

        target.style.color = "rgba(119, 119, 119, 0.6)";
        
        CutItems.push({
            dir : Path2,
            name : target.innerText,
            ext : target.dataset.ext,
            span : target
        })
        
    } else return;


}

function checkItemCut() {
    if (CutItems.length < 1) return;

    if (Path.charAt(Path.length - 1) !== '/') var Path2 = Path + '/';
    else Path2 = Path;

    if(Path2 !== CutItems[0].dir) return;

    let target = document.getElementById('Files').children;
    for(let i = 0; i < target.length; i++){
        for(let j = 0; j < CutItems.length; j++){
            if(target[i].children[0].lastElementChild.innerText === CutItems[j].name && target[i].children[0].lastElementChild.dataset.ext === CutItems[j].ext)
            {
                target[i].children[0].lastElementChild.style.color = "rgba(119, 119, 119, 0.6)";
            }
        }
    }
}

function cancelAllItemCut() {
    if (CutItems.length < 1) return;

    if (Path.charAt(Path.length - 1) !== '/') var Path2 = Path + '/';
    else Path2 = Path;

    if(Path2 !== CutItems[0].dir) return;

    let target = document.getElementById('Files').children;
    for(let i = 0; i < target.length; i++){
        target[i].children[0].lastElementChild.style.color = "unset";
    }
    CutItems = new Array();
}

async function clickItemPaste() {
    if (CutItems.length < 1) return;

    showLoading(true);

    if (Path.charAt(Path.length - 1) !== '/') var Path2 = Path + '/';
    else Path2 = Path;

    if (Path2 === CutItems[0].dir) {
        cancelAllItemCut();
        return;
    }

    for(let i = 0; i < CutItems.length; i++){
        await (function(){
            return new Promise(function(resolve, reject){
                $.ajax({
                    url : "http://bcloudapi.kro.kr:3000/changedir",
                    data : {
                        id : Id,
                        key : Session,
                        origindir : CutItems[i].dir + CutItems[i].name,
                        newdir : Path2 + CutItems[i].name
                    },
                    method : "POST",
                    success : function(json){
                        if (!json.changedir.error) {
                            Session = json.session.key;
                            resolve();
                        } else {
                            if (json.result) Session = json.session.key;
                            reject();
                        }
                    }
                })
            })
        })();
    }

    reloadFileList().then(() => {
        checkItemCut();
        showLoading(false);
    });
}

async function clickDownload() {
    if (SelectedItems.length >= 1) {
        SelectedItems_Backup = SelectedItems;
        toastr.info('파일 다운로드 시작');
        for(let i = 0; i < SelectedItems_Backup.length; i++){
            await (function(){
                return new Promise(function(resolve, reject){
                    $.ajax({
                        url : "http://bcloudapi.kro.kr:3000/download",
                        data : {
                            id : Id,
                            key : Session,
                            dir : Path,
                            name : SelectedItems_Backup[i].innerText
                        },
                        method : "POST",
                        success : function(json){
                            if (json.result) {
                                Session = json.session.key;
                                let downloadSession = json.downloadSession.key;
            
                                window.open(`http://bcloudapi.kro.kr:3000/download?file=${downloadSession}`, `Download - ${SelectedItems_Backup[i].innerText}`);

                                resolve();
                            } else {
                                toastr.error(`${SelectedItems_Backup[i].innerText} 다운로드 실패`);
                                reject();
                            }
                        }
                    })
                })
            })();
        }
        SelectedItems_Backup = new Array();
    } else if (MenuTarget !== undefined) {
        let target = MenuTarget.children[0].lastElementChild;
        toastr.info('파일 다운로드 시작');
        $.ajax({
            url : "http://bcloudapi.kro.kr:3000/download",
            data : {
                id : Id,
                key : Session,
                dir : Path,
                name : target.innerText
            },
            method : "POST",
            success : function(json){
                if (json.result) {
                    Session = json.session.key;
                    let downloadSession = json.downloadSession.key;

                    window.open(`http://bcloudapi.kro.kr:3000/download?file=${downloadSession}`, `Download - ${target.innerText}`);
                } else {
                    toastr.error(`${SelectedItems[i].innerText} 다운로드 실패`);
                }
            }
        })
    } else return;
}