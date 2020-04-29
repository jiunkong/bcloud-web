function isMobileDevice() {
    let phoneArray = new Array('samsung-', 'sch-', 'shw-', 'sph-', 'sgh-', 'lg-', 'canu', 'im-', 'ev-', 'iphone', 'nokia', 'blackberry', 'lgtelecom', 'natebrowser', 'sonyericsson', 'mobile', 'android', 'ipad');
    for (i = 0; i < phoneArray.length; i++) { 
        if (navigator.userAgent.toLowerCase().indexOf(phoneArray[i]) > -1) { 
            return true;
        }
    } 
    return false;
}

function isTabletDevice() {
    if (!isMobileDevice()) { 
        return false; 
    } 
    if (navigator.userAgent.toLowerCase().indexOf('ipad') > -1 || (navigator.userAgent.toLowerCase().indexOf('android') > -1 && navigator.userAgent.toLowerCase().indexOf('mobile') == -1)) { 
        return true;
    }
    let galaxyTabModel = new Array('shw-');
    for (i = 0; i < galaxyTabModel.length; i++) {
        if (navigator.userAgent.toLowerCase().indexOf(galaxyTabModel[i]) > -1) { 
            return true;
        }
    }
    return false;
}

if (isTabletDevice()) {
    document.getElementById('media-menu').innerHTML += `<div class="input-group">
    <div class="input-group-prepend">
        <button class="input-group-text btn hm-btn" id="addon-wrapping">
            <img src="images/home.png" height="20" width="20" onclick="clickHome();">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn previous-btn" id="addon-wrapping">
            <img src="images/left-arrow.png" height="20" width="20" onclick="clickPrevious();">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn next-btn" id="addon-wrapping">
            <img src="images/right-arrow.png" height="20" width="20" onclick="clickNext();">
        </button>
    </div>
    <input type="text" class="form-control" aria-label="Dir" aria-describedby="addon-wrapping" id="DirInput">
    <div class="input-group-prepend">
        <button class="input-group-text btn" id="addon-wrapping" onclick="clickCheck();">
            <img src="images/check.png" height="20" width="20">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn up-btn" id="addon-wrapping">
            <img src="images/up-arrow.png" height="20" width="20" onclick="clickUp();">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn" id="addon-wrapping">
            <img src="images/reload.png" height="20" width="20" onclick="clickReload();">
        </button>
    </div>
    <div class="dropdown input-group-prepend">
        <button class="btn input-group-text" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="images/plus.png" height="20" width="20">
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" onclick="openCreateFolderModal();">새 폴더</a>
            <a class="dropdown-item" onclick="RaiseFileInputClick();">파일 업로드</a>
        </div>
    </div>
    <div class="dropdown input-group-prepend">
        <button class="btn input-group-text" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="checkMenuDisable();">
            <img src="images/menu.png" height="20" width="20">
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item mobilemenu-rename" onclick="openRenameModal();">이름 바꾸기</a>
            <a class="dropdown-item mobilemenu-delete" onclick="openRemoveModal();">삭제</a>
            <a class="dropdown-item" onclick="openCreateFolderModal();">새 폴더</a>
            <a class="dropdown-item menu-cut" onclick="clickItemCut();">잘라내기</a>
            <a class="dropdown-item menu-paste" onclick="clickItemPaste();">붙여넣기</a>
            <a class="dropdown-item mobilemenu-download" onclick="clickDownload();">다운로드</a>
            <a class="dropdown-item menu-share" onclick="clickShare();">링크 공유</a>
        </div>
    </div>
</div>
`
    document.head.innerHTML += '<link rel="stylesheet" href="css/desktop.css">\n';
} else if (isMobileDevice()) {
    document.getElementById('media-menu').innerHTML += `<input type="text" class="form-control" aria-label="Dir" aria-describedby="addon-wrapping" id="DirInput">
    <div class="input-group" style="display: flex;">
        <div class="input-group-prepend">
            <button class="input-group-text btn hm-btn" id="addon-wrapping">
                <img src="images/home.png" height="20" width="20" onclick="clickHome();">
            </button>
        </div>
        <div class="input-group-prepend">
            <button class="input-group-text btn previous-btn" id="addon-wrapping">
                <img src="images/left-arrow.png" height="20" width="20" onclick="clickPrevious();">
            </button>
        </div>
        <div class="input-group-prepend">
            <button class="input-group-text btn next-btn" id="addon-wrapping">
                <img src="images/right-arrow.png" height="20" width="20" onclick="clickNext();">
            </button>
        </div>
        <div class="input-group-prepend">
            <button class="input-group-text btn" id="addon-wrapping" onclick="clickCheck();">
                <img src="images/check.png" height="20" width="20">
            </button>
        </div>
        <div class="input-group-prepend">
            <button class="input-group-text btn up-btn" id="addon-wrapping">
                <img src="images/up-arrow.png" height="20" width="20" onclick="clickUp();">
            </button>
        </div>
        <div class="input-group-prepend">
            <button class="input-group-text btn" id="addon-wrapping">
                <img src="images/reload.png" height="20" width="20" onclick="clickReload();">
            </button>
        </div>
        <div class="dropdown input-group-prepend">
            <button class="btn input-group-text" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="images/plus.png" height="20" width="20">
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" onclick="openCreateFolderModal();">새 폴더</a>
                <a class="dropdown-item" onclick="RaiseFileInputClick();">파일 업로드</a>
            </div>
        </div>
        <div class="dropdown input-group-prepend">
            <button class="btn input-group-text" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="checkMenuDisable();">
                <img src="images/menu.png" height="20" width="20">
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item mobilemenu-rename" onclick="openRenameModal();">이름 바꾸기</a>
                <a class="dropdown-item mobilemenu-delete" onclick="openRemoveModal();">삭제</a>
                <a class="dropdown-item" onclick="openCreateFolderModal();">새 폴더</a>
                <a class="dropdown-item menu-cut" onclick="clickItemCut();">잘라내기</a>
                <a class="dropdown-item menu-paste" onclick="clickItemPaste();">붙여넣기</a>
                <a class="dropdown-item mobilemenu-download" onclick="clickDownload();">다운로드</a>
                <a class="dropdown-item menu-share" onclick="clickShare();">링크 공유</a>
            </div>
        </div>
    </div>
`
    document.head.innerHTML += '<link rel="stylesheet" href="css/mobile.css">\n';
} else {
    document.getElementById('media-menu').innerHTML += `<div class="input-group">
    <div class="input-group-prepend">
        <button class="input-group-text btn hm-btn" id="addon-wrapping">
            <img src="images/home.png" height="20" width="20" onclick="clickHome();">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn previous-btn" id="addon-wrapping">
            <img src="images/left-arrow.png" height="20" width="20" onclick="clickPrevious();">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn next-btn" id="addon-wrapping">
            <img src="images/right-arrow.png" height="20" width="20" onclick="clickNext();">
        </button>
    </div>
    <input type="text" class="form-control" aria-label="Dir" aria-describedby="addon-wrapping" id="DirInput">
    <div class="input-group-prepend">
        <button class="input-group-text btn" id="addon-wrapping" onclick="clickCheck();">
            <img src="images/check.png" height="20" width="20">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn up-btn" id="addon-wrapping">
            <img src="images/up-arrow.png" height="20" width="20" onclick="clickUp();">
        </button>
    </div>
    <div class="input-group-prepend">
        <button class="input-group-text btn" id="addon-wrapping">
            <img src="images/reload.png" height="20" width="20" onclick="clickReload();">
        </button>
    </div>
    <div class="dropdown input-group-prepend">
        <button class="btn input-group-text" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="images/plus.png" height="20" width="20">
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" onclick="openCreateFolderModal();">새 폴더</a>
            <a class="dropdown-item" onclick="RaiseFileInputClick();">파일 업로드</a>
        </div>
    </div>
</div>
`
    document.head.innerHTML += '<link rel="stylesheet" href="css/desktop.css">\n';
}