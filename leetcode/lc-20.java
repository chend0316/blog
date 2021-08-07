public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack();
        stack.push('#');

        Map<Character, Character> map = new HashMap<>();
        map.put('(', ')');
        map.put('[', ']');
        map.put('{', '}');
        map.put('#', '#');

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if ("([{".indexOf(c) != -1) {
                stack.push(c);
            } else if (map.get(stack.pop()) != c) {
                return false;
            }
        }

        return stack.size() == 1;
    }
}
