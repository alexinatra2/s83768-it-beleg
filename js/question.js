/**
 * @author Alexander Holzknecht
 *
 * A class holding model data for a question o
 */
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

    /**
     * sets the correct option in case it is fetched from the server and therefore
     * not automatically the first one.
     *
     * @param correct the correct option
     */
    setCorrect(correct) {
        this.correct = correct;
    }

    isCorrect(option) {
        return this.correct == option;
    }
}

/**
 * @author Alexander Holzknecht
 *
 * A class containing an aggregate of questions corresponding
 * to a topic
 */
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

    /**
     *
     * @returns {*} a random element from the questions list
     */
    getRandom() {
        return this.questions[Math.floor(Math.random()*this.questions.length)];
    }
}

/**
 * @author Alexander Holzknecht
 *
 * A model class containing all questions of organized into categories
 */
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