import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Flex } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CampaignWizardTemplate from '../../../components/ui/templates/campaign-wizard-template';
import Selection from '../../../components/illustrations/selection';
import Input from '../../../components/ui/input';
import Button from '../../../components/ui/button';
import Header from '../../../components/ui/header';

const stepOneSchema = Yup.object().shape({
  category: Yup.string(),
});

const stepTwoSchema = Yup.object().shape({
  summary: Yup.string().required('Required'),
});

function CreateCampaign() {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState({ category: '' });
  const [stepTwoValues, setStepTwoValues] = useState({ summary: '' });
  const router = useRouter();

  /*
   * to understand what stepFunctions is doing; you should check formik's onSubmit property. basically, we are trying to call
   * functions by using dynamic names and step indexes. when we try to submit step one, we're calling stepFunctions[0] which is setStepOneValues.
   */
  const stepFunctions = [setStepOneValues, setStepTwoValues];

  const steps = [
    {
      index: 0,
      title: "Welcome to campaign wizard, let's get you set up.",
      description:
        'Pick a project category to connect with a spesific community. You can always update this later',
      illustration: <Selection />,
      form: {
        initialValues: stepOneValues,
        validationSchema: stepOneSchema,
        inputs: [
          {
            label: 'Category',
            name: 'category',
            type: 'select',
            placeholder: 'Select your category',
            options: [{ value: 'art', label: 'Art' }],
          },
        ],
        nextButtonText: 'Next: Project Info',
      },
    },
    {
      index: 1,
      title: "Describe what you'll be creating.",
      description: "And don't worry, you can edit this later, too.",
      illustration: <Selection />,
      form: {
        initialValues: stepTwoValues,
        validationSchema: stepTwoSchema,
        inputs: [
          {
            label: 'Summary',
            name: 'summary',
            type: 'textarea',
          },
        ],
        nextButtonText: 'Next: Campaign Page',
        backButtonText: 'Category',
      },
    },
  ];

  return (
    <>
      <Header loggedIn />
      {steps.map(step => {
        const lastStepIndex = steps[steps.length - 1].index;
        if (activeStep === step.index) {
          return (
            <CampaignWizardTemplate
              title={step.title}
              description={step.description}
              illustration={step.illustration}
              key={step.index}
            >
              <Formik
                initialValues={step.form.initialValues}
                validationSchema={step.form.validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  stepFunctions[step.index](values);

                  if (step.form.onSubmit) {
                    step.form.onSubmit(values);
                    // return;
                  }

                  router.push(
                    '/create-campaign/wizard/',
                    `/create-campaign/wizard/step-0${activeStep + 1}`,
                    { shallow: true }
                  );

                  if (activeStep !== lastStepIndex) {
                    setActiveStep(activeStep + 1);
                  }

                  // todo: add mutation
                  // todo: set state to section 2
                }}
              >
                {({ isSubmitting, errors }) => (
                  <Form>
                    {step.form.inputs.map(input => (
                      <Box mb={4} key={`input${step.index}`}>
                        <Input
                          label={input.label}
                          name={input.name}
                          placeholder={input.placeholder || ''}
                          type={input.type || 'text'}
                        >
                          {input.options &&
                            input.type === 'select' &&
                            input.options.map(option => (
                              <option
                                key={`option${step.index}`}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                        </Input>
                      </Box>
                    ))}
                    <Flex mt={2} alignItems="flex-end">
                      {step.index !== 0 && (
                        <Button
                          mr="auto"
                          buttonType="custom"
                          width="auto"
                          type="button"
                          size="lg"
                          variant="ghost"
                          onClick={() => {
                            setActiveStep(activeStep - 1);
                            if (activeStep === 1) {
                              router.push(
                                '/create-campaign/wizard/',
                                `/create-campaign/wizard`,
                                { shallow: true }
                              );
                            } else {
                              router.push(
                                '/create-campaign/wizard/',
                                `/create-campaign/wizard/step-0${activeStep -
                                  1}`,
                                { shallow: true }
                              );
                            }
                          }}
                          isLoading={isSubmitting}
                          disabled={
                            isSubmitting || Object.keys(errors).length > 0
                          }
                        >
                          {step.form.backButtonText}
                        </Button>
                      )}
                      <Button
                        ml="auto"
                        buttonType="primary"
                        width="auto"
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={
                          isSubmitting || Object.keys(errors).length > 0
                        }
                      >
                        {step.form.nextButtonText}
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </CampaignWizardTemplate>
          );
        }
        return null;
      })}
    </>
  );
}

export default CreateCampaign;
