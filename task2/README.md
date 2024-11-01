# Task 2: Validation method with external request

In this task we will proceed with practicing TDD, will also try some mocking and working with promises. As you can see file `task2/index.ts` contains just one method, which returns a promise with a boolean value. This method validates user name and returns true if it is valid, otherwise false. There are some requirements about this method:

- user name should be at least 3 characters long
- user name should contain only alphanumeric symbols (no spaces either)
- user name should not start with a number
- user name should be unique, and we are making sure that it is by calling `fetchIsUserNameAvailable` method, which returns if user name is available for registering (it means it was not used yet)
- if user name is not valid (length, symbols, or starts with a number) we should not make a request to the server, just return false
- if `fetchIsUserNameAvailable` fails (throws an exception), the method should return false as well.

Don't forget to mock `fetchIsUserNameAvailable` and consider different scenarios with it (it return true, false, or throws an error).

Write tests and mocks to cover all the requirements. Try to avoid writing the code.

The next articles from the documentation can be useful:

- [Calling jest.mock() with the module factory parameter](https://jestjs.io/docs/es6-class-mocks#calling-jestmock-with-the-module-factory-parameter)
- [jest.mock](https://jestjs.io/docs/upgrading-to-jest29#jest-mock)
- [jest.mocked](https://jestjs.io/docs/mock-function-api#jestmockedsource-options)