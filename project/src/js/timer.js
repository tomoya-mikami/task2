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