---
title: "HashMap and LinkedHashMap in Java"
layout: post
date: 2025-02-15 10:00
headerImage: false
hidden: false
tag:
    - hashmap
    - data structure
    - java
    - linkedhashmap
category: blog
author: laiszig
description: HashMap and LinkedHashMap data structures uses and concepts.
---
## HashMap

HashMap is a key-value data structure that allows fast retrieval of values using keys.
- Searching in a list: O(n) complexity (O(log n) if sorted and using binary search). 
- HashMap insertion/retrieval: O(1) on average

```java
Map<String, Book> booksByTitle = new HashMap<>();
// Adding books
Book novel = new Book("1984", "A dystopian novel by George Orwell");
Book fantasy = new Book("The Hobbit", "A fantasy novel by J.R.R. Tolkien");
booksByTitle.put(novel.getTitle(), novel);
booksByTitle.put(fantasy.getTitle(), fantasy);

// Retrieving values
System.out.println(booksByTitle.get("1984").getTitle());

// If we try to retrieve a product that doesn't exist, we get a null value
Book nextPurchase = booksByTitle.get("Magazine"); // Nullpointer exception

// Overwriting values with the same key - Adding a value with an existing key
Book newEdition = new Book("1984", "A revised edition with annotations");
booksByTitle.put(newEdition.getTitle(), newEdition);

// HashMap allows us to use `null` as a key
Book defaultBook = new Book("Dictionary", "A book with word definitions");
booksByTitle.put(null, defaultBook);

// Checking existence
System.out.println(booksByTitle.containsKey("1984")); // O(1)
System.out.println(booksByTitle.containsValue(newEdition)); // O(n)
```

There are three ways we can iterate over a HashMap:

```java
//  1. Iterate over the set of all keys
for(String key : booksByTitle.keySet()) {
            Books book = booksByTitle.get(key);
            System.out.println(book.getTitle());
        }

booksByTitle.keySet().forEach(key -> System.out.println(booksByTitle.get(key).getTitle()));

// 2. Iterate over the set of all entries
for(Map.Entry<String, Book> entry : booksByTitle.entrySet()) {
            Book book =  entry.getValue();
            String key = entry.getKey();
            System.out.println("Key: " + key + ", " + "Value: " + book.getTitle());
        }

booksByTitle.entrySet().forEach(entry -> System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue().getTitle()));

// 3. Iterate over set of all values
List<Book> book = new ArrayList<>(booksByTitle.values());

// Functional iteration for all elements
booksByTitle.forEach((key, book) -> System.out.println("Key: " + key + " Book: " + book.getDescription()));
```

We can use any class as the key in our HashMap. However, for the map to work properly, we need to provide an implementation for equals() and hashCode(). That's not the case when we want to use a class only as a value.
```java
// Using a Book as a key - price as value
Map<Book, Integer> priceByBook = new HashMap<>();
priceByBook.put(novel, 20);

public class Book {

    private String title;
    private String description;
    public Book(String title, String description) {
        this.title = title;
        this.description = description;
    }
    public String getTitle() { return title; }
    public String getDescription() { return description; }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Product product = (Product) o;
        return Objects.equals(name, product.name) &&
                Objects.equals(description, product.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description);
    }
}
```

Useful methods:
```java
// Default value retrieval - get a value from the map or return a default element in case there is no mapping for the given key
Book dictionary = new Book("Dictionary", "A reference book");
System.out.println(booksByTitle.getOrDefault("unknown book", dictionary).getTitle());

// putIfAbsent - add new mapping only if there is not yet a mapping for the given key
booksByTitle.putIfAbsent("1984", dictionary);
```

The methods `merge()` and `compute()` are similar. The compute() method accepts two arguments: the key and a BiFunction for the remapping. And merge() accepts three parameters: the key, a default value to add to the map if the key doesn’t exist yet, and a BiFunction for the remapping.

```java
// merge -  we can modify the value for a given key if a mapping exists, or add a new value otherwise
booksByTitle.merge("1984", novel2, Book::addTagsOfOtherBook);

// compute method - compute the value for a given key
booksByTitle.compute("1984", (k,v) -> v != null ? v.addTagsOfOtherBook(novel2) : novel2);
```

### Why use a HashMap instead of a list?
A HashMap allows retrieving an element using its key, whereas a list requires iterating over all elements to find a match, resulting in O(n) time and space complexity.

With a HashMap, the put and get operations have an average O(1) time complexity and O(n) space complexity. Instead of scanning all elements, a HashMap **calculates** the position of a value based on its key.

How does it work?
A naive approach would be using a list large enough to cover all possible keys. However, this is inefficient for large key spaces (e.g., integers), as it would require a massive list, wasting memory.

HashMap's solution:
- Stores elements in buckets, with the total number called capacity.
- Uses the hashCode() method on the key to determine the bucket for storing values.
- To retrieve a value, it calculates the bucket again and uses the key's equals() method to find the exact match.

### Immutable Keys?
In most cases, we should use immutable keys. Or at least, we must be aware of the consequences of using mutable keys. Once we change a key, it is no longer possible to get the corresponding value once the key has changed, instead, null is returned. This is because HashMap is searching in the wrong bucket.
```java
MutableKey key = new MutableKey("key1");

Map<MutableKey, String> items = new HashMap<>();
items.put(key, "success");

key.setName("key2");

System.out.println(items.get(key)); // returns null
```

### Collisions
Equal keys must always produce the same hash, but different keys can sometimes have the same hash. When this happens, both values are stored in the same bucket.

Inside a bucket, values are initially stored in a list and retrieved by iterating through them, resulting in O(n) time complexity.

Since Java 8 (JEP 180), if a bucket contains 8 or more values, the list is replaced with a balanced tree, improving lookup performance to O(log n). If the number of values drops to 6 or fewer, it reverts back to a list.

### Capacity and Load Factor
To prevent too many values from being stored in the same bucket, HashMap doubles its capacity when 75% of the buckets are occupied. This threshold is called the load factor, which defaults to 0.75, while the initial capacity is 16. Both values can be customized in the constructor.

### Put and Get Operations
When adding a value, HashMap determines the bucket. If the bucket already contains values, the new value is added to the existing list or tree. If the load factor exceeds the set limit, the capacity is doubled.

To retrieve a value, HashMap calculates the bucket and searches for the key within its list or tree.

---

## LinkedHashMap

The LinkedHashMap class shares many similarities with HashMap but offers additional functionality by combining a hash table with a doubly-linked list. This structure preserves the order of elements while maintaining efficient lookups.

Unlike a standard HashMap, LinkedHashMap keeps a linked sequence of entries, ensuring predictable iteration order. It achieves this by modifying HashMap's Map.Entry class, introducing pointers to the previous and next entries.

```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```
Additionally, it uses an underlying array with a default size of 16 to store elements.

### Insertion-Order
A LinkedHashMap maintains entries in the order they were inserted, ensuring consistent iteration throughout its lifecycle. Unlike a HashMap, which does not guarantee order, LinkedHashMap preserves the sequence in which keys were added.
```java
// This test confirms that the insertion order is preserved, a guarantee that HashMap does not provide.
@Test
public void givenLinkedHashMap_whenMaintainsInsertionOrder_thenCorrect() {
    LinkedHashMap<String, Integer> map = new LinkedHashMap<>();
    map.put("Apple", 10);
    map.put("Banana", 20);
    map.put("Cherry", 30);
    map.put("Date", 40);
    map.put("Elderberry", 50);

    List<String> keys = new ArrayList<>(map.keySet());
    assertEquals("Apple", keys.get(0));
    assertEquals("Banana", keys.get(1));
    assertEquals("Cherry", keys.get(2));
    assertEquals("Date", keys.get(3));
    assertEquals("Elderberry", keys.get(4));
}
```

This behavior is especially useful in APIs that accept a map, modify it, and return it. If the caller expects the order to remain unchanged, LinkedHashMap is the ideal choice. Additionally, re-inserting an existing key does **not** change its order in the map.

### Access-Order in LinkedHashMap
In addition to maintaining insertion order, LinkedHashMap allows an alternative access-order mode, which rearranges entries based on their most recent access.

To enable this behavior, we use a special constructor:
```java
LinkedHashMap<Integer, String> map = new LinkedHashMap<>(16, .75f, true);
```
- 16 is the initial capacity,
- 0.75f is the load factor,
- true enables access-order (default is insertion-order).

With access-order enabled, iteration will return elements from least recently accessed to most recently accessed.

##### Using LinkedHashMap for an LRU Cache
A LinkedHashMap with access-order makes it easy to implement a Least Recently Used (LRU) cache. Every time an entry is accessed via put() or get(), it moves to the end of the iteration order.

```java
// Creating a LinkedHashMap with access-order enabled
Map<Integer, String> map = new LinkedHashMap<>(5, 0.75f, true);

// Adding elements
map.put(10, "Apple");
map.put(20, "Banana");
map.put(30, "Cherry");
map.put(40, "Date");
map.put(50, "Elderberry");

System.out.println("Initial order: " + map.keySet());

// Accessing some elements
map.get(40); // Moves 40 to the end
System.out.println("After accessing 40: " + map.keySet());

map.get(10); // Moves 10 to the end
System.out.println("After accessing 10: " + map.keySet());

map.get(30); // Moves 30 to the end
System.out.println("After accessing 30: " + map.keySet());
```

LinkedHashMap provides a way to limit the number of elements stored by overriding the removeEldestEntry() method. This allows the cache to automatically discard the least recently used entry when a new one is added.
```java
public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity; // Remove oldest entry if limit is exceeded
    }

    public static void main(String[] args) {
        LRUCache<Integer, String> cache = new LRUCache<>(3);

        cache.put(1, "A");
        cache.put(2, "B");
        cache.put(3, "C");
        System.out.println("Cache: " + cache.keySet());

        cache.get(1); // Access 1, making it most recently used
        cache.put(4, "D"); // This should remove 2 (least recently used)
        System.out.println("After adding 4: " + cache.keySet());

        cache.put(5, "E"); // This should remove 3
        System.out.println("After adding 5: " + cache.keySet());
    }
}
```
The overridden method in the example ensures that the map can grow up to a maximum of 3 entries. Once this limit is exceeded, each new entry added will result in the removal of the eldest entry—that is, the entry that was least recently accessed among all existing entries.

- Accessing an entry moves it to the end of the order.
- Oldest entries get removed when a new entry is added and the size limit is reached.
- Useful for implementing LRU caching in applications.

### LinkedHashMap Performance
Similar to HashMap, LinkedHashMap provides constant-time performance for basic operations like **insertion**, **deletion**, and **lookup**, as long as the hash function is efficient. It also supports `null` keys and `null` values.

However, due to the additional overhead of maintaining a doubly-linked list, its constant-time operations are slightly slower than those of a HashMap.

##### Iteration Performance
- Both HashMap and LinkedHashMap have O(n) iteration time, but LinkedHashMap generally performs better in this regard.
- The difference arises because, in LinkedHashMap, n in O(n) refers only to the number of stored entries.
- In HashMap, n is the sum of the size and capacity (O(size + capacity)), making iteration potentially slower when the capacity is large.

##### Load Factor and Initial Capacity
The load factor and initial capacity in LinkedHashMap work the same way as in HashMap. However, choosing a high initial capacity has a lower impact on performance in LinkedHashMap since iteration speed remains constant, regardless of capacity.

### Concurrency
Similar to HashMap, LinkedHashMap is not thread-safe by default. If multiple threads access it concurrently, and at least one modifies it, external synchronization is required.

A simple way to make it thread-safe is to wrap it using Collections.synchronizedMap():

```java
Map<Integer, String> syncMap = Collections.synchronizedMap(new LinkedHashMap<>());
```

##### Structural Modifications in Access-Ordered Mode
One key difference between HashMap and LinkedHashMap is how they define a structural modification:
- In a HashMap, only operations like put() and remove() modify the structure.
- In an access-ordered LinkedHashMap, even calling get() can be a structural change, since it affects the order of elements.

This means that access-ordered LinkedHashMaps require more caution in concurrent environments, as frequent get() operations can lead to unexpected behavior if not synchronized properly.

### Summary

| Feature             | HashMap | LinkedHashMap |
|---------------------|---------|--------------|
| **Order Guarantee** | No order guarantee | Maintains insertion order (or access order if configured) |
| **Performance** | O(1) for get/put (on average) | O(1) for get/put (on average) but slightly slower due to maintaining order |
| **Memory Usage** | Lower memory footprint | Higher memory usage due to maintaining a doubly-linked list |
| **Iteration Order** | Unpredictable order | Predictable order (insertion or access-based) |
| **When to Use** | Best for fast lookups when order is not important | Best when order needs to be preserved while maintaining good performance |
