var data_url = "http://www.robots.ox.ac.uk/~vgg/data/pets/data/images/"

var dataset = {
    1 : "Abyssinian",
    2 : "Bengal",
    3 : "Birman",
    4 : "Bombay",
    5 : "British_Shorthair",
    6 : "Egyptian_Mau",
    7 : "Maine_Coon",
    8 : "Persian",
    9 : "Ragdoll",
    10 : "Russian_Blue",
    11 : "Siamese",
    12 : "Sphynx"
}

var error_dataset = {
    1 : 2,
    2 : 197,
    3 : 166,
    4 : 220,
    5 : 204,
    6 : 104,
    7 : 219,
    8 : 202,
    9 : 202,
    10 : 212,
    11 : 208,
    12 : 142
}

function range_random(min, max) {
    return Math.floor( Math.random() * (max + 1 - min) ) + min ;
}

function image_link_set (num, image_num) {
    return `${data_url}${dataset[num]}_${image_num}.jpg`;
}

function get_img_tag(i) {
    return `<img src="${image_link_set(i, range_random(1, 100))}" onerror="this.src='${image_link_set(i, error_dataset[i])}';" style="max-height:240px;max-width:300px">`;
}

function get_answer_set(collect_id) {
    var tmp = collect_id;
    var array = [];
    array.push(collect_id);
    for (var i = 0; i<3; i++) {
        while(tmp == collect_id) {
            tmp = range_random(1, 12);
        }
        array.push(tmp);
        tmp = collect_id;
    }
    return arr_shuffle(array);
}

function arr_shuffle(array) {
    var n = array.length, t, i;
  
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function neko_test(){
    var node = document.getElementById("neko");
    for (var i=1; i<13; i++) {
        node.innerHTML += get_img_tag(i);
    }
}
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
var Answer = function(id, answer_text, breed_id) {
    this.id = id;
    this.text = answer_text;
    this.breed_id = breed_id;
}

var Question = function(id, collect_breed_id, answer_breed_array) {
    this.id = id;
    this.explanatory_text = '同じ血統種の猫を選択してください';
    this.collect_breed_id = collect_breed_id;
    this.answer = [];
    var num = 1;
    answer_breed_array.forEach(element => {
        this.answer.push(new Answer(num, dataset[element], element));
        num++;
    });
}

function question_create(question) {
    var parent_div = document.createElement('div');
    parent_div.id = question.id;
    parent_div.className = 'row';

    var explane_div = document.createElement('div');
    explane_div.className = 'col-4';
    explane_div.innerHTML = `<p style="font-size:4rem">${get_img_tag(question.collect_breed_id)}</p>` +
                            `<p>${question.explanatory_text}</p>`;

    var answer_div = document.createElement('div');
    answer_div.className = 'col-8';
    answer_row_div = document.createElement('div');
    answer_row_div.className = 'row';
    var answer_form = document.createElement('form');
    answer_form.name = 'answer_form';
    answer_form.className = 'row';
    question.answer.forEach(element => {
        answer_form.innerHTML += `<div class="col-6" style="height:300px;position:relative">` +
                                `<p>${get_img_tag(element.breed_id)}</p>` +
                                `<div style="position:absolute;bottom:0;"><p style="font-size:2rem"><input type="radio" style="transform:scale(2.0);" name="answer" value="${question.id}:${element.breed_id}:${question.collect_breed_id}">   ${element.text}<p></div>`+
                                `</div>`;
    });
    answer_form.innerHTML += '<div class="col-12"><button type="button" name="submit" onClick="check()" style="width:100%;height:2rem">next question</div>';
    answer_row_div.appendChild(answer_form);
    answer_div.appendChild(answer_row_div);

    parent_div.appendChild(explane_div);
    parent_div.appendChild(answer_div);

    return parent_div;
}
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
bootstrap_setup();
init();
set_start_page();
// neko_test();