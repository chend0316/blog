int removeDuplicates(int* nums, int numsSize){
    int i = 0;
    int j = 0;
    while (j < numsSize) {
        if (j == 0 || nums[j] != nums[j - 1]) {
            nums[i] = nums[j];
            i++;
        }
        j++;
    }
    return i;
}