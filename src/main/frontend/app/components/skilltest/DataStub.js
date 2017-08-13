export const data = {
    testName: 'Level defining test',
    version: '1',
    questions: [
        {
            question: 'How much ... the fish?',
            pointsAwarded: 5,
            answerType: 'SELECT_ONE',
            answers: [{
                text: 'is',
                correct: true
            }, {
                text: 'are',
                correct: false
            }
        ]},
        {
            question: 'It a good day to ...',
            pointsAwarded: 15,
            answerType: 'SELECT_MANY',
            answers: [{
                text: 'die',
                correct: false
            }, {
                text: 'cry',
                correct: false
            }, {
                text: 'pie',
                correct: true
            }, {
                text: 'lie',
                correct: true
            }
        ]},
        {
            question: 'Как зовут учителя?',
            pointsAwarded: 5000,
            answerType: 'TEXT',
            correctAnswers: ['Люба', 'Любовь', 'Любашка']
        }
    ]
};
