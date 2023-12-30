/**
 * Balanced Parentheses
 * Implement the isBalancedParentheses() function to take a string containing
 * only curly {}, square [], and round () parentheses.
 * The function should tell us if all the parentheses in the string are balanced.
 * This means that every opening parenthesis will have a closing one.
 * For example, {[]} is balanced, but {[}] is not.
 *
 * Basic approach:
 * For any open parenthesis we will push it to the stack
 * For any closed parenthesis we will pop out an element from the stack
 * We also check for the stack - it should be empty
 *
 * For closed parenthesis - we will pop and compare it with the current element
 * If both makes a pair then it's a case of balanced parentheses.
 * Example 1. - "{}"
 *      For { -> we push it to the stack,
 *          stack becomes [ "{" ], p becomes 1 and top becomes 0;
 *
 *      For } ->  we have to pop out the stack top
 *          stack[top] = "{" we now compare it with the "}",
 *          as it is a pair it is a balanced parentheses case.
 *
 * Example 2. ->  "["
 *      For [ -> we push it to the stack,
 *          stack becomes [ "[" ], p becomes 1 and top becomes 0;
 *      Since we only got one parenthesis, we come out of the loop
 *      For a valid parentheses, the stack must be empty, but here it contains an element
 *      which means it's not balanced.
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
