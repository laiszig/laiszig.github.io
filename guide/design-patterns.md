---
layout: compress
permalink: /guide/design-patterns.md
---

# Singleton Pattern

The Singleton is a **creational design pattern** that ensures a class has only one instance and provides a global access point to it. It solves two main problems, so it violates the _Single Responsibility Principle_:

1. **Single Instance**  
   It provides controlled access to shared resources like databases or files. Instead of creating a new object every time, the pattern ensures you always receive the same instance. This behavior is not achievable with a standard constructor, which always creates a new object.

2. **Global Access**  
   Like global variables, the Singleton provides universal access to an object but ensures it cannot be overwritten, avoiding the risks associated with global variables. It consolidates instance management into a single class, simplifying maintenance and reducing code duplication.

### Key Features

-   The Singleton class has a static `getInstance` method that creates or retrieves the instance.
-   Its constructor is private, making direct instantiation impossible.
-   The pattern often employs lazy initialization, creating the instance only when it is first requested.

<img src="/assets/images/guide/singleton.jpg" height="50%" width="50%">

### Use Cases

-   When a class must have exactly one instance, such as for a database connection.
-   When global variables are needed but require stricter control and protection from being overwritten.

🍃 In Spring Framework, the Singleton pattern is a core principle for managing beans. By default, Spring's `@Component`, `@Service`, and similar annotations create beans with a singleton scope, ensuring that only one instance of the bean exists within the application context. This approach promotes efficient resource management and consistency, as all parts of the application share the same instance. Unlike traditional singletons, Spring manages these instances through dependency injection, making them easier to test and reducing coupling. For cases where different scopes are needed, such as _prototype_ or _request_ scopes, Spring allows customizing the bean's lifecycle with annotations like `@Scope`.

### Benefits and Drawbacks

**Pros**

-   Guarantees a single instance of the class.
-   Provides a controlled global access point.
-   Delays initialization until the instance is required, saving resources.

**Cons**

-   Violates the Single Responsibility Principle by solving multiple problems.
-   Can lead to tightly coupled code and mask poor design.
-   Requires careful handling in multithreaded environments.
-   Complicates unit testing, as the private constructor and static methods can hinder mock object creation.

### Implementation Notes

-   Use a private static field to store the instance.
-   Provide a public static method to create or access the instance.
-   Replace direct constructor calls in client code with the static method.
-   If we are dealing with a multithreaded application, we need to place a thread lock inside the `getInstance` method.

#### ➡️ GitHub repository showcasing the [Singleton Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/singleton), including examples of potential pitfalls and strategies to prevent them.

---

# Factory Pattern

The Factory Pattern is a **creational design pattern** that provides an interface for creating objects in a superclass, allowing subclasses to alter the type of objects that will be created. It decouples the object creation process from the client code, making the application more flexible and maintainable.

## Key Features

-   **Abstracts Object Creation**: The Factory Pattern centralizes object instantiation, ensuring the client code doesn’t rely on specific class constructors.
-   **Promotes Code Reusability**: By using a factory, you can reuse the object creation logic across multiple parts of your application.
-   **Encapsulates Complexity**: Complex creation logic can be hidden within the factory, simplifying the client code.

<img src="/assets/images/guide/factory.jpg" width="70%" height="70%">

**1.** Product declares the INTERFACE. It is common to all the products that can be made.\
**2.** Each concrete product has its own implementation.\
**3.** Creator class declares the factory method and returns a type that matches the product interface.

-   The factory method can be either abstract, to force all the concrete creators to implement it, or return a default product type.
-   Usually, it contains business logic.

**4.** The concrete creators override the factory method and return a different type of product. It can be a new product, or reuse an already created one.

## Use Cases

-   When a class cannot anticipate the type of objects it needs to create.
-   When you want to delegate the responsibility of instantiation to a centralized factory.
-   When you need more control over the instantiation process, such as with configurable objects or subclasses.
-   When you want to save system resources by reusing existing objects rather than recreating them repeatedly.

## Benefits and Drawbacks

**Pros**

-   Decouples object creation from the client code.
-   Simplifies code maintenance and reduces duplication.
-   Enhances scalability by supporting new object types without modifying existing code.

**Cons**

-   Increases complexity due to additional classes and interfaces.
-   May lead to code scattering if not well-structured.
-   Overhead when the factory logic is trivial and unnecessary.

## Implementation Notes

-   Define a factory interface or abstract class.
-   Create concrete implementations for specific object creation.
-   Use polymorphism to determine the appropriate object to instantiate at runtime.
-   Avoid hardcoding types in the factory; leverage configuration or parameters to decide object creation.

#### ➡️ GitHub repository demonstrating the [Factory Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/factory), featuring examples of different use cases, common mistakes, and best practices to ensure maintainability and scalability.

---

# Abstract Factory Pattern

The Abstract Factory Pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It is often used when the system needs to be independent of the way its objects are created, composed, and represented.

## Key Features
- **Creates Families of Objects**: The Abstract Factory is designed to create groups of related objects, ensuring consistency within the family.
- **Encapsulates Object Creation**: The pattern encapsulates the creation logic, keeping it separate from the client code.
- **Promotes Scalability**: It allows for easy expansion of object families without modifying the existing code.

<img src="/assets/images/guide/abstract-factory.jpg" height="65%" width="65%">

1. **Abstract Products**: Define the interfaces for the objects that the factory creates.
2. **Concrete Products**: Implement the interfaces defined by the abstract products.
3. **Abstract Factory**: Declares interfaces for creating abstract products.
4. **Concrete Factory**: Implements the creation methods for specific product families.
5. **Client Code**: Uses the factory interfaces to create objects, without knowing their specific types.

## Use Cases
- When the application needs to support multiple object families that are designed to work together.
- When the system needs to be independent of how its products are created.
- When adding new product families should require minimal changes to the codebase.

## Benefits and Drawbacks
**Pros**
- Ensures compatibility between related objects.
- Supports Single Responsibility Principle and reduces code duplication by extracting and centralizing object creation.
- Supports open/closed principle by allowing new families to be added without altering existing code.

**Cons**
- Increases the complexity of the codebase with additional interfaces and classes.
- Can result in a rigid design if many families are predefined and rarely change.
- May introduce unnecessary abstraction when there is no need for multiple families of products.

## Implementation Notes
- Create an interface or abstract class for the factory, defining methods to create each type of product.
- Implement concrete factories for each family of related objects.
- Define abstract products with interfaces or abstract classes.
- Implement concrete products for each product type in the family.
- Use dependency injection to pass the desired factory into the client.

#### ➡️ GitHub repository showcasing the [Abstract Factory Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/abstract-factory)

