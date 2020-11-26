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

    if (input.value.indexOf('/') !== -1) {
        toastr.error('파일 이름에 /를 사용할 수 없습니다');
        showLoading(false);
        return;
    } else if (input.value.indexOf('<') !== -1) {
        toastr.error('파일 이름에 <를 사용할 수 없습니다');
        return;
    } else if (input.value.indexOf('>') !== -1) {
        toastr.error('파일 이름에 >를 사용할 수 없습니다');
        return;
    }

    MenuTarget_Backup = undefined;
    SelectedItems_Backup = new Array();

    $.ajax({
        url : "https://rawcloud.bukgeuk.dev:2083/rename",
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
        url : "https://rawcloud.bukgeuk.dev:2083/createfolder",
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
                url : "https://rawcloud.bukgeuk.dev:2083/remove",
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
                url : "https://rawcloud.bukgeuk.dev:2083/removemultiple",
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
            url : "https://rawcloud.bukgeuk.dev:2083/remove",
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

var _0x2551=["\x55\x32\x4D\x47\x54\x6B\x4B\x54\x69\x4F\x46\x30\x39\x55\x6A\x66\x31\x6D\x49\x48\x33\x51\x3D\x3D","\x49\x6E\x70\x75\x74\x43\x75\x72\x72\x65\x6E\x74\x50\x61\x73\x73\x77\x6F\x72\x64","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x49\x6E\x70\x75\x74\x4E\x65\x77\x50\x61\x73\x73\x77\x6F\x72\x64","\x6C\x65\x6E\x67\x74\x68","\x76\x61\x6C\x75\x65","\uD604\uC7AC\x20\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\x65\x72\x72\x6F\x72","\uC0C8\x20\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x72\x61\x77\x63\x6C\x6F\x75\x64\x2E\x62\x75\x6B\x67\x65\x75\x6B\x2E\x64\x65\x76\x3A\x32\x30\x38\x33\x2F\x63\x68\x61\x6E\x67\x65\x70\x61\x73\x73\x77\x6F\x72\x64","\x68\x65\x78","\x75\x70\x64\x61\x74\x65","\x63\x72\x65\x61\x74\x65","\x68\x6D\x61\x63","\x50\x4F\x53\x54","\x72\x65\x73\x75\x6C\x74","\x6B\x65\x79","\x73\x65\x73\x73\x69\x6F\x6E","\x68\x69\x64\x65","\x6D\x6F\x64\x61\x6C","\x23\x43\x68\x61\x6E\x67\x65\x50\x61\x73\x73\x77\x6F\x72\x64\x4D\x6F\x64\x61\x6C","\uBE44\uBC00\uBC88\uD638\x20\uBCC0\uACBD\x20\uC644\uB8CC\x21","\x73\x75\x63\x63\x65\x73\x73","\x69\x6E\x70\x75\x74\x65\x72\x72","\uD604\uC7AC\x20\uBE44\uBC00\uBC88\uD638\uAC00\x20\uC62C\uBC14\uB974\uC9C0\x20\uC54A\uC2B5\uB2C8\uB2E4","\uBE44\uBC00\uBC88\uD638\x20\uBCC0\uACBD\x20\uC2E4\uD328","\x61\x6A\x61\x78"];var _0xdbeb=[_0x2551[0],_0x2551[1],_0x2551[2],_0x2551[3],_0x2551[4],_0x2551[5],_0x2551[6],_0x2551[7],_0x2551[8],_0x2551[9],_0x2551[10],_0x2551[11],_0x2551[12],_0x2551[13],_0x2551[14],_0x2551[15],_0x2551[16],_0x2551[17],_0x2551[18],_0x2551[19],_0x2551[20],_0x2551[21],_0x2551[22],_0x2551[23],_0x2551[24],_0x2551[25],_0x2551[26]];var _0x562c=[_0xdbeb[0],_0xdbeb[1],_0xdbeb[2],_0xdbeb[3],_0xdbeb[4],_0xdbeb[5],_0xdbeb[6],_0xdbeb[7],_0xdbeb[8],_0xdbeb[9],_0xdbeb[10],_0xdbeb[11],_0xdbeb[12],_0xdbeb[13],_0xdbeb[14],_0xdbeb[15],_0xdbeb[16],_0xdbeb[17],_0xdbeb[18],_0xdbeb[19],_0xdbeb[20],_0xdbeb[21],_0xdbeb[22],_0xdbeb[23],_0xdbeb[24],_0xdbeb[25],_0xdbeb[26]];var _0xd086=[_0x562c[0],_0x562c[1],_0x562c[2],_0x562c[3],_0x562c[4],_0x562c[5],_0x562c[6],_0x562c[7],_0x562c[8],_0x562c[9],_0x562c[10],_0x562c[11],_0x562c[12],_0x562c[13],_0x562c[14],_0x562c[15],_0x562c[16],_0x562c[17],_0x562c[18],_0x562c[19],_0x562c[20],_0x562c[21],_0x562c[22],_0x562c[23],_0x562c[24],_0x562c[25],_0x562c[26]];var _0x489c=[_0xd086[0],_0xd086[1],_0xd086[2],_0xd086[3],_0xd086[4],_0xd086[5],_0xd086[6],_0xd086[7],_0xd086[8],_0xd086[9],_0xd086[10],_0xd086[11],_0xd086[12],_0xd086[13],_0xd086[14],_0xd086[15],_0xd086[16],_0xd086[17],_0xd086[18],_0xd086[19],_0xd086[20],_0xd086[21],_0xd086[22],_0xd086[23],_0xd086[24],_0xd086[25],_0xd086[26]];const hmac_key=_0x489c[0];function ChangePasswordSave(){let _0xf85fx7=document[_0x489c[2]](_0x489c[1]);let _0xf85fx8=document[_0x489c[2]](_0x489c[3]);if(_0xf85fx7[_0x489c[5]][_0x489c[4]]< 1){toastr[_0x489c[7]](_0x489c[6]);return}else {if(_0xf85fx8[_0x489c[5]][_0x489c[4]]< 1){toastr[_0x489c[7]](_0x489c[8]);return}};$[_0x489c[26]]({url:_0x489c[9],data:{id:Id,key:Session,pw:sha512[_0x489c[13]][_0x489c[12]](hmac_key)[_0x489c[11]](_0xf85fx7[_0x489c[5]])[_0x489c[10]](),newpw:sha512[_0x489c[13]][_0x489c[12]](hmac_key)[_0x489c[11]](_0xf85fx8[_0x489c[5]])[_0x489c[10]]()},method:_0x489c[14],success:function(_0xf85fx9){if(_0xf85fx9[_0x489c[15]]){Session= _0xf85fx9[_0x489c[17]][_0x489c[16]];$(_0x489c[20])[_0x489c[19]](_0x489c[18]);toastr[_0x489c[22]](_0x489c[21])}else {$(_0x489c[20])[_0x489c[19]](_0x489c[18]);if(_0xf85fx9[_0x489c[23]]){Session= _0xf85fx9[_0x489c[17]][_0x489c[16]];toastr[_0x489c[7]](_0x489c[24])}else {toastr[_0x489c[7]](_0x489c[25])}}}})}

function openChangePasswordModal() {
    document.getElementById('InputCurrentPassword').value = '';
    document.getElementById('InputNewPassword').value = '';

    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openChangePasswordModal').dispatchEvent(custom);
}

function openKeyboardShortCutsModal() {
    let custom = document.createEvent("MouseEvents");
    custom.initEvent("click", true, true);
    document.getElementById('openKeyboardShortCutsModal').dispatchEvent(custom);
} 