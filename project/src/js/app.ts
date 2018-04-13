import * as g from '../modules/generator';
import * as q from '../modules/question';

var generate = () => {
    let question = new q.Question(4, ['a', 'b', 'c', 'd']);
    let field = document.getElementById("field");
    field.appendChild(g.GetQuestion(1, 'aaaaa', 'button_func()', question));
}

var button_func = () => {
    console.log("aaaaaaaaaaaaaaaaa");
}

console.log(Object.keys(Function(`return this`)()));