import { RootStoreContext } from '../../src/contexts/RootStoreContext';
import rootStore from '../../src/store/root-store';

// Функция декоратор для использования контекста RootStoreContext

// Пример использования в компоненте Component:
//   import Component from './component';
//   import RootStoreContextDecorator from '../.storybook/decorators/RootStoreContextDecorator';
//   import rootStore from '/store/root-store';
//   import cloneDeep from 'lodash/cloneDeep';

// Установка шаблонного значения для userStore.user, значение которого
// мы хотим имитировать
// const rootStoreCopy = cloneDeep(rootStore);
// rootStoreCopy.userStore.user = {
//   first_name: "AnyName",
//   ...
// };

// export default {
//   title: 'Component',
//   component: Component,
//   tags: ['autodocs'],
//   argTypes: {
//     withData: {
//       options: [true, false],
//       control: { type: 'radio' },
//     },
//   },
//   decorators: [RootStoreContextDecorator(storeTemplate)],
// };

//  Теперь при выборе флага withData: true - будет применяться контекст c
//  изменённым rootStoreCopy. При withData: false - будет применяться контекст
//  c начальным экземпляром rootStore

const RootStoreContextDecorator = (rootStoreValue) => (Story, context) => {
  const withData = context.args?.withData;
  return (
    <RootStoreContext.Provider value={withData ? rootStoreValue : rootStore}>
      {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
      <Story />
    </RootStoreContext.Provider>
  );
};

export default RootStoreContextDecorator;
