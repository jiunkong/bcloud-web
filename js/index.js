function init_background(){
    const images = ['images/background1.jpg', 'images/background2.jpg'];
    document.body.style.backgroundImage = 'url(' + images[Math.floor(Math.random() * images.length)] + ')';
}

function init_error(){
    document.getElementById('ErrCheck').style.display = 'block';
    document.getElementById('ErrEmpty').style.display = 'block';
}

function submit_func(){
    let Form = document.forms['LoginForm'];

    let xhr = new XMLHttpRequest();
    let data = {
        "id" : Form['id'].value,
        "pw" : Form['pw'].value
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200 || xhr.status === 201) {
                console.log(xhr.responseText);
            } else {
                console.error(xhr.responseText);
            }
        }
    };
    xhr.open('POST', 'http://bcloudapi.kro.kr/login');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(data));

    if (Form['id'].value.length < 1 || Form['pw'].value.length < 1) {
        window.location.href = '/login?fail=2';
    }

    document.getElementById('InputPassword').value = sha512(Form['pw'].value);
}