# Rsbuild Project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

# Run Apollo Rover CLI (required)

 - install rover: [https://www.apollographql.com/docs/rover/getting-started](https://www.apollographql.com/docs/rover/getting-started)
 - use the config files to start a graphql gateway on port 4000:
   - got to the graphql_federation folder ([https://github.com/xEatos/dashboardduck/tree/main/graphql_federation](https://github.com/xEatos/dashboardduck/tree/main/graphql_federation))
   - run: ```rover dev --supergraph-config .\supergraph_config.yaml --router-config router_config.yaml --polling-interval 10```
 - check [http://localhost:4000/](http://localhost:4000/)
