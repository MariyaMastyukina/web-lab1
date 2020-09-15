document.getElementsByName('X').forEach(function (button) {
    button.addEventListener('click', function () {
        document.getElementsByName('X').forEach(function (button) {
            if (button.classList.contains('X_active')) {
                button.classList.remove('X_active');
                button.style.background = '#f3dbdf';
            }
        });
        button.classList.add('X_active');
        validate();
    });
})
document.getElementsByName('R').forEach(function (radio) {
    radio.addEventListener('click', function () {
        document.getElementsByName('R').forEach(function (radio) {
            if (radio.classList.contains('R_active')) {
                radio.classList.remove('R_active');
            }
        });
        radio.classList.add('R_active');
        validate();
    });
})
document.getElementById('submit').addEventListener('click', function send_request(e) {
    e.preventDefault();
    let params_array = validate();
    let formData = new FormData();
    if (params_array.length !== 0) {
        formData.append("X", params_array[0]);
        formData.append("Y", params_array[1]);
        formData.append("R", params_array[2]);
    }
    var request=new XMLHttpRequest();
    request.open('POST','handler.php',true);
    request.addEventListener('readystatechange', function() {
        if ((request.readyState===4) && (request.status===200)) {
            document.getElementById('table1').insertAdjacentHTML('beforeend', request.responseText);
        }
    })
    request.send(formData);
});

function validate() {
    let value_X = null;
    let value_R = null;
    let value_Y=null;
    let array = [];
    // валидация X
    let checkerX = false;
    let x = document.getElementsByName('X');
    for (let i = 0; i < x.length; i++) {
        if (x[i].classList.contains('X_active')) {
            x[i].style.background = '#83cca1';
            value_X = x[i].value;
            checkerX = true;
        }
    }
    // валидация Y
    let checkerY = false;
    let y = document.getElementById('y').value;
    if (y !== '') {
        try {
            if (parseFloat(y) > -5 && parseFloat(y) < 3) {
                checkerY = true;
                value_Y = parseFloat(y);
            }
        } catch (e) {
            checkerY = false;
        }
    }
    else{
        value_Y=6;
    }
    if (checkerY) {
        document.getElementById('y').style.background = '#83cca1';
    } else {
        document.getElementById('y').style.background = '#eb5757';
    }
    // валидация R
    let checkerR = false;
    let r = document.getElementsByName('R');
    r.forEach(function (radio) {
        if (radio.classList.contains('R_active')) {
            checkerR = true;
            value_R = radio.value;
        }
    })
    if (value_X===null){
        value_X=6;
    }
    if (value_R===null){
        value_R=6;
    }
    array.push(value_X);
    array.push(value_Y);
    array.push(value_R);
    if (checkerX && checkerY && checkerR) {
        let cx = 250 + 200 * value_X / value_R;
        let cy = 250 - 200 * value_Y / value_R;
        document.getElementById('submit').removeAttribute('hidden');
        document.getElementById('point').setAttribute('r', "5");
        document.getElementById('point').setAttribute('cx', String(cx));
        document.getElementById('point').setAttribute('cy', String(cy));
    } else {
        document.getElementById('submit').setAttribute('hidden', '');
    }
    return array;
}



