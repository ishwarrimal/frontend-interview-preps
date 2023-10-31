/**
 * Balanced Parentheses
 * Implement the isBalancedParentheses() function to take a string containing
 * only curly {}, square [], and round () parentheses.
 * The function should tell us if all the parentheses in the string are balanced.
 * This means that every opening parenthesis will have a closing one.
 * For example, {[]} is balanced, but {[}] is not.
 *
 * @param {string} expression - the input expression.
 * @returns {boolean} - returns true or false
 */
export const isBalancedParentheses = (expression) => {
  let p = 0, // pointer for expression
    top = -1, // stack pointer
    stack = [];
  while (p < expression.length) {
    // if the current element is an open parenthesis then push it to stack
    if (
      expression[p] === '{' ||
      expression[p] === '[' ||
      expression[p] === '('
    ) {
      top++;
      stack[top] = expression[p];
      p++;
    } else {
      // if the current element is a closed parenthesis - pop out from the stack and
      // compare it with the current element
      if (
        (stack[top] == '{' && expression[p] == '}') ||
        (stack[top] == '[' && expression[p] == ']') ||
        (stack[top] == '(' && expression[p] == ')')
      ) {
        p++;
        top--;
      } else return false;
    }
  }
  // stack should be empty else it's a case of imbalanced parentheses
  if (top != -1) return false;
  return true;
};

// Usage
const exp = '[{}]';
const result = isBalancedParentheses(exp);
console.log(`Is ${exp} a balanced parentheses: `, result);
