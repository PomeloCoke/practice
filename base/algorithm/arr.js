// 差分数组
/**
 * @param {number} length
 * @param {number[][]} updates
 * @return {number[]}
 */
var getModifiedArray = function (length, updates) {
  let nums = new Array(length).fill(0)
  let res = new Difference(nums)

  for (let update of updates) {
    const start = update[0]
    const end = update[1]
    const val = update[2]
    res.increment(start, end, val)
  }

  return res.result()
};

/**
 * @param {number[][]} bookings
 * @param {number} n
 * @return {number[]}
 */
var corpFlightBookings = function (bookings, n) {
  const nums = new Array(n).fill(0)
  let diff = new Difference(nums)
  for (let booking of bookings) {
    const first = booking[0] - 1
    const last = booking[1] - 1
    const seat = booking[2]
    diff.increment(first, last, seat)
  }
  return diff.result()
};

class Difference {
  constructor(nums) {
    this.diff = new Array(nums.length).fill(0)
    this.diff[0] = nums[0]
    for (let i = 1; i < nums.length; i++) {
      this.diff[i] = nums[i] - nums[i - 1]
    }
  }
  increment(i, j, val) {
    this.diff[i] += val
    if (j + 1 < this.diff.length) {
      this.diff[j + 1] -= val
    }
  }
  result() {
    let res = new Array(this.diff.length)
    res[0] = this.diff[0]
    for (let i = 1; i < res.length; i++) {
      res[i] = res[i - 1] + this.diff[i]
    }
    return res
  }
}

// 双指针->单链表
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
  let dummy = new ListNode()
  let p1 = list1, p2 = list2
  let p = dummy

  while(p1 != null && p2 != null) {
    if (p1.val < p2.val) {
      p.next = p1
      p1 = p1.next
    } else {
      p.next = p2
      p2 = p2.next
    }
    p = p.next
  }
  if (p1 != null) {
    p.next = p1
  }
  if(p2 != null) {
    p.next = p2
  }
  return dummy.next
};

var mergeKLists = function(lists) {
  let dummy = new ListNode()
  let p = dummy
}



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let dummy = new ListNode()
  dummy.next = head
  let x = findFromEnd(dummy, n + 1)
  x.next = x.next.next
  return dummy.next
};

function findFromEnd(head, n) {
  let p1 = head
  for (let i = 0; i < n; i++) {
    p1 = p1.next
  }
  let p2 = head
  while(p1 != null) {
    p2 = p2.next
    p1 = p1.next
  }
  return p2
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// 快慢指针
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
  let slow = head, fast = head
  while(fast != null && fast.next != null) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
};

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let p1 = headA, p2 = headB  
  while(p1 != p2) {
    if (p1 == null) p1 = headB
    else p1 = p1.next

    if (p2 == null) p2 = headA
    else p2 = p2.next
  }
  return p1
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if (nums.length === 0) return 0

  let fast = 0, slow = 0
  while( fast < nums.length ) {
    if (nums[slow] != nums[fast]) {
      slow++
      nums[slow] = nums[fast]
    }
    fast++
  }
  return slow + 1
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  if (head == null) return null
  let fast = head, slow = head
  while(fast != null) {
    if (fast.val != slow.val) {
      slow.next = fast
      slow = slow.next
    }
    fast = fast.next
  }
  // 断开与后面重复元素的连接
  slow.next = null
  return head
};

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let fast = 0, slow = 0
  while(fast < nums.length) {
    if (nums[fast] != val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
};

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let fast = 0, slow = 0
  while(fast < nums.length) {
    if (nums[fast] != 0) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  let p = slow
  while(p < nums.length) {
    nums[0] = 0
    p++
  }
};