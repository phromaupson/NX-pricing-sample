import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { IGraphQLContext } from '@pricing-sample-nx/shared-models';
import { createServer } from 'http';
import { environment } from '../environments/environment';
import { resolvers, typeDefs } from '../graphql';

export const graphQLRoute = (app: Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    uploads: false,
    context: ({ req, connection }): IGraphQLContext => {
      // set conntext goes here
      return { accessToken: 'mock' } as IGraphQLContext;
    },
  });

  server.applyMiddleware({ app, cors: true, path: '/graphql' });
  const httpServer = createServer(app);
  const port = environment.port;
  httpServer.listen(port, () => {
    console.log(
      `🚀🚀🚀 Express/GQL Server ready at http://localhost:${port}${server.graphqlPath} 🚀🚀🚀`
    );
  });
};
