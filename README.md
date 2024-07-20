
# Nextjs Prisma Blog with local sqlite

## Notes

- To test route handler, select master user id. or master data.

## Route pipeline

```ts

export const POST = pipe(request, validateA, validateB, businessLogic)

```

## Post submit process

- User fill contents
- User click submit button
- HTTP POST request
- validate the request
- insert data to db

## TODO

- post detail page
