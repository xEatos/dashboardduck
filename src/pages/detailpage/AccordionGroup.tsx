import React from 'react';
import Grid from '@mui/material/Grid2';
import { Accordion, AccordionDetails, AccordionSummary, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface AccordionPart {
  summary: React.ReactNode;
  id?: string;
  details: (id?: string) => React.ReactNode;
  isOpen: boolean;
}

export interface AccordionGroup {
  parts: AccordionPart[];
  onChange: (indicies: number[], newOpenState: boolean) => void;
}

export const AccordionGroup: React.FC<AccordionGroup> = ({ parts, onChange }) => {
  return (
    <Grid>
      {parts.map((part, index) => (
        <Accordion
          key={index}
          expanded={part.isOpen}
          onChange={() => {
            onChange([index], !part.isOpen);
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${index}-content`}
            id={`${index}-header`}>
            {part.summary}
          </AccordionSummary>
          <AccordionDetails>{part.isOpen ? part.details(part.id) : null}</AccordionDetails>
        </Accordion>
      ))}
    </Grid>
  );
};
