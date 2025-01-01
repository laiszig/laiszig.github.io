---
title: ":ramen: Indigo, minimalist jekyll theme"
layout: post
date: 2025-01-01 13:15
tag: java, functional programming, lambda
projects: true
hidden: true
description: "Java Lambda Expressions post breaking down key concepts, such as lambda syntax, functional interfaces, type inference, and variable capture."
category: project
author: laiszig
externalLink: false
---

# Java Lambda Expressions
An important new feature introduced in Java SE 8 that allow us to represent one method interfaces using **expressions**. 
- It's is built as a short block of code that takes in parameters and returns a value. 
- They can be created without belonging to any class, and be implemented in the body of a method. Lambdas can also be passed as **objects** and be executed on demand.
- All of this improves the Collection libraries and makes it easier to iterate through, filter, ad extract data from a Collection. 
- Additionally, new concurrency features improve performance in multicore environments.

A lambda expression has three parts: 
1. Parameters: The input, usually enclosed in parentheses **`(x, y)`**
2. Arrow token: Separates parameter and body **`->`**
3. Body:  The logic or expression, either a single statement or a block, **`{}`** if multiple statements.
```java
BinaryOperator<Integer> add = (x, y) -> x + y;
System.out.println(add.apply(3, 5)); 
```

## 1. Java Lambdas and the Single Method Interface
Java Lambdas simplify the way we implement functional interfaces, enabling cleaner and more concise code. A functional interface, also known as a **`Single Abstract Method (SAM) interface`**, contains exactly one abstract method, making it the perfect candidate for lambda expressions.
- Here is an Interface with a single method:
```java
interface PaymentProcessor {
    void processPayment(double amount);
}
```
- Next, we have a class with a method that takes the interface as a parameter:
```java
class PaymentService {
    public void handlePayment(PaymentProcessor processor, double amount) {
        processor.processPayment(amount);
    }
}
```
Finally, we create an instance of *PaymentService* and implement the interface method using a lambda:
```java
    PaymentService paymentService = new PaymentService();

    paymentService.handlePayment(amount -> System.out.println("Processing payment of $" + amount), 150.75);

```
A lambda expression is matched to the parameter's type and transformed into a function that implements the corresponding interface. 
- Java lambda expressions can **only** be used when the type they match is an interface with a single *abstract* method.

### 1.1. Functional Interfaces 
A single-method interface, often called a **`functional interface`**, is the target for Java lambda expressions. When matching a lambda expression to a functional interface, we must keep some things in mind:
1. The interface must have only one **`abstract`** (unimplemented) method.
2. The parameters of the lambda expression must match the return type of the single method.
3. The return type of the lambda expression must match the return type of the single method.

*Starting from Java 8, a Java interface can include both default methods and static methods, each having its own implementation defined within the interface. This allows a lambda expression to implement interfaces with multiple methods, as long as the interface contains only one unimplemented (abstract) method.*
```java
interface PaymentProcessor {
    // Abstract method (to be implemented by lambda)
    void processPayment(double amount);

    // Default method with an implementation
    default void printReceipt(double amount) {
        System.out.println("Receipt: Payment of $" + amount + " processed successfully.");
    }

    // Static method with an implementation
    static void logTransaction(double amount) {
        System.out.println("Transaction logged: $" + amount);
    }
}
```
Note: This is a key characteristic of lambda expressions in Java, as they are designed to provide a clear and concise way to implement such interfaces.

### 1.2 Lambdas and Anonymous Interface Implementations
Usually, Lambda expressions are preferred for their simplicity, conciseness, and better performance, especially for single-method interfaces.
While anonymous classes are used when more complex behavior is needed, such as when working with multiple methods or if you need to refer to this inside the class itself.

- The major difference between the two, is that an anonymous interface implementation can have state (member variables) whereas a lambda expression cannot.
```java
interface PaymentProcessor {
    void processPayment(double amount);
}
```
This interface can be implemented using an anonymous interface implementation, like this:
```java
PaymentService paymentService = new PaymentService() {
    @Override
    void processPayment(double amount) {
        System.out.println("Processing payment of $" + amount);
    }
};
```
This anonymous PaymentService implementation can have its own internal state. Look at this redesign:
```java
    PaymentService paymentService = new PaymentService() {
    private int totalAmount = 150.75;
    System.out.println("Processing payment of $" + amount + " with total amount of $" + this.totalAmount);
                this.totalAmount += amount;
    }
```
The anonymous PaymentService implementation now has a field named totalAmount.
A lambda expression cannot have such fields. A lambda expression is thus said to be **`stateless`**.

## 2. Lambda Type Inference
With lambda expressions, the type is often **`inferred`** from the context. For example, the interface type of the parameter can be determined from the method signature of handlePayment(), which takes a PaymentProcessor (a functional interface with a single method).
This process is known as type inference. The compiler deduces the parameter type by referencing the method definition, rather than requiring it to be explicitly stated.

In a lambda expression, the parameter types can often be inferred as well. This allows the compiler to automatically infer the types of these parameters without needing them to be explicitly specified in the lambda expression.

## 3. Lambda Parameters
Considering that lambda expressions are essentially methods, they can accept parameters the same way. Whatever is inside the parenthesis portion of the lambda expression defines the parameters it accepts
These parameters **must** match the parameters of the method on the single method interface.
- This means that the **number** of parameters in the lambda expression and the method must match. And also, if specify the parameter **types** in the lambda expression, they must match as well. 

Zero parameters:
```java
() -> System.out.println("This lambda has zero parameters");
```
One parameter. In this case, the parenthesis are optional:
```java
param -> System.out.println("This lambda has one parameter: " + param);
```
Multiple parameters: 
```java
(param1, param2) -> System.out.println(
    "This lambda has multiple parameters: " + param1 + ", " + param2);
```

- Parameters Type: Sometimes, you need to specify the parameter types in a lambda expression if the compiler cannot figure them out from the functional interface method it matches. If this happens, the compiler will let you know.

```java
// Specifying parameter types explicitly
(Integer x, Integer y) -> System.out.println(x * y);
```

Note: You can also use the **`var`** keyword (introduced in Java 10) as a lambda parameter type (introduced in Java 11). 
```java
Function<String, String> toUpperCase = (var input) -> input.toUpperCase();
```
- The parameter type declared as var will be inferred because of the generic variable declaration **`Function<String, String>`**. Both the parameter and return type of the Function is String.


## 4. Returning Values with Lambda Expressions
Java lambda expressions can return values, just like methods. Simply include a return statement in the body of the lambda, like this:
```java
Function<Integer, Integer> square = x -> {
    return x * x;  // Returns the square of x
};
System.out.println(square.apply(4));  // Output: 16
```
If the lambda expression only calculates and returns a value, we can simplify it with a more concise syntax.
```java
x -> { return x * x; }
```
Or
```java
x -> x * x;
```

## 5. Using Lambdas as Objects
A Java lambda expression is essentially an object. We can assign a lambda expression to a variable and pass it like any other object.
```java
interface MessagePrinter {
    void print(String message);
}

MessagePrinter printer = message -> System.out.println("Message: " + message);

printer.print("Hello, Lambda!");
```
In this example, the MessagePrinter interface defines the method print, which the lambda expression implements. The lambda is assigned to the variable printer and invoked using the print method.

## 6. Variable Capture
Java lambda expressions can access variables declared outside their body under certain conditions. They can capture local variables, instance variables and static variables.

### 6.1. Capturing Local Variables
A lambda can capture the value of a local variable declared outside its body.
```java
interface NumberProcessor {
    void process(int number);
}

int multiplier = 5; // Effectively final variable

NumberProcessor processor = number -> System.out.println(number * multiplier);

processor.process(10);  // Output: 50
```
- The NumberProcessor interface has a method process that the lambda implements.
- The lambda captures and references the local variable multiplier, which is declared outside the lambda body.
- Since multiplier is "effectively final" (it is not modified after being assigned), it can be safely accessed inside the lambda body. If multiplier were modified later, the compiler would produce an error.

### 6.2. Capturing Instance Variables
A lambda expression can also capture an instance variable from the object that creates the lambda.
```java
class PaymentProcessor {
    double amount = 100.0;  // Instance variable

    public void processPayment() {
        // Lambda capturing the instance variable 'amount'
        Runnable paymentTask = () -> System.out.println("Processing payment of $" + this.amount);
        paymentTask.run();  // Output: Processing payment of $100.0

        // Changing the instance variable
        this.amount = 200.0;
        paymentTask.run();  // Output: Processing payment of $200.0
    }
```
In this example, the lambda expression references this.amount, an instance variable of the enclosing PaymentProcessor object. Unlike local variables, instance variables can be modified after being captured, and the changes will be reflected inside the lambda.
- This behavior contrasts with anonymous class implementations, which can have their own instance variables that are accessed via this. However, a lambda expression does not have its own instance variables, so this always refers to the enclosing object.

### 6.3. Capturing Static Variables
A Java lambda expression can also capture static variables, which are accessible from anywhere in the application. Since static variables are not tied to instances of a class, they can be easily captured by lambda expressions. 
```java
class Logger {
    static int logLevel = 1;  // Static variable

    public void logMessage() {
        // Lambda capturing the static variable 'logLevel'
        Runnable logTask = () -> System.out.println("Log level: " + logLevel);
        logTask.run();  // Output: Log level: 1

        // Changing the static variable
        logLevel = 2;
        logTask.run();  // Output: Log level: 2
    }
}
```
Additionally, the value of the static variable can be changed after it has been captured, and the lambda will reflect that change. After modifying logLevel, the lambda reflects the updated value when executed again, making it possible to adjust the behavior of the lambda depending on changes to the static variable.

## 7. Simplified Method Calls with Method References
When a lambda expression's sole purpose is to call another method with the parameters passed to it, Java allows a more concise way to express this using method references. This feature simplifies the code by directly referring to the method, rather than writing out the full lambda expression.
```java
class Printer {
    public static void printMessage(String message) {
        System.out.println(message);
    }

    public void run() {
        // Using method reference to call the printMessage method
        Runnable task = () -> Printer.printMessage("Hello, world!");  // Lambda
        task.run();  // Output: Hello, world!

        // Using method reference for the same call
        Runnable taskWithMethodRef = Printer::printMessage;  // Method reference
        taskWithMethodRef.run();  // Output: Hello, world!
    }
}
```
The use of the double colons **`::`** indicates to the Java compiler that a method reference is being used. The method being referenced appears after the double colons, while the class or object owning that method is placed before the double colons.

## 7.1. Static Method Reference
A static methods are the easiest to reference within a lambda expression. This approach is particularly useful when you want to call a static method using the same parameters passed to the lambda expression.
```java
class Calculator {
    // Static method that will be referenced
    public static int add(int a, int b) {
        return a + b;
    }
}

MathOperation addition = Calculator::add;
// Invoking the method via the reference
System.out.println("Sum: " + addition.operate(5, 3));  // Output: Sum: 8
```
- The method reference Calculator::add points to the static add method in the Calculator class.
- Instead of writing a full lambda expression like **`(a, b) -> Calculator.add(a, b)`**, we can simply reference the method using **`Calculator::add`**.

### 7.2. Parameter Method Reference
A parameter method reference allows you to refer to a method that operates on an argument passed to the lambda expression. This method reference can be used when you want to call a method on each element of a collection or on the arguments passed to the lambda.

```java
class Person {
    String name;

    public Person(String name) {
        this.name = name;
    }

    // Method to be referenced
    public void greet() {
        System.out.println("Hello, " + name + "!");
    }
}

List<Person> people = Arrays.asList(new Person("Alice"), new Person("Bob"));

        // Using method reference to call the greet method on each Person object
        people.forEach(Person::greet);  // Output: Hello, Alice! Hello, Bob!
```
- The method reference Person::greet refers to the greet method of the Person class.
- Instead of writing a lambda expression like **`person -> person.greet()`**, we directly reference the greet method using **`Person::greet`**.
- The method greet is called for each Person object in the list.

### 7.3. Constructor Reference
A constructor reference allows you to refer to a constructor directly in the form of a method reference. This is useful when you want to instantiate objects without explicitly calling the new keyword in a lambda expression.

```java
//Example using the same class Person class
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Using constructor reference to create Person objects from the names list
names.stream()
        .map(Person::new)  // Constructor reference
        .forEach(Person::greet);  // Calling greet method
```
- The constructor reference **`Person::new`** refers to the Person class constructor that takes a String as an argument.
- Instead of writing a lambda expression like **`name -> new Person(name)`**, we use **`Person::new`** to create new Person objects.
- This is passed to the map function, which creates a new Person object for each name in the list.

---

Java Lambda expressions are a powerful feature introduced in Java 8 that simplify the implementation of functional interfaces and improve the clarity and efficiency of your code. By using lambda expressions, developers can write more concise and expressive code while taking advantage of enhanced features like type inference and better support for concurrency. Understanding lambda expressions is crucial for modern Java programming, and mastering them will significantly improve your coding practices.


- [Github Lambda Exercises Repository](https://github.com/laiszig/java_sandbox/tree/main/functional_programming/lambdas/java_lambda_exercises) containing a series of exercises and examples focused on Java lambda expressions.

---

**Sources:** 

- K. Sierra, B. Bates, and T. Gee, Head First Java: A Brain-Friendly Guide. 2022.

- Oracle, 2023. Lambda expressions (The Java™ Tutorials). Available at: https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html [Accessed 30 December 2024].

- Oracle, 2023. Java Lambda Quick Start. Available at: https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/lambda-quickstart/index.html [Accessed 30 December 2024].

- Jenkov, J., 2023. Java Lambda Expressions Tutorial. Available at: https://jenkov.com/tutorials/java/lambda-expressions.html [Accessed 30 December 2024].

- Java Brains, 2023. Lambda Expressions in Java - Java Brains. YouTube. Available at: https://www.youtube.com/watch?v=lIXs4Y8sJCk&list=PLL8woMHwr36HQhhPPdV_T8rigbuywMpD7&index=1 [Accessed 30 December 2024].