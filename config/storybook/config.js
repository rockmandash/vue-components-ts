import '@storybook/addon-console';
import { addParameters } from '@storybook/vue';

addParameters({
  backgrounds: [
    { name: 'black', value: '#000000' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' }
  ],
  paddings: [
    { name: 'Small', value: '16px' },
    { name: 'Medium', value: '32px' },
    { name: 'Large', value: '64px' }
  ]
});
