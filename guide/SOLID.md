---
layout: compress
permalink: /guide/solid.md
---

# SOLID Principles

SOLID is an acronym that describes five fundamental principles for object-oriented software design. These principles were defined by Robert C. Martin and aim to create systems that are more flexible, modular, and easier to maintain. By adhering to these principles, developers can reduce code complexity, improve scalability, and enhance the long-term sustainability of their applications.

## The Reason for SOLID Principles

The SOLID principles guide us in crafting software that's more maintainable, understandable, and adaptable. As applications grow, following these principles helps us manage complexity and avoid headaches!

-   **Tight Coupling:** Classes are interdependent, making changes to one class impact others. This is undesirable in software design, as it increases the complexity and risk of bugs.
-   **Loose Coupling:** When classes have minimal dependencies on each other. Loose coupling allows for:
    -   **Easier Maintenance:** Changes in one class are less likely to require changes in others.
    -   **Reusability:** Components can be reused in different parts of the application or other projects.
    -   **Flexibility:** New features or adjustments are easier to implement.
    -   **Stability:** The code is less fragile and more adaptable to changes.

### 📌 S — Single Responsibility Principle

**A class should have only one reason to change.**  
Each class is responsible for a single part of the functionality.

#### Advantages:

-   **Testing:** Fewer test cases due to a focused responsibility.
-   **Lower Coupling:** Less functionality means fewer dependencies.
-   **Organization:** Smaller, well-organized classes are easier to find and manage than larger, monolithic ones.

### 🧩 O — Open/Closed Principle

**Definition:** The Open/Closed Principle states that classes should be **open for extension but closed for modification**. This means you can add new functionality to a class without altering its existing code.
You should be able to extend a class behavior, without modifying it.

#### Advantages

-   **Reduces Risk:** By extending classes rather than modifying them, we prevent introducing bugs into stable, working code.
-   **Promotes Stability:** Existing code remains untouched, allowing new features to be added through extension without disrupting the current functionality.

\*The one scenario where modifying existing code is acceptable is **when fixing bugs**. Bug fixes inherently require changes to address flaws in the code.

### 🔄 L — Liskov Substitution Principle (LSP)

The **Liskov Substitution Principle** is arguably the most complex of the five SOLID principles. It states that **if class A is a subtype of class B, we should be able to replace instances of B with instances of A without disrupting the program’s behavior**.

#### What It Means

-   **Definition:** "Derived or child classes must be substitutable for their base or parent classes."
-   This principle ensures that any subclass should be usable in place of its parent class without unexpected behavior.

#### Classic Example: Rectangle and Square

Consider the common example of a `Rectangle` and `Square`:

-   **Rectangle Class:** This base class has properties for width and height, with methods for setting these dimensions and calculating area.
-   **Square Class:** A square can inherit from `Rectangle`, but to ensure all sides are equal, it overrides the `setWidth` and `setHeight` methods so that changing one dimension automatically updates the other.

**LSP Violation**: If we substitute a `Square` where a `Rectangle` is expected, such as in a context where width and height can be set independently, we would encounter issues:

-   **Unexpected Behavior:** Changing the width or height of a `Square` instance in this context would change both dimensions, which is not how the `Rectangle` class is expected to behave. This violates LSP since it breaks the expected behavior of the parent class.

-   To fix the Liskov Substitution Principle (LSP) violation in the Rectangle and Square example, we should avoid making Square a subclass of Rectangle. Since a Square and Rectangle have different constraints (a Square requires equal width and height, while a Rectangle does not), they don't truly fit a parent-child relationship.
-   We could create a `Shape` interface, and have Rectangle and Square as Separate classes.

```java
interface Shape {
    double calculateArea();
}

class Rectangle implements Shape {
    private double width;
    private double height;

    // Constructor, getters, and setters for width and height
    // Implement calculateArea() as width * height
}

class Square implements Shape {
    private double sideLength;

    // Constructor, getter, and setter for sideLength
    // Implement calculateArea() as sideLength * sideLength
}
```

#### Consequences of Breaking the Principle

1. **Misleading Code:** Violating LSP can lead to misleading expectations. We might assume that substituting a child class will work as expected, but the behavior can differ drastically, potentially causing the program to fail.

2. **Less Readable Code:** Once we identify that certain subclasses don’t behave as expected, we might have to add conditional logic to handle these cases separately. This creates multiple branching paths, which complicates our code and makes it less readable and harder to maintain.

3. **Error-Prone Code:** When LSP is broken, errors can emerge in unexpected ways. These issues may only appear during testing or even in production, which can make them harder to catch and address promptly. This is particularly problematic when the code relies on assumptions that any subclass will behave like its parent.

Following the **Liskov Substitution Principle** helps keep our code predictable, flexible, and easier to maintain, reducing the need for unnecessary branching and handling specific cases within a hierarchy.

### 🎛️ I — Interface Segregation Principle (ISP)

The Interface Segregation Principle is the first SOLID principle that applies specifically to interfaces rather than classes. It is closely related to the Single Responsibility Principle and emphasizes that **“no client should be forced to implement an interface that is irrelevant to them.”**

#### Key Points

-   **Avoid "Fat" Interfaces**: Large interfaces with too many methods should be avoided. Instead, split them into smaller, focused, and client-specific interfaces.
-   **Favor Smaller, Specific Interfaces**: Each interface should have a clear, single responsibility, allowing implementing classes to only concern themselves with the methods they actually need.

#### Benefits of ISP

By creating smaller, specialized interfaces, we can:

-   **Improve Code Usability**: Implementing classes don’t need to provide unnecessary or empty implementations for irrelevant methods.
-   **Increase Flexibility**: Smaller interfaces are more adaptable and easier to extend or refactor without impacting unrelated parts of the code.
-   **Reduce Coupling**: Each client is only tied to the methods it actually uses, making the code more modular and maintainable.

```java
// Interface for vegetarian menu
interface IVegetarianMenu {
    List<String> getVegetarianItems();
}

// Interface for non-vegetarian menu
interface INonVegetarianMenu {
    List<String> getNonVegetarianItems();
}

// Interface for drinks menu
interface IDrinkMenu {
    List<String> getDrinkItems();
}

// Class for vegetarian menu
class VegetarianMenu implements IVegetarianMenu {
    @Override
    public List<String> getVegetarianItems() {
        return Arrays.asList("Vegetable Curry", "Paneer Tikka", "Salad");
    }
}

// Class for non-vegetarian menu
class NonVegetarianMenu implements INonVegetarianMenu {
    @Override
    public List<String> getNonVegetarianItems() {
        return Arrays.asList("Chicken Curry", "Fish Fry", "Mutton Biryani");
    }
}

// Class for drinks menu
class DrinkMenu implements IDrinkMenu {
    @Override
    public List<String> getDrinkItems() {
        return Arrays.asList("Water", "Soda", "Juice");
    }
}

// Utility class to display menus
class MenuDisplay {
    // Function to display menu items for a vegetarian customer
    public static void displayVegetarianMenu(IVegetarianMenu menu) {
        System.out.println("Vegetarian Menu:");
        for (String item : menu.getVegetarianItems()) {
            System.out.println("- " + item);
        }
    }

    // Function to display menu items for a non-vegetarian customer
    public static void displayNonVegetarianMenu(INonVegetarianMenu menu) {
        System.out.println("Non-Vegetarian Menu:");
        for (String item : menu.getNonVegetarianItems()) {
            System.out.println("- " + item);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        VegetarianMenu vegMenu = new VegetarianMenu();
        NonVegetarianMenu nonVegMenu = new NonVegetarianMenu();
        DrinkMenu drinkMenu = new DrinkMenu();

        MenuDisplay.displayVegetarianMenu(vegMenu);
        MenuDisplay.displayNonVegetarianMenu(nonVegMenu);
    }
}
```

### 🔄 D — Dependency Inversion Principle (DIP)

The Dependency Inversion Principle (DIP) is a key principle in object-oriented design that states:

-   **High-level modules should not depend on low-level modules.** Both should depend on abstractions.
-   **Abstractions should not depend on details.** Details should depend on abstractions.

#### Simplified Explanation

In simpler terms, DIP suggests that **classes should depend on abstractions** (such as interfaces or abstract classes) rather than concrete implementations. This creates a **decoupled** system where components are less dependent on each other’s implementation details, promoting flexibility and maintainability.

#### Benefits of DIP

-   **Flexibility**: It’s easier to change the implementation of low-level modules (like swapping out libraries or changing how functionality is implemented) without affecting the high-level modules.
-   **Decoupling**: The high-level module is no longer tightly coupled to the low-level module, making the code more maintainable and adaptable to future changes.
-   **Easier Testing**: With abstractions, classes can be tested independently by mocking or stubbing the dependencies.

```java
// Interface for version control system
interface IVersionControl {
    void commit(String message);
    void push();
    void pull();
}

// Git version control implementation
class GitVersionControl implements IVersionControl {
    @Override
    public void commit(String message) {
        System.out.println("Committing changes to Git with message: " + message);
    }

    @Override
    public void push() {
        System.out.println("Pushing changes to remote Git repository.");
    }

    @Override
    public void pull() {
        System.out.println("Pulling changes from remote Git repository.");
    }
}

// Team class that relies on version control
class DevelopmentTeam {
    private IVersionControl versionControl;

    // Constructor to inject the version control implementation
    public DevelopmentTeam(IVersionControl vc) {
        this.versionControl = vc;
    }

    public void makeCommit(String message) {
        versionControl.commit(message);
    }

    public void performPush() {
        versionControl.push();
    }

    public void performPull() {
        versionControl.pull();
    }
}

public class Main {
    public static void main(String[] args) {
        GitVersionControl git = new GitVersionControl();
        DevelopmentTeam team = new DevelopmentTeam(git);

        team.makeCommit("Initial commit");
        team.performPush();
        team.performPull();
    }
}
```
