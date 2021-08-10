var maxArea = function(height) {
  let l = 0;
  let r = height.length -1 ;
  let res = Math.min(height[l], height[r]) * (r - l);
  while (l < r) {
    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
    res = Math.max(res, Math.min(height[l], height[r]) * (r - l));
  }
  return res;
};