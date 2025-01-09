---
title: "[02] Java Foundations 1Z0-811 - Java Fundamentals"
layout: post
date: 2023-09-16 14:23
tag: java, certification, 1Z0-811
projects: true
hidden: true
description: "The second post of the series dedicated to the studies of the Java Foundations Exam (1Z0-811)"
category: project
author: laiszig
externalLink: false
---

This is the second part of my **Java Foundations** exam series. In this post, I explore key concepts, including the Java Development Kit (JDK), components of object-oriented programming, the structure of a Java program, and how to compile and execute Java code.

## Java Basics: Understanding the Fundamentals
Java offers two main **builds**: the official Oracle Java (not free for commercial use) and OpenJDK Java (free for commercial use). Despite differences in support and patch updates, both builds are practically the same. Oracle's JDK includes essential tools like the Java compiler and debugger, while JRE contains components necessary to run Java programs, such as the JVM and Java standard classes.

### Components of a Java Program
A Java program consists of several components:
- **Source Code:** Written in .java files, these files contain your program's code.
- **Java Standard Library Classes:** Ready-made components packaged for general use.
- **Third-Party Libraries:** Components developed by other companies and packaged as .jar files.
- **Resource Files:** These include images, properties, and configurations used by the program.

### Structure of a Java Class
A Java class typically includes zero or one package statement, zero or more import statements, and zero or more class definitions. 
Classes can have public modifiers, extends and implements clauses, though these are optional.

### Compiling and Running Java Programs
The main method serves as the entry point of a Java program. Here's how you compile and execute your Java code:
1. **Get Source Code Location:** Ensure you know the location of your source code files.
2. **Create Java File:** Create a .java file containing your Java code.
3. **Compile Source Code:** Use javac program-name.java to compile your code.
4. **Run Program:** Execute your program using java program-name.

Understanding the Main Method
```java
public class MyApplication {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

The main method is pivotal in Java programming. It is:
- Called main.
- Takes one parameter of type String Array.
- Returns void.
- Public, static, and can declare exceptions in its throws clause.
- Since Java 11, it provides helpful error messages.
- You can have overloaded main methods, allowing flexibility in program execution.

### Command Line Arguments
Java programs can accept command line arguments. These arguments are passed to the main method as strings, even if they represent integers.

## Object-Oriented Programming (OOP) in Java
In OOP, data and behaviors are organized into objects, combining attributes (data) and methods (functions) that operate on the data. Key OOP principles include abstraction, encapsulation, inheritance, and polymorphism.
- **`Abstraction`** involves capturing relevant details of an entity or concept.

It is the process of simplifying complex systems by modeling classes appropriate to the problem and working at the most relevant level of inheritance for a particular aspect of the problem. In Java, abstraction allows you to focus on essential qualities of an object while ignoring its non-essential details. It helps in managing and handling complexity by hiding unnecessary implementation details and showing only the necessary features of an object.
- **`Encapsulation`** hides implementation details, allowing components to evolve without breaking the system.

Access modifiers control visibility, ensuring secure and structured interactions within a program. It is the bundling of data (attributes) and methods (functions) that operate on the data into a single unit known as a class. It restricts direct access to some of an object's components and prevents the accidental  modification of data. Encapsulation helps in maintaining the integrity of the data within an object and ensures secure and controlled access to its properties.

- **`Inheritance`** creates specialized entities by extending existing ones, fostering code reuse.

It is a mechanism in Java that allows one class to inherit properties and behaviors from another class. It establishes a relationship between objects, creating a hierarchy of classes. The derived class inherits the attributes and methods of the base class, promoting code reuse and extensibility. Inheritance supports the "is-a" relationship between classes.

- **`Polymorphism`** enables objects to exhibit different behaviors based on context, a direct consequence of inheritance. 

Enables objects of different classes to be treated as objects of a common superclass. It allows methods to be used interchangeably based on the object's actual type. Polymorphism simplifies the code, making it more flexible and scalable. There are two types of polymorphism in Java: compile-time (method overloading) and runtime (method overriding).

### Objects and Classes in Java
- Objects are instances of classes, created based on class templates.
- Classes describe object data elements (attributes) and behaviors (methods).

### Static and Instance Members
Java uses the `static` keyword to denote class-level elements, shared across all instances. Instance members, on the other hand, belong to specific object instances.

#### Class, Object, and Reference Relationship
- A class is a template for creating objects.
- An object is an instance of a class, defined by its attributes.
- A reference points to an object's memory location, allowing access to its data and methods. References can be interchangeable and multiple references can point to the same object.
