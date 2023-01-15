const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder по умолчанию';

  const items = data.map((item) => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>
    `;
  });

  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <span class="arrow-down"></span>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `;
};

export class Select {
  constructor(selector, options) {
    this.selector = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.selector.classList.add('select');
    this.selector.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.selector.addEventListener('click', this.clickHandler.bind(this));
    this.firstItem = this.selector.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset; // или const type  = event.target.dataset.type

    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.selector.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.firstItem.textContent = this.current.value;

    this.selector.querySelectorAll('[data-type="item"]').forEach((el) => {
      el.classList.remove('selected');
    });
    this.selector.querySelector(`[data-id="${id}"]`).classList.add('selected');
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.selector.classList.add('open');
    let arrowDown = document.querySelector('.arrow-down');
    arrowDown.classList.remove('arrow-down');
    arrowDown.classList.add('arrow-up');
  }

  close() {
    this.selector.classList.remove('open');
    let arrowUp = document.querySelector('.arrow-up');
    arrowUp.classList.remove('arrow-up');
    arrowUp.classList.add('arrow-down');
  }

  /* можно програмно удалить весь объект select и слушатель события с помощью s.destroy() ,например, написав эту команду в консоли браузера или также обратившись к объекту select.destroy(); в редакторе IDE, т.к. select это наш объект класса Select */
  destroy() {
    this.selector.removeEventListener('click', this.clickHandler);
    this.selector.innerHTML = '';
  }
}
