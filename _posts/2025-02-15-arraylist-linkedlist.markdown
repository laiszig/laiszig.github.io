---
title: "ArrayList and LinkedList in Java"
layout: post
date: 2025-02-16 10:00
headerImage: false
hidden: false
tag:
    - list
    - linkedlist
    - data structure
    - java
category: blog
author: laiszig
description: ArrayList and LinkedList data structures uses and concepts.
---

In Java, the `List` interface represents an ordered collection of elements, allowing duplicates. Two common implementations of `List` are `ArrayList` and `LinkedList`.

### `ArrayList` – A Dynamic Array

`ArrayList` is backed by a dynamically resizable array. It provides fast random access to elements using an index, making it a great choice for scenarios where read operations are more frequent than modifications.

#### Key Characteristics of `ArrayList`
- **Fast random access** – Retrieving an element by index takes constant time **O(1)**.
- **Efficient appends** – Adding an element at the end is an amortized **O(1)** operation.
- **Costly insertions and deletions** – Inserting or removing elements (except at the end) requires shifting elements, making it **O(n)** in the worst case.
- **Search performance** – Linear search takes **O(n)** time, while binary search on a sorted `ArrayList` takes **O(log n)**.

### Example: Using `ArrayList`
Imagine you’re managing a **digital playlist** where you frequently access songs by their position:
```java
List<String> songs = new ArrayList<>(); // Using List<E> for flexibility
songs.add("Song A");
songs.add("Song B");
songs.add("Song C");

System.out.println("First song: " + songs.get(0)); // O(1) access
songs.add(1, "New Song"); // O(n) insertion
System.out.println(songs);
```

As a generic class, we can parameterize `ArrayList<E>` with any type we want. The compiler prevents us from adding incompatible types. Also, generics eliminate the need for explicit casting when retrieving elements.

It is recommended to declare variables using the generic `List<E>` interface rather than a specific implementation like `ArrayList<E>`. This improves flexibility, allowing us to switch between different `List` implementations without modifying much code.

### Using an `ArrayList`

```java
// Default Contructor - creates an empty list
List<String> students = new ArrayList<>();
System.out.println(students.isEmpty()); // true

// Specifying Initial Capacity - defines the initial size to optimize performance
List<String> cities = new ArrayList<>(20);

// Populates the list using an existing collection
Set<Integer> ages = Set.of(18, 21, 25, 30);
List<Integer> ageList = new ArrayList<>(ages);
System.out.println(ageList.size()); // 4

// Adding Elements - at the end or at a specific index
List<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add(1, "Orange"); // Insert at index 1
System.out.println(fruits); // [Apple, Orange, Banana]

// Adding multiple elements at once
List<String> colors = new ArrayList<>(List.of("Red", "Green"));
colors.addAll(List.of("Blue", "Yellow"));
System.out.println(colors); // [Red, Green, Blue, Yellow]

// We use an Iterator to traverse the list in one direction, and ListIterator to traverse in both directions.
List<String> tasks = new ArrayList<>(List.of("Email", "Meeting", "Coding"));
ListIterator<String> it = tasks.listIterator(tasks.size());

while (it.hasPrevious()) {
    System.out.println(it.previous()); // Iterates in reverse order
}

// Searching an Unsorted List - indexOf() to find the first occurrence and lastIndexOf() for the last
List<String> names = new ArrayList<>(List.of("Alice", "Bob", "Alice", "Charlie"));
System.out.println(names.indexOf("Alice")); // 0
System.out.println(names.lastIndexOf("Alice")); // 2

// To find elements based on a condition:
List<Integer> numbers = List.of(10, 20, 30, 40);
List<Integer> result = numbers.stream()
    .filter(n -> n > 25)
    .toList();

System.out.println(result); // [30, 40]

//  Searching a Sorted List - Binary search is more efficient for sorted lists:
List<String> sortedNames = new ArrayList<>(List.of("Alice", "Bob", "Charlie"));
Collections.sort(sortedNames);
int index = Collections.binarySearch(sortedNames, "Bob");

System.out.println(index >= 0 ? "Found" : "Not Found"); // Found

// Removing by index
List<String> books = new ArrayList<>(List.of("Java", "Python", "C++"));
books.remove(1); // Removes "Python"
System.out.println(books); // [Java, C++]

// Removing by value
List<Integer> numbers = new ArrayList<>(List.of(5, 10, 15, 10, 20));
numbers.remove(Integer.valueOf(10)); // Removes the first "10"
System.out.println(numbers); // [5, 15, 10, 20]
// If using primitive types, ensure Integer.valueOf(n) is used to remove by value instead of by index.

// Removing Multiple elements safely
List<String> cities = new ArrayList<>(List.of("New York", "Paris", "London", "Berlin"));
Set<String> toRemove = Set.of("Paris", "Berlin");

Iterator<String> it = cities.iterator();
while (it.hasNext()) {
    if (toRemove.contains(it.next())) {
        it.remove();
    }
}
System.out.println(cities); // [New York, London]
//  for-each with remove() causes ConcurrentModificationException.
```
We can use Java Streams (filter() + collect()) to remove elements without modifying the original list.

### SequencedCollection<E>
Java 21 introduced the java.util.SequencedCollection<E> interface, enhancing collection handling with well-defined element ordering. It allows direct access to the first and last elements and improves efficiency when working with ordered collections.
| Method        | Description                               |
|--------------|-------------------------------------------|
| `addFirst(E e)`  | Adds an element as the first element  |
| `addLast(E e)`   | Adds an element as the last element   |
| `getFirst()`     | Gets the first element               |
| `getLast()`      | Gets the last element                |
| `removeFirst()`  | Removes and returns the first element |
| `removeLast()`   | Removes and returns the last element |

---

## LinkedList
LinkedList is a Java class that implements the List and Deque interfaces. It functions as a doubly linked list, allowing elements to be added, removed, and accessed efficiently. Unlike some collections, LinkedList accepts all types of elements, including null.

- Accessing elements by index involves traversing the list from the nearest end.
- It is not synchronized, meaning multiple threads can modify it simultaneously unless explicitly synchronized.
- Iterators (Iterator and ListIterator) are fail-fast—if the list is changed while iterating, a ConcurrentModificationException is thrown.
- Each item is a node that stores references to the previous and next elements.
- Maintains insertion order, keeping elements in the sequence they were added.
- To make it thread-safe, wrap it using Collections.synchronizedList():

```java
List list = Collections.synchronizedList(new LinkedList<>());
```
There are two common ways to create a LinkedList: starting empty or initializing it with elements from another collection.

```java
// Creating an Empty LinkedList using its default constructor
LinkedList<String> linkedList = new LinkedList<>();

// Creating a LinkedList from Another Collection
ArrayList<Integer> arrayList = new ArrayList<>();
    arrayList.add(1);
    arrayList.add(2);
    arrayList.add(3);

// Initializing a LinkedList with the elements of ArrayList
LinkedList<Integer> linkedList = new LinkedList<>(arrayList);
```

Adding elements - LinkedList implements both List and Deque, so it offers a variety of ways to add elements
- `add()` and `addAll()` for general addition.
- `addFirst()` to add an element at the beginning.
- `addLast()` to add an element at the end.

Removing elements
- `removeFirst()` to remove the first element.
- `removeLast()` to remove the last element.
- `removeFirstOccurrence()` and `removeLastOccurrence()` to remove specific elements.

### Converting an Array to a LinkedList
In some cases, you may want to work with an array as a LinkedList to take advantage of its efficient insertions or Deque operations.
```java
// Converting it to a List using Arrays.asList() and then passing it to the LinkedList constructor
String[] array = { "apple", "banana", "cherry", "date" };
List<String> list = Arrays.asList(array);  // Convert array to List
LinkedList<String> linkedList = new LinkedList<>(list);

// Collections.addAll() to add all elements from the array directly into an empty LinkedList
LinkedList<String> linkedList = new LinkedList<>();
Collections.addAll(linkedList, array);
```

### LinkedList vs. ArrayList: Key Differences
- **Structure**:
    - ArrayList is based on an array, meaning elements are stored in a contiguous block of memory. This allows O(1) random access, making it efficient for retrieving elements by index.
    - In contrast, LinkedList consists of nodes, where each element points to the next and previous ones. Since traversal is required to find an item, searching takes O(n) time.

- **Performance**:
    - Adding or removing elements in a LinkedList is generally faster because there’s no need to shift elements, just update references.
    - In an ArrayList, inserting or deleting in the middle requires shifting elements, which can be costly.

- **Memory Usage**:
    - LinkedList uses more memory than ArrayList because each node stores two extra references (to previous and next elements). 
    - ArrayList only holds data in a resizable array.

##### When to Use Each?
- LinkedList is better for frequent insertions and deletions since it doesn’t require shifting elements.
- ArrayList is faster for accessing elements by index because it uses a dynamic array.



