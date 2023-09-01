class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', event => {
      event.preventDefault();

      if ($(event.target).hasClass('button--tertiary')) {
        return false
      }
      
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      
      cartItems.onCartChange(event)

      return false
    })
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status') || document.getElementById('CartDrawer-LineItemStatus');
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);
    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  fetchAndRefreshCart(updates = []) {
    fetch('/cart/update.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': `application/json` },
      body: JSON.stringify({ 
        updates,
        sections: this.getSectionsToRender().map((section) => section.section),
        sections_url: window.location.pathname
      })
    }).then(response => response.json()).then(parsedState => {
      console.log('parsedState', parsedState)
      // location.reload(true);
      this.classList.toggle('is-empty', parsedState.item_count === 0);
      const cartDrawerWrapper = document.querySelector('cart-drawer');
      const cartFooter = document.getElementById('main-cart-footer');

      if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
      if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);
      
      this.getSectionsToRender().forEach((section => {
        const elementToReplace =
          document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
        elementToReplace.innerHTML =
          this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
      }));

      return parsedState
    }).catch((error) => {
      throw new Error(error);
    }).finally(() => {
      this.disableLoading()
    })
  }

  onCartChange (event) {
    // 查找当前行
    const items = $(event.target.closest('.cart-items'))
    const line_item = $(event.target.closest('.cart-item'))

    const product_id = line_item.attr('data-line-item-product-id')
    const variant_id = line_item.attr('data-line-item-variant-id')

    const quantity = parseInt(line_item.attr('data-quantity'))
    // 如果 target value 有值，是onchange , 否则 onremove
    const to_quantity = event.target.value ? parseInt(event.target.value) : 0

    const index = parseInt(line_item.attr('data-index'))
    const sale_name = line_item.attr('data-line-item-sale-name')

    console.log(variant_id, sale_name, index, quantity, to_quantity)

    // 数量变动
    const quantity_arr = []

    // 查找保险产品
    const insurance = items.find(`.cart-item[data-insurance-product-variant-id="${variant_id}"][data-index="${index + 1}"]`)

    console.log('insurance', insurance)

    // 如果是带活动产品
    if (sale_name) {
      const sale_components = items.find(`.cart-item[data-line-item-sale-name="${sale_name}"]:not([data-line-item-variant-id="${variant_id}"]):not([data-line-item-product-id="${product_id}"])`)
      const sale_bikes = items.find(`.cart-item[data-line-item-sale-name="${sale_name}"][data-line-item-product-id="${product_id}"]`)

      // 计算车总数
      let count = 0
      // 遍历活动车
      sale_bikes.each((i, item) => {
        if (item === line_item[0]) {
          count += quantity
        } else {
          count += parseInt($(item).attr('data-quantity'))
        }      
      })

      // 活动配件
      sale_components.each((i, item) => {
        quantity_arr[$(item).attr('data-index') - 1] = (count - quantity) + to_quantity
      })

    }

    // 如果当前车variant 存在保险
    if (insurance.length === 1) {
      quantity_arr[insurance.attr('data-index') - 1] = to_quantity
    }

    // 修改产品本身 quantity
    quantity_arr[index - 1] = to_quantity

    // batch update quantity
    items.find('.cart-item').each((index, item) => {
      if (quantity_arr[index] === undefined) {
        quantity_arr[index] = parseInt($(item).attr('data-quantity'))
      }
    })

    

    console.log('quantity_arr', quantity_arr)

    // loading
    this.enableLoading(index)
    // fetch
    this.fetchAndRefreshCart(quantity_arr)
    event.preventDefault();
    return false
  }

  onChange(event) {
    this.onCartChange(event)
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }
  //
   updateQuantity(line, quantity, name,type) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });
    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartDrawerWrapper = document.querySelector('cart-drawer');
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
        if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count,type);//更改
        const lineItem =  document.getElementById(`CartItem-${line}`) || document.getElementById(`CartDrawer-Item-${line}`);
        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          cartDrawerWrapper ? trapFocus(cartDrawerWrapper, lineItem.querySelector(`[name="${name}"]`)) : lineItem.querySelector(`[name="${name}"]`).focus();
        } else if (parsedState.item_count === 0 && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'))
        } else if (document.querySelector('.cart-item') && cartDrawerWrapper) {
          trapFocus(cartDrawerWrapper, document.querySelector('.cart-item__name'))
        }
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors') || document.getElementById('CartDrawer-CartErrors');
        errors.textContent = window.cartStrings.error;
        this.disableLoading();
      }).finally(refreshProductCode)
  }

  updateLiveRegions(line, itemCount,type) {
    if(type=="remove")return;//更改
    if (this.currentItemCount === itemCount) {
      const lineItemError = document.getElementById(`Line-item-error-${line}`) || document.getElementById(`CartDrawer-LineItemError-${line}`);
      const quantityElement = document.getElementById(`Quantity-${line}`) || document.getElementById(`Drawer-quantity-${line}`);

      lineItemError
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          quantityElement.value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text') || document.getElementById('CartDrawer-LiveRegionText');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading-overlay`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading-overlay`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    const mainCartItems = document.getElementById('main-cart-items') || document.getElementById('CartDrawer-CartItems');
    mainCartItems.classList.remove('cart__items--disabled');
  }
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', class CartNote extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('change', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, {...fetchConfig(), ...{ body }});
      }, 300))
    }
  });
};
