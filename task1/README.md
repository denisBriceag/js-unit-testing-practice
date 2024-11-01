# Task 1: Quantity Validator

In this task we will try to work in the test-driven development approach. Though the temptation to write the code first can be high, we strongly recommend to start with unit tests. At some point you can find that such a practice opens quality gates and allows you to write very simple, understandable and reliable code. Remember: it's okay that your tests are failing at this moment! Please read the requirements below and notes about the task, and write unit tests only.

We have an e-commerce application (online shop) where on the product page we have a quantity field beside the "add to cart" button. Users can select a quantity and press the "add to cart" button. There are some validation rules though: if quantity is larger than or equal to `X`, its value must be divisible by `Y`. `X` is a threshold, from which product can be delivered only in packages, and `Y` is an amount of items in the package. Thus, if a user wants a lot of items delivered, the shop will deliver them only in boxes.

Values `X` and `Y` we will get from a backend service. We will need to create a class QuantityValidator with a constructor which takes two arguments, the first is `X` and the second is `Y`. This class should have one public method, which is called "validate" and takes a quantity from user input as an argument (the type is number).

This method should return an object which consists of two fields: "isValid" and "error". The field "isValid" contains a boolean value if the amount is correct. The field "error" should be null for valid values, and return the message "Quantity should be divisible by {N}". We can say that the class `QuantityValidator` implements the interface `IQuantityValidator`:

```ts
interface IQuantityValidator {
  validate(quantity: number): { isValid: boolean; error: string | null };
}
```

---

[[Back to the main page](../README.md)]
