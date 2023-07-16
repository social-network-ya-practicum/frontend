import { BrowserRouter } from 'react-router-dom';
import GroupCard from './group-card';

export default {
  title: 'Group Card',
  component: GroupCard,
  tags: ['autodocs'],
};

export const Example = (args) => (
  <BrowserRouter>
    <GroupCard
      title="Фотографируй все!"
      imgSrc="https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg"
      description="Группа для тех, кто любит фотографировать и делиться своими находками"
      followCount={148}
      {...args}
    />
  </BrowserRouter>
);
