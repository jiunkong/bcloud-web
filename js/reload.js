function reloadFileList(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url : "https://raw.bcloud.kro.kr:3000/dir",
            method : "POST",
            data : {
                dir : Path,
                id : Id,
                key : Session
            },
            success : function(json){
                if(!json.dir.error){
                    Session = json.session.key;

                    CancelAllSelection();

                    let files = document.getElementById('Files');
                    files.innerHTML = '';

                    if (json.dir.list.length < 1) {
                        document.getElementById('FirstBorderLine').style.display = 'none';
                        document.getElementById('NoFile').style.display = 'flex';
                    } else {
                        document.getElementById('FirstBorderLine').style.display = 'block';
                        document.getElementById('NoFile').style.display = 'none';

                        folders = '';
    
                        for(let i = 0; i < json.dir.list.length; i++){
    
                            if (json.dir.list[i].ext === '') {
                                folders += `<div class="FileList" onmousedown="onMouseDown();" onclick="onClick();" ondblclick="RaisedblClickOnGrandParent();">
                                <div onclick="RaiseClickOnChild();" ondblclick="RaisedblClickOnParent();" class="notextover" onmousedown="RaiseMouseDownOnChild();">
                                    <img src="images/ext/${findExtImage(json.dir.list[i].ext)}" width="40" height="40" onclick="RaiseClickOnGrandChild();" ondblclick="RaisedblClickOnSibling();" onmousedown="RaiseMouseDownOnGrandChild();">
                                    <span onclick="RaiseClickOnGrandChild();" ondblclick="ondblClick();" onmousedown="RaiseMouseDownOnGrandChild();" data-ext="${json.dir.list[i].ext}">${json.dir.list[i].name}</span>
                                </div>
                            </div>
                            `
                            } else {
                                files.innerHTML += `<div class="FileList" onmousedown="onMouseDown();" onclick="onClick();" ondblclick="RaisedblClickOnGrandParent();">
                                <div onclick="RaiseClickOnChild();" ondblclick="RaisedblClickOnParent();" class="notextover" onmousedown="RaiseMouseDownOnChild();">
                                    <img src="images/ext/${findExtImage(json.dir.list[i].ext)}" width="40" height="40" onclick="RaiseClickOnGrandChild();" ondblclick="RaisedblClickOnSibling();" onmousedown="RaiseMouseDownOnGrandChild();">
                                    <span onclick="RaiseClickOnGrandChild();" ondblclick="ondblClick();" onmousedown="RaiseMouseDownOnGrandChild();" data-ext="${json.dir.list[i].ext}">${json.dir.list[i].name}</span>
                                </div>
                                <div style="flex: 1; display: inline-block; text-align: right; padding-right: 5px;" onclick="RaiseClickOnChild();" ondblclick="RaisedblClickOnParentSibling();" onmousedown="RaiseMouseDownOnChild();">
                                    <span onclick="RaiseClickOnGrandChild();" ondblclick="RaisedblClickOnParentSiblingChild();" onmousedown="RaiseMouseDownOnGrandChild();">${json.dir.list[i].size}</span>
                                </div>
                            </div>
                            `
                            }
    
                        }
    
                        files.innerHTML = (folders + files.innerHTML);
                    }

                    reloadVolume();

                    resolve();
                } else {
                    if(json.result) Session = json.session.key;

                    if (PreviousPage.empty()) {
                        reject();
                        return;
                    } 
                    Path = PreviousPage.top();
                    PreviousPage.pop();
                    document.getElementById("DirInput").value = Path;

                    
                    reloadFileList();
                    checkDisable();

                    resolve();
                }
            }
        });
    }) 
}

function reloadVolume(){
    return new Promise(function(resolve, reject){
        $.ajax({
            url : "https://raw.bcloud.kro.kr:3000/disk",
            data : {
                id : Id,
                key : Session
            },
            method : "POST",
            success : function(json){
                if (!json.disk.error) {
                    Session = json.session.key;

                    let total = (json.disk.total / 1024 / 1024 / 1024).toFixed(2);
                    let used = (total - ((json.disk.available / 1024 / 1024 / 1024).toFixed(2))).toFixed(2);
                    let percent = used / total * 100;

                    document.getElementById("Volume-Used").innerText = used;
                    document.getElementById("Volume-Total").innerText = total;

                    document.getElementById("Volume-Bar").style.width = (percent + '%');

                    if (percent > 75) {
                        document.getElementById("Volume-Bar").className = 'progress-bar progress-bar-striped progress-bar-animated bg-danger';
                    } else if (percent > 50) {
                        document.getElementById("Volume-Bar").className = 'progress-bar progress-bar-striped progress-bar-animated bg-warning';
                    } else if (percent > 25) {
                        document.getElementById("Volume-Bar").className = 'progress-bar progress-bar-striped progress-bar-animated bg-info';
                    } else {
                        document.getElementById("Volume-Bar").className = 'progress-bar progress-bar-striped progress-bar-animated bg-success';
                    }

                    resolve();
                } else {
                    if (json.result) Session = json.session.key;

                    reject();
                }
            }
        })
    })
}