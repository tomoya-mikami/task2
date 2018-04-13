import * as q from 'question';

const question_part = (id: number, name: string) => {
    let node = document.createElement("div");
    node.id = id.toString();
    node.className="a b c";
    node.innerHTML = `<img src=${name}>`+
                    `<input type="radio" name="anser" value="${id}">`;
    
    return node
}

export const GetQuestion = (question_id: number, name: string, clickfunc: string, quesiton: q.Question) => {
    // 親の作成
    const node = document.createElement("div");
    node.id = question_id.toString();

    const question_div = document.createElement("div");
    question_div.className = "question";
    question_div.innerHTML = "ここに問題が入ります";
    let id : number = 0;
    quesiton.filename.forEach(element => {
        question_div.appendChild(question_part(id, element));
        id++;
    });

    return node;
}