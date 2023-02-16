This repository demonstrates a limitation with embeddables in Mikro ORM.

### The problem:
- An embeddable is added to an entity schema after some entities are already created
- The embeddable is always undefined for already created entities
- The embeddable is inititalised correctly with the default values for entities created after the embeddable was added

## Add functionality for:
- initialise the embeddable with the default values for entities created before it was added

### Steps to reproduce:
1. Clone the repo and cd over to the root 
2. Run `pnpm start`
3. Access the GraphQL playground at http://localhost:3000/graphql
4. Comment out the `info` field in the `Author` class in `src/modules/author/author.entity.ts`
5. Create an author in the GraphQL playground:

```
mutation createAuthor {
  createAuthor {
    id
    name
  }
}

```

6. Copy the `id` of the author created, you'll need it for the next steps!
7. Uncomment the `info` field commented out in step 4
6. Query for the author with the `id` from step 6:
```
{
  findAuthor(id: "63ee197fb44a0692b9adf414") {
    id
    name
    info {
      dateOrNull
      someBoolean
    }
  }
}
```

You'll get the error: `Cannot return null for non-nullable field Author.info`

<img width="2032" alt="image" src="https://user-images.githubusercontent.com/62167899/219359951-44f9e8c9-15e6-4075-9192-1c1068e51613.png">

If you log the author returned in the service, we see that the `info` field is `null`, and not the default value. 

