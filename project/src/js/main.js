// question
var data = [
    ['1', 'collect?', 'http://www.ramica.net/kabegami_pc/base/003.jpg', 'a:b:c:d'],
    ['2', 'collect?', 'http://www.ramica.net/kabegami_pc/img/004.jpg', 'e:f:g:h'],
    ['3', 'collect?', 'http://www.ramica.net/kabegami_pc/img/009.jpg', 'i:j:k:l']
]
var question = [];
var question_id = 0;
var worker_answer = '';
var mouce_pos = '';
var global_time = '';

var mouce_interval;
var clear_pos_interval;

var form;

// timer
var global_timer;
var question_timer;

// mouce position
var g_pos = '';
var tmp_x_pos = '';
var tmp_y_pos = '';

// ms
var sample = 100;
var clear_sample = 50000;

// question length
var question_num = 10;

// form_id
var dev_sheet = "1lztYdke02nRehrtNDefbopVD35UqzBYBkZFrgo6GcVc";
var staging_sheet = "17y41gyFPqqxLO8JFkkKyWX8wacGlKwkjGw3wEjIDQK0";
var script_url = "https://script.google.com/macros/s/AKfycbyUwBWvrUW00BVXi1y-BrTDrWlhLxW49ggIOVIogt0Ur5p1tWPj/exec";
var sheet_name = "mouce";

var user_id = 0;

function init() {
    /*
    data.forEach(element => {
        question.push(new Question(parseInt(element[0]), element[1], element[2], element[3]));
    });*/
    form = document.workform;
}

function set_start_page() {
    var workspace = document.getElementById('workspace');
    workspace.innerHTML='<p>hello world</p>' + 
                        '<button type="button" name="submit" onClick="next()">taskが始まるよ</button>';
}

function next() {
    if (question_id == 0) {
        global_timer_start();
        mouce_interval = setInterval(push_pos_arr, sample);
        clear_pos_interval = setInterval(clear_pos, clear_sample);
    }
    if (question_id < question_num) {
        var workspace = document.getElementById('workspace');
        var collect_id = range_random(1, 12);
        workspace.innerHTML = '';
        question_id++;
        workspace.appendChild(question_create(new Question(question_id, collect_id, get_answer_set(collect_id))));
        clearInterval(clear_pos_interval);
        clear_pos_interval = setInterval(clear_pos, clear_sample);
    } else {
        global_time = global_timer_stop();
        clearInterval(mouce_interval);
        clearInterval(clear_pos_interval);
        var workspace = document.getElementById('workspace');
        workspace.innerHTML='<p>thank you!!</p>';
        form.innerHTML += `<input type="hidden" name="answer" value="${worker_answer}">`+
                         `<input type="hidden" name="mouce" value="${mouce_pos}">`+
                         `<input type="hidden" name="time" value="${global_time}">`+
                         `<button type='submit' name='action' value='save'>submit</button>`;
        workspace.appendChild(form);
    }
}

function check() {
    var flag = false;
    for(var i=0; i<document.answer_form.answer.length;i++){
        // i番目のラジオボタンがチェックされているかを判定
        if(document.answer_form.answer[i].checked){ 
            flag = true;
            worker_answer += document.answer_form.answer[i].value + ",";
        }
    }
    if (flag) {
        //mouce_pos += '[' + g_pos + ']';
        $.ajax({
            url: script_url,
            type: 'get',
            dataType: 'jsonp',
            data:{
                'SPREADSHEET_ID' : dev_sheet,
                'SHEET_NAME' : sheet_name,
                'user_id' : user_id,
                'position' : g_pos
            }
        }).done((data) =>{
            clear_pos();
            next();
        });
    }
}