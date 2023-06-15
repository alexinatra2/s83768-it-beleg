class Question {
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct: number;

    constructor(question: string, options: [string]) {
        console.assert(options.length === 4);
        this.question = question;
        this.option1 = options[0];
        this.option1 = options[1];
        this.option1 = options[2];
        this.option1 = options[3];
        this.correct = 1;
    }

    setCorrect(correct: number) {
        this.correct = correct;
    }

    isCorrect(option: number) {
        return this.correct === option;
    }
}