import AboutUser from './about-user';
import '../../../index.scss';

export default {
  title: 'About User',
  component: AboutUser,
  tags: ['autodocs'],
};

export const Default = {
  args: {
  },
};

export const Example = {
  args: {
    contact: {
      birthday_day: '14',
      birthday_month: '7',
      bio: 'Люблю бегать по утрам, готовлю вкусный черничный пирог. Уэс Андерсон – мой личный герой.',
    }
  }
};

export const Example2 = {
  args: {
    contact: {
      birthday_day: '14',
      birthday_month: '7',
      bio: 'Люблю бегать по утрам.',
    }
  }
};
