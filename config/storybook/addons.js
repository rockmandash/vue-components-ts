import '@storybook/addon-viewport/register';
import '@storybook/addon-backgrounds/register';
import 'storybook-addon-paddings';
import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  theme
});
