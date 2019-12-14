import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Grid, Box, Text, Flex } from '@chakra-ui/core';
import Container from '../container';
import Card from '../card';

function CampaignWizardTemplate({
  title,
  description,
  children,
  illustration,
}) {
  return (
    <>
      <Container>
        <Card paddingType="default">
          <Grid
            templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
            templateRows={{ base: '1fr 1fr', lg: '1fr' }}
            gap={4}
          >
            <Box>
              <Heading
                maxW="300px"
                fontWeight="500"
                size="md"
                color="paragraph"
                mb={4}
              >
                {title}
              </Heading>
              <Text color="passiveParagraph.500" maxW="468px" mb={4}>
                {description}
              </Text>
              {children}
            </Box>
            <Flex
              alignItems={{ base: 'center', lg: 'flex-end' }}
              justifyContent="center"
            >
              <Box maxW="227px">{illustration}</Box>
            </Flex>
          </Grid>
        </Card>
      </Container>
    </>
  );
}

CampaignWizardTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  illustration: PropTypes.node,
  children: PropTypes.node,
};

export default CampaignWizardTemplate;
