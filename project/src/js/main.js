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
var clear_sample = 10000;

// question length
var question_num = 50;

var user_id = 0;

function init() {
    form = document.workform;
    user_id = form._FACT1___id.value;
}

function set_start_page() {
    var workspace = document.getElementById('workspace');
    workspace.innerHTML='<div style="margin: auto;">' +
                        '<h2>ねこの品種の分別についてのタスク</h2>' +
                        '<p>左に表示されるねこの画像と同じ品種の猫の画像を答えてください</p>' +
                        '<p><img src="https://s3-ap-northeast-1.amazonaws.com/cattask/information.jpg" style="width:500px;heihgt:auto"></p>' +
                        '<p>回答を送信する際少しだけ時間がかかります</p>' +
                        `<p>問題は全部で${question_num}問です</p>` +
                        `<p>${question_num}問答えてくださった場合、正答率にかかわらずすべての方に報酬が出ます</p>`+
                        '<button type="button" name="submit" onClick="task_start()" style="height:50px;width:400px">タスクを開始する</button>' +
                        '<div id="start_wait"></div>' +
                        '</div>';
}

function task_start() {
    var node = document.getElementById("start_wait");
    node.innerHTML = "<p>タスクが始まるまでしばらくお待ちください</p>"
    $.ajax({
        url: script_make_sheet[range_random(0, 4)],
        type: 'get',
        dataType: 'jsonp',
        data:{
            'user_id' : user_id,
            'enviroment' : enviroment,
        }
    }).done((data) =>{
        console.log("sucess");
        console.log(data.sheet_id);
        console.log(data.sheet_name);
        sheet_id = data.sheet_id;
        next();
    }).fail((error) =>{
        console.log(error);
        node.innerHTML = "<p>タスクの開始に失敗しました。もう一度ボタンを押してください</p>"
    });
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
        if (question_id == 10) {
            workspace.appendChild(question_create(new Question(question_id, gold_set[1].collect_id, gold_set[1].dataset), true, 1, gold_set[1].collect_img));
        } else if(question_id == 30) {
            workspace.appendChild(question_create(new Question(question_id, gold_set[2].collect_id, gold_set[2].dataset), true, 2, gold_set[2].collect_img));
        } else {
            workspace.appendChild(question_create(new Question(question_id, collect_id, get_answer_set(collect_id))));
        }
        clearInterval(clear_pos_interval);
        clear_pos_interval = setInterval(clear_pos, clear_sample);
    } else {
        global_time = global_timer_stop();
        clearInterval(mouce_interval);
        clearInterval(clear_pos_interval);
        var workspace = document.getElementById('workspace');
        workspace.innerHTML='<p>これで作業は終了です</p>'+
                            '<p>次のページにチェック設問の回答があります</p>' +
                            '<p>ボタンを押して次のページに進んでください</p>';
        form.innerHTML += `<input type="hidden" name="answer" value="${worker_answer}">`+
                         `<input type="hidden" name="time" value="${global_time}">`+
                         `<button type='submit' name='action' value='save'>次のページに進む</button>`;
        workspace.appendChild(form);
    }
}

function check() {
    var flag = false;
    var question_answer = "";

    if ($('#answer_form [name=answer]:checked').val()) {
        question_answer = $('#answer_form [name=answer]:checked').val() + ",";
        worker_answer += question_answer;
        $('#answer_form [name=answer]:checked').prop('checked', false);
        $('#answer_form [name=answer]').prop('disabled', true);
        flag = true;
    }

    /*
    for(var i=0; i<document.answer_form.answer.length;i++){
        // i番目のラジオボタンがチェックされているかを判定
        if(document.answer_form.answer[i].checked){ 
            flag = true;
            worker_answer += document.answer_form.answer[i].value + ",";
            document.answer_form.answer[i].checked = false;
            document.answer_form.answer[i].disabled = true;
        }
    }
    */
    if (flag) {
        //mouce_pos += '[' + g_pos + ']';
        $.ajax({
            url: script_url[range_random(0, 4)],
            type: 'get',
            dataType: 'jsonp',
            data:{
                'SPREADSHEET_ID' : sheet_id,
                'SHEET_NAME' : sheet_name,
                'user_id' : user_id,
                'question_id' : question_id,
                'position' : g_pos,
                'question_answer' : question_answer
            }
        }).done((data) =>{
            //
        }).fail((error) =>{
            console.log(error);
            $('#answer_form [name=answer]').prop('disabled', false);
        });
        clear_pos();
        next();
    }
}