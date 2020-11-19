function init_background(){
    const images = ['images/background1.jpg', 'images/background2.jpg'];
    document.body.style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
}

function init_error(){
    document.getElementById('ErrCheck').style.display = 'block';
    document.getElementById('ErrEmpty').style.display = 'block';
}

function add_error(message){
    document.getElementById("ErrorDiv").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
</div>`;
}

var _0x1c47=["\x55\x32\x4D\x47\x54\x6B\x4B\x54\x69\x4F\x46\x30\x39\x55\x6A\x66\x31\x6D\x49\x48\x33\x51\x3D\x3D","\x4C\x6F\x67\x69\x6E\x46\x6F\x72\x6D","\x66\x6F\x72\x6D\x73","\x6C\x65\x6E\x67\x74\x68","\x76\x61\x6C\x75\x65","\x69\x64","\x70\x77","\uC544\uC774\uB514\x2C\x20\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\uC544\uC774\uB514\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x72\x61\x77\x2E\x63\x6C\x6F\x75\x64\x2E\x62\x75\x6B\x67\x65\x75\x6B\x2E\x64\x65\x76\x3A\x33\x30\x30\x30\x2F\x6C\x6F\x67\x69\x6E","\x68\x65\x78","\x75\x70\x64\x61\x74\x65","\x63\x72\x65\x61\x74\x65","\x68\x6D\x61\x63","\x50\x4F\x53\x54","\x72\x65\x73\x75\x6C\x74","\x45\x64\x67\x65","\x69\x6E\x64\x65\x78\x4F\x66","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x63\x6C\x6F\x75\x64\x2E\x68\x74\x6D\x6C\x3F\x73\x65\x73\x73\x69\x6F\x6E\x3D","\x6B\x65\x79","\x73\x65\x73\x73\x69\x6F\x6E","\x26\x63\x72\x73\x3D","","\uB85C\uADF8\uC778\uC5D0\x20\uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","\x61\x6A\x61\x78"];var _0x3acf=[_0x1c47[0],_0x1c47[1],_0x1c47[2],_0x1c47[3],_0x1c47[4],_0x1c47[5],_0x1c47[6],_0x1c47[7],_0x1c47[8],_0x1c47[9],_0x1c47[10],_0x1c47[11],_0x1c47[12],_0x1c47[13],_0x1c47[14],_0x1c47[15],_0x1c47[16],_0x1c47[17],_0x1c47[18],_0x1c47[19],_0x1c47[20],_0x1c47[21],_0x1c47[22],_0x1c47[23],_0x1c47[24],_0x1c47[25],_0x1c47[26],_0x1c47[27],_0x1c47[28]];var _0x11ca=[_0x3acf[0],_0x3acf[1],_0x3acf[2],_0x3acf[3],_0x3acf[4],_0x3acf[5],_0x3acf[6],_0x3acf[7],_0x3acf[8],_0x3acf[9],_0x3acf[10],_0x3acf[11],_0x3acf[12],_0x3acf[13],_0x3acf[14],_0x3acf[15],_0x3acf[16],_0x3acf[17],_0x3acf[18],_0x3acf[19],_0x3acf[20],_0x3acf[21],_0x3acf[22],_0x3acf[23],_0x3acf[24],_0x3acf[25],_0x3acf[26],_0x3acf[27],_0x3acf[28]];const hmac_key=_0x11ca[0];function submit_func(){let _0xf2a0x5=document[_0x11ca[2]][_0x11ca[1]];if(Number(_0xf2a0x5[_0x11ca[5]][_0x11ca[4]][_0x11ca[3]])< 1&& Number(_0xf2a0x5[_0x11ca[6]][_0x11ca[4]][_0x11ca[3]])< 1){add_error(_0x11ca[7]);return}else {if(Number(_0xf2a0x5[_0x11ca[5]][_0x11ca[4]][_0x11ca[3]])< 1){add_error(_0x11ca[8]);return}else {if(Number(_0xf2a0x5[_0x11ca[6]][_0x11ca[4]][_0x11ca[3]])< 1){add_error(_0x11ca[9]);return}}};$[_0x11ca[28]]({url:_0x11ca[10],data:{id:_0xf2a0x5[_0x11ca[5]][_0x11ca[4]],pw:sha512[_0x11ca[14]][_0x11ca[13]](hmac_key)[_0x11ca[12]](_0xf2a0x5[_0x11ca[6]][_0x11ca[4]])[_0x11ca[11]]()},method:_0x11ca[15],success:function(_0xf2a0x6){if(_0xf2a0x6[_0x11ca[16]]){let _0xf2a0x7=(navigator[_0x11ca[19]][_0x11ca[18]](_0x11ca[17])!==  -1);window[_0x11ca[21]][_0x11ca[20]]= `${_0x1c47[26]}${_0x3acf[26]}${_0x1c47[26]}${_0x11ca[22]}${_0x1c47[26]}${_0x3acf[26]}${_0x1c47[26]}${_0xf2a0x6[_0x11ca[24]][_0x11ca[23]]}${_0x1c47[26]}${_0x3acf[26]}${_0x1c47[26]}${_0x11ca[25]}${_0x1c47[26]}${_0x3acf[26]}${_0x1c47[26]}${_0xf2a0x7}${_0x1c47[26]}${_0x3acf[26]}${_0x1c47[26]}${_0x11ca[26]}${_0x1c47[26]}${_0x3acf[26]}${_0x1c47[26]}`}else {add_error(_0x11ca[27]);return}}})}