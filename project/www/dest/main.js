var data = [
    ['1', 'collect?', 'http://www.ramica.net/kabegami_pc/base/003.jpg', 'a:b:c:d'],
    ['2', 'collect?', 'http://www.ramica.net/kabegami_pc/img/004.jpg', 'e:f:g:h'],
    ['3', 'collect?', 'http://www.ramica.net/kabegami_pc/img/009.jpg', 'i:j:k:l']
];
var question;
var question_id = 0;
function task_init() {
    data.forEach(function (element) {
        question.push(new task_question.Qestion(parseInt(element[0]), element[1], element[2], element[3]));
    });
}
function set_start_page() {
    var workspace = document.getElementById('workspace');
    workspace.innerHTML = '<p>hello world</p>' +
        '<button type="button" name="submit" onClick="">';
}
var task_question;
(function (task_question) {
    var Answer = /** @class */ (function () {
        function Answer(id, text) {
            this.id = id;
            this.answer_text = text;
        }
        return Answer;
    }());
    var Qestion = /** @class */ (function () {
        function Qestion(id, explanatory_text, explanatory_image, answer) {
            var _this = this;
            this.id = id;
            this.explanatory_text = explanatory_text;
            this.explanatory_image = explanatory_image;
            var text_array = answer.split(':');
            var num = 1;
            text_array.forEach(function (element) {
                _this.answer.push(new Answer(num, element));
                num++;
            });
        }
        /**
         * divcreate
         */
        Qestion.prototype.divcreate = function (style) {
            var parent_div = document.createElement('div');
            parent_div.id = this.id.toString();
            var explane_div = document.createElement('div');
            explane_div.innerHTML = "<p>" + this.explanatory_text + "</p>" +
                ("<p><img src=\"" + this.explanatory_image + "\"></p>");
            var answer_div = document.createElement('div');
            answer_div.innerHTML = '<p>';
            this.answer.forEach(function (element) {
                answer_div.innerHTML += "<input type=\"radio\" name=\"anser\" value=\"" + element.id + "\">" + element.answer_text;
            });
            answer_div.innerHTML += '</p>';
            answer_div.innerHTML += '<button type="button" name="submit" onClick="">';
            parent_div.appendChild(explane_div);
            parent_div.appendChild(answer_div);
            return parent_div;
        };
        return Qestion;
    }());
    task_question.Qestion = Qestion;
})(task_question || (task_question = {}));
var stopwatch;
(function (stopwatch) {
    var Program_Timer = /** @class */ (function () {
        function Program_Timer() {
        }
        /**
         * timer_start
         */
        Program_Timer.prototype.timer_start = function () {
            this.timer = new Date().getTime();
        };
        /**
         * timer_stop
         */
        Program_Timer.prototype.timer_stop = function () {
            return new Date().getTime() - this.timer;
        };
        return Program_Timer;
    }());
    stopwatch.Program_Timer = Program_Timer;
})(stopwatch || (stopwatch = {}));
