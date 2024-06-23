// api/helpers/treat-question.js
module.exports = {
  friendlyName: 'Treat question',
  description: 'Processes the question answers and returns the categorization.',
  inputs: {
    respostas: {
      type: 'ref',
      required: true // Answers are required
    }
  },
  fn: async function (inputs, exits) {
    const respostas = inputs.respostas;
    let countA1 = 0; let countB1 = 0;
    let countA2 = 0; let countB2 = 0;

    // Count 'A' and 'B' responses for the first set of questions (1-3)
    if (respostas[0] && respostas[0].text === 'A') { countA1++; }
    if (respostas[0] && respostas[0].text === 'B') { countB1++; }
    if (respostas[1] && respostas[1].text === 'A') { countA1++; }
    if (respostas[1] && respostas[1].text === 'B') { countB1++; }
    if (respostas[2] && respostas[2].text === 'A') { countA1++; }
    if (respostas[2] && respostas[2].text === 'B') { countB1++; }
    
    // Count 'A' and 'B' responses for the second set of questions (4-7)
    if (respostas[3] && respostas[3].text === 'A') { countA2++; }
    if (respostas[3] && respostas[3].text === 'B') { countB2++; }
    if (respostas[4] && respostas[4].text === 'A') { countA2++; }
    if (respostas[4] && respostas[4].text === 'B') { countB2++; }
    if (respostas[5] && respostas[5].text === 'A') { countA2++; }
    if (respostas[5] && respostas[5].text === 'B') { countB2++; }
    if (respostas[6] && respostas[6].text === 'A') { countA2++; }
    if (respostas[6] && respostas[6].text === 'B') { countB2++; }

    // Determine the result for the first set of questions
    let result1 = countA1 > countB1 ? 'Structure' : 'Ambiguity';
    // Determine the result for the second set of questions
    let result2 = countA2 > countB2 ? 'technical/task' : 'people/social';

    // Determine the final result based on the combination of result1 and result2
    let finalResult;
    if (result1 === 'Ambiguity' && result2 === 'technical/task') {
      finalResult = 'Analytical';
    } else if (result1 === 'Ambiguity' && result2 === 'people/social') {
      finalResult = 'Conceptual';
    } else if (result1 === 'Structure' && result2 === 'technical/task') {
      finalResult = 'Directive';
    } else if (result1 === 'Structure' && result2 === 'people/social') {
      finalResult = 'Behavioral';
    }

    // Return the results
    return exits.success({ result1, result2, finalResult });
  }
};
