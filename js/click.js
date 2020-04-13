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

    reloadFileList().then(() => showLoading(false));
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

    reloadFileList().then(() => showLoading(false));
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

    reloadFileList().then(() => showLoading(false));
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

    reloadFileList().then(() => showLoading(false));
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

    reloadFileList().then(() => showLoading(false));
    checkDisable();
}

function clickReload(){
    showLoading(true);
    reloadFileList().then(() => showLoading(false));
}

