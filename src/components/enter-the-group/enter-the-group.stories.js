import EnterTheGroup from './enter-the-group';

export default {
  title: 'Enter The Group',
  component: EnterTheGroup,
  tags: ['autodocs'],
};

export const Example = (args) => (
  <EnterTheGroup
    id={2}
    title="Фотографируй все!"
    description="Группа для тех, кто любит фотографировать и делиться своими находками"
    followers_count={148}
    image_link="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"
    {...args}
  />
);
