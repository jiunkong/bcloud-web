function findExtImage(ext) {
    if(ext.length < 1) return 'folder.png'
    else ext = ext.substr(1);

    switch(ext) {
        case '7z':
        case 'avi':
        case 'bmp':
        case 'css':
        case 'exe':
        case 'gif':
        case 'html':
        case 'hwp':
        case 'iso':
        case 'jar':
        case 'jpeg':
        case 'jpg':
        case 'js':
        case 'json':
        case 'md':
        case 'mp3':
        case 'mp4':
        case 'msi':
        case 'pdf':
        case 'png':
        case 'psd':
        case 'rar':
        case 'tar':
        case 'txt':
        case 'wav':
        case 'zip':
            return (ext + '.png');
        case 'htm':
            return 'html.png';
        case 'ppt':
        case 'pptm':
        case 'pptx':
            return 'powerpoint.png';
        case 'docx':
        case 'docm':
        case 'doc':
        case 'dotx':
        case 'dotm':
        case 'dot':
            return 'word.png';
        case 'xlsx':
        case 'xlsm':
        case 'xlsb':
        case 'xls':
            return 'excel.png';
        default:
            return 'unknown.png'
    }
}