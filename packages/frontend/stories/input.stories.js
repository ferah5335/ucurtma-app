import React from 'react';
import { Formik } from 'formik';
import { boolean } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '../components/ui/input';

storiesOf('Input', module)
  .add('Default Input', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Input
          label="Label"
          name="deneme"
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
        />
      </Formik>
    </div>
  ))
  .add('Controlled Input', () => (
    <div className="my-10 mx-10">
      <Formik>
        <Input
          label="Label"
          disabled={boolean('Disabled Status', false)}
          required={boolean('Required Status', false)}
          value="you can't change this value, because input has value prop. see actions section."
          onChange={action('change value')}
        />
      </Formik>
    </div>
  ));
