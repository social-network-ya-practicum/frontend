import Post from './post';
import '../../index.scss';

export default {
  title: 'Post',
  component: Post,
  tags: ['autodocs'],
};

export const DefaultPost = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?',
    author: 'Тамара Райкина',
    pubdate: '2019-08-24',
    images: '',
    likecount: '18',
  },
};

export const PostWithImage = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?',
    author: 'Тамара Райкина',
    pubdate: '2023-08-24',
    images:
      'https://static.probusiness.io/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg',
    likecount: '30',
  },
};

export const PostWithLongText = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли. Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли.',
    author: 'Тамара Райкина',
    pubdate: '2021-11-11',
    images: '',
    likecount: '4',
  },
};

export const PostWithLongTextAndImg = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли. Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли.',
    author: 'Тамара Райкина',
    pubdate: '2021-11-11',
    images: 'https://static.probusiness.io/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg',
    likecount: '4',
  },
};
