---
title: "[04] Java Foundations 1Z0-811 - Java Data Types?"
layout: post
date: 2023-10-01 15:43
headerImage: false
hidden: true
tag:
    - java
    - certification
    - 1Z0-811
description: "The fourth post of the series dedicated to the studies of the Java Foundations Exam (1Z0-811)"
category: blog
author: laiszig
---

## Understanding Data Types and Variables

In Java, data types are like labels that tell the computer what kind of information you're working with. For example, an integer is labeled as "int," and a Boolean (true/false) is labeled as "boolean." These labels help you treat similar data in the same way and define operations specific to that data.

### Primitive Data Types:

These are the basic building blocks, like numbers (integers, floating-point), characters, and true/false values.

-   They're straightforward, and Java knows their size and capabilities
-   You can combine them to create more complex data types

### Reference Data Types:

Used when dealing with specialized data that Java might not fully understand

-   Includes classes, interfaces, and enums
-   Think of them as containers pointing to the actual data rather than holding it directly

While primitive data types contain actual data, reference variables contain only the address of the data.

```java
i = 10; // makes i hold the value 10.

str = "hello"; // makes str store the memory address where "hello" resides.
```

| **Data Type** | **Size (bits)** | **Default Value** | **Literal Example** | **Description**                                                                                       |
| ------------- | --------------- | ----------------- | ------------------- | ----------------------------------------------------------------------------------------------------- |
| `byte`        | 8               | `0`               | `127`, `-128`       | Stores whole numbers from -128 to 127 (1 byte).                                                       |
| `short`       | 16              | `0`               | `32767`, `-32768`   | Stores whole numbers from -32,768 to 32,767 (2 bytes).                                                |
| `int`         | 32              | `0`               | `123`, `-123`       | Stores whole numbers from -2,147,483,648 to 2,147,483,647 (4 bytes).                                  |
| `long`        | 64              | `0L`              | `123L`, `-123L`     | Stores whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (8 bytes). Use `L`. |
| `float`       | 32              | `0.0f`            | `3.14f`, `-3.14f`   | Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits. Use `f` or `F`.              |
| `double`      | 64              | `0.0`             | `3.14`, `-3.14`     | Stores fractional numbers. Sufficient for storing 15 decimal digits.                                  |
| `char`        | 16              | `'\u0000'`        | `'A'`, `'\u0041'`   | Stores a single 16-bit Unicode character. Use single quotes for literals.                             |
| `boolean`     | 1 (logical)     | `false`           | `true`, `false`     | Stores true or false values (1 bit).                                                                  |

### Void and Null

They both mean _nothing_.

-   `void` is used in methods that don't return anything
    -   A type specification, not a data type
    -   It's not a value and can't be used for variable declarations
-   `null` is a value and can signify that a reference isn't pointing anywhere

### Size of Variables

-   Primitive Variable Size: Depends on the size of the data it holds.
-   Reference Variable Size: Depends on the addressing mechanism (e.g., 32-bit OS = 4 bytes, 64-bit OS = 8 bytes).

-   Reference Data Type Size: Determined at compile time, based on instance variables.
    -   Size is fixed for all instances of a class.

#### Reference vs. Primitive Variables

-   Memory Perspective: No difference; both store raw numbers.

Interpretation by JVM:

-   Reference variables interpret the number as the address of the data.
-   Primitive variables interpret the number as a basic data type.

Object Characteristics:

-   Objects support methods and fields.
-   You can't invoke methods on primitive variables, but you can perform operations on them.

Java uses "pass by value" semantics; even for objects, you pass a copy of the reference.

### Declaring and Initializing Variables in Java

In Java, declaring a variable is like saying it exists, and defining it is specifying what it is. For instance:

```java
class SomeClassName { // class declaration
    // class definition starts
}
```

However, Java makes a distinction between declaring and initializing variables:

-   Declaration: The variable exists but doesn't have a value assigned.
-   Initialization: Assigning a value to a variable.

```java
int i = 10; // i is declared as an int and initialized to 10.
```

#### Ways to Declare Variables

Ways to declare without initialization:

```java
int x;
String str;
Object obj;

int a, b, c; //a, b and c are declared to be of type int
String s1, s2; //s1 and s2 are declared to be type String;
```

Ways to declare as well as initialize at the same time:

```java
// 1. initializing x and using an int literal 10
int x = 10;

// 2. initializing y by assigning the value of another variable x
int y = x;

// 3. initializing str by creating a new String.
String str = "123";

// 4. initializing obj by creating a new instance of SomeClass.
SomeClass obj = new SomeClass();

// 5. initializing obj2 using another reference.
Object obj2 = obj;

// 6. initializing each variable of same type with a different value.
int a = 10, b = 20, c = 30;
String s1 = "123", s2 = "hello";

// 7. resetting m to 10 and using the new value of m to initialize p.
int m = 20; int p = m = 10;
```

Mixing the two styles mentioned

```java
// 1. a is declared but not initialized. b and c are being declared as well as initialized.
int a, b = 10, c = 20;

// 2. Only s1 is being initialized.
String s1 = "123", s2;
```

And the following are some illegal ones:

```java
// 1. You can have only one type name in one statement.
int a = 10, int b;

// 2. You can have only one type name in one statement.
int a, Object b;

// 3. Invalid, y must be defined before using it to initialize X.
int x = y = 10;
```

There is no difference in the way you declare a primitive variable and a reference variable.

-   A reference variable has one additional way of initialization, you can assign null.

### Naming Rules

Variable names must be valid Java identifiers.

-   Conventionally, start with a lowercase letter, and constants are in uppercase.
-   Code generation tools often start variables with an underscore or a dollar sign.

#### Uninitialized Variables and Default Values

-   Java doesn't mind uninitialized variables if not used.
-   Static and instance variables get default values if not explicitly initialized.
-   Local variables must be explicitly initialized before use.

#### Definite Assignment Principle

-   JVM Initialization: For instance and static variables, JVM initializes to predetermined values.
-   Programmer Initialization: Local variables must be explicitly initialized to avoid compilation errors.

[ADD IMAGE HERE]
Doesn't compile because Java cannot be sure that the condition will always be true.
A compiler can take it into account if the variable is a compile time constant. If the variable i is defined to final, it will compile.
[ADD IMAGE HERE]
Even though i is not a compile time constant, the compiler will see that no matter what is the result of the condition, val will be assigned a value.
[ADD IMAGE HERE]
It doesn't compile.
The compiler sees this as two independent if statements.
The compiler cannot make inferences based on the results of execution of expressions that are not compile time constants.

In conclusion, Java initializes all static and instance variables of a class automatically if you don't initialize them explicitly. You must initialize local variables explicitly before they are used.

### Assigning Values to Variables

The most basic way is using a "literal," which is a fixed value represented in the source code.

#### Numeric Literals

-   Underscores for readability: 1_000_000.0
-   Suffixes for types: 1234L (long), 1234.0f (float)

#### Char and Boolean Literals

-   Char literals: 'a', Unicode: '\u0041'
-   Boolean literals: true or false

#### Null Literal

-   null sets a reference variable to point to nothing.

#### Numeric Values in Different Formats

-   Hexadecimal, octal, and binary formats are supported in Java.

### Assignment Techniques

#### Assignment using Another Variable:

Works the same way for primitives and reference variables.

```java
int i = j;
String zipCode = zip;
Student topper = myStudent;

// Assignment using Return Value of a Method
Student topper = findTopper(); int score = evaluate();
```

Assignment using value of one type to a variable of another type
Simple assignments involving primitive types
// Assignment of compile time constants
Concept of casting for primitive variables

Primitive assignments involving mathematical/arithmetic operators
values generated using binary operators and compound operators
implicit widening and narrowing of primitives
Assignments involving reference types
Casting
Primitive Assignments
If the type of the value can fit into the type of the variable, then no special treatment is required. Example, byte (8 bits), it's smaller than the size of an int (32bits), so a byte can fit into an int.

Assigning a smaller type to a larger type is known as "widening conversion" or "implicit widening conversion".
If the source type is larger than the target type, generally Java compiler doesn't allow you.

Implicit narrowing: You can assign a source variable that is a compile time constant to a target variable of different type if the value held by source variable fits into the target variable. The compiler automatically narrows the value down to a smaller type if it sees that the value can fit into a smaller type.
If the source variable is not a constant, the compiler forces you to promise the value will fit. We use "casting". Java allows you to cast the value of one primitive type to another by specifying the type in parenthesis. Example: int i = (int) 11.1;

AKA "explicit narrowing": A cast tells the compiler to just assign the value and not to worry about any spillage.
What if there is spillage?
int i = 128;
byte b = (byte) i;
print: -128

Assigning a short or byte to char
Even though chars and shorts' sizes are the same (16bits), their range is not.
A char can store values from 0 to 65535, and a short can store values from -32768 to 32767.

Assigning float to int or double to long and vice-versa

Final Variables
A final variable is a variable whose value doesn't change once it has had a value assigned to it. A constant.

We cannot make d refer to a different Data object once it is initialized, because d is final. However, we can use d to manipulate the Data object to which it points.
Instantiating Java Objects
Objects are instances of classes, and they're crucial for organizing data.
Four ways to instantiate objects:
using the new keyword,
deserialization,
reflection,
and cloning.
The focus here is on new java.lang.Object();
// Using new keyword
String greeting = new String("Hello");
// Constructor executes, initializing data members
// Reference variable doesn't contain the object but its address in memory
// Save the address in a variable to use the object later

Assigning Objects to Reference Variables
Java is strongly typed; only objects of the declared type or a subtype can be assigned.
Object object = new String(); // String is a subtype of Object
Note: If the address is not saved in a variable, the object is lost after creation.

    In essence, comprehending Java data types is crucial for effective programming. Mastery of these concepts empowers developers to navigate variable handling intricacies, ensuring the creation of robust and error-free Java code.
