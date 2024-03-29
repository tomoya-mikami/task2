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

function question_create(question, gold_flag=false, gold_set_id = 0, collect_img = 0) {
    var parent_div = document.createElement('div');
    parent_div.id = question.id;
    parent_div.className = 'row';

    var explane_div = document.createElement('div');
    explane_div.className = 'col-4';
    if ( ! gold_flag) {
        explane_div.innerHTML = `<p style="font-size:4rem">${get_img_tag(question.collect_breed_id)}</p>` +
        `<p style="font-size:2rem">${question.explanatory_text}  ${question_id} / ${question_num}</p>`;
    } else {
        explane_div.innerHTML = `<p style="font-size:4rem">${get_gold_set_img_tag(question.collect_breed_id, collect_img)}</p>` +
        `<p style="font-size:2rem">${question.explanatory_text}  ${question_id} / ${question_num}</p>`;
    }

    var answer_div = document.createElement('div');
    answer_div.className = 'col-8';
    answer_row_div = document.createElement('div');
    answer_row_div.className = 'row';
    var answer_form = document.createElement('form');
    answer_form.id = 'answer_form';
    answer_form.name = 'answer_form';
    answer_form.className = 'row';
    if ( ! gold_flag) {
        question.answer.forEach(element => {
            answer_form.innerHTML += `<div class="col-6" style="height:300px;position:relative">` +
                                    `<p>${get_img_tag(element.breed_id)}</p>` +
                                    `<div style="position:absolute;bottom:0;"><p style="font-size:2rem"><input type="radio" style="transform:scale(2.0);" name="answer" value="${question.id}:${element.breed_id}:${question.collect_breed_id}">   ${element.text}<p></div>`+
                                    `</div>`;
        });
    } else {
        var gold_set_num = 0;
        gold_set[gold_set_id].dataset.forEach(element => {
            answer_form.innerHTML += `<div class="col-6" style="height:300px;position:relative">` +
            `<p>${get_gold_set_img_tag(element, gold_set[gold_set_id].img_id[gold_set_num])}</p>` +
            `<div style="position:absolute;bottom:0;"><p style="font-size:2rem"><input type="radio" style="transform:scale(2.0);" name="answer" value="${question.id}:${element}:${gold_set[gold_set_id].collect_id}">   ${dataset[element]}<p></div>`+
            `</div>`;
            gold_set_num ++;
        });
    }
    answer_form.innerHTML += '<div class="col-12"><button type="button" name="submit" onClick="check()" style="width:100%;height:2rem">next question</div>';
    answer_row_div.appendChild(answer_form);
    answer_div.appendChild(answer_row_div);

    parent_div.appendChild(explane_div);
    parent_div.appendChild(answer_div);

    return parent_div;
}