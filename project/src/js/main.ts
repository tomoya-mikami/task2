/// <reference path="question.ts">
var data = [
    ['1', 'collect?', 'http://www.ramica.net/kabegami_pc/base/003.jpg', 'a:b:c:d'],
    ['2', 'collect?', 'http://www.ramica.net/kabegami_pc/img/004.jpg', 'e:f:g:h'],
    ['3', 'collect?', 'http://www.ramica.net/kabegami_pc/img/009.jpg', 'i:j:k:l']
]
var question : Qestion[];
var question_id : Number = 0;

function task_init() {
    data.forEach(element => {
        question.push(new Qestion(parseInt(element[0]), element[1], element[2], element[3]));
    });
}

function set_start_page() {
    let workspace = document.getElementById('workspace');
    workspace.innerHTML='<p>hello world</p>' + 
                        '<button type="button" name="submit" onClick="">';
}