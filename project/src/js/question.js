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