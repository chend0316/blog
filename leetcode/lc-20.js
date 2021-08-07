var isValid = function (s) {
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const stack = [];
  for (const c of s) {
    if (c === "(" || c === "[" || c === "{") {
      stack.push(c);
    } else if (stack.length === 0) {
      return false;
    } else if (map[c] !== stack.pop()) {
      return false;
    }
  }
  return stack.length === 0;
};
