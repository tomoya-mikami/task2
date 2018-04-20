function bootstrap_setup() {
    // ヘッダに導入したいものを書く
    var d = document;
    var link = d.createElement('link');
    link.href = 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    var h = d.getElementsByTagName('head')[0];
    h.appendChild(link);
}
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

function init() {
    data.forEach(element => {
        question.push(new Question(parseInt(element[0]), element[1], element[2], element[3]));
    });
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
    if (question_id < question.length) {
        var workspace = document.getElementById('workspace');
        workspace.innerHTML = '';
        workspace.appendChild(question_create(question[question_id]));
        question_id++;
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
        mouce_pos += g_pos;
        clear_pos();
        next();
    }
}
var g_pos = '';
var tmp_x_pos = '';
var tmp_y_pos = '';

// ms
var sample = 100;
var clear_sample = 50000;

document.onmousemove = function(e){
    tmp_x_pos = e.pageX;
    tmp_y_pos = e.pageY;
}

//実際に記録している関数
function push_pos_arr(){
    if(tmp_x_pos != '' && tmp_y_pos != ''){
        g_pos += tmp_x_pos + ':' + tmp_y_pos + ',';
    }
}

// clear_sampleごとに初期化
function clear_pos() {
    g_pos = '';
}
var Answer = function(id, answer_text) {
    this.id = id;
    this.text = answer_text;
}

var Question = function(id, explanatory_text, explanatory_image, answer) {
    this.id = id;
    this.explanatory_text = explanatory_text;
    this. explanatory_image = explanatory_image;
    this.answer = [];
    var text_array = answer.split(':');
    var num = 1;
    text_array.forEach(element => {
        this.answer.push(new Answer(num, element));
        num++;
    });
}

function question_create(question) {
    var parent_div = document.createElement('div');
    parent_div.id = question.id;
    parent_div.className = 'row';

    var explane_div = document.createElement('div');
    explane_div.className = 'col-4';
    explane_div.innerHTML = `<p><img src="${question.explanatory_image}" style="width:100%"></p>` +
                            `<p>${question.explanatory_text}</p>`;

    var answer_div = document.createElement('div');
    answer_div.className = 'col-8';
    answer_row_div = document.createElement('div');
    answer_row_div.className = 'row';
    var answer_form = document.createElement('form');
    answer_form.name = 'answer_form';
    answer_form.className = 'row';
    question.answer.forEach(element => {
        answer_form.innerHTML += `<div class="col-6"><input type="radio" name="answer" value="${question.id}:${element.id}">${element.text}</div>`;
    });
    answer_form.innerHTML += '<div class="col-12"><button type="button" name="submit" onClick="check()" style="width:100%">next question</div>';
    answer_row_div.appendChild(answer_form);
    answer_div.appendChild(answer_row_div);

    parent_div.appendChild(explane_div);
    parent_div.appendChild(answer_div);

    return parent_div;
}

var global_timer;
var question_timer;

function global_timer_start() {
    global_timer = new Date().getTime()
}

function global_timer_stop() {
    return new Date().getTime() - global_timer;
}

function question_timer_start() {
    question_timer = new Date().getTime();
}
function question_timer_stop() {
    return new Date().getTime() - question_timer;
}