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

function submit_func(){
    let Form = document.forms['LoginForm'];

    if (Number(Form['id'].value.length) < 1 && Number(Form['pw'].value.length) < 1) {
        add_error('아이디, 비밀번호를 입력해 주세요');
        return;
    } else if (Number(Form['id'].value.length) < 1) {
        add_error('아이디를 입력해 주세요');
        return;
    } else if (Number(Form['pw'].value.length) < 1) {
        add_error('비밀번호를 입력해 주세요');
        return;
    }

    $.ajax({
        url : "http://bcloudapi.kro.kr:3000/login",
        data : {
            id : Form['id'].value,
            pw : sha512(Form['pw'].value)
        },
        method : "POST",
        success : function(json){

            if(json.result){

                window.location.href = 'cloud.html?session=' + json.session.key;

            } else {
                add_error('로그인에 실패했습니다');
                return;
            }
        }
    })
}