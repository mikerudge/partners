// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from "graphql-tools";
import { typeDef as Query } from "./Query.graphql";

// Types
import { typeDef as Partners } from "./types/Partners/Partners.graphql";

import { typeDef as SilkMoth } from "./types/Partners/Silkmoth.graphql";
import { typeDef as Asda } from "./types/Partners/Asda.graphql";
import { typeDef as LoveTyres } from "./types/Partners/LoveTyres.graphql";
import { typeDef as Driveright } from "./types/Driveright.graphql";
import { typeDef as GigaTyres } from './types/Partners/GigaTyres.graphql'
import { typeDef as MyTyres } from "./types/Partners/MyTyres.graphql";

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs: [Query, Partners, SilkMoth, Asda, Driveright, LoveTyres, GigaTyres, MyTyres]
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
export function context(headers, secrets) {
  return {
    headers,
    secrets
  };
}

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
