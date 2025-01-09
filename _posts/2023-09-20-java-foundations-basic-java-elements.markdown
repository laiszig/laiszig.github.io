---
title: "[03] Java Foundations 1Z0-811 - Basic Java Elements"
layout: post
date: 2023-09-20 14:30
tag: java, certification, 1Z0-811
projects: true
hidden: true
description: "The third post of the series dedicated to the studies of the Java Foundations Exam (1Z0-811)"
category: project
author: laiszig
externalLink: false
---


This is the third installment of my Java Foundations Exam series. In this post, I delve into essential concepts like Java conventions, identifiers and reserved words, package creation and importation, the structure of a Java class, advanced compilation and execution, as well as the crucial java.lang package and other standard Java packages.

## Conventions in Java
As programmers, adhering to conventions is vital for code readability. Java, being a community-driven language, follows specific conventions:

### Cases
- **Class Names:** Start with an uppercase letter, e.g., ReadOnlyArrayList.
- **Package Names:** Generally lowercase, or camel case starting with a lowercase letter, e.g., datastructures or dataStructures.
- **Variable Names:** Start with a lowercase letter, preferably in camel case, e.g., currentAccount or current_account.
### Naming
- **Package Names:** Follow the reverse domain convention, e.g., com.companyname.appname.

## Java Identifiers and Reserved Words
Understanding identifiers and reserved words is crucial in Java programming:

- **Keywords:** Have special meanings and can't be redefined. Examples include goto.
- **Literals:** Represent values literally, e.g., true, false, null.
- **Reserved Words:** Include keywords, literals, and prohibited words. var is an identifier with special meaning.

| **Keyword**    | **Keyword**     | **Keyword**     | **Keyword**     | **Keyword**     |
|----------------|-----------------|-----------------|-----------------|-----------------|
| `abstract`     | `assert`        | `boolean`       | `break`         | `byte`          |
| `case`         | `catch`         | `char`          | `class`         | `const`         |
| `continue`     | `default`       | `do`            | `double`        | `else`          |
| `enum`         | `extends`       | `final`         | `finally`       | `float`         |
| `for`          | `goto`          | `if`            | `implements`    | `import`        |
| `instanceof`   | `int`           | `interface`     | `long`          | `native`        |
| `new`          | `null`          | `package`       | `private`       | `protected`     |
| `public`       | `return`        | `short`         | `static`        | `strictfp`      |
| `super`        | `switch`        | `synchronized`  | `this`          | `throw`         |
| `throws`       | `transient`     | `try`           | `void`          | `volatile`      |
| `while`        |                 |                 |                 |                 |

## Create and Import Packages
Creating and importing packages are fundamental to organizing and reusing code:
- Package Statement: Specifies the package a class belongs to, must be the first statement or defaults to the default package.
- Import Statement: Used to make classes from other packages accessible. Avoid wildcard imports (import.*) for clarity.

Import statements are optional; you can use Fully Qualified Class Names (FQCN) directly in the code.

## Structure of a Java Class
Understanding the structure of a Java class is pivotal:

- Package Statements: Zero or one, at the beginning.
- Import Statements: Zero or more, after package statements.
- Type Declarations: Zero or more (class, interface, enum).

Within a class, you can have various members such as fields, methods, constructors, and initializers.

## Advanced Compilation and Execution
Compiling and executing Java programs involve understanding dependencies and package structures:

- Compilation: Compile independent classes first. For multiple classes, specify all source files or use wildcards, e.g., javac -d . *.java.
- Packaging into JAR: Use jar -cvf accounting.jar accounting to maintain package structure.

## Compilation Error vs. Exception at Runtime
Differentiating compilation errors and runtime exceptions is essential:
- The compiler checks syntactical rules and logical correctness.
- JVM guards against runtime errors; anything bypassing the compiler is caught at runtime.
= The java.lang and Other Standard Java Packages

Exploring the java.lang package and other standard packages is crucial:

| **Package Name** | **Purpose**                                                                                               | **Important Classes**                                           |
|------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| `java.lang`      | Provides classes that are critical for the functioning of any Java program.                               | Object, Math, System, Runtime, wrapper classes                 |
| `java.io`        | Provides classes for performing input and output (I/O) activities involving files and other I/O devices.  | InputStream, OutputStream, FileReader, FileWriter              |
| `java.net`       | Provides classes for performing network communication.                                                    | Socket, ServerSocket                                           |
| `java.sql`       | Provides classes for dealing with Databases.                                                              | Connection, Statement, ResultSet                               |
| `java.util`      | Provides tools and utility classes for creating commonly used data structures, internationalization, date handling. | Collection, List, ArrayList, HashSet, HashMap, Date, Locale |
| `java.awt` and `java.swing` | Provides classes for building Graphical User Interfaces (GUI).                                  | Frame, Dialog, Button, ActionEvent, LayoutManager              |


#### The `java.lang.Object` class
- Most important class.
- Root class, ultimate parent of all classes in Java. Root of Java class hierarchy.
- If a class doesn't extend any other class explicitly, then it implicitly extends Object.
- Object is the only class that doesn't have a parent.
- Everything, except primitive data types, are objects in Java.
    - Primitive types represent pure data, without any behavior while reference types, contain both - data and behavior.
    - Java has object oriented versions of the primitive data types as well. The "wrapper classes"

| **PRIMITIVE** | **WRAPPER**  |
|---------------|--------------|
| `boolean`     | `Boolean`    |
| `byte`        | `Byte`       |
| `char`        | `Character`  |
| `short`       | `Short`      |
| `int`         | `Integer`    |
| `long`        | `Long`       |
| `float`       | `Float`      |
| `double`      | `Double`     |

- Java 1.5 introduced "autoboxing", it allows seamless interoperation between primitive types and their corresponding wrapper classes.

Example:
```java
int i= 10; //10 is a primitive value and int is a primitive type

Integer iW = 10; //assigning a primitive value 10 to a reference variable iW

iW = i; //assigning a primitive variable to reference variable

i = iW;//assigning a reference variable to a primitive variable
```

- If you try to assign a primitive value to its corresponding wrapper class variable, the value is automatically wrapped into the corresponding wrapper class.

#### The `java.lang.System` class
- Allows you to print output to the console.
- System.out.println
- System contains a variable named out, it is of type PrintStream, which has various print/println methods.

#### The `java.lang.Math` class
- Provides methods for computing commonly used math functions such as exponentials, trigonometric values and logarithms.
- Also has methods for rounding decimal values.

#### The `java.lang.Random` class
- Provides methods for generating random numbers.
