# Thesis
This code was created as part of the master's thesis 'A digital knowledge infrastructure to provide information on scientific videos and podcasts' and is responsible for the infrastructure's website.
For the other building blocks of the infrastructure see:
 -  [https://github.com/xEatos/searchsnail](https://github.com/xEatos/searchsnail) (Media Search Microservice)
 -  [https://github.com/xEatos/integrationindri](https://github.com/xEatos/integrationindri) (Integration & Import Microservice)

For the code used to analyze the survey in this thesis, see: [https://github.com/xEatos/survey-auswertung](https://github.com/xEatos/survey-auswertung)

If you would like to cite this work:
```
@article{stehr_digitale_2025,
	title = {Eine digitale {Wissensinfrastruktur} zur {Bereitstellung} von {Informationen} über wissenschaftliche {Videos} und {Podcasts}},
	url = {https://repo.uni-hannover.de/handle/123456789/19141},
	doi = {10.15488/18996},
	language = {ger},
	urldate = {2025-04-29},
	author = {Stehr, Niklas},
	month = apr,
	year = {2025},
	note = {Publisher: Hannover : Gottfried Wilhelm Leibniz Universität},
}
```

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
   - run: ```rover dev --supergraph-config .\supergraph_config.yaml --polling-interval 10```
 - check [http://localhost:4000/](http://localhost:4000/)
