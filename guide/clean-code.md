---
layout: compress
permalink: /guide/clean-code.md
---

# Clean Code

Clean code is code that is easy to read, understand, and maintain. It follows consistent naming, clear structure, and minimal complexity while avoiding redundancy and ensuring each part serves a single purpose effectively. The concept was popularized by Robert C. Martin ("Uncle Bob"), a prominent software engineer that wrote the book "Clean Code: A Handbook of Agile Software Craftsmanship", where he outlines principles, practices, and guidelines for writing clean, maintainable, and high-quality code. His work has become a cornerstone for developers striving for coding excellence.

#### Clean Code is important because it:

1. **Improves readability:** Makes it easier for developers to understand and collaborate on the codebase.
2. **Simplifies maintenance:** Reduces the time and effort required to debug, update, or extend the code.
3. **Enhances scalability:** Facilitates adding new features without introducing complexity.
4. **Prevents bugs:** Clear and concise code minimizes misunderstandings and errors.
5. **Saves time and costs:** Increases productivity and reduces technical debt over the long term.

_"Any fool can write code that a computer can understand. Good programmers write code that humans can understand."_ - Martin Fowler

### Clean Code Principles

Writing clean code is just the first step, maintaining it over time is equally important. It's all too common for a project that starts out well-organized to gradually devolve into chaos as it evolves. To prevent this, it's crucial to follow and uphold key principles. Here are the Clean Code principles as outlined by Uncle Bob.

## Meaningful Names

Meaningful names make the code self-explanatory, reducing the need for excessive comments and helping others (and your future self) quickly understand the purpose and functionality of each component. Names should reveal **intent**, making it clear what a piece of code does or represents.

The name of a variable, function or class should answer three questions:

-   Why it exists
-   What it does
-   How it is used
    Whoever is reading the code shouldn't have to mentally translate a variable name into a concept they already know.

#### ➡️ Avoid non-descriptive, generic names like single-letter variables

_If a name requires a comment, then it fails to reveal its intent._

```java
// Bad:
int a; //days until deadline

// Good:
int int daysUntilProjectDeadline;
```

#### ➡️ Do not give false clues that obscure the meaning of code. Such as:

-   abbreviations
-   putting words that mean something else (e.g. bookList - if the data structure is not a List)
-   names that vary in small ways
-   using inconsistent spellings

```java
// Bad:
int O = l; // Confusing names that look alike - e.g. zero and the letter o
if ( O == l )
    O = 01;
else
    l = 10;

// Good:
int currentServerLoad = 0;
int maxServerLoad = 1;

if (currentServerLoad == maxServerLoad)
    currentServerLoad = maxServerLoad;
else
    currentServerLoad = currentServerLoad + 1;

// Bad:
String addr;
// Good:
String customerAddress;

// Bad:
boolean red;
// Good:
boolean isLightRed;
```

#### ➡️ Make meaninful distinctions and avoid using vague or overly similar terms.

```java
// Bad:
getUserInfo();
getUserDetails();
getUserData();

// Good:
getUserId();
getUserFullName();
getUserAccountStatus();
```

#### ➡️ Use Pronounceable and Searchable Names

Names that are hard to pronounce can make code reviews, discussions, and debugging unnecessarily difficult.

```java
// Bad:
class DtaRcrd102 {
    private Date genymdhms;
}
// Good:
class Customer {
    private Date generationTimestamp;
}
```

Searchable names for constants and values avoids ambiguity and makes it easier to find the purpose of a particular value. For instance, it can be difficult to find single-letter names and numeric constants.

```java
// Bad:
for (int i = 0; i < 12; i++) {
    total += (prices[i] * 0.1);
}

// Good:
const double DISCOUNT_RATE = 0.1;
int totalDiscountedPrice = 0;

for (int i = 0; i < NUMBER_OF_ITEMS; i++) {
    int discountedPrice = prices[i] * DISCOUNT_RATE;
    totalDiscountedPrice += discountedPrice;
}
```

#### ➡️ Avoid using redundant prefixes or encoding in variable names.

Avoid using redundant prefixes or encoding in variable names. Names should be clear and self-explanatory, without unnecessary abbreviations or prefixes that don’t add value to understanding the code.

```java
// Bad:
String strProductName = "Laptop";
int iQuantity = 3;

impCalculateTotalCost(int iQuantity, double dUnitPrice);
}

// Good:
String productName = "Laptop";
int quantity = 3;

calculateTotalCost(int quantity, double unitPrice);
```

#### ➡️ Name Class using nouns that represent the objects they model and use verbs for Methods

```java
class Employee {
}

employee.setName("Mike");
String employeeName = employee.getName();
if (employee.isEmployed())/*...*/
```

#### ➡️ Pick one word for each abstract concept and use it consistently to avoid confusion.

For example, choosing either "fetch," "retrieve," or "get" for a method name across all classes. Using inconsistent names like "controller," "manager," and "driver" for different classes is confusing, and creates ambiguity about their roles.

```java
//Bad:
public User fetchUserById(int id)
public Product retrieveProductById(int id)
public Order getOrderById(int id)

}

// Good:
public User getUserById(int id)
public Product getProductById(int id)
public Order getOrderById(int id)
```

#### ➡️ Solution Domain Names - Use names that reflect common computer science terms, algorithms, and patterns

```java
class JobQueue {
    // Implements a queue to manage jobs in a job scheduling system
}

class AccountVisitor {
    // Implements the Visitor pattern to traverse and modify Account objects
}
```

#### ➡️ Problem Domain Names - Use intuitive names that reflect concepts that are familiar to the business or end-users

```java
class CustomerOrder {
    // Represents an order placed by a customer
}

class ProductCatalog {
    // Represents a collection of products available for purchase
}
```

#### ➡️ Avoid ambiguous variable names by organizing them into well-named classes or functions

Prefixing or grouping variables with related meanings is essential for clarity. Instead of having standalone variables like firstName, lastName, or city, that by themselves might not indicate they form an address, it's better to place them within a class called Address to provide clear context.

## Functions

A clean function should be focused, concise, and perform a single task, making it easier to understand and modify. Key strategies that help achieve clean functions, are:

-   Proper abstraction
-   Naming
-   Error handling
-   Minimizing side effects.

#### ➡️ Small and focused on performing a single task

Functions should be small, ideally no more than a few lines. Long functions can become difficult to understand and modify, while smaller functions are more focused and easier to follow.

```java
// Bad:
public void processOrder(Order order) {
    // Validate order
    if (order.getItems().isEmpty()) {
        throw new IllegalArgumentException("Order cannot be empty.");
    }

    // Calculate total price
    double totalPrice = 0;
    for (Item item : order.getItems()) {
        totalPrice += item.getPrice();
    }

    // Apply discount if applicable
    if (order.getCustomer().isLoyalCustomer()) {
        totalPrice *= 0.9;
    }

    // Apply shipping charges
    double shippingCost = 0;
    if (order.getCustomer().isWithinRegion()) {
        shippingCost = 5.0;
    } else {
        shippingCost = 10.0;
    }

    // Finalize the order
    double finalAmount = totalPrice + shippingCost;
    order.setTotalAmount(finalAmount);
    order.setStatus("Processed");
    order.save();
}

// Good:
public void processOrder(Order order) {
    validateOrder(order);
    double totalPrice = calculateTotalPrice(order);
    double finalAmount = applyDiscount(totalPrice, order);
    double shippingCost = calculateShippingCost(order);
    finalizeOrder(order, finalAmount, shippingCost);
}

private void validateOrder(Order order) {
    if (order.getItems().isEmpty()) {
        throw new IllegalArgumentException("Order cannot be empty.");
    }
}

private double calculateTotalPrice(Order order) {
    double totalPrice = 0;
    for (Item item : order.getItems()) {
        totalPrice += item.getPrice();
    }
    return totalPrice;
}

private double applyDiscount(double totalPrice, Order order) {
    if (order.getCustomer().isLoyalCustomer()) {
        totalPrice *= 0.9;
    }
    return totalPrice;
}

private double calculateShippingCost(Order order) {
    if (order.getCustomer().isWithinRegion()) {
        return 5.0;
    } else {
        return 10.0;
}

private void finalizeOrder(Order order, double finalAmount, double shippingCost) {
    double totalAmount = finalAmount + shippingCost;
    order.setTotalAmount(totalAmount);
    order.setStatus("Processed");
    order.save();
}
```

#### ➡️ Blocks within control structures should be minimal.

Excessive nesting should be avoided to maintain readability and simplicity.

```java
// Bad:
public void processOrder(Order order) {
    if (order.isValid()) {
        if (order.isPaid()) {
            if (order.isShipped()) {
                processFinalStep(order);
            } else {
                handleShippingIssue(order);
            }
        } else {
            handlePaymentIssue(order);
        }
    } else {
        handleInvalidOrder(order);
    }
}

// Good:
public void processOrder(Order order) {
    if (!order.isValid()) {
        handleInvalidOrder(order);
        return;
    }
    if (!order.isPaid()) {
        handlePaymentIssue(order);
        return;
    }
    if (!order.isShipped()) {
        handleShippingIssue(order);
        return;
    }
    processFinalStep(order);
}
```

#### ➡️ One Level of Abstraction per Function

To ensure functions do "one thing," it's important to keep the statements at the same level of abstraction. The Stepdown Rule helps by organizing code in a way that allows it to be read top-down, where each function introduces the next level of abstraction.

```java
// Bad:
public void processPage() {
    String pagePath = getPagePath();
    String html = getHtml(pagePath);
    String formattedPath = formatPath(pagePath);
    appendToHtml(html, formattedPath);
}

// Good:
public void processPage() {
    String pagePath = getPagePath();
    String html = generateHtml(pagePath);
    String formattedPath = formatPagePath(pagePath);
    appendContentToHtml(html, formattedPath);
}

private String generateHtml(String pagePath) {
    return getHtml(pagePath);
}

private String formatPagePath(String pagePath) {
    return PathParser.render(pagePath);
}

private void appendContentToHtml(String html, String formattedPath) {
    html.append(formattedPath);
}
```

#### ➡️ Encapsulate Switch Statements in low-level classes and use polymorphism to avoid repetition and complexity

```java
// Bad:
public void processPayment(PaymentType paymentType) {
    switch (paymentType) {
        case CREDIT_CARD:
            processCreditCard();
            break;
        case PAYPAL:
            processPaypal();
            break;
        case CASH:
            processCash();
            break;
    }
}

// Good:
public abstract class PaymentProcessor {
    public abstract void process();
}

public class CreditCardProcessor extends PaymentProcessor {
    public void process() {
        // process credit card
    }
}

public class PaypalProcessor extends PaymentProcessor {
    public void process() {
        // process PayPal
    }
}

public class CashProcessor extends PaymentProcessor {
    public void process() {
        // process cash
    }
}

public void processPayment(PaymentProcessor processor) {
    processor.process();
}
```

#### ➡️ Prefer long, descriptive, meaningful name than relying on short, ambiguous ones

```java
// Bad:
public void handlePayment() {
    // Some code to process payment
}

// Good:
public void processCreditCardPayment() {
    // Some code to process credit card payment
}
```

#### ➡️ Try having as few arguments as possible

Reducing the number of arguments makes functions easier to read and maintain, and minimizes the complexity of testing different combinations of argument values.

```java
// Bad:
public void processOrder(String orderId, String customerName, String shippingAddress, String paymentDetails) {
    // Process order logic
}

// Good:
public void processOrder(Order order) {
    // Process order logic using the Order object
}
```

-   **Monadic Forms:** Functions should pass a single argument to either ask a question about it or transform it into something else, with clear naming to distinguish between the two. Event-based functions can also use a single argument to modify the system state but should be used carefully with appropriate naming to avoid confusion.

-   **Dyatic Functions:** While sometimes necessary, dyadic functions can be problematic when the arguments lack natural cohesion or ordering, making them prone to errors and confusion.

-   **Triads:** Functions that take three arguments are significantly harder to understand than those with two, as they introduce more complexity with issues of ordering, pausing, and potential confusion.

-   **Flag Arguments:** Flag arguments make a function signature confusing, as they indicate the function is performing multiple actions based on the flag's value. It's better to split such functions into separate ones to improve clarity and maintain single responsibility.

-   **Object Arguments:** When a function requires more than two or three arguments, it's often a sign that some of the arguments should be grouped into a class of their own. This reduces the complexity and makes the code more meaningful by assigning a name to a group of related variables.

```java
// Bad:
Circle makeCircle(double x, double y, double radius);

// Good:
Circle makeCircle(Point center, double radius);
```

#### ➡️ Choose clear and descriptive function names, especially with verb/noun pairs,

This helps clarify the function's purpose and the role of its arguments. For better clarity, using the keyword form in function names can reduce ambiguity, particularly in cases with multiple arguments.

#### ➡️ Avoid side effects, they can lead to unexpected changes in variables or system states

When a function performs additional actions beyond its primary task, it creates hidden dependencies that may introduce errors.

```java
// Bad:
public class UserValidator {
    public boolean checkPassword(String userName, String password) {
        User user = UserGateway.findByName(userName);
        if (user != User.NULL) {
            String codedPhrase = user.getPhraseEncodedByPassword();
            String phrase = cryptographer.decrypt(codedPhrase, password);
            if ("Valid Password".equals(phrase)) {
                Session.initialize();  // Side effect: modifies session state
                return true;
            }
        }
        return false;
    }
}

// Good:
public class UserValidator {
    public boolean checkPassword(String userName, String password) {
        User user = UserGateway.findByName(userName);
        if (user != User.NULL) {
            String codedPhrase = user.getPhraseEncodedByPassword();
            String phrase = cryptographer.decrypt(codedPhrase, password);
            return "Valid Password".equals(phrase);
        }
        return false;
    }

    public void initializeSession() {
        Session.initialize();  // Separate function to handle session initialization
    }
}
```

#### ➡️ Do not use output arguments in functions

It can cause confusion about whether the argument is an input or output. Instead of modifying arguments directly, it's better to change the state of the object the function belongs to.

```java
// Bad:
public void appendFooter(StringBuffer report) {
    // Modifies report directly, making it unclear if it's an input or output
    report.append("Footer");
}

// Good:
public void appendFooter() {
    this.append("Footer");  // Modifies the state of the object directly
}
```

#### ➡️ Command Query Separation

Functions should either perform an action (command) or provide information (query), but not both. Mixing commands and queries in a single function can make it unclear whether the function is performing an action or checking the state of an object.

```java
// Bad:
public boolean set(String attribute, String value);  // Modifies the state and returns a value

// Good:
public void set(String attribute, String value);  // Only modifies the state
public boolean isSet(String attribute);  // Only checks the state
```

#### ➡️ Prefer Exceptions to Returning Error Codes

This improves readability and simplifies the control flow. Error codes often result in deeply nested structures, while exceptions allow for cleaner, more focused error handling.

```java
// Bad:
if (deletePage(page) == E_OK) {
  if (registry.deleteReference(page.name) == E_OK) {
    if (configKeys.deleteKey(page.name.makeKey()) == E_OK) {
      logger.log("page deleted");
    } else {
      logger.log("configKey not deleted");
    }
  } else {
    logger.log("deleteReference from registry failed");
  }
} else {
  logger.log("delete failed");
  return E_ERROR;
}

// Good:
try {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
} catch (Exception e) {
  logger.log(e.getMessage());
}
```

#### ➡️ Extract Try/Catch Blocks

To improve clarity and maintain separation of concerns, it's better to extract the logic within try/catch blocks into separate functions.

```java
// Bad:
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  } catch (Exception e) {
    logError(e);
  }
}
private void deletePageAndAllReferences(Page page) throws Exception {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}
private void logError(Exception e) {
  logger.log(e.getMessage());
}

// Good:
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  } catch (Exception e) {
    handleError(e);
  }
}

private void deletePageAndAllReferences(Page page) {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}

private void handleError(Exception e) {
  logger.log(e.getMessage());
}
```

-   **Error Handling is One Thing:** Error handling should be a separate responsibility in a function, and if a function includes error handling, it should focus solely on that task. The presence of a try block should indicate that the function is dedicated to error handling, with no other logic following the catch or finally blocks.

-   **The Error.java Dependency Magnet:** Returning error codes creates a dependency on a central class or enum, making it difficult to add new errors without recompiling and redeploying dependent classes. Using exceptions allows for easier addition of new error types without such dependencies, as new exceptions can be derived from a base class.

#### ➡️ Don't Repeat Yourself

The "Don't Repeat Yourself" (DRY) principle emphasizes avoiding code duplication. It can lead to bloated and error-prone software, as the same logic or data is repeated in multiple places, increasing the risk of mistakes and making maintenance harder. It creates unnecessary complexity, and even small changes require updates in multiple locations, which can lead to inconsistencies and higher chances of failure.

#### ➡️Structured Programming

Structured programming encourages functions with a single entry and exit point, avoiding break, continue, or goto statements. While these rules are useful for larger functions to maintain clarity, in smaller functions, multiple returns or breaks can be more expressive and do not significantly harm code readability.

## Comments

Although the goal is for the code to explain itself, comments can be helpful in situations where the code requires additional context. However, comments should not be used to explain the obvious or to compensate for poorly written code.

Example:

```java
// Bad:
// Sets the value of the variable 'idade' to 30
int idade = 30;

// Good:
// The default age for new users is 30
int idade = 30;
```

#### ➡️ Always prefer writing clear code instead of adding excessive comments. When you need to comment, focus on why something is being done, not what is being done.

## Clean Code Best Practices

-   **Read and Review the Code:** Continuously review the code to identify areas that can be improved.
-   **Prioritize Reliability Over Speed:** Focus on writing clear and reliable code instead of fast and dirty code.
-   **Refactor Regularly:** Keep the code clean by reviewing and refactoring it whenever necessary.
-   **Automated Tests:** Clean code is testable code. Write automated tests to ensure your code continues to work as expected after changes.

#### Example of Clean Code in Java

Here’s an example of clean code that incorporates some of the discussed principles:

```java
public class Calculator {

    public int add(int a, int b) {
        return a + b;
    }

    public int subtract(int a, int b) {
        return a - b;
    }

    public int multiply(int a, int b) {
        return a * b;
    }

    public double divide(int a, int b) {
        if (b == 0) {
            throw new IllegalArgumentException("Division by zero is not allowed");
        }
        return (double) a / b;
    }
}
```

-   Meaningful Names: The methods have names that clearly indicate what they do.
-   Simple Functions: Each method has a single responsibility.
-   Clear Error Handling: The divide method explicitly handles the error of division by zero.

#### ➡️ Additional Enhancements for Clean Code:

-   **Avoid Duplication**: Extract common logic into reusable methods to minimize redundancy.
-   **Keep Methods Short:** Methods should be concise and do one thing well, improving readability and maintainability.
-   **Use Proper Indentation:** Follow consistent indentation rules for better code structure and readability.
-   **Avoid Magic Numbers:** Replace hard-coded values with named constants to make the code more understandable.
