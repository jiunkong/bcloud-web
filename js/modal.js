let MenuTarget_Backup;
let SelectedItems_Backup = new Array();

function openRenameModal() {
    if (SelectedItems.length >= 1) {
        var target = SelectedItems[SelectedItems.length - 1];
        SelectedItems_Backup = SelectedItems;
    } else if (MenuTarget !== undefined) {
        var target = MenuTarget.children[0].lastElementChild;
        MenuTarget_Backup = MenuTarget;
    } else return;

    document.getElementById('InputNewName').value = target.innerText.substr(0, target.innerText.length - target.dataset.ext.length)

    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openRenameModal').dispatchEvent(custom);
}

function renameSave() {
    showLoading(true);

    if (SelectedItems_Backup.length >= 1) {
        var target = SelectedItems_Backup[SelectedItems_Backup.length - 1];
    } else if (MenuTarget_Backup !== undefined) {
        var target = MenuTarget_Backup.children[0].lastElementChild;
    } else return;

    let input = document.getElementById('InputNewName');

    if (input.value === target.innerText.substr(0, target.innerText.length - target.dataset.ext.length)) return;

    if(input.value.indexOf('/') !== -1){
        toastr.error('파일 이름에 /를 사용할 수 없습니다');
        showLoading(false);
        return;
    }

    MenuTarget_Backup = undefined;
    SelectedItems_Backup = new Array();

    $.ajax({
        url : "https://raw.bcloud.kro.kr:3000/rename",
        data : {
            id : Id,
            key : Session,
            dir : Path,
            currname : target.innerText,
            newname : input.value + target.dataset.ext
        },
        method : "POST",
        success : function(json){
            if (!json.rename.error) {
                Session = json.session.key;
                reloadFileList().then(() => {
                    checkItemCut();
                    showLoading(false);
                });
                $('#RenameModal').modal('hide');
                toastr.success('이름 변경 완료!');
            } else {
                if (json.result) Session = json.session.key;
                $('#RenameModal').modal('hide');
                toastr.error('이름 변경 실패');
            }
        }
    })
}



function openCreateFolderModal() {
    document.getElementById('InputFolderName').value = '새 폴더';

    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openCreateFolderModal').dispatchEvent(custom);
}

function createFolderSave() {
    showLoading(true);

    let input = document.getElementById('InputFolderName');

    if(input.value.indexOf('/') !== -1){
        toastr.error('폴더 이름에 /를 사용할 수 없습니다');
        showLoading(false);
        return;
    }

    $.ajax({
        url : "https://raw.bcloud.kro.kr:3000/createfolder",
        data : {
            id : Id,
            key : Session,
            dir : Path,
            name : input.value
        },
        method : "POST",
        success : function(json){
            if (!json.createfolder.error) {
                Session = json.session.key;
                reloadFileList().then(() => {
                    checkItemCut();
                    showLoading(false);
                });
                $('#CreateFolderModal').modal('hide');
                toastr.success('폴더 생성 완료!');
            } else {
                if (json.result) Session = json.session.key;
                $('#CreateFolderModal').modal('hide');
                toastr.error('폴더 생성 실패');
            }
        }
    })
}

function openRemoveModal() {
    if (SelectedItems.length >= 1) {
        if (SelectedItems.length === 1) {
            let target = SelectedItems[0];

            if (target.dataset.ext === '') document.getElementById('RemoveConfirmText').innerText = `정말 ${target.innerText} 폴더를 삭제하시겠습니까?\n폴더 안에 있는 파일이 모두 삭제됩니다!`;
            else document.getElementById('RemoveConfirmText').innerText = `정말 ${target.innerText} 파일을 삭제하시겠습니까?\n삭제한 파일은 복구할 수 없습니다!`;
        } else {
            let file = 0, folder = 0;

            for(let i = 0; i < SelectedItems.length; i++) {
                if (SelectedItems[i].dataset.ext === '') folder++;
                else file++;
            }

            let target = document.getElementById('RemoveConfirmText');
            if (file !== 0 && folder !== 0) target.innerText = `정말 폴더 ${folder}개와 파일 ${file}개를 삭제하시겠습니까?\n삭제하면 복구할 수 없습니다!`;
            else if (file !== 0) target.innerText = `정말 파일 ${file}개를 삭제하시겠습니까?\n삭제한 파일은 복구할 수 없습니다!`;
            else if (folder !== 0) target.innerText = `정말 폴더 ${folder}개를 삭제하시겠습니까?\n폴더 안에 있는 파일이 모두 삭제됩니다!`;
        }

        SelectedItems_Backup = SelectedItems;
    } else if (MenuTarget !== undefined) {
        var target = MenuTarget.children[0].lastElementChild;
        MenuTarget_Backup = MenuTarget;

        if (target.dataset.ext === '') document.getElementById('RemoveConfirmText').innerText = `정말 ${target.innerText} 폴더를 삭제하시겠습니까?\n폴더 안에 있는 파일이 모두 삭제됩니다!`;
        else document.getElementById('RemoveConfirmText').innerText = `정말 ${target.innerText} 파일을 삭제하시겠습니까?\n삭제한 파일은 복구할 수 없습니다!`;
    } else return;

    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openRemoveModal').dispatchEvent(custom);
}

function removeSave() {
    showLoading(true);

    if (SelectedItems_Backup.length >= 1) {
        if (SelectedItems_Backup.length === 1) {
            let target = SelectedItems_Backup[0];

            $.ajax({
                url : "https://raw.bcloud.kro.kr:3000/remove",
                data : {
                    id : Id,
                    key : Session,
                    dir : Path,
                    target : target.innerText
                },
                method : "POST",
                success : function(json){
                    if (!json.remove.error) {
                        Session = json.session.key;
                        reloadFileList().then(() => {
                            checkItemCut();
                            showLoading(false);
                        });
                        $('#RemoveModal').modal('hide');
                        toastr.success('파일 삭제 완료!');
                    } else {
                        if (json.result) Session = json.session.key;
                        $('#RemoveModal').modal('hide');
                        toastr.error('파일 삭제 실패');
                    }
                }
            })
        } else {
            let target = new Array();

            for(let i = 0; i < SelectedItems_Backup.length; i++){
                target.push(SelectedItems_Backup[i].innerText);
            }

            $.ajax({
                url : "https://raw.bcloud.kro.kr:3000/removemultiple",
                data : {
                    id : Id,
                    key : Session,
                    dir : Path,
                    target : target
                },
                method : "POST",
                success : function(json){
                    if (!json.remove.error) {
                        Session = json.session.key;
                        reloadFileList().then(() => {
                            checkItemCut();
                            showLoading(false);
                        });
                        $('#RemoveModal').modal('hide');
                        toastr.success('파일 삭제 완료!');
                    } else {
                        if (json.result) Session = json.session.key;
                        $('#RemoveModal').modal('hide');
                        toastr.error('파일 삭제 실패');
                    }
                }
            })
        }

        SelectedItems_Backup = new Array();

        
    } else if (MenuTarget_Backup !== undefined) {
        let target = MenuTarget_Backup.children[0].lastElementChild;
        MenuTarget_Backup = undefined;

        $.ajax({
            url : "https://raw.bcloud.kro.kr:3000/remove",
            data : {
                id : Id,
                key : Session,
                dir : Path,
                target : target.innerText
            },
            method : "POST",
            success : function(json){
                if (!json.remove.error) {
                    Session = json.session.key;
                    reloadFileList().then(() => {
                        checkItemCut();
                        showLoading(false);
                    });
                    $('#RemoveModal').modal('hide');
                    toastr.success('파일 삭제 완료!');
                } else {
                    if (json.result) Session = json.session.key;
                    $('#RemoveModal').modal('hide');
                    toastr.error('파일 삭제 실패');
                }
            }
        })
    } else return;
}

function openUploadProgressModal() {
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openUploadProgressModal').dispatchEvent(custom);
}

function getTimeRemaining(percent, start) {
    let _milliseconds = new Date().getTime() - start;

    let milliseconds = 100 / (percent / _milliseconds);

    let __milliseconds = milliseconds - _milliseconds;
    let __seconds = parseInt((__milliseconds / 1000) % 60);
    let __minutes = parseInt((__milliseconds / (1000 * 60)) % 60);
    let __hours = parseInt((__milliseconds / (1000 * 60 * 60)));

    if (__hours > 0) {
        return `약 ${__hours}시간 ${__minutes}분 남음`;
    } else if (__minutes > 0) {
        return `${__minutes}분 ${__seconds}초 남음`;
    } else {
        return `${__seconds}초 남음`;
    }
}

function LogoutSave() {
    $('#LogoutModal').modal('hide');
    window.location.href = 'index.html';
}