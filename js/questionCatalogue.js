class QuestionCatalogue {
    categories: [string];
    questionSets: [QuestionSet];

    constructor() {
        this.categories = [];
        this.questionSets = [];
    }

    static import(catalogueJSON: Object): QuestionCatalogue {
        let catalogue = new QuestionCatalogue();
        for (const key: string of catalogueJSON.keys()) {
            catalogue.categories.push(key);
            let questionSet = new QuestionSet(key);
            for (const question: string of catalogueJSON[key]) {
                questionSet.addQuestion(new Question(question["a"], question["l"]));
            }
            catalogue.questionSets.push(questionSet);
        }
        return catalogue;
    }
}

console.log("loaded question catalogue");