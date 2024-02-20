/*
 * You are given an array of size n, which contains only integers. The array is not necessarily sorted. Write an algorithm to find the majority element in the array, if it exists. A majority element is defined as an element that appears more than n/2 times in the array. If no such element exists, your algorithm should indicate this.
Example:
● Input:[3,3,4,2,4,4,2,4,4]
○ Output: 4
 ● Input:[3, 3, 4, 2, 4, 2, 2]
○ Output: No majority element
Constraints:
● The array's size, n, is at least 1.
● The elements of the array are integers.
Consider various edge cases and showcase your thinking.
 */

import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;

public class Solution {

    public static String hasTheMost(int[] arr) {
        Map<Integer, Integer> map = new HashMap<>();
        // tally each number into it's own bucket
        for (int i : arr) {
            int tally = map.getOrDefault(i, 0) + 1;
            map.put(i, tally);
        }

        // loop through again, considering only the largest tallies of each bucket
        Iterator<Integer> it = map.keySet().iterator();
        
        int value = it.next();
        boolean duplicate  = false;
        while (it.hasNext()){
            int i = it.next();
            if (map.get(value) == map.get(i)){
                duplicate = true;
                continue;
            }
            // find highes count for each bucket
            if (map.get(value) < map.get(i)){
                value = i;
                duplicate = false;
            }
        }

        if (duplicate)
            return "No majority element";
        return Integer.toString(value);
    }

    public static void main(String[] args) {
        int[] arr = { 3, 3, 4, 2, 4, 4, 2, 4, 4 };
        System.out.println(hasTheMost(arr));
        int[] arr2 = {3, 3, 4, 2, 4, 2, 2};
        System.out.println(hasTheMost(arr2)); // expect 2
        int[] arr3 = {3, 3, 4, 2, 4, 2, 2, 3};
        System.out.println(hasTheMost(arr3)); // 2 and 3 appear 3 times
    }

}