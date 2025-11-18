// Hardcoded questions for the quiz
export interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number;
  difficulty: "easy" | "medium" | "hard";
}

export const hardcodedQuestions: Question[] = [
  // Easy questions
  {
    id: "1",
    question_text: "What function is used to allocate memory dynamically in C?",
    options: [
      "malloc()",
      "calloc()",
      "free()",
      "realloc()"
    ],
    correct_option: 0,
    difficulty: "easy"
  },
  {
    id: "2",
    question_text: "Which function is used to deallocate memory in C?",
    options: [
      "malloc()",
      "dealloc()",
      "free()",
      "release()"
    ],
    correct_option: 2,
    difficulty: "easy"
  },
  {
    id: "3",
    question_text: "What does malloc() return if it fails to allocate memory?",
    options: [
      "0",
      "NULL",
      "-1",
      "false"
    ],
    correct_option: 1,
    difficulty: "easy"
  },
  {
    id: "4",
    question_text: "Which header file must be included to use malloc()?",
    options: [
      "stdio.h",
      "stdlib.h",
      "memory.h",
      "alloc.h"
    ],
    correct_option: 1,
    difficulty: "easy"
  },
  {
    id: "5",
    question_text: "What is the purpose of calloc()?",
    options: [
      "Allocate memory and initialize to zero",
      "Allocate memory without initialization",
      "Reallocate memory",
      "Free allocated memory"
    ],
    correct_option: 0,
    difficulty: "easy"
  },

  // Medium questions
  {
    id: "6",
    question_text: "What is the difference between malloc() and calloc()?",
    options: [
      "malloc() is faster than calloc()",
      "calloc() initializes memory to zero, malloc() doesn't",
      "malloc() can allocate more memory than calloc()",
      "There is no difference"
    ],
    correct_option: 1,
    difficulty: "medium"
  },
  {
    id: "7",
    question_text: "What happens if you forget to call free() on dynamically allocated memory?",
    options: [
      "Program crashes immediately",
      "Memory leak occurs",
      "Compiler throws an error",
      "Operating system automatically frees it"
    ],
    correct_option: 1,
    difficulty: "medium"
  },
  {
    id: "8",
    question_text: "What is the correct way to allocate memory for an array of 10 integers?",
    options: [
      "int *arr = malloc(10);",
      "int *arr = malloc(10 * sizeof(int));",
      "int arr[10];",
      "int *arr = calloc(10);"
    ],
    correct_option: 1,
    difficulty: "medium"
  },
  {
    id: "9",
    question_text: "What does realloc() do if the new size is smaller than the current size?",
    options: [
      "Returns NULL",
      "Truncates the memory block",
      "Does nothing",
      "Copies to a new location"
    ],
    correct_option: 1,
    difficulty: "medium"
  },
  {
    id: "10",
    question_text: "Which of the following is NOT a valid way to declare a pointer to dynamically allocated memory?",
    options: [
      "int *ptr = malloc(sizeof(int));",
      "int *ptr = (int*)malloc(10*sizeof(int));",
      "int ptr = malloc(sizeof(int));",
      "int *ptr = calloc(5, sizeof(int));"
    ],
    correct_option: 2,
    difficulty: "medium"
  },

  // Hard questions
  {
    id: "11",
    question_text: "What is double free error?",
    options: [
      "Calling free() twice on the same pointer",
      "Allocating memory twice",
      "Using a pointer after freeing it",
      "Both A and C"
    ],
    correct_option: 3,
    difficulty: "hard"
  },
  {
    id: "12",
    question_text: "What is the time complexity of malloc() in worst case?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correct_option: 1,
    difficulty: "hard"
  },
  {
    id: "13",
    question_text: "Which memory allocation strategy does malloc() typically use?",
    options: [
      "First fit",
      "Best fit",
      "Worst fit",
      "Depends on implementation"
    ],
    correct_option: 3,
    difficulty: "hard"
  },
  {
    id: "14",
    question_text: "What happens when you realloc() a NULL pointer?",
    options: [
      "Error occurs",
      "Behaves like malloc()",
      "Returns NULL",
      "Program crashes"
    ],
    correct_option: 1,
    difficulty: "hard"
  },
  {
    id: "15",
    question_text: "What is memory fragmentation?",
    options: [
      "Breaking memory into small pieces",
      "Unused memory between allocated blocks",
      "Corruption of memory",
      "Allocation of memory in non-contiguous locations"
    ],
    correct_option: 1,
    difficulty: "hard"
  }
];