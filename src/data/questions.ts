// Hardcoded questions for the quiz
export interface Question {
    id: string;
    question_text: string;
    options: string[];
    correct_option: number;
    difficulty: "easy" | "hard";
}

export const hardcodedQuestions: Question[] = [
    // Easy questions (1-15)
    {
        id: "1",
        question_text: "What is a linked list?",
        options: [
            "An array with dynamic sizing",
            "A non-linear hierarchical structure",
            "A data structure where nodes contain data and a pointer to the next node in the sequence",
            "A stack-based data type"
        ],
        correct_option: 2,
        difficulty: "easy"
    },
    {
        id: "2",
        question_text: "What is the main advantage of a linked list over an array?",
        options: [
            "Dynamic size and efficient insertion/deletion without memory reallocation",
            "Faster access by index",
            "Better cache locality",
            "Lower memory usage"
        ],
        correct_option: 0,
        difficulty: "easy"
    },
    {
        id: "3",
        question_text: "What does the `malloc()` function do?",
        options: [
            "Frees memory",
            "Allocates heap memory of specified size and returns a pointer",
            "Initializes memory to zero",
            "Resizes memory"
        ],
        correct_option: 1,
        difficulty: "easy"
    },
    {
        id: "4",
        question_text: "What is the purpose of the `free()` function?",
        options: [
            "Allocates memory",
            "Initializes variables",
            "Returns memory size",
            "Deallocates previously allocated memory to prevent memory leaks"
        ],
        correct_option: 3,
        difficulty: "easy"
    },
    {
        id: "5",
        question_text: "What is the basic structure of a node in a linked list?",
        options: [
            "Only data",
            "Data and next pointer",
            "Multiple pointers without data",
            "An array of values"
        ],
        correct_option: 1,
        difficulty: "easy"
    },
    {
        id: "6",
        question_text: "What is dynamic memory allocation?",
        options: [
            "Memory allocation at compile time with fixed size determined beforehand",
            "Automatic memory for local variables",
            "Allocating memory at runtime using malloc(), calloc(), or realloc()",
            "Memory that never needs freeing"
        ],
        correct_option: 2,
        difficulty: "easy"
    },
    {
        id: "7",
        question_text: "What is the time complexity of accessing the nth element in a linked list?",
        options: [
            "O(1)",
            "O(n)",
            "O(log n)",
            "O(n²)"
        ],
        correct_option: 1,
        difficulty: "easy"
    },
    {
        id: "8",
        question_text: "What is NULL in the context of linked lists?",
        options: [
            "A special node",
            "An error code",
            "A pointer constant representing an invalid address, used to mark list end",
            "A deletion function"
        ],
        correct_option: 2,
        difficulty: "easy"
    },
    {
        id: "9",
        question_text: "Which statement correctly creates a new node dynamically?",
        options: [
            "struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));",
            "struct Node newNode;",
            "struct Node* newNode = new Node();",
            "Node* newNode = calloc(1);"
        ],
        correct_option: 0,
        difficulty: "easy"
    },
    {
        id: "10",
        question_text: "What is a head pointer?",
        options: [
            "Points to last node",
            "Points to middle node",
            "Used for deallocation",
            "Stores the address of the first node in the linked list"
        ],
        correct_option: 3,
        difficulty: "easy"
    },
    {
        id: "11",
        question_text: "What is traversal in a linked list?",
        options: [
            "Reversing nodes",
            "Deleting nodes",
            "Sorting the list",
            "Visiting each node sequentially from head to end"
        ],
        correct_option: 3,
        difficulty: "easy"
    },
    {
        id: "12",
        question_text: "What is the difference between `malloc()` and `calloc()`?",
        options: [
            "malloc() is always faster",
            "calloc() only allocates small blocks",
            "malloc() returns uninitialized memory; calloc() initializes to zero",
            "malloc() allocates multiple blocks"
        ],
        correct_option: 2,
        difficulty: "easy"
    },
    {
        id: "13",
        question_text: "What does it mean to insert a node at the beginning of a linked list?",
        options: [
            "Insert after last node",
            "Create new node, set its next to current head, update head to new node",
            "Insert at middle",
            "Insert before last node"
        ],
        correct_option: 1,
        difficulty: "easy"
    },
    {
        id: "14",
        question_text: "How do you delete the first node of a linked list?",
        options: [
            "Set head to NULL",
            "Free head directly",
            "Delete all nodes",
            "Save second node's address, free first node, update head to second node"
        ],
        correct_option: 3,
        difficulty: "easy"
    },
    {
        id: "15",
        question_text: "What is a memory leak?",
        options: [
            "Freed memory",
            "Stack memory",
            "Global variables",
            "Dynamically allocated memory that is not freed, becoming inaccessible"
        ],
        correct_option: 3,
        difficulty: "easy"
    },

    // Hard questions (16-30)
    {
        id: "16",
        question_text: "In the iterative approach to reverse a linked list, what is the role of the `prev` pointer?",
        options: [
            "Points to original head",
            "Points to last node",
            "Error checking only",
            "Tracks the node that becomes next in reversed list"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "17",
        question_text: "What will this recursive function return for a list with 5 nodes?\n```c\nint count(struct Node* head) {\n    if (head == NULL) return 0;\n    return 1 + count(head->next);\n}",
        options: [
            "0",
            "4",
            "5",
            "Infinite loop"
        ],
        correct_option: 2,
        difficulty: "hard"
    },
    {
        id: "18",
        question_text: "To find the middle element of a linked list in O(n) time, which technique is most efficient?",
        options: [
            "Count nodes then traverse to middle",
            "Store in array first",
            "Use recursion with depth",
            "Slow and fast pointers (slow: 1 step, fast: 2 steps)"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "19",
        question_text: "How do you insert a node at a specific position in a linked list?",
        options: [
            "Allocate memory and append at end",
            "Traverse to the position, update pointers of new and previous nodes",
            "Always insert at head regardless of position",
            "Sort the list before inserting"
        ],
        correct_option: 1,
        difficulty: "hard"
    },
    {
        id: "20",
        question_text: "When merging two sorted linked lists, what approach is most efficient?",
        options: [
            "Concatenate then sort",
            "Convert to arrays",
            "Reverse both first",
            "Traverse both, compare nodes, append smaller to result"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "21",
        question_text: "What is the key difference in pointer arithmetic between arrays and linked lists?",
        options: [
            "Works same for both",
            "Arrays don't support it",
            "Lists need multiplication",
            "In lists, ptr++ is less common; use ptr->next for navigation"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "22",
        question_text: "What is the time complexity of searching for an element in an unsorted linked list?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ],
        correct_option: 2,
        difficulty: "hard"
    },
    {
        id: "23",
        question_text: "Which approach can be used to check if a linked list is a palindrome?",
        options: [
            "Convert to string",
            "Sort and compare",
            "Use hash table",
            "Find middle with slow/fast pointers, reverse second half, compare halves"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "24",
        question_text: "What is a common cause of memory leaks in linked lists?",
        options: [
            "Too many pointers",
            "Too much memory",
            "Using malloc not calloc",
            "Not freeing nodes when deleting, losing track of pointers before freeing"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "25",
        question_text: "When deleting a node with a specific value, what must be updated if the node is not the head?",
        options: [
            "Only head",
            "All nodes after",
            "NULL at end",
            "Previous node's next pointer to skip the deleted node"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "26",
        question_text: "What is the time complexity of accessing the last node without a tail pointer?",
        options: [
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n²)"
        ],
        correct_option: 2,
        difficulty: "hard"
    },
    {
        id: "27",
        question_text: "Which of these is a valid implementation of finding the length of a linked list?",
        options: [
            "length = sizeof(head);",
            "Traverse from head to NULL, incrementing counter for each node",
            "Use direct array indexing on the list",
            "Return a fixed constant"
        ],
        correct_option: 1,
        difficulty: "hard"
    },
    {
        id: "28",
        question_text: "What does this function do?\n```c\nvoid func(struct Node** head) {\n    struct Node* temp = *head;\n    *head = (*head)->next;\n    free(temp);\n}",
        options: [
            "Reverses the list",
            "Counts nodes",
            "Prints first node",
            "Deletes the first node"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "29",
        question_text: "What will be printed by this code?\n```c\nstruct Node* head = NULL;\nstruct Node* newNode = (struct Node*)malloc(sizeof(struct Node));\nnewNode->data = 5;\nnewNode->next = head;\nhead = newNode;\nprintf(\"%d\", head->data);",
        options: [
            "Garbage value",
            "0",
            "Compilation error",
            "5"
        ],
        correct_option: 3,
        difficulty: "hard"
    },
    {
        id: "30",
        question_text: "Identify the error in this code:\n```c\nstruct Node* temp = head;\nfree(head);\ntemp->data = 10;",
        options: [
            "Memory leak",
            "NULL pointer dereference",
            "Compilation error",
            "Accessing freed memory through temp (dangling pointer)"
        ],
        correct_option: 3,
        difficulty: "hard"
    }
];