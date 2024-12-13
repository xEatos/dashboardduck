import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

interface Step {
  label: React.ReactNode;
  page: React.ReactNode;
}

interface ImportStepperProps {
  initStep: number;
  steps: Step[];
}

type StepperNavigation = {
  back: () => void;
  next: () => void;
  toStart: () => void;
  finish: () => void;
};

export const StepperContext = createContext<StepperNavigation | undefined>(undefined);

export const ImportStepper: React.FC<ImportStepperProps> = ({ initStep, steps }) => {
  console.log('<ImportStepper>');

  const [activeStep, setActiveStep] = useState(initStep);

  const stepperFuncs = {
    back: () => {
      console.log(activeStep);
      activeStep - 1 >= 0 && setActiveStep(activeStep - 1);
    },
    next: () => {
      steps.length - 1 > activeStep && setActiveStep(activeStep + 1);
    },
    finish: () => {
      // todo stepper
    },
    toStart: () => {
      setActiveStep(0);
    }
  };

  return (
    <StepperContext.Provider value={stepperFuncs}>
      <Box sx={{ width: '100%', padding: 1 }}>
        <Stepper activeStep={activeStep} sx={{ padding: '4px 0px', position: 'sticky' }}>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {steps.find((_, index) => index === activeStep)?.page}
      </Box>
    </StepperContext.Provider>
  );
};

// TODO add function that should be called with the button click!!!!!!
export const StepBox: React.FC<{
  nextEnable?: boolean;
  backEnable?: boolean;
  finishEnable?: boolean;
  nextOption?: React.ReactNode;
  backOption?: React.ReactNode;
  finishOption?: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  onFinish?: () => void;
}> = ({
  nextEnable,
  nextOption,
  onNext,
  backEnable,
  backOption,
  onBack,
  finishEnable,
  finishOption,
  onFinish
}) => {
  const stepperFuncs = useContext(StepperContext);

  if (stepperFuncs === undefined) {
    throw new Error('Context is missing');
  }

  const { next, back, finish } = stepperFuncs;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 8px' }}>
      {backEnable === undefined ? (
        <Box />
      ) : (
        <Button
          variant={backEnable ? 'outlined' : 'contained'}
          disabled={!backEnable}
          onClick={() => {
            onBack?.();
            back();
          }}>
          {backOption ?? 'BACK'}
        </Button>
      )}
      <Box>
        {nextEnable === undefined ? null : (
          <Button
            variant={nextEnable ? 'outlined' : 'contained'}
            disabled={!nextEnable}
            onClick={() => {
              onNext?.();
              next();
            }}
            sx={{ mr: 2 }}>
            {nextOption ?? 'NEXT'}
          </Button>
        )}
        {finishEnable === undefined ? null : (
          <Button
            variant={finishEnable ? 'outlined' : 'contained'}
            disabled={!finishEnable}
            onClick={() => {
              onFinish?.();
              finish();
            }}>
            {finishOption ?? 'FINISH'}
          </Button>
        )}
      </Box>
    </div>
  );
};
