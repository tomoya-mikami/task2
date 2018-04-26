var sheet_id = "17y41gyFPqqxLO8JFkkKyWX8wacGlKwkjGw3wEjIDQK0";
var script_url = [
    "https://script.google.com/macros/s/AKfycbyUwBWvrUW00BVXi1y-BrTDrWlhLxW49ggIOVIogt0Ur5p1tWPj/exec",
    "https://script.google.com/macros/s/AKfycbwJV-ZMMlMZVM6eBHFB4ZoEAKrazPRsQHxMJT2voE0em9uS_Xs/exec",
    "https://script.google.com/macros/s/AKfycbwOL4X8LgU_Vgckd6iTiBtcln-cGDapORLNQh6BKlM1pA1qqBI/exec",
    "https://script.google.com/macros/s/AKfycbzTVjujCn89_RnW678rzHwxwMKvPSSv8xVXlWoaP8zDubSlUK4/exec",
    "https://script.google.com/macros/s/AKfycbxOtp1coLfDhmryHyL-Xsor5aob3Lf5ZQQoqeA1OIsgA1wbg9wQ/exec"
];
var script_make_sheet = [
    "https://script.google.com/macros/s/AKfycbxinJNL4zIyreRe0BWaB1BLS0zvSP4oWBLx3ktTKTqc_8JbNGJ8/exec",
    "https://script.google.com/macros/s/AKfycbzq6zZLXYhTBa04MSA3-vjPdjsvmA6RckW8Ft_OFNqmgAILM4a2/exec",
    "https://script.google.com/macros/s/AKfycbzV6hF6HuOi4SRcZdo4z77q-oZ5NAvJ3KJdPFYGvjVN7_us9ck/exec",
    "https://script.google.com/macros/s/AKfycbxjIGXV7YK-nvz-LLgJzNQphJR0lv4vdk9fcRrlzOBxqM4fTF7Y/exec",
    "https://script.google.com/macros/s/AKfycbzXdSj55PJxLxegY3K0wlHRJQEQ8XnhT1ZoEyJgX87J6QneMc0/exec"
];
var sheet_name = "シート1";
var enviroment = "production";
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
        while(array.indexOf(tmp) >= 0) {
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
var clear_sample = 10000;

// question length
var question_num = 10;

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
        workspace.appendChild(question_create(new Question(question_id, collect_id, get_answer_set(collect_id))));
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

    if ($('#answer_form [name=answer]:checked').val()) {
        worker_answer += $('#answer_form [name=answer]:checked').val() + ",";
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
                'position' : g_pos
            }
        }).done((data) =>{
            clear_pos();
            next();
        }).fail((error) =>{
            console.log(error);
            $('#answer_form [name=answer]').prop('disabled', false);
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
    answer_form.id = 'answer_form';
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