# Java functional programming

Functional programming (FP) is a **programming paradigm** that focuses on creating programs using pure functions that always produce the same output for a given input and have no side effects, avoiding changes in state or mutable data. This approach is **declarative**, emphasizing what to **do** rather than **how** to do it. 
Historically, Java wasn't designed with functional programming in mind, making it challenging to implement many of its principles. However, with Java 8, Oracle introduced features like lambdas and the Stream API, making functional programming more accessible. 

## Key Conceps

Before Java 8, passing functions typically required constructs like anonymous inner classes or functional interfaces. Java 8 introduced features to simplify this:
- Lambda Expressions: Provide a concise way to define function-like behavior.
- Method References: Allow referencing existing methods as lambdas.
- Predefined Functional Interfaces: Simplify common use cases (e.g., Predicate, Function, Consumer).

### Functions as First Class Objects

In functional programming, functions are treated as first-class citizens. This means they can be assigned to variables, passed as arguments to other functions, and returned as values from functions - just like objects such as `String` or `Map`. This capability enables powerful techniques like higher-order functions, function composition, and currying.

Despite improvements in Java 8, Java does not fully treat functions as first-class citizens. Behind the scenes, lambda expressions are still objects wrapped into functional interfaces (a special type of interface with exactly one abstract method), also known as a **Single Abstract Method (SAM) interface**. Thus, Java retains its object-oriented nature while borrowing functional programming ideas. Lambda example:
```java
Collections.sort(numbers, (n1, n2) -> n1.compareTo(n2));
```
- Code that sorts the numbers list in ascending order using the Comparable interface

In other words, Java offers the tools to mimic first-class functions through constructs like lambdas and functional interfaces, enabling developers to write more functional-style code while staying within the bounds of Java's object-oriented design.

In summary, to classify functions as first-class citizens, they must satisfy these conditions:
- A function can be assigned to a variable.
- A function can be passed as an argument to another function.
- A function can return another function as its result.

### Higher-Order Functions

Higher-order functions leverage first-class function properties by either accepting functions as **arguments** or returning them as **outputs**. Passing functions is similar to passing objects in traditional Java.

- When a function can produce another function as a result we call them *Returning Functions*.

In Java, higher-order functions are typically implemented using lambda expressions. For instance, a method that takes lambda expressions as arguments or returns a lambda as its output qualifies as a higher-order function.

```java
public class HigherOrderFunctionExample {

    public static <T, R> List<R> transformList(List<T> inputList, IProducer<R> producer, ITransformer<T, R> transformer) {
        List<R> result = new ArrayList<>();
        for (T item : inputList) {
            R intermediate = producer.produce();
            R transformed = transformer.transform(item, intermediate);
            result.add(transformed);
        }
        return result;
    }
}

// Supporting interfaces
public interface IProducer<R> {
    R produce();
}

public interface ITransformer<T, R> {
    R transform(T input, R intermediate);
}
```
The `transformList` method accepts a list of items to process `inputList`. And two functional interfaces. `IProducer<R>` for producing an initial result and `ITransformer<T, R>` for transforming each input item (T) into an output (R). Then, combines the result of producer and transformer for each item in the list.

#### Real-World Examples of Higher-Order Functions
1. Sorting with `Collections.sort()`

The `Collections.sort()` method is a classic example of a higher-order function because it accepts a Comparator as an argument, which can be implemented as a lambda:
```java
List<String> list = new ArrayList<>();
        list.add("Banana");
        list.add("Apple");
        list.add("Mango");
        list.add("Pineapple");

Collections.sort(list, (String a, String b) -> {
    return a.compareTo(b);
});
```
Or we could create a custom rule defined by a lambda function using `Collections.sort()`:
```java
public static List<String> sortWithCustomRule(List<String> list, Comparator<String> comparator) {
        Collections.sort(list, comparator);
        return list;
    }

// Implementation
// Sort based on string length
        sortWithCustomRule(list, (a, b) -> Integer.compare(a.length(), b.length()));
// Sort in reverse alphabetical order
        sortWithCustomRule(list, (a, b) -> b.compareTo(a));
```

2. Reversing with `Comparator.reversed()`

The `reversed()` method of the Comparator interface is another example. It returns a new function (a reversed comparator), satisfying the second condition of higher-order functions:
```java
Comparator<Integer> comparator = (Integer a, Integer b) -> Integer.compare(a, b);
Comparator<Integer> comparatorReversed = comparator.reversed();

List<Integer> numbers = Arrays.asList(5, 2, 8, 1, 3);
Collections.sort(numbers, comparatorReversed);

System.out.println(numbers);
```

The comparator sorts integers in ascending order using `Integer.compare(a, b)`. The `reversed()` method produces a new Comparator lambda that reverses the order. Since `reversed()` returns a function, it qualifies as a higher-order function.

### Pure Functions

A pure function in programming adheres to two key principles:

- **No Side Effects:** The function does not alter any state outside its scope or interact with external systems. Side effects include modifying class variables, altering parameters, or interacting with external systems like files or databases.
- **Referential Transparency:** For a given input, the function always produces the same output, regardless of external factors.

#### Pure Function: 
```java
public double calculateCircleArea(double radius) {
    return Math.PI * radius * radius;
}
```

In this case, the function `calculateCircleArea()` depends solely on the radius parameter for its output. It has no side effects and does not interact with any external state or system.

#### Non-pure function exmaple:
```java
private double lastCalculatedArea = 0;

public double addToArea(double radius) {
    this.lastCalculatedArea += Math.PI * radius * radius;
    return this.lastCalculatedArea;
}
```

Here, the method uses the `lastCalculatedArea` variable to calculate its return value. It also modifies the state of the value member variable, so it has a side effect.

#### Referential Transparency
A function is referentially transparent if it consistently produces the same result for the same input, regardless of when or how often it is called.
```java
public double fahrenheitToCelsius(double fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
```

This function will always return the same Celsius value for a given Fahrenheit input.

#### Non-transparent example
```java
public double fahrenheitToCelsius(double fahrenheit) {
    return (fahrenheit - 32) * 5 / getScaleFactor();
}

private double getScaleFactor() {
    return Math.random();
}
```
Here the result depends on the `getScaleFactor()` method, which introduces randomness and violates referential transparency.

Referential transparency also means that an expression can be replaced with its evaluated value without changing the program's behavior. This property is fundamental to functional programming, enabling techniques like lazy evaluation and higher-order functions.
```java
public double calculateRectangleArea(double width, double height) {
    return width * height;
}
```

This function is referentially transparent because replacing the function call `calculateRectangleArea(5, 10)` with `50` has no side effects and does not alter the program's behavior.

**Legitimate Side Effects:** In some cases, side effects are necessary (e.g., saving results to a database). Functional programming often handles such scenarios by separating pure computation from side-effectful actions, ensuring a clear distinction.

### Immutability
Immutability ensures that an object **cannot be modified** after its creation. This principle is central to functional programming and helps to prevent unintended side effects, making programs easier to reason about and debug.

In Java, immutability is not enforced by the language itself but can be achieved by following certain practices, such as:
- Declaring fields as final.
- Using constructors to initialize fields.
- Avoiding setter methods.
- Ensuring nested objects are also immutable.

```java
public class ImmutableBook {
    private final String title;
    private final ImmutableAuthor author;

    public ImmutableBook(final String title, final ImmutableAuthor author) {
        this.title = title;
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public ImmutableAuthor getAuthor() {
        return author;
    }
}

public class ImmutableAuthor {
    private final String name;

    public ImmutableAuthor(final String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
```
- The `ImmutableBook` and `ImmutableAuthor` classes ensure immutability by making all fields `final`.
- No setter methods are provided, ensuring that fields cannot be modified after initialization.

### No state
In functional programming, functions must avoid relying on **external state**. This ensures that the function's behavior depends only on its inputs, making it predictable and testable.

```java
public class Calculator {
    public int sum(int a, int b) {
        return a + b;
    }
}
```

The `sum()` method uses only its parameters and no external state, adhering to the "no state" rule.

#### Violating "No State"
```java
public class Calculator {
    private int initVal = 5;

    public int sum(int a) {
        return initVal + a;
    }
}
```
Here, the function relies on the initVal field, making it impure because its output depends on external state.

## Functional Programming Techniques in Java
Functional programming in Java is centered on combining smaller functions to build more complex operations. This enables concise, modular, and reusable code. This section explores core techniques like function composition, function chaining, and the role of functional interfaces. As seen in a previous post, a functional interface is an interface with only one abstract (unimplemented) method. 
- Functional interfaces are a cornerstone of functional programming in Java, enabling the use of lambda expressions and method references for concise and expressive code. It may include multiple default or static methods, as long as only one method remains abstract.

### Function Composition
Function composition **combines** two or more functions into a **single** function which uses the combined functions **internally**. Meaning the **output** of one function becomes the **input** of the next.
We can compose our individual functions into a combined function ourselves, but in Java, functional interfaces such as Function, Predicate, and Consumer support this through default and static methods like `compose()` and `andThen()`.
- **`compose()`**
The compose() method creates a new Function by combining the Function it is called on with another Function passed as a parameter. The composed Function will first execute the parameter function and then the calling function.
- **`andThen()`**
The andThen() method creates a new Function by combining the Function it is called on with another Function passed as a parameter. The composed Function will first execute the calling function and then the parameter function.

```java
Function<Double, Double> log = (value) -> Math.log(value);
Function<Double, Double> sqrt = (value) -> Math.sqrt(value);

// logThenSqrt: Apply log first, then sqrt
Function<Double, Double> logThenSqrt = sqrt.compose(log);
System.out.println(logThenSqrt.apply(3.14)); // Output: 1.06

// sqrtThenLog: Apply sqrt first, then log
Function<Double, Double> sqrtThenLog = sqrt.andThen(log);
System.out.println(sqrtThenLog.apply(3.14)); // Output: 0.57
```
- `compose()`: Executes the `log()` function **before** `sqrt()`.
- `andThen()`: Executes the `log()` function **after** `sqrt()`.
Note:
- a.compose(b) is equivalent to b.andThen(a).
- Understanding the order of execution is key when using these methods for function composition.

#### Predicate Composition
Predicate provides methods like `and()`, `or()`, and `negate()` for composing conditions.
```java
Predicate<String> startsWithE = text -> text.startsWith("E");
Predicate<String> endsWithS = text -> text.endsWith("s");

// Combine conditions
Predicate<String> startsWithEAndEndsWithS = startsWithE.and(endsWithS);

String input = "Everyday brings opportunities";
boolean result = startsWithEAndEndsWithS.test(input); // True
System.out.println(result);
```
- `and(Predicate<? super T> other)`: Combines two predicates with logical AND.
- `or(Predicate<? super T> other)`: Combines two predicates with logical OR.
- `negate()`: Returns the logical negation of a predicate.

### Monads
In practical programming terms, monads simplify structuring programs to handle operations such as transformation and chaining in a standardized way.
- A monad is an abstraction that allows us to:
    - Wrap a value.
    - Apply a series of transformations.
    - Extract the value with all transformations applied.
- Monads also follow three fundamental laws:
    - Left Identity: Wrapping a value and then applying a function should yield the same result as directly applying the function.
    - Right Identity: Applying a function to a wrapped value should yield the same result as the original value if the function is an identity function.
    - Associativity: The order of applying transformations should not affect the final result.

**Monads in Java:** In Java, commonly used monads include Optional, Stream, and CompletableFuture. Let’s explore these with examples.
- The Optional class wraps a value and provides methods like `flatMap()` for chaining transformations.
```java
Optional<Integer> result = Optional.of(2)
    .flatMap(f -> Optional.of(3)
        .flatMap(s -> Optional.of(f + s)));

System.out.println(result); // Output: Optional[5]
```
- `Optional.of(2)` wraps the value 2.
- `flatMap()` applies transformations, passing the unwrapped value to the next operation.
- The final result is wrapped again into an Optional.

Other examples:
```java
// Stream: A monad for processing sequences of data.
Stream.of(1, 2, 3)
      .flatMap(x -> Stream.of(x * 2))
      .forEach(System.out::println); 
// Output: 2, 4, 6

// CompletableFuture: A monad for asynchronous computations.
CompletableFuture.supplyAsync(() -> 5)
                 .thenApply(x -> x * 2)
                 .thenAccept(System.out::println);
// Output: 10
```
**Note:** Java allows developers to create their own monads for specific objectives, such as logging, auditing, or reporting. For example, a Log Monad could combine a value with log messages throughout transformations. Other than logging, monads are often used in functional programming to handle other side effects like Error handling and Asynchronous execution.

### Currying
Currying is a technique in functional programming where a function taking multiple arguments is transformed into a series of functions, each accepting a single argument. This technique enhances function composition and allows us to work with partially applied functions.

1. Currying transforms a function `f(a, b, c)` into a sequence: `f(a) -> f'(b) -> f''(c)`.
2. It **defers** execution until all arguments are provided.
3. Enables **partial application**, where functions can be customized by providing some of their arguments upfront.

- Currying in Java: Unlike pure functional languages like Haskell, where all functions are curried by default, Java requires more explicit steps. Java’s support for lambda expressions and closures makes currying possible.

Example of curried function for temperature conversion, where we can partially apply a formula for different conversion types (e.g., Fahrenheit to Celsius, Celsius to Kelvin).
```java
Function<String, Function<Double, Double>> convertTemperature = scale -> value -> {
    switch (scale) {
        case "CtoF": return (value * 9 / 5) + 32; // Celsius to Fahrenheit
        case "FtoC": return (value - 32) * 5 / 9; // Fahrenheit to Celsius
        case "CtoK": return value + 273.15;      // Celsius to Kelvin
        default: throw new IllegalArgumentException("Invalid scale");
    }
};

// Define specific conversion functions
Function<Double, Double> celsiusToFahrenheit = convertTemperature.apply("CtoF");
Function<Double, Double> fahrenheitToCelsius = convertTemperature.apply("FtoC");
Function<Double, Double> celsiusToKelvin = convertTemperature.apply("CtoK");

// Use the functions
System.out.println("25°C to Fahrenheit: " + celsiusToFahrenheit.apply(25.0)); // Output: 77.0
System.out.println("77°F to Celsius: " + fahrenheitToCelsius.apply(77.0));   // Output: 25.0
System.out.println("25°C to Kelvin: " + celsiusToKelvin.apply(25.0));        // Output: 298.15
```
- Closures in Currying
Closures allow lambda expressions to access variables in their enclosing scope. In Java, such variables must be final or effectively final.

For example, we can define a specific temperature conversion function for Fahrenheit to Celsius:
```java
private static Function<Double, Double> fahrenheitToCelsius() {
    final double factor = 5.0 / 9.0; // Closure variable
    return fahrenheit -> (fahrenheit - 32) * factor;
}
```

Here, the lambda captures the factor variable, and since it doesn't change after initialization, Java treats it as effectively final.

- **Partial Application:** Currying enables partial application by fixing some arguments of a function to create specialized functions.

Example: Volume of a Cylinder
```java
Function<Double, Function<Double, Double>> calculateVolume = radius -> height -> Math.PI * radius * radius * height;

// Partially apply the radius
Function<Double, Double> volumeWithRadius5 = calculateVolume.apply(5.0);

System.out.println("Volume of cylinder with radius 5 and height 10: " + volumeWithRadius5.apply(10.0)); // Output: 785.398163
System.out.println("Volume of cylinder with radius 5 and height 15: " + volumeWithRadius5.apply(15.0)); // Output: 1178.097245
```

**Applications**
- Reusability: Partial application allows functions to be reused across different scenarios.
- Readability: Breaking down complex logic into smaller, composable pieces.
- Custom Functional Interfaces: Currying can mimic multi-argument functions in Java using chained lambdas.

### Recursion
Instead of using loops for iteration, functional programming encourages recursion, where a function calls itself. 
```java
public int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```

Alternatively, you can use functional constructs like Java’s Streams API (Functional Alternative to Loops).
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream().reduce(0, Integer::sum); // Sum using Streams
```

Recursion is a fundamental technique in functional programming that involves solving a problem by breaking it down into smaller, simpler instances of the same problem. It is especially useful in situations where problems can naturally be divided into subproblems, and each subproblem follows the same pattern as the original problem.

The main benefit of recursion is that it often eliminates the need for mutable state and side effects, which are commonly present in imperative-style loops. This can lead to more declarative and cleaner code.

- **Example 1: Fibonacci Sequence**

The Fibonacci sequence is a classic example of recursion. In this sequence, each number is the sum of the two preceding ones, starting from 0 and 1. The nth Fibonacci number can be expressed as:
```java
F(n) = F(n-1) + F(n-2)

// Here’s how we can implement this in Java:
Integer fibonacci(Integer n) {
    return (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
```
- If n is 0 or 1, we return n (base case).
- Otherwise, we return the sum of the two previous Fibonacci numbers by making recursive calls.

#### Head Recursion in Fibonacci
In the above implementation, the recursive calls happen **before** the final calculation (i.e., at the head of the function). This is an example of head recursion, where the recursive function must remember the result of previous calls until the base case is reached.
- Drawback: For large n, the function needs to remember the entire call stack for each call until the base case is reached, which can be inefficient.

- **Example 2: Sum of Numbers in a List**

Let's consider a simple recursive example to compute the sum of elements in a list. For a list of integers, we recursively add the first element and the sum of the remaining elements.

```java
Integer sum(List<Integer> list) {
    return list.isEmpty() ? 0 : list.get(0) + sum(list.subList(1, list.size()));
}
```
- The base case is when the list is empty, in which case we return 0.
- Otherwise, we add the first element (list.get(0)) and make a recursive call with the remaining elements of the list (list.subList(1, list.size())).

#### Tail Recursion in Sum Calculation
We can refactor this to use tail recursion by accumulating the result in an additional parameter:
```java
Integer sum(List<Integer> list, Integer accumulator) {
    return list.isEmpty() ? accumulator : sum(list.subList(1, list.size()), accumulator + list.get(0));
}
```
The function now takes an additional accumulator parameter that holds the ongoing sum.
The recursive call is made last in the function, making this tail recursion.
This implementation avoids holding state for each recursive call, making it more memory efficient.

#### Tail Recursion and Efficiency
Tail recursion is more efficient because the recursive call is the last operation performed, and the compiler or runtime can optimize it by reusing the same stack frame, avoiding the buildup of a call stack. However, Java does not yet support tail-call elimination, so even with tail recursion, Java functions will still consume stack frames.
```java
String reverse(String str) {
    return (str.isEmpty()) ? str : reverse(str.substring(1)) + str.charAt(0);
}
```
- The base case is when the string is empty, in which case we return the empty string.
- Otherwise, we reverse the substring (excluding the first character) and then append the first character at the end.

Tail Recursion in String Reversal
For a more efficient version of string reversal, we can use an accumulator to store the reversed string as we go along:
```java
String reverse(String str, String accumulator) {
    return (str.isEmpty()) ? accumulator : reverse(str.substring(1), str.charAt(0) + accumulator);
}
```
- In this implementation, we pass the accumulator (which stores the reversed string) at each step.
The recursive call is made last, making this version tail-recursive.

| **Type of Recursion** | **Description** | **Efficiency** |
|-----------------------|-----------------|----------------|
| **Head Recursion**     | The recursive call is made before processing the result. It can be inefficient because the function needs to retain the state for each recursive call until the base case is reached. | Can be inefficient for deep recursion due to retaining state. |
| **Tail Recursion**     | The recursive call is the last operation in the function. This is more efficient because the compiler or runtime can optimize it by reusing the current function's stack frame. | More efficient because of potential optimization (tail-call elimination), but Java does not support this optimization. |
| **Efficiency**         | While tail recursion can improve efficiency by reducing memory usage, Java does not yet support tail-call optimization, so deep recursion could still lead to a stack overflow. | Java’s lack of tail-call optimization means deep recursion can still result in a stack overflow. |

Recursion is a great technique for problems that can be naturally broken down into smaller subproblems. However, for deep recursion in Java, it is important to consider alternatives or use tail recursion to minimize memory consumption.

## Why Functional Programming Matters

Adopting functional programming (FP) in Java can be challenging for developers coming from a non-functional programming background, but the benefits make it worthwhile. Here are the key advantages of functional programming:

### Key Benefits:
- **Pure Functions & Immutable State**: By eliminating side effects and mutable state, FP helps make programs easier to read, reason about, test, and maintain.
- **Declarative Programming**: FP allows for concise and readable code by focusing on what needs to be done rather than how. This is in contrast to imperative programming, which focuses on the steps to achieve a result.
- **Higher-Order Functions**: Functions can accept other functions as parameters or return them as results, making code more flexible and reusable.
- **Function Composition & Chaining**: Allows for the combination of functions to create more complex operations, improving modularity and code clarity.
- **Stream API (Java 8)**: Introduced functional constructs for data manipulation, bringing benefits like declarative queries and easy parallelism.

### Challenges:
- Functional programming requires a shift in how problems and solutions are structured. It’s not a simple design pattern but a fundamental change in approach.
- **Preparation**: Before adopting FP, developers need to reframe how they think about problems and organize algorithms.

### Conclusion:
Functional programming brings significant advantages in terms of clarity, maintainability, and testing. However, adopting FP in Java requires careful consideration and a shift in mindset before fully transitioning.
