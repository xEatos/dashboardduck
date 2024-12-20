import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface Transcript {
  language: string;
  chapters: {
    id: string;
    heading?: string;
    from?: number;
    to?: number;
  }[];
}

export const TranscriptBox: React.FC<{
  transcripts: Transcript[];
}> = ({ transcripts }) => {
  const [language, setLanguage] = useState(transcripts.length > 0 ? transcripts[0].language : '');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  if (transcripts.length === 0) {
    return <p>Transcripts: No data</p>;
  }

  const chapters = transcripts.find(({ language }) => language === language)?.chapters;

  return (
    <>
      <Select
        labelId='transcriptLanguageLabel'
        id='transcriptLanguageId'
        value={language}
        label='Language'
        onChange={handleChange}>
        {transcripts.map(({ language }) => (
          <MenuItem key={language} value={language}>
            {language}
          </MenuItem>
        ))}
      </Select>
      <div>
        {chapters?.map((chapter) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1-content'
              id='panel1-header'>
              Accordion 1
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </>
  );
};
