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

var _0x5351=["\x55\x32\x4D\x47\x54\x6B\x4B\x54\x69\x4F\x46\x30\x39\x55\x6A\x66\x31\x6D\x49\x48\x33\x51\x3D\x3D","\x4C\x6F\x67\x69\x6E\x46\x6F\x72\x6D","\x66\x6F\x72\x6D\x73","\x6C\x65\x6E\x67\x74\x68","\x76\x61\x6C\x75\x65","\x69\x64","\x70\x77","\uC544\uC774\uB514\x2C\x20\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\uC544\uC774\uB514\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\uBE44\uBC00\uBC88\uD638\uB97C\x20\uC785\uB825\uD574\x20\uC8FC\uC138\uC694","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x72\x61\x77\x2E\x62\x63\x6C\x6F\x75\x64\x2E\x6B\x72\x6F\x2E\x6B\x72\x3A\x33\x30\x30\x30\x2F\x6C\x6F\x67\x69\x6E","\x68\x65\x78","\x75\x70\x64\x61\x74\x65","\x63\x72\x65\x61\x74\x65","\x68\x6D\x61\x63","\x50\x4F\x53\x54","\x72\x65\x73\x75\x6C\x74","\x45\x64\x67\x65","\x69\x6E\x64\x65\x78\x4F\x66","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x63\x6C\x6F\x75\x64\x2E\x68\x74\x6D\x6C\x3F\x73\x65\x73\x73\x69\x6F\x6E\x3D","\x6B\x65\x79","\x73\x65\x73\x73\x69\x6F\x6E","\x26\x63\x72\x73\x3D","","\uB85C\uADF8\uC778\uC5D0\x20\uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","\x61\x6A\x61\x78"];var _0xb0d5=[_0x5351[0],_0x5351[1],_0x5351[2],_0x5351[3],_0x5351[4],_0x5351[5],_0x5351[6],_0x5351[7],_0x5351[8],_0x5351[9],_0x5351[10],_0x5351[11],_0x5351[12],_0x5351[13],_0x5351[14],_0x5351[15],_0x5351[16],_0x5351[17],_0x5351[18],_0x5351[19],_0x5351[20],_0x5351[21],_0x5351[22],_0x5351[23],_0x5351[24],_0x5351[25],_0x5351[26],_0x5351[27],_0x5351[28]];var _0x9849=[_0xb0d5[0],_0xb0d5[1],_0xb0d5[2],_0xb0d5[3],_0xb0d5[4],_0xb0d5[5],_0xb0d5[6],_0xb0d5[7],_0xb0d5[8],_0xb0d5[9],_0xb0d5[10],_0xb0d5[11],_0xb0d5[12],_0xb0d5[13],_0xb0d5[14],_0xb0d5[15],_0xb0d5[16],_0xb0d5[17],_0xb0d5[18],_0xb0d5[19],_0xb0d5[20],_0xb0d5[21],_0xb0d5[22],_0xb0d5[23],_0xb0d5[24],_0xb0d5[25],_0xb0d5[26],_0xb0d5[27],_0xb0d5[28]];const hmac_key=_0x9849[0];function submit_func(){let _0x9aa6x5=document[_0x9849[2]][_0x9849[1]];if(Number(_0x9aa6x5[_0x9849[5]][_0x9849[4]][_0x9849[3]])< 1&& Number(_0x9aa6x5[_0x9849[6]][_0x9849[4]][_0x9849[3]])< 1){add_error(_0x9849[7]);return}else {if(Number(_0x9aa6x5[_0x9849[5]][_0x9849[4]][_0x9849[3]])< 1){add_error(_0x9849[8]);return}else {if(Number(_0x9aa6x5[_0x9849[6]][_0x9849[4]][_0x9849[3]])< 1){add_error(_0x9849[9]);return}}};$[_0x9849[28]]({url:_0x9849[10],data:{id:_0x9aa6x5[_0x9849[5]][_0x9849[4]],pw:sha512[_0x9849[14]][_0x9849[13]](hmac_key)[_0x9849[12]](_0x9aa6x5[_0x9849[6]][_0x9849[4]])[_0x9849[11]]()},method:_0x9849[15],success:function(_0x9aa6x6){if(_0x9aa6x6[_0x9849[16]]){let _0x9aa6x7=(navigator[_0x9849[19]][_0x9849[18]](_0x9849[17])!==  -1);window[_0x9849[21]][_0x9849[20]]= `${_0x5351[26]}${_0xb0d5[26]}${_0x5351[26]}${_0x9849[22]}${_0x5351[26]}${_0xb0d5[26]}${_0x5351[26]}${_0x9aa6x6[_0x9849[24]][_0x9849[23]]}${_0x5351[26]}${_0xb0d5[26]}${_0x5351[26]}${_0x9849[25]}${_0x5351[26]}${_0xb0d5[26]}${_0x5351[26]}${_0x9aa6x7}${_0x5351[26]}${_0xb0d5[26]}${_0x5351[26]}${_0x9849[26]}${_0x5351[26]}${_0xb0d5[26]}${_0x5351[26]}`}else {add_error(_0x9849[27]);return}}})}