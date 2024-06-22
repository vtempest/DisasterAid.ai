
/**
 * Compute the softmax of an array of numbers.
 * https://en.wikipedia.org/wiki/Softmax_function
 * 
 * Softmax is a generalization of the logistic sigmoid function used in logistic regression. It is commonly used in machine learning models for multi-class classification problems where there are more than two possible output classes. Here are the key reasons why softmax is used:
 * 
 * Multi-class probability distribution: The softmax function takes a vector of arbitrary real-valued scores and squashes it to a vector of values between 0 and 1 that sum to 1. This allows the output to be interpreted as a probability distribution over the possible classes.
 * 
 * Multi-class classification: While logistic regression is limited to binary classification, softmax regression (also called multinomial logistic regression) allows generalization to problems with more than two classes. The softmax outputs can be used to represent the predicted probabilities for each class.
 * 
 * Output normalization: The softmax normalizes the outputs such that they sum to 1, which is a requirement for modeling a multi-class probability distribution. This makes the outputs interpretable as probabilities.
 * 
 * Optimization objective: In neural networks, the softmax function is used at the final layer, and the entire model is optimized by computing the cross-entropy loss between the softmax outputs and the true labels during training.

 * @param {array} arr The array of numbers to compute the softmax of.
 * @returns {array} The softmax array.
 */

export const softmax = (array) => arr.map((val, index) => 
  Math.exp(array[index]) / array.map((y) => 
    Math.exp(y)).reduce((a, b) => a + b));


var data =[
    57,
    60,
    12,
    83,
    80

  ]

var r = softmax(data).filter((v,i)=>v>0.01?i:false).filter(Boolean)

console.log(r);
