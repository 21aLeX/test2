let formData;
let str;
let i = 0;
let div;
let elem;
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
let name;
let email;
let comment;

//для формирования уже существующих карточек из бд
async function go(){
    formData = new FormData();
    formData.append('go','go');
    await fetch('dir.php', { method: 'POST', body: formData })
    .then(function (response) {
        return response.text();
    })
    .then(function (body) {
        i = +body;
    });
    if(i!=0){
        for(j=1; j<=i;j++){
            formData = new FormData();
            formData.append('tu',j);
            await fetch('dir.php', { method: 'POST', body: formData })
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                str = body.split('`');
                create(j,str[0],str[1],str[2]);
            });
        }
    }
};

//для создания карточки
function create(id,name, email, comment){
    elem = document.getElementById("row");
    if(!(id%2)){
        div = document.createElement('div');
        div.className = ('col-12 col-sm-6 col-lg-4 col-xxl-4');
        div.innerHTML = '<table><tr><td class="name">'+name+'</td></tr><tr><td class="email">'+email+'</td></tr><tr><td class="message">'+comment+'</td></tr></table>';
    }
    else{
        div = document.createElement('div');
        div.className = ('col-12 col-sm-6 col-lg-4 col-xxl-4');
        div.innerHTML = '<table><tr><td class="name1">'+name+'</td></tr><tr><td class="email1">'+email+'</td></tr><tr><td class="message1">'+comment+'</td></tr></table>';
    }
    elem.append(div);
};

//для добавления карточки
async function sentData() {
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    comment = document.getElementById('comment').value;


    if (name == '' || email=='' || comment ==''){
        alert('Заполните обязательные поля *');
        return false;
    }
    if(!EMAIL_REGEXP.test(email)) {
        alert('Проверьте правильность заполнения email*');
        return false;
    }
    else{
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("comment").value = "";
        formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('comment', comment);
        await fetch('dir.php', { method: 'POST', body: formData })
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            i = i+1;
            str = body.split('`');
            create(i,str[0],str[1],str[2]);
        });
        }
};