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
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2019-08-24',
    images: [
      {
        image_link: '',
      },
    ],
    likecount: '18',
    admin: false,
    currentUser: {
      id: 1,
    },
  },
};

export const DefaultPostWithoutEditButton = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?',
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2019-08-24',
    images: [
      {
        image_link: '',
      },
    ],
    likecount: '18',
    admin: false,
    currentUser: {
      id: 2,
    },
  },
};

export const DefaultAdminPostWithAdminView = {
  args: {
    text: 'Админ, Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?',
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2019-08-24',
    images: [
      {
        image_link: '',
      },
    ],
    likecount: '123',
    admin: true,
    currentUser: {
      id: 1,
    },
  },
};

export const DefaultUserPostWithAdminView = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?',
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2019-08-24',
    images: [
      {
        image_link: '',
      },
    ],
    likecount: '18',
    admin: true,
    currentUser: {
      id: 2,
    },
  },
};

export const PostWithImage = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем?',
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2023-08-24',
    images: [
      {
        image_link:
          'https://static.probusiness.io/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg',
      },
    ],
    likecount: '30',
    admin: false,
    currentUser: {
      id: 1,
    },
  },
};

export const PostWithLongText = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли. Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли.',
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2021-11-11',
    images: [
      {
        image_link: '',
      },
    ],
    likecount: '4',
    admin: false,
    currentUser: {
      id: 1,
    },
  },
};

export const PostWithLongTextAndImg = {
  args: {
    text: 'Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли. Мы заключили договор с компанией Пронто. Нужно договориться, какие дальнейшие действия. Отмечаем? Хочется пригласить всех в наш кабинет для того, чтобы рассказать в подробностях, как мы шли к этой победе, сколько сил мы вложили в этот проект, как много бессонных ночей мы сидели над документами. Проверяли, выверяли.',
    author: {
      id: 1,
      first_name: 'Тамара',
      last_name: 'Райкина',
    },
    pubdate: '2021-11-11',
    images: [
      {
        image_link:
          'https://static.probusiness.io/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg',
      },
    ],
    likecount: '146',
    admin: false,
    currentUser: {
      id: 1,
    },
  },
};
