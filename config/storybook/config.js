import '@storybook/addon-console';
import { addParameters } from '@storybook/vue';

addParameters({
  backgrounds: [
    { name: 'white', value: '#ffffff', default: true },
    { name: 'black', value: '#000000' },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998' }
  ]
});
