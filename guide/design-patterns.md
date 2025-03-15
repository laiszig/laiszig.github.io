---
layout: compress
permalink: /guide/design-patterns.md
---

## Table of Contents

1. Creational Patterns
- [Singleton Pattern](#singleton-pattern)
- [Factory Pattern](#factory-pattern)
- [Abstract Factory Pattern](#abstract-factory-pattern)
- [Builder Pattern](#builder-pattern)
- [Prototype Pattern](#prototype-pattern)
2. Structural Patterns
- [Adapter Pattern](#adapter-pattern)
- [Decorator Pattern](#decorator-pattern)
- [Proxy Pattern](#proxy-pattern)
- [Bridge Pattern](#bridge-pattern)
3. Behavioral Patterns
- [Chain of Responsibility Pattern](#chain-of-responsibility-pattern)


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

---

# Builder Pattern

The Builder Pattern is a creational design pattern that provides a step-by-step process to construct complex objects. 
It separates the construction process from the representation, allowing the same construction process to create different representations.

## Key Features
- **Step-by-Step Construction**: The pattern focuses on building an object incrementally.
- **Separates Construction Logic**: Keeps the object creation process separate from the object itself.
- **Handles Complex Objects**: Particularly useful for creating objects with multiple optional parameters or complex setups.

## Use Cases
- When an object has many optional attributes or requires a specific sequence of initialization steps.
- To avoid telescoping constructors or overly complex constructors.
- When the construction process must allow for different representations of the final product.

## Benefits and Drawbacks
**Pros**
- Simplifies the creation of complex objects with multiple configuration options.
- Enhances code readability and maintainability by organizing the object creation logic.
- Provides control over the construction process, ensuring a valid and consistent object state.

**Cons**
- Increases the number of classes and code complexity due to the creation of additional builder classes.
- May feel unnecessary for simple objects with few attributes.

## Structure
1. **Builder Interface**: Defines the methods for constructing parts of the object.
2. **Concrete Builder**: Implements the builder interface to construct and assemble the parts of the product.
3. **Product**: Represents the complex object being built.
4. **Director**: Controls the construction process by using the builder's methods.
5. **Client**: The client code creates a builder object, passes it to the director and then initiates the construction process.

<img src="/assets/images/guide/builder.jpg" height="60%" width="60%">


## Implementation Notes
- Define a `Builder` interface with methods to set each property or part of the product.
- Create concrete builder classes to implement these methods.
- Use a `Director` class to control the construction process by calling the builder methods in a specific sequence.
- Return the final product using a `build()` method in the builder.

#### ➡️ GitHub repository showcasing the [Builder Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/builder)

---

# Prototype Pattern

The Prototype Pattern is a creational design pattern that allows objects to be cloned efficiently. Instead of creating new instances from scratch, it enables copying an existing object, preserving its state while allowing modifications if needed.

## Key Features
- **Object Cloning**: Instead of creating new objects from scratch, it duplicates existing ones.
- **Improves Performance**: Reduces the overhead of complex object creation.
- **Preserves Object Structure**: Ensures that copied objects maintain the original’s structure and attributes.

## Use Cases
- When object creation is costly and time-consuming (e.g., database queries, API calls).
- When an application needs multiple similar objects with slight variations.
- When objects need to be created dynamically at runtime instead of being predefined.

## Benefits and Drawbacks
**Pros**
- Enhances performance by avoiding repetitive object creation.
- Reduces dependencies on constructors and avoids complex initialization logic.
- Provides flexibility in object creation with minimal changes.

**Cons**
- Requires careful handling of deep vs. shallow copies to avoid unintended references.
- Cloning complex objects with deep hierarchies can be tricky.
- May introduce unintended side effects if mutable objects are shared between copies.

## Structure
1. **Prototype Interface**: Declares a `clone()` method for copying objects.
2. **Concrete Prototype**: Implements the prototype interface and defines how the object is cloned.
3. **Client**: Uses the prototype to create new objects by copying an existing instance.
<img src="/assets/images/guide/basic-prototype.jpg" height="50%" width="50%">

### Prototype Pattern with Registry
1. The Registry can be used to store a set of pre-built objects that are ready to be copied.
<img src="/assets/images/guide/registry-prototype.jpg" height="50%" width="50%">

## Implementation Notes
- Use **shallow cloning** when the object contains only primitive fields or immutable objects.
- Use **deep cloning** when the object has references to mutable objects that need to be copied separately.
- Implement the `clone()` method using built-in cloning mechanisms (e.g., Java’s `Cloneable` interface) or custom copying logic.

#### ➡️ GitHub repository showcasing the [Prototype Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/singleton)

---

# Adapter Pattern

The Adapter Pattern is a structural design pattern that allows incompatible interfaces to work together. It acts as a bridge between two interfaces, enabling one system to use another without modifying its source code.

## Key Features
- **Bridges Incompatible Interfaces**: Allows objects with different interfaces to communicate.
- **Encapsulates Adaptation Logic**: Keeps the original class and client code unchanged.
- **Improves Code Reusability**: Enables integration with existing components without altering them.

## Use Cases
- When you need to use an existing class but its interface doesn’t match what your code expects.
- When integrating third-party libraries or legacy code that cannot be modified.
- When migrating systems while maintaining backward compatibility with old components.

## Structure
1. **Client**: The component that interacts with the target interface. 
2. **Target Interface**: Defines the expected interface used by the client.
3. **Adapter**: A wrapper that translates requests from the client into a format the adaptee understands.
4. **Adaptee**: The existing class with an incompatible interface. 

<img src="/assets/images/guide/adapter.jpg" height="50%" width="50%">

## Benefits and Drawbacks
**Pros**
- Increases code reusability by allowing existing classes to be used in new ways.
- Decouples code, making it easier to switch to different implementations.
- Provides a clean separation between interface conversion logic and business logic.

**Cons**
- Adds extra complexity by introducing an additional layer.
- Can impact performance if too many adapters are used.
- May lead to excessive use, making the codebase harder to maintain.

## Implementation Notes
- Implement the adapter as a **class** (object adapter) or **inheritance-based** (class adapter).
- Ensure that the adapter correctly delegates functionality without modifying the original adaptee.
- Keep the adapter lightweight to minimize performance overhead.

#### ➡️ GitHub repository demonstrating the [Adapter Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/adapter)

---

# Decorator Pattern

The Decorator Pattern is a structural design pattern that allows behavior to be dynamically added to individual objects without modifying their class. It provides a flexible alternative to subclassing for extending functionality.

## Key Features
- **Extends Object Functionality Dynamically**: Enhances behavior without altering the original class.
- **Encapsulates Changes**: Keeps modifications separate from the main logic.
- **Promotes Open/Closed Principle**: Allows extension without modifying existing code.

## Use Cases
- When you need to add responsibilities to objects at runtime.
- When subclassing leads to an explosion of derived classes.
- When modifications should be applied selectively and independently.

## Benefits and Drawbacks
**Pros**
- Promotes flexible and reusable code by avoiding class inheritance.
- Allows for combining multiple behaviors dynamically.
- Keeps the core class simple and focused.

**Cons**
- Can introduce complexity with many small decorator classes.
- Makes debugging more difficult due to multiple layers of wrapping.
- Increases the number of objects in memory.

## Structure
1. **Component**: Defines the common interface for both the base class and decorators.
2. **Concrete Component**: The primary class being extended.
3. **Base Decorator (Abstract Class or Interface)**: Holds a reference to a component and delegates calls.
4. **Concrete Decorators**: Implement new behaviors and modify the original object's behavior dynamically.
5. **Client**: The Client can wrap components in multiple layers of decorators.

<img src="/assets/images/guide/decorator.jpg" height="50%" width="50%">

## Implementation Notes
- Ensure decorators follow the same interface as the base component.
- Use composition instead of inheritance to apply multiple decorators.
- Keep decorators lightweight to minimize performance overhead.

#### ➡️ GitHub repository demonstrating the [Decorator Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/decorator)

---

# Proxy Pattern

The Proxy Pattern is a structural design pattern that provides a substitute or placeholder for another object. It controls access to the original object, adding an extra layer of control or functionality.

## Key Features
- **Controls Object Access**: Manages how and when the real object is accessed.
- **Improves Performance**: Can defer resource-intensive operations until needed (lazy initialization).
- **Enhances Security**: Restricts access based on permissions or validation.

## Use Cases
- **Virtual Proxy**: Delays object creation until it's actually needed (e.g., loading heavy resources like images).
- **Protection Proxy**: Controls access based on authentication or permissions.
- **Remote Proxy**: Represents objects in different locations, such as in distributed systems.
- **Caching Proxy**: Stores results of expensive operations to improve performance.

## Benefits and Drawbacks
**Pros**
- Improves system performance by reducing unnecessary operations.
- Adds an extra layer of security and access control.
- Helps in managing remote objects transparently.

**Cons**
- Introduces additional complexity and indirection.
- Can lead to performance overhead if not managed properly.
- Increases the number of classes in the system.

## Structure
1. **Service Interface or Abstract Class)**: Defines the common interface for both the real object and proxy.
2. **Real Service**: The actual object being accessed.
3. **Proxy**: Implements the same interface as the real subject and controls access.
4. **Client**: Should work with both services and proxies via the same interface. This way you can pass a proxy into any code that expects a service object.

<img src="/assets/images/guide/proxy.jpg" height="60%" width="60%">

## Implementation Notes
- Ensure proxies do not introduce unnecessary delays or complexity.
- Use lazy initialization where applicable to improve performance.
- Be mindful of thread safety when using proxies in concurrent environments.

#### ➡️ GitHub repository demonstrating the [Proxy Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/proxy)

---

# Bridge Pattern
The Bridge Pattern is a structural design pattern that decouples abstraction from implementation, allowing them to evolve independently. It helps manage complexity by preventing deep inheritance hierarchies and promoting composition. It is particularly useful in applications requiring multiple variations of a concept, cross-platform development, and runtime flexibility.

## Key Features
- **Decouples Abstraction and Implementation**: Enables changes to both independently.
- **Enhances Maintainability**: Avoids class explosion by organizing variations in separate hierarchies.
- **Supports Open/Closed Principle**: New abstractions and implementations can be added without modifying existing code.

## Use Cases
- **Multiple Variations of a Concept**: Avoids exponential subclass growth when combining characteristics (e.g., shapes with different colors).
- **Runtime Implementation Switching**: Allows changing implementations dynamically (e.g., different database connections).

## Benefits and Drawbacks
**Pros**
- Promotes better separation of concerns.
- Increases flexibility and scalability.
- Encourages cleaner, modular code.

**Cons**
- Adds complexity if the design doesn’t require separation.
- Can be overkill for simple class structures.

## Structure
1. **Abstraction**: Defines high-level functionality and holds a reference to the implementation.
2. **Implementation Interface**: Declares methods that concrete implementations must provide.
3. **Refined Abstraction**: Extends the base abstraction, adding specific behaviors.
4. **Concrete Implementations**: Provide specific implementations of the interface. Platform-specific code.
5. **Client**: Usually only interested in working with the abstraction. It links the abstraction objecto to the implementation object.

<img src="/assets/images/guide/chain-of-responsibility.jpg" height="60%" width="60%">

## Implementation Notes
- Identify independent dimensions that need separation.
- Ensure the abstraction class delegates work to the implementation.
- Favor composition over deep inheritance for better maintainability.

#### ➡️ GitHub repository demonstrating the [Bridge Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/bridge)

---

# Chain of Responsibility Pattern

The Chain of Responsibility Pattern is a behavioral design pattern that allows multiple objects to handle a request sequentially without the sender knowing which object will handle it. Each handler processes the request or passes it to the next handler in the chain.

## Key Features
- **Decouples Senders and Receivers**: The sender does not need to know which object will handle the request.
- **Flexible Processing**: Requests can be handled by multiple handlers or passed down the chain.
- **Promotes Reusability**: Handlers can be reused and restructured easily.

## Use Cases
- **Event Handling**: UI frameworks use this to pass events (e.g., key presses) through a chain of components.
- **Logging Frameworks**: Log messages can pass through different levels (INFO, DEBUG, ERROR).
- **Request Validation**: Different validation steps can be applied in a sequence.

## Benefits and Drawbacks
**Pros**
- Reduces coupling between senders and receivers.
- Improves code maintainability and scalability.
- Enables dynamic ordering of handlers.

**Cons**
- Can be difficult to debug if the chain is long.
- May result in performance overhead if too many handlers are involved.
- No guarantee that a request will be handled if no suitable handler is found.

## Structure
1. **Handler (Interface or Abstract Class)**: Defines a method to process requests and a reference to the next handler.
2. **Base Handler**: Optional class where you can put the boilerplace code that's common to all handler classes.
3. **Concrete Handlers**: Contain the actual code for processing requests. They implement request processing and decide whether to handle or forward the request.
4. **Client**:  May compose chains just once or compose them dynamically, it sends requests without knowing the specific handler.

<img src="/assets/images/guide/chain-of-responsibility.jpg" height="60%" width="60%">

## Implementation Notes
- Ensure handlers are ordered correctly to avoid unexpected behavior.
- Implement a default handler to avoid unprocessed requests.
- Be mindful of potential infinite loops if the chain is misconfigured.

#### ➡️ GitHub repository demonstrating the [Chain of Responsibility Pattern Implementation](https://github.com/laiszig/design-patterns/tree/main/chain-of-responsibility)

