---
title: "[01] Java Foundations 1Z0-811 - What is Java?"
layout: post
date: 2023-09-14 18:00
headerImage: false
tag: 
- java
- certification
-  1Z0-811
description: "The first post of the series dedicated to the studies of the Java Foundations Exam (1Z0-811)"
category: blog
author: laiszig
---

Welcome to the first post of the series dedicated to the studies of the Java Foundations Exam (1Z0-811). This series will serve as a comprehensive guide, dissecting the crucial topics, concepts, and strategies needed to conquer this certification exam.
Java, as a versatile and widely-used programming language, relies on a set of fundamental components and concepts that are integral to its functionality and appeal. In the current post, I will explore these key components of Java, shedding light on its inner workings and the ecosystem that surrounds it.

## 1. What is Java?
At its core, Java is a programming language known for its simplicity, versatility, and platform independence. It serves as the foundation upon which Java applications are built.

### 1.1. Java Development Kit (JDK)
The JDK is a comprehensive package that equips developers with essential tools for Java application development. It includes:

#### Compiler
The compiler translates human-readable Java source code into bytecode, which is understood by the Java Virtual Machine (JVM).
#### Debugger
The debugger is a crucial tool for identifying and resolving issues within Java code during development.

#### Disassembler (javap)
The disassembler, often referred to as javap, allows developers to convert compiled Java bytecode into a human-readable format. It reveals the bytecode instructions of a Java class, aiding in understanding code behavior.

### 1.2. JVM (Java Virtual Machine)
The JVM plays a pivotal role in making Java platform-independent. It is a software program that mimics a physical computer and runs on top of the host system. Key points about the JVM:
- The JVM understands its own machine language, allowing it to execute bytecode on various platforms.
- Java designers identified common features across different computer architectures and created a JVM capable of emulating these features.
- Instead of the physical computer executing machine code directly, it is the JVM that translates bytecode into machine code understood by the specific host system.

### 1.3. Java Bytecode
Java bytecode is the intermediary language understood by the JVM. The process involves compiling the Java source code into bytecode using the javac compiler. The JVM interprets and further translates bytecode into machine code that the host system can execute.
- This abstraction enables "Write Once, Run Anywhere" (WORA) capability, as the same bytecode can run on diverse platforms.
<!--  -->
[add image here]     
<!--  -->

### 1.4. Java Class Library
The Java Class Library, often referred to as Java Application Programming Interfaces (Java APIs), is a vast collection of existing code for common programming tasks. Key characteristics:
- Organized into packages, providing a structured way to access classes and methods.
- Enables code reusability, as developers leverage pre-existing solutions for common challenges.

### 1.5. JRE (Java Runtime Environment)
The JRE includes the JVM and a pre-compiled collection of the Java Class Library. It is responsible for executing Java applications. The WORA principle is achieved through the JRE, as it ensures compatibility between the bytecode and the host system.

### 1.6. Java Platforms
Java Platforms refer to combinations of the JVM, Runtime Environment, and development tools tailored for specific needs. Two notable platforms are:

- **Java Standard Edition (Java SE):** It includes the JVM, the Standard Class Library, and some development tools, suitable for general Java application development.
- **Java Enterprise Edition (Java EE/Jakarta EE):** This platform encompasses a server JVM, the Standard Class Library, the Enterprise Class Library, and development tools. It's geared towards enterprise-level applications.

### 1.7. Java Versions
Java has evolved over the years, with significant milestones including:
- 1996: Introduction of Java 1.0
- 2014: Release of Java 1.8 (Java 8)

### 1.8. Java Community Process (JCP)
The Java Community Process is a collaborative effort involving companies and developers. It serves several crucial functions:
- Ensures organized development by guiding the introduction of new features and changes.
- Prevents fragmentation by maintaining compatibility across Java implementations.
- Developers seeking to create their Java tools or compilers must adhere to the standards established by the JCP.

These elements form the foundation of Java's platform independence, code reusability, and adaptability across a wide range of applications and environments. 

## 2. Features of Java

### From a Management Perspective

- **Platform Independence**: Java applications are portable and can run on different machines without recompilation.
- **High Performance:** Java's performance has improved over time, thanks to advancements in the Java Virtual Machine (JVM).
- **Security:** Java incorporates built-in security features, ensuring controlled access to resources.
- **Familiarity:** Java shares syntax and features with the C/C++ family, making it accessible to developers familiar with these languages.
- **Simplicity:** Java simplifies complexity inherited from C/C++, enhancing developer productivity.
- **Multiple Delivery Modes:** Java offers diverse deployment options, enabling applications to be delivered to client machines remotely.
- **Java Ecosystem:** A rich ecosystem of commercial and open-source libraries simplifies common tasks for Java developers.
- **Backward Compatibility:** Java's commitment to backward compatibility ensures older applications run smoothly on newer JVMs.

### From a Technology Perspective

- **Compiled:** Java is a compiled language, delivering efficient runtime performance.
- **Versatility:** Java offers various technological solutions for desktop, web, server-side, and networked applications.
- **Multithreading:** Java supports concurrent execution, simplifying the management of multiple tasks.
- **Distributed Computing:** Java facilitates task distribution across multiple machines.
- **Garbage Collection:** The JVM automatically reclaims unused memory, making memory management hassle-free.

### From a Programming Perspective

- **Object-Oriented:** Java is an object-oriented language, promoting modularity and code reuse.
- **Structured**
    - Java follows structured programming principles, enhancing code maintainability.
    - Other programming paradigms: Procedural, Functional.
    - Java borrows features from other paradigms. E.g.: Lambdas (functional)
- **Statically Typed**
    - Java requires variable types to be declared at compile time.
    - Dynamically typed languages determine the type of a variable based on the value that it contains at runtime.
- **Strongly Typed:** Once a variable's type is declared, it cannot point to objects of other types.
- **Automatic Memory Management:** Java handles memory allocation and deallocation automatically.
- **Programmatic Exception Handling**
    - Java provides robust mechanisms for managing exceptional situations.
    - Try-catch constructs that help control program flow in case of unforeseen circumstances.
    - Constructs for closing resources automatically after use.
- **Ready-Made Class Library:** Java boasts a vast standard class library (Java API) for common tasks.

## 3. Real-World Applications of Java
Originally designed for intelligent electronic consumer devices, it is also Useful in developing high performance distributed enterprise applications. Today, Java's versatility extends to a wide range of applications.

- Desktop Applications: Java AWT and Swing are used to develop standalone applications with or without a graphical user interface (GUI).
- Distributed Applications: Java RMI facilitates communication between different components of distributed applications.
- Web Applications: Java Servlet, EJB, JPA, and Web Services power server-side components of web apps, while JavaScript handles the client-side.
- Middleware Applications: Java is behind message brokers like Tomcat Servlet engine and JBoss App Server.
- Server-Side Applications: Java is employed for developing web servers and file servers implementing HTTP/HTTPS and FTP protocols.

**Frameworks and Libraries:** Java frameworks like Struts, Spring, and Hibernate simplify application development.

**Mobile Applications:** While Java Micro Edition is outdated, Java is still used for Android app development.

Java finds applications in diverse domains, including scientific research, business, media, consumer software, and data analysis.

## 4. What Java is Not!
It's essential to clarify some misconceptions about Java:

- Not an Executable: Java class files are not executables; the JVM is the executable program.
- Limited Code Security: Compiled Java code can be decompiled, potentially compromising security.
- GUI Limitations: Java GUIs may not match native GUIs in terms of look and feel.
- Not for Mobiles: There is no JRE or JVM for Android and iOS, limiting Java's use on mobile devices.
- Learning Curve: Java can have a steep learning curve for beginners.
- Language Shortcomings: Java lacks some data types like decimals or unsigned data types.
- Not Universally Pleasing: Java cannot satisfy all developer's preferences and requirements.

In conclusion, mastering these features, applications, and misconceptions about Java will provide a solid foundation for success in the Java Foundations Exam 1Z0-811. Understanding Java's strengths and limitations is crucial for any developer whether pursuing a certification or simply looking to expand our programming repertoire.

**Sources:**

H. Deshmukh, OCFA Java Foundations Exam Fundamentals 1Z0-811: Study guide for Oracle Certified Foundations Associate, Java Certification. Dewas, MP, India: Enthuware, 2020.

K. Sierra, B. Bates, and T. Gee, Head First Java: A Brain-Friendly Guide. 2022.

Oracle, 2023. Java Certified Foundations Associate Certification Overview. Available at: https://education.oracle.com/java-certified-foundations-associate/trackp_372. [Accessed 13 September 2023].

