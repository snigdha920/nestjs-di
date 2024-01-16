# Reproduces unexpected behaviour when declaring and consuming providers

## The problem

- I have a service `BookService` that has a dependency on `AuthorService`
- I don't add `@Injectable` decorator on the `BookService` class
- I use `BookService` in `BookController`
- I include `BookService` in the `providers` array of the `BookMoudule`
- When I run `pnpm start:dev`, the `bookService.authorService` is undefined and I get no errors from Nest that it cannot resolve dependencies of `BookService`

## Steps to reproduce

1. Install dependencies with `pnpm i`
2. Run `pnpm start:dev` in the root
3. No errors in the console, but we see the message from the `BookService` constructor: `BookService.authorService is undefined`
4. In the test `book.service.spec.ts`, we successfully get the `BookService` from the module context, but `bookService.authorService` is `undefined`. Run the test by `pnpm test`

## What is expected?

Since we've added `BookService` in the providers array, and it is being consumed by the `BookController`, I would expect Nest to throw an error that it cannot resolve the dependencies of `BookService` and that we should add `@Injectable` decorator on the `BookService` class.
