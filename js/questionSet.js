class QuestionSet {
    questions: [Question];
    title: string;

    constructor(title: string) {
        this.title = title;
        this.questions = [];
    }

    addQuestions(questions: [Question]) {
        this.questions.concat(questions);
        console.log(this.questions);
    }

    addQuestion(question: Question) {
        this.questions.push(question);
        console.log(this.questions);
    }

    removeQuestion(question: Question) {
        const questionIndex = this.questions.indexOf(question);
        this.questions.splice(questionIndex, 1);
        console.log(this.questions);
    }
}