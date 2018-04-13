export class Question {
    public quesion_size : number;
    public filename : string[];

    constructor (question_size : number, filename : string[]) {
        this.quesion_size = question_size;
        this.filename = filename;
    }
}