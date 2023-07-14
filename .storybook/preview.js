import RootStoreContextDecorator from './decorators/RootStoreContextDecorator';
import rootStore from '../src/store/root-store';
import '../src/index.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [RootStoreContextDecorator(rootStore)],
};

export default preview;
