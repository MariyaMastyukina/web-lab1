document.getElementsByName('X').forEach(function (button) {
    button.addEventListener('click', function () {
        document.getElementsByName('X').forEach(function (button) {
            if (button.classList.contains('X_active')) {
                button.classList.remove('X_active');
                button.style.background = '#f3dbdf';
            }
        });
        button.classList.add('X_active');
        button.style.background='#83cca1';
    });
});
document.getElementsByName('R').forEach(function (radio) {
    radio.addEventListener('click', function () {
        document.getElementsByName('R').forEach(function (radio) {
            if (radio.classList.contains('R_active')) {
                radio.classList.remove('R_active');
            }
        });
        radio.classList.add('R_active');
    });
});
document.getElementById('submit').addEventListener('click', function send_request(e) {
    if (validX()&&validY()&&validR()){
        let X_value=0;
        let Y_value;
        let R_value=0;
        let x=document.getElementsByName('X');
        x.forEach(function (button) {
            if (button.classList.contains('X_active')){
                X_value=button.value;
            }
        });
        Y_value=document.getElementById('y').value;
        let r=document.getElementsByName('R');
        r.forEach(function (radio) {
            if (radio.classList.contains('R_active')){
                R_value=radio.value;
            }
        });
        let cx = 250 + 200 * X_value / R_value;
        let cy = 250 - 200 * Y_value / R_value;
        document.getElementById('point').setAttribute('r', "5");
        document.getElementById('point').setAttribute('cx', String(cx));
        document.getElementById('point').setAttribute('cy', String(cy));
        let formData = new FormData();
        formData.append("X",X_value);
        formData.append("Y", Y_value);
        formData.append("R", R_value);
        let request=new XMLHttpRequest();
        request.open('POST','handler.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState===4) && (request.status===200)) {
                document.getElementById('table1').insertAdjacentHTML('beforeend', request.responseText);
            }
        })
        request.send(formData);
    }

});
function validX() {
    let checkerX=false;
    let x = document.getElementsByName('X');
    for (let i = 0; i < x.length; i++) {
        if (x[i].classList.contains('X_active')) {
            checkerX = true;
        }
    }
    if (!checkerX){
        alert("Вы не выбрали значение для X")
    }
    return checkerX;
}
function validY() {
    let checkerY = false;
    let y = document.getElementById('y').value;
    if (y !== '' && !isNaN(y)) {
            if (parseFloat(y) > -5 && parseFloat(y) < 3) {
                checkerY = true;
            }
    }
    if (!checkerY) {
        alert("Введено неверное значение для Y");
    }
    return checkerY;
}
function colorY() {
    let checkerY = false;
    let y = document.getElementById('y').value;
    if (y !== '' && !isNaN(y)) {
        if (parseFloat(y) > -5 && parseFloat(y) < 3) {
            checkerY = true;
        }
    }
if (checkerY){
    document.getElementById('y').style.background = '#83cca1';
}
else{
    document.getElementById('y').style.background = '#eb5757';
}
}
function validR() {
    let checkerR = false;
    let r = document.getElementsByName('R');
    r.forEach(function (radio) {
        if (radio.classList.contains('R_active')) {
            checkerR = true;
        }
    });
    if (!checkerR){
        alert("Вы не выбрали значение для R");
    }
    return checkerR;
}




