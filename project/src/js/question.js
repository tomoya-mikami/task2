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

    var explane_div = document.createElement('div');
    explane_div.innerHTML = `<p>${question.explanatory_text}</p>` +
                            `<p><img src="${question.explanatory_image}"></p>`;

    var answer_div = document.createElement('form');
    answer_div.name = 'answer_form';
    question.answer.forEach(element => {
        answer_div.innerHTML += `<input type="radio" name="answer" value="${element.id}">${element.text}`;
    });
    answer_div.innerHTML += '<button type="button" name="submit" onClick="check()">next question';

    parent_div.appendChild(explane_div);
    parent_div.appendChild(answer_div);

    return parent_div;
}