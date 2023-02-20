This repository demonstrates a bug with creation of entities in Mikro ORM v5.6.11 with the option `validate: true` being set.

### The problem:
- When `validate: true` the type of a field is not inferred unless explicitly provided in the `@Property` decorator or the TypeScript definition.


### Steps to reproduce:
1. Run `pnpm start:dev` in the root
2. Access the GraphQL playground at http://localhost:3000/graphql
3. Create an author in the GraphQL playground:

```
mutation createAuthor {
  createAuthor {
    id
    name
  }
}

```


You'll get the error: 
```
"Trying to set Author.bestsellers of type 'string' to '0' of type 'number'"
```

<img width="2032" alt="image" src="https://user-images.githubusercontent.com/62167899/220098749-d0f9cea7-4640-4c07-beea-6ccd23ff325f.png">



