import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import mongoose from "mongoose";

// Functions
import Silkmoth from "./api/silkmoth";
import LoveTyres from "./api/lovetyres";
import GigaTyres from "./api/gigaTyres";
import MyTyres from "./api/myTyres";

import * as Schema from "./schema";

const PORT = 3000;
const server = express();

const schemaFunction =
  Schema.schemaFunction ||
  function() {
    return Schema.schema;
  };
let schema;
const rootFunction =
  Schema.rootFunction ||
  function() {
    return schema.rootValue;
  };
const contextFunction =
  Schema.context ||
  function(headers, secrets) {
    return Object.assign(
      {
        headers: headers
      },
      secrets
    );
  };

server.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(async request => {
    if (!schema) {
      schema = schemaFunction(process.env);
    }
    const context = await contextFunction(request.headers, process.env);
    const rootValue = await rootFunction(request.headers, process.env);

    return {
      schema: await schema,
      rootValue,
      context,
      tracing: true
    };
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql",
    query: ``
  })
);

// Setup Mongo
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!

  server.emit("ready");

  console.log("connected to the DB");
});

server.on("ready", function() {
  server.listen(PORT, async () => {
    console.log("server is running");
    const silkmoth = await Silkmoth();
    const lveTyres = await LoveTyres();
    const gTyres = await GigaTyres();
    const mTyres = await MyTyres();
  });
});
