import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const mediaSchema = `type ImportMedia = {
  media: ImportMedium[];
};

type ImportMedium = {
  type: 'Video' | 'Podcast';
  title: string;
  publicationDate?: string; // in ISO 8691 format
  language?: string | string[]; // in ISO 693-1 format
  thumbnailURL: string;
  reference: {
    URL: string;
    publishedBy?: string;
    hostedBy?: string;
  }[]; // must have at least one element
  categories?: string | string[];
  transcript?: ImportMediumTranscript[];
  subtitleLanguage?: string | string[]; // in ISO 693-1 format
  duration: number; // in seconds
};

type ImportMediumTranscript = {
  language: string; // in ISO 693-1 format
  sections?: {
    heading: string;
    startTimestamp?: number;
    endTimestamp?: number;
    text: string;
  }[];
};`;

const exampleJSON = `{
  "media":[
    {
      "type":"Video",
      "title": "32% aller Erwachsenen haben diese Krankheit. Du auch?",
      "publicationDate":"2023-11-19",
      "language":"de",
      "thumbnailURL":"https://i.ytimg.com/vi_webp/FuV3ysSKOsw/maxresdefault.webp",
      "reference":{
        "URL":"https://www.youtube.com/watch?v=FuV3ysSKOsw",
        "publishedBy":"Doktor Whatson",
        "hostedBy":"YouTube"
      },
      "categories":[
        "Medicine",
        "Gastroenterology"
      ],
      "transcript":[
        {
          "language":"de",
          "sections":[
            {
              "heading":"Eine verbreitete Krankheit",
              "startTimestamp":"0",
              "endTimestamp":"76",
              "text":"Die Krankheit, über die wir heute sprechen, ..."
            },
            {
              "heading":"Was begünstigt diese Krankheit?",
              "startTimestamp":"76",
              "endTimestamp":"170",
              "text":"Wie und bei wem entwickelt sie sich? Wichtige ..."
            }
          ]
        }
      ],
      "subtitleLanguage":[
        "de",
        "en"
      ],
      "duration":"787"
    }
  ]
}`;

export const ImportExamplePanel: React.FC = () => {
  return (
    <Grid container wrap='nowrap' spacing={1} sx={{ padding: 1.5 }}>
      <Grid container direction='column' component={Paper} sx={{ padding: 1.5 }}>
        <Typography
          variant='body1'
          sx={{
            color: '#606060',
            fontStyle: 'italic',
            height: '24px',
            textDecoration: 'underline'
          }}>
          Schema in Typescript
        </Typography>
        <SyntaxHighlighter
          language='typescript'
          style={github}
          customStyle={{ backgroundColor: 'white', margin: '0px', padding: '0px' }}>
          {mediaSchema}
        </SyntaxHighlighter>
      </Grid>
      <Grid container direction='column' component={Paper} sx={{ padding: 1.5 }}>
        <Typography
          variant='body1'
          sx={{
            color: '#606060',
            fontStyle: 'italic',
            height: '24px',
            textDecoration: 'underline'
          }}>
          ExampleMediaImport.json
        </Typography>
        <SyntaxHighlighter
          language='json'
          style={github}
          customStyle={{ backgroundColor: 'white', margin: '0px', padding: '0px' }}>
          {exampleJSON}
        </SyntaxHighlighter>
      </Grid>
    </Grid>
  );
};
