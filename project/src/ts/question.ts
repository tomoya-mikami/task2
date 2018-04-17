export namespace task_question {

    class Answer {
        public id : Number;
        public answer_text : string;
    
        constructor(id : Number, text :string) {
            this.id = id;
            this.answer_text = text;
        }
    }

    export class Qestion {
    
        private id : Number;
        private explanatory_text : string;
        private explanatory_image : string;
        private answer: Answer[];
    
        constructor(id : Number, explanatory_text : string, explanatory_image : string, answer : string) {
            this.id = id;
            this.explanatory_text = explanatory_text;
            this.explanatory_image = explanatory_image;
            const text_array = answer.split(':');
            let num = 1;
            text_array.forEach(element => {
                this.answer.push(new Answer(num, element));
                num++;
            });
        }
    
        /**
         * divcreate
         */
        public divcreate(style : string) {
            let parent_div = document.createElement('div');
            parent_div.id = this.id.toString();
    
            let explane_div = document.createElement('div');
            explane_div.innerHTML = `<p>${this.explanatory_text}</p>` +
                                    `<p><img src="${this.explanatory_image}"></p>`;
    
            let answer_div = document.createElement('div');
            answer_div.innerHTML = '<p>'
            this.answer.forEach(element => {
                answer_div.innerHTML += `<input type="radio" name="anser" value="${element.id}">${element.answer_text}`
            });
            answer_div.innerHTML += '</p>';
            answer_div.innerHTML += '<button type="button" name="submit" onClick="">';
    
            parent_div.appendChild(explane_div);
            parent_div.appendChild(answer_div);
    
            return parent_div;
        }
    }
}