import { withRouter } from 'storybook-addon-react-router-v6';
import Header from './header';

export default {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
};

export const LoggedIn = {
  args: {
    user: {
      first_name: 'Юлия',
      photo: '',
      userId: 'string',
    },
  },
};

export const LoggedOut = {
  args: {},
};
