import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@chakra-ui/core';
import Card from '../card';

function AccountFormTemplate({ form, illustration, children }) {
  return (
    <Flex
      justify="center"
      align="center"
      direction={{ base: 'column', lg: 'row' }}
      width="100%"
    >
      <Card width="100%">
        <Box py={8} px={10}>
          {form}
        </Box>
        {children && (
          <Box>
            <Flex align="center" pl={10} height="5rem" background="#FBFBFB">
              <Box>{children}</Box>
            </Flex>
          </Box>
        )}
      </Card>
      {illustration && (
        <Box w="100%" px={{ lg: 240, base: 12 }} mt={{ lg: 0, base: 12 }}>
          {illustration}
        </Box>
      )}
    </Flex>
  );
}

AccountFormTemplate.propTypes = {
  form: PropTypes.node.isRequired,
  illustration: PropTypes.node,
  children: PropTypes.node,
};

export default AccountFormTemplate;
