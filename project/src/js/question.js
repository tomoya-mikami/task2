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
    parent_div.className = 'col-12';

    var explane_div = document.createElement('div');
    explane_div.className = 'col-4';
    explane_div.innerHTML = `<p>${question.explanatory_text}</p>` +
                            `<p><img src="${question.explanatory_image}"></p>`;

    var answer_div = document.createElement('div');
    answer_div.className = 'col-8';
    var answer_form = document.createElement('form');
    answer_form.name = 'answer_form';
    question.answer.forEach(element => {
        answer_form.innerHTML += `<input type="radio" name="answer" class="col-4" value="${element.id}">${element.text}`;
    });
    answer_form.innerHTML += '<button type="button" name="submit" class="col-8" onClick="check()">next question';
    answer_div.appendChild(answer_form);

    parent_div.appendChild(explane_div);
    parent_div.appendChild(answer_div);

    return parent_div;
}