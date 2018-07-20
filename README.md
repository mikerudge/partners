# Motokiki Data Schema

### (In development)

Use this App to visualise the data schema of Motokiki.

### Quick start guide

```bash
npm install

npm start
```

In your browser then go to http://localhost:3000/voyager to see the schema visualised

**You might have restart the server to see any changes**

Just type run `rs` in terminal to restart

### How to Update the Schema

1.  Add a .graphql file in the types folder with the type name e.g [User.graphql](./src/types/User.graphql)
2.  If it is a main query, add it to the [Query.graphql](./src/Query.graphql) file. This means we can directly query for that information at the root level.
3.  Import ALL types into the [schema.js](./src/schema.js) and add them to the typeDef array. E.g

```
import { typeDef as WheelInfo } from "./types/WheelInfo.graphql";

...

  typeDefs: [
    Query,
    User,
    Vehicle,
    Partners,
    TyreInfo,
    WheelInfo,
    CarManufacturers,
    Retailers
  ]

...
```

## Things to note

Changing the .graphql file
