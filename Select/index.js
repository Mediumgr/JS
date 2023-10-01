import { Select } from './select';
import './styles.scss';

const select = new Select('#select', {
  placeholder: 'Выбери пожалуйста элемент',
  //   selectedId: '3',
  data: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Angular' },
    { id: '3', value: 'Vue' },
    { id: '4', value: 'React Native' },
    { id: '5', value: 'Next' },
    { id: '6', value: 'Nest' },
  ],
});

//привязываем объект select к window для того, чтобы он там появился в качестве глобального объекта s для управления извне, например, в консоли s.destroy() для удаления всего плагина.
window.s = select;
