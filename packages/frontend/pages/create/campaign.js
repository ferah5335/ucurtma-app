import React from 'react';
import { Formik, Form } from 'formik';
import { Heading, Grid, Box, Text, Flex } from '@chakra-ui/core';
import * as Yup from 'yup';
import Header from '../../components/ui/header';
import Container from '../../components/ui/container';
import Card from '../../components/ui/card';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';
import Selection from '../../components/illustrations/selection';

const campaignSchema = Yup.object().shape({
  category: Yup.string().required('Required'),
});

function CreateCampaign() {
  return (
    <>
      <Header loggedIn />
      <Container>
        <Card paddingType="default">
          <Grid
            templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
            templateRows={{ base: '1fr 1fr', lg: '1fr' }}
            gap={4}
          >
            <Box>
              <Heading
                maxW="320px"
                fontWeight="500"
                size="md"
                color="paragraph"
                mb={4}
              >
                Welcome to campaign wizard, Let’s get you set up.
              </Heading>
              <Text color="passiveParagraph.500" maxW="468px" mb={4}>
                Pick a project category to connect with a specific community.
                You can always update this later.
              </Text>
              <Formik
                initialValues={{ category: '' }}
                validationSchema={campaignSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  // todo: add mutation
                  // todo: set state to section 2
                }}
              >
                {({ isSubmitting, errors }) => (
                  <Form>
                    <Box mb={4}>
                      <Input
                        label="Category"
                        name="category"
                        placeholder="Select Your Category"
                        type="select"
                      >
                        <option value="art">Art</option>
                      </Input>
                    </Box>
                    <Flex alignItems="flex-end">
                      <Button
                        ml="auto"
                        buttonType="primary"
                        type="button"
                        width="auto"
                        mt={2}
                        isLoading={isSubmitting}
                        disabled={
                          isSubmitting || Object.keys(errors).length > 0
                        }
                      >
                        Next: Project Info
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
            <Flex
              alignItems={{ base: 'center', lg: 'flex-end' }}
              justifyContent="center"
            >
              <Box maxW="227px">
                <Selection />
              </Box>
            </Flex>
          </Grid>
        </Card>
      </Container>
    </>
  );
}

export default CreateCampaign;
