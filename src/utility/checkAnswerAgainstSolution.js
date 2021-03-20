export default function checkAnswerAgainstSolution(answer, solution) {
  function makeComparisonObj(str) {
    const returnArray = [];
    const splitStyleStrings = str.split(/([}])/gi);

    splitStyleStrings.map(s => {
      const arr = s.split(/([{|}|;])/gi)
        .filter(t => /[{|}|;]/gi.test(t) ? null : t);

      return arr.length > 0 ? returnArray.push(arr) : null;
    });

    return returnArray;
  }

  const answerArray = makeComparisonObj(answer);
  const solutionArray = makeComparisonObj(solution);

  let returnValue = true; // assume true UNLESS?

  solutionArray.map((arr, index) => {
    if (answerArray[index].length !== arr.length) {
      return returnValue = false;
    }
  
    return arr.map(s => {
      if (s === '.scales') {
        if (answerArray[index].indexOf('.fishies') === -1) {
          return returnValue = false; 
        }
      } else {
        if (answerArray[index].indexOf(s) === -1) {
          return returnValue = false; 
        }
      }

      return false;
    });
  });

  return returnValue;
};
