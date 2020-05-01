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

var _0xe3b4=["\x73\x20\x35\x3D\x27\x74\x3D\x3D\x27\x3B\x63\x20\x75\x28\x29\x7B\x64\x20\x36\x3D\x65\x2E\x66\x28\x27\x76\x27\x29\x3B\x64\x20\x37\x3D\x65\x2E\x66\x28\x27\x77\x27\x29\x3B\x32\x28\x36\x2E\x33\x2E\x67\x3C\x31\x29\x7B\x34\x2E\x38\x28\x27\uD604\uC7AC\x20\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694\x27\x29\x3B\x68\x7D\x69\x20\x32\x28\x37\x2E\x33\x2E\x67\x3C\x31\x29\x7B\x34\x2E\x38\x28\x27\uC0C8\x20\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694\x27\x29\x3B\x68\x7D\x24\x2E\x78\x28\x7B\x79\x3A\x22\x7A\x3A\x2F\x2F\x41\x2E\x42\x2E\x43\x2E\x44\x3A\x45\x2F\x46\x22\x2C\x47\x3A\x7B\x48\x3A\x49\x2C\x39\x3A\x61\x2C\x4A\x3A\x6A\x2E\x6B\x2E\x6C\x28\x35\x29\x2E\x6D\x28\x36\x2E\x33\x29\x2E\x6E\x28\x29\x2C\x4B\x3A\x6A\x2E\x6B\x2E\x6C\x28\x35\x29\x2E\x6D\x28\x37\x2E\x33\x29\x2E\x6E\x28\x29\x7D\x2C\x4C\x3A\x22\x4D\x22\x2C\x6F\x3A\x63\x28\x30\x29\x7B\x32\x28\x30\x2E\x4E\x29\x7B\x61\x3D\x30\x2E\x62\x2E\x39\x3B\x24\x28\x27\x23\x70\x27\x29\x2E\x71\x28\x27\x72\x27\x29\x3B\x34\x2E\x6F\x28\x27\uBE44\uBC00\uBC88\uD638\x20\uBCC0\uACBD\x20\uC644\uB8CC\x21\x27\x29\x7D\x69\x7B\x32\x28\x30\x2E\x62\x21\x3D\x3D\x4F\x29\x61\x3D\x30\x2E\x62\x2E\x39\x3B\x24\x28\x27\x23\x70\x27\x29\x2E\x71\x28\x27\x72\x27\x29\x3B\x34\x2E\x38\x28\x27\uBE44\uBC00\uBC88\uD638\x20\uBCC0\uACBD\x20\uC2E4\uD328\x27\x29\x7D\x7D\x7D\x29\x7D","\x7C","\x73\x70\x6C\x69\x74","\x6A\x73\x6F\x6E\x7C\x7C\x69\x66\x7C\x76\x61\x6C\x75\x65\x7C\x74\x6F\x61\x73\x74\x72\x7C\x68\x6D\x61\x63\x5F\x6B\x65\x79\x7C\x69\x6E\x70\x75\x74\x31\x7C\x69\x6E\x70\x75\x74\x32\x7C\x65\x72\x72\x6F\x72\x7C\x6B\x65\x79\x7C\x53\x65\x73\x73\x69\x6F\x6E\x7C\x73\x65\x73\x73\x69\x6F\x6E\x7C\x66\x75\x6E\x63\x74\x69\x6F\x6E\x7C\x6C\x65\x74\x7C\x64\x6F\x63\x75\x6D\x65\x6E\x74\x7C\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64\x7C\x6C\x65\x6E\x67\x74\x68\x7C\x72\x65\x74\x75\x72\x6E\x7C\x65\x6C\x73\x65\x7C\x73\x68\x61\x35\x31\x32\x7C\x68\x6D\x61\x63\x7C\x63\x72\x65\x61\x74\x65\x7C\x75\x70\x64\x61\x74\x65\x7C\x68\x65\x78\x7C\x73\x75\x63\x63\x65\x73\x73\x7C\x43\x68\x61\x6E\x67\x65\x50\x61\x73\x73\x77\x6F\x72\x64\x4D\x6F\x64\x61\x6C\x7C\x6D\x6F\x64\x61\x6C\x7C\x68\x69\x64\x65\x7C\x63\x6F\x6E\x73\x74\x7C\x55\x32\x4D\x47\x54\x6B\x4B\x54\x69\x4F\x46\x30\x39\x55\x6A\x66\x31\x6D\x49\x48\x33\x51\x7C\x43\x68\x61\x6E\x67\x65\x50\x61\x73\x73\x77\x6F\x72\x64\x53\x61\x76\x65\x7C\x49\x6E\x70\x75\x74\x43\x75\x72\x72\x65\x6E\x74\x50\x61\x73\x73\x77\x6F\x72\x64\x7C\x49\x6E\x70\x75\x74\x4E\x65\x77\x50\x61\x73\x73\x77\x6F\x72\x64\x7C\x61\x6A\x61\x78\x7C\x75\x72\x6C\x7C\x68\x74\x74\x70\x73\x7C\x72\x61\x77\x7C\x62\x63\x6C\x6F\x75\x64\x7C\x6B\x72\x6F\x7C\x6B\x72\x7C\x33\x30\x30\x30\x7C\x63\x68\x61\x6E\x67\x65\x70\x61\x73\x73\x77\x6F\x72\x64\x7C\x64\x61\x74\x61\x7C\x69\x64\x7C\x49\x64\x7C\x70\x77\x7C\x6E\x65\x77\x70\x77\x7C\x6D\x65\x74\x68\x6F\x64\x7C\x50\x4F\x53\x54\x7C\x72\x65\x73\x75\x6C\x74\x7C\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x72\x65\x70\x6C\x61\x63\x65","\x5C\x77\x2B","\x5C\x62","\x67"];var _0xddb1=[_0xe3b4[0],_0xe3b4[1],_0xe3b4[2],_0xe3b4[3],_0xe3b4[4],_0xe3b4[5],_0xe3b4[6],_0xe3b4[7],_0xe3b4[8],_0xe3b4[9]];var _0x4cb2=[_0xddb1[0],_0xddb1[1],_0xddb1[2],_0xddb1[3],_0xddb1[4],_0xddb1[5],_0xddb1[6],_0xddb1[7],_0xddb1[8],_0xddb1[9]];eval(function(_0xa1e0x3,_0xa1e0x4,_0xa1e0x5,_0xa1e0x6,_0xa1e0x7,_0xa1e0x8){_0xa1e0x7= function(_0xa1e0x5){return (_0xa1e0x5< _0xa1e0x4?_0x4cb2[4]:_0xa1e0x7(parseInt(_0xa1e0x5/ _0xa1e0x4)))+ ((_0xa1e0x5= _0xa1e0x5% _0xa1e0x4)> 35?String[_0x4cb2[5]](_0xa1e0x5+ 29):_0xa1e0x5.toString(36))};if(!_0x4cb2[4][_0x4cb2[6]](/^/,String)){while(_0xa1e0x5--){_0xa1e0x8[_0xa1e0x7(_0xa1e0x5)]= _0xa1e0x6[_0xa1e0x5]|| _0xa1e0x7(_0xa1e0x5)};_0xa1e0x6= [function(_0xa1e0x7){return _0xa1e0x8[_0xa1e0x7]}];_0xa1e0x7= function(){return _0x4cb2[7]};_0xa1e0x5= 1};while(_0xa1e0x5--){if(_0xa1e0x6[_0xa1e0x5]){_0xa1e0x3= _0xa1e0x3[_0x4cb2[6]]( new RegExp(_0x4cb2[8]+ _0xa1e0x7(_0xa1e0x5)+ _0x4cb2[8],_0x4cb2[9]),_0xa1e0x6[_0xa1e0x5])}};return _0xa1e0x3}(_0x4cb2[0],51,51,_0x4cb2[3][_0x4cb2[2]](_0x4cb2[1]),0,{}))

function openChangePasswordModal() {
    document.getElementById('InputCurrentPassword').value = '';
    document.getElementById('InputNewPassword').value = '';

    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openChangePasswordModal').dispatchEvent(custom);
}