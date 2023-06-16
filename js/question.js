class Question {
    question;
    options;
    correct;

    constructor(question, options) {
        console.assert(options.length === 4);
        this.question = question;
        this.options = {};
        for (let i = 0; i < 4; i++) {
            this.options[i] = options[i];
        }
        this.correct = 0;
    }

    setCorrect(correct) {
        this.correct = correct;
    }

    isCorrect(option) {
        return this.correct == option;
    }
}

class QuestionSet {
    questions;
    title;

    constructor(title) {
        this.title = title;
        this.questions = [];
    }

    addQuestion(question) {
        this.questions.push(question);
    }

    getRandom() {
        return this.questions[Math.floor(Math.random()*this.questions.length)];
    }
}

class QuestionCatalogue {
    categories = [];
    questionSets = [];

    constructor(catalogueJSON) {
        for (const key of Object.keys(catalogueJSON)) {
            this.categories.push(key);
            let questionSet = new QuestionSet(key);
            for (const question of catalogueJSON[key]) {
                questionSet.addQuestion(new Question(question["a"], question["l"]));
            }
            this.questionSets.push(questionSet);
        }
    }
}