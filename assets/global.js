function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}

document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
  summary.setAttribute('role', 'button');
  summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

  if(summary.nextElementSibling.getAttribute('id')) {
    summary.setAttribute('aria-controls', summary.nextElementSibling.id);
  }

  summary.addEventListener('click', (event) => {
    event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
  });

  if (summary.closest('header-drawer')) return;
  summary.parentElement.addEventListener('keyup', onKeyUpEscape);
});

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
  var elements = getFocusableElements(container);
  var first = elements[0];
  var last = elements[elements.length - 1];

  removeTrapFocus();

  trapFocusHandlers.focusin = (event) => {
    if (
      event.target !== container &&
      event.target !== last &&
      event.target !== first
    )
      return;

    document.addEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.focusout = function() {
    document.removeEventListener('keydown', trapFocusHandlers.keydown);
  };

  trapFocusHandlers.keydown = function(event) {
    if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
    // On the last focusable element and tab forward, focus the first element.
    if (event.target === last && !event.shiftKey) {
      event.preventDefault();
      first.focus();
    }

    //  On the first focusable element and tab backward, focus the last element.
    if (
      (event.target === container || event.target === first) &&
      event.shiftKey
    ) {
      event.preventDefault();
      last.focus();
    }
  };

  document.addEventListener('focusout', trapFocusHandlers.focusout);
  document.addEventListener('focusin', trapFocusHandlers.focusin);

  elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
  document.querySelector(":focus-visible");
} catch(e) {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
  let currentFocusedElement = null;
  let mouseClick = null;

  window.addEventListener('keydown', (event) => {
    if(navKeys.includes(event.code.toUpperCase())) {
      mouseClick = false;
    }
  });

  window.addEventListener('mousedown', (event) => {
    mouseClick = true;
  });

  window.addEventListener('focus', () => {
    if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

    if (mouseClick) return;

    currentFocusedElement = document.activeElement;
    currentFocusedElement.classList.add('focused');

  }, true);
}

function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((video) => {
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  });
  document.querySelectorAll('.js-vimeo').forEach((video) => {
    video.contentWindow.postMessage('{"method":"pause"}', '*');
  });
  document.querySelectorAll('video').forEach((video) => video.pause());
  document.querySelectorAll('product-model').forEach((model) => {
    if (model.modelViewerUI) model.modelViewerUI.pause();
  });
}

function removeTrapFocus(elementToFocus = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin);
  document.removeEventListener('focusout', trapFocusHandlers.focusout);
  document.removeEventListener('keydown', trapFocusHandlers.keydown);

  if (elementToFocus) elementToFocus.focus();
}

function onKeyUpEscape(event) {
  if (event.code.toUpperCase() !== 'ESCAPE') return;

  const openDetailsElement = event.target.closest('details[open]');
  if (!openDetailsElement) return;

  const summaryElement = openDetailsElement.querySelector('summary');
  openDetailsElement.removeAttribute('open');
  summaryElement.setAttribute('aria-expanded', false);
  summaryElement.focus();
}

class QuantityInput extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input');
    this.changeEvent = new Event('change', { bubbles: true })

    this.querySelectorAll('button').forEach(
      (button) => button.addEventListener('click', this.onButtonClick.bind(this))
    );
  }

  onButtonClick(event) {
    event.preventDefault();
    const previousValue = this.input.value;

    event.target.name === 'plus' ? this.input.stepUp() : this.input.stepDown();
    if (previousValue !== this.input.value) this.input.dispatchEvent(this.changeEvent);
  }
}

customElements.define('quantity-input', QuantityInput);

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': `application/${type}` }
  };
}

/*
 * Shopify Common JS
 *
 */
if ((typeof window.Shopify) == 'undefined') {
  window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
  return function() {
    return fn.apply(scope, arguments);
  }
};

Shopify.setSelectorByValue = function(selector, value) {
  for (var i = 0, count = selector.options.length; i < count; i++) {
    var option = selector.options[i];
    if (value == option.value || value == option.innerHTML) {
      selector.selectedIndex = i;
      return i;
    }
  }
};

Shopify.addListener = function(target, eventName, callback) {
  target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
  options = options || {};
  var method = options['method'] || 'post';
  var params = options['parameters'] || {};

  var form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);

  for(var key in params) {
    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", key);
    hiddenField.setAttribute("value", params[key]);
    form.appendChild(hiddenField);
  }
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

Shopify.CountryProvinceSelector = function(country_domid, province_domid, options) {
  this.countryEl         = document.getElementById(country_domid);
  this.provinceEl        = document.getElementById(province_domid);
  this.provinceContainer = document.getElementById(options['hideElement'] || province_domid);

  Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler,this));

  this.initCountry();
  this.initProvince();
};

Shopify.CountryProvinceSelector.prototype = {
  initCountry: function() {
    var value = this.countryEl.getAttribute('data-default');
    Shopify.setSelectorByValue(this.countryEl, value);
    this.countryHandler();
  },

  initProvince: function() {
    var value = this.provinceEl.getAttribute('data-default');
    if (value && this.provinceEl.options.length > 0) {
      Shopify.setSelectorByValue(this.provinceEl, value);
    }
  },

  countryHandler: function(e) {
    var opt       = this.countryEl.options[this.countryEl.selectedIndex];
    var raw       = opt.getAttribute('data-provinces');
    var provinces = JSON.parse(raw);

    this.clearOptions(this.provinceEl);
    if (provinces && provinces.length == 0) {
      this.provinceContainer.style.display = 'none';
    } else {
      for (var i = 0; i < provinces.length; i++) {
        var opt = document.createElement('option');
        opt.value = provinces[i][0];
        opt.innerHTML = provinces[i][1];
        this.provinceEl.appendChild(opt);
      }

      this.provinceContainer.style.display = "";
    }
  },

  clearOptions: function(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  },

  setOptions: function(selector, values) {
    for (var i = 0, count = values.length; i < values.length; i++) {
      var opt = document.createElement('option');
      opt.value = values[i];
      opt.innerHTML = values[i];
      selector.appendChild(opt);
    }
  }
};

class MenuDrawer extends HTMLElement {
  constructor() {
    super();

    this.mainDetailsToggle = this.querySelector('details');

    if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

    this.addEventListener('keyup', this.onKeyUp.bind(this));
    this.addEventListener('focusout', this.onFocusOut.bind(this));
    this.bindEvents();
  }

  bindEvents() {
    this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
    this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
  }

  onKeyUp(event) {
    if(event.code.toUpperCase() !== 'ESCAPE') return;

    const openDetailsElement = event.target.closest('details[open]');
    if(!openDetailsElement) return;

    openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(event, this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
  }

  onSummaryClick(event) {
    const summaryElement = event.currentTarget;
    const detailsElement = summaryElement.parentNode;
    const parentMenuElement = detailsElement.closest('.has-submenu');
    const isOpen = detailsElement.hasAttribute('open');
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function addTrapFocus() {
      trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
      summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
    }

    if (detailsElement === this.mainDetailsToggle) {
      if(isOpen) event.preventDefault();
      isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
    } else {
      setTimeout(() => {
        detailsElement.classList.add('menu-opening');
        summaryElement.setAttribute('aria-expanded', true);
        parentMenuElement && parentMenuElement.classList.add('submenu-open');
        !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
      }, 100);
    }
  }

  openMenuDrawer(summaryElement) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });
    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus = false) {
    if (event === undefined) return;

    this.mainDetailsToggle.classList.remove('menu-opening');
    this.mainDetailsToggle.querySelectorAll('details').forEach(details => {
      details.removeAttribute('open');
      details.classList.remove('menu-opening');
    });
    this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach(submenu => {
      submenu.classList.remove('submenu-open');
    });
    document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
    removeTrapFocus(elementToFocus);
    this.closeAnimation(this.mainDetailsToggle);
  }

  onFocusOut(event) {
    setTimeout(() => {
      if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
    });
  }

  onCloseButtonClick(event) {
    const detailsElement = event.currentTarget.closest('details');
    this.closeSubmenu(detailsElement);
  }

  closeSubmenu(detailsElement) {
    const parentMenuElement = detailsElement.closest('.submenu-open');
    parentMenuElement && parentMenuElement.classList.remove('submenu-open');
    detailsElement.classList.remove('menu-opening');
    detailsElement.querySelector('summary').setAttribute('aria-expanded', false);
    removeTrapFocus(detailsElement.querySelector('summary'));
    this.closeAnimation(detailsElement);
  }

  closeAnimation(detailsElement) {
    let animationStart;

    const handleAnimation = (time) => {
      if (animationStart === undefined) {
        animationStart = time;
      }

      const elapsedTime = time - animationStart;

      if (elapsedTime < 400) {
        window.requestAnimationFrame(handleAnimation);
      } else {
        detailsElement.removeAttribute('open');
        if (detailsElement.closest('details[open]')) {
          trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
        }
      }
    }

    window.requestAnimationFrame(handleAnimation);
  }
}

customElements.define('menu-drawer', MenuDrawer);

class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }

  openMenuDrawer(summaryElement) {
    this.header = this.header || document.getElementById('shopify-section-header');
    this.borderOffset = this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom') ? 1 : 0;
    document.documentElement.style.setProperty('--header-bottom-position', `${parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset)}px`);
    this.header.classList.add('menu-open');

    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    });

    summaryElement.setAttribute('aria-expanded', true);
    trapFocus(this.mainDetailsToggle, summaryElement);
    document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
  }

  closeMenuDrawer(event, elementToFocus) {
    super.closeMenuDrawer(event, elementToFocus);
    this.header.classList.remove('menu-open');
  }
}

customElements.define('header-drawer', HeaderDrawer);

class ModalDialog extends HTMLElement {
  constructor() {
    super();
    this.querySelector('[id^="ModalClose-"]').addEventListener(
      'click',
      this.hide.bind(this, false)
    );
    this.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') this.hide();
    });
    if (this.classList.contains('media-modal')) {
      this.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse' && !event.target.closest('deferred-media, product-model')) this.hide();
      });
    } else {
      this.addEventListener('click', (event) => {
        if (event.target === this) this.hide();
      });
    }
  }

  connectedCallback() {
    if (this.moved) return;
    this.moved = true;
    document.body.appendChild(this);
  }

  show(opener) {
    this.openedBy = opener;
    const popup = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden');
    this.setAttribute('open', '');
    if (popup) popup.loadContent();
    trapFocus(this, this.querySelector('[role="dialog"]'));
    window.pauseAllMedia();
  }

  hide() {
    document.body.classList.remove('overflow-hidden');
    document.body.dispatchEvent(new CustomEvent('modalClosed'));
    this.removeAttribute('open');
    removeTrapFocus(this.openedBy);
    window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);

class ModalOpener extends HTMLElement {
  constructor() {
    super();

    const button = this.querySelector('button');

    if (!button) return;
    button.addEventListener('click', () => {
      const modal = document.querySelector(this.getAttribute('data-modal'));
      if (modal) modal.show(button);
    });
  }
}
customElements.define('modal-opener', ModalOpener);

class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    const poster = this.querySelector('[id^="Deferred-Poster-"]');
    if (!poster) return;
    poster.addEventListener('click', this.loadContent.bind(this));
  }

  loadContent(focus = true) {
    window.pauseAllMedia();
    if (!this.getAttribute('loaded')) {
      const content = document.createElement('div');
      content.appendChild(this.querySelector('template').content.firstElementChild.cloneNode(true));

      this.setAttribute('loaded', true);
      const deferredElement = this.appendChild(content.querySelector('video, model-viewer, iframe'));
      if (focus) deferredElement.focus();
    }
  }
}

customElements.define('deferred-media', DeferredMedia);

class SliderComponent extends HTMLElement {
  constructor() {
    super();
    this.slider = this.querySelector('[id^="Slider-"]');
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.enableSliderLooping = false;
    this.currentPageElement = this.querySelector('.slider-counter--current');
    this.pageTotalElement = this.querySelector('.slider-counter--total');
    this.prevButton = this.querySelector('button[name="previous"]');
    this.nextButton = this.querySelector('button[name="next"]');

    if (!this.slider || !this.nextButton) return;

    this.initPages();
    const resizeObserver = new ResizeObserver(entries => this.initPages());
    resizeObserver.observe(this.slider);

    this.slider.addEventListener('scroll', this.update.bind(this));
    this.prevButton.addEventListener('click', this.onButtonClick.bind(this));
    this.nextButton.addEventListener('click', this.onButtonClick.bind(this));
  }

  initPages() {
    this.sliderItemsToShow = Array.from(this.sliderItems).filter(element => element.clientWidth > 0);
    if (this.sliderItemsToShow.length < 2) return;
    this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft;
    this.slidesPerPage = Math.floor((this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset);
    this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1;
    this.update();
  }

  resetPages() {
    this.sliderItems = this.querySelectorAll('[id^="Slide-"]');
    this.initPages();
  }

  update() {
    const previousPage = this.currentPage;
    this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1;

    if (this.currentPageElement && this.pageTotalElement) {
      this.currentPageElement.textContent = this.currentPage;
      this.pageTotalElement.textContent = this.totalPages;
    }

    if (this.currentPage != previousPage) {
      this.dispatchEvent(new CustomEvent('slideChanged', { detail: {
        currentPage: this.currentPage,
        currentElement: this.sliderItemsToShow[this.currentPage - 1]
      }}));
    }

    if (this.enableSliderLooping) return;

    if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft === 0) {
      this.prevButton.setAttribute('disabled', 'disabled');
    } else {
      this.prevButton.removeAttribute('disabled');
    }

    if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
      this.nextButton.setAttribute('disabled', 'disabled');
    } else {
      this.nextButton.removeAttribute('disabled');
    }
  }

  isSlideVisible(element, offset = 0) {
    const lastVisibleSlide = this.slider.clientWidth + this.slider.scrollLeft - offset;
    return (element.offsetLeft + element.clientWidth) <= lastVisibleSlide && element.offsetLeft >= this.slider.scrollLeft;
  }

  onButtonClick(event) {
    event.preventDefault();
    const step = event.currentTarget.dataset.step || 1;
    this.slideScrollPosition = event.currentTarget.name === 'next' ? this.slider.scrollLeft + (step * this.sliderItemOffset) : this.slider.scrollLeft - (step * this.sliderItemOffset);
    this.slider.scrollTo({
      left: this.slideScrollPosition
    });
  }
}

customElements.define('slider-component', SliderComponent);

class SlideshowComponent extends SliderComponent {
  constructor() {
    super();
    this.sliderControlWrapper = this.querySelector('.slider-buttons');
    this.enableSliderLooping = true;

    if (!this.sliderControlWrapper) return;

    this.sliderFirstItemNode = this.slider.querySelector('.slideshow__slide');
    if (this.sliderItemsToShow.length > 0) this.currentPage = 1;

    this.sliderControlLinksArray = Array.from(this.sliderControlWrapper.querySelectorAll('.slider-counter__link'));
    this.sliderControlLinksArray.forEach(link => link.addEventListener('click', this.linkToSlide.bind(this)));
    this.slider.addEventListener('scroll', this.setSlideVisibility.bind(this));
    this.setSlideVisibility();

    if (this.slider.getAttribute('data-autoplay') === 'true') this.setAutoPlay();
  }

  setAutoPlay() {
    this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay');
    this.autoplaySpeed = this.slider.dataset.speed * 1000;

    this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this));
    this.addEventListener('mouseover', this.focusInHandling.bind(this));
    this.addEventListener('mouseleave', this.focusOutHandling.bind(this));
    this.addEventListener('focusin', this.focusInHandling.bind(this));
    this.addEventListener('focusout', this.focusOutHandling.bind(this));

    this.play();
    this.autoplayButtonIsSetToPlay = true;
  }

  onButtonClick(event) {
    super.onButtonClick(event);
    const isFirstSlide = this.currentPage === 1;
    const isLastSlide = this.currentPage === this.sliderItemsToShow.length;

    if (!isFirstSlide && !isLastSlide) return;

    if (isFirstSlide && event.currentTarget.name === 'previous') {
      this.slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length;
    } else if (isLastSlide && event.currentTarget.name === 'next') {
      this.slideScrollPosition = 0;
    }
    this.slider.scrollTo({
      left: this.slideScrollPosition
    });
  }

  update() {
    super.update();
    this.sliderControlButtons = this.querySelectorAll('.slider-counter__link');
    this.prevButton.removeAttribute('disabled');

    if (!this.sliderControlButtons.length) return;

    this.sliderControlButtons.forEach(link => {
      link.classList.remove('slider-counter__link--active');
      link.removeAttribute('aria-current');
    });
    this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active');
    this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', true);
  }

  autoPlayToggle() {
    this.togglePlayButtonState(this.autoplayButtonIsSetToPlay);
    this.autoplayButtonIsSetToPlay ? this.pause() : this.play();
    this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay;
  }

  focusOutHandling(event) {
    const focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
    if (!this.autoplayButtonIsSetToPlay || focusedOnAutoplayButton) return;
    this.play();
  }

  focusInHandling(event) {
    const focusedOnAutoplayButton = event.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(event.target);
    if (focusedOnAutoplayButton && this.autoplayButtonIsSetToPlay) {
      this.play();
    } else if (this.autoplayButtonIsSetToPlay) {
      this.pause();
    }
  }

  play() {
    this.slider.setAttribute('aria-live', 'off');
    clearInterval(this.autoplay);
    this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed);
  }

  pause() {
    this.slider.setAttribute('aria-live', 'polite');
    clearInterval(this.autoplay);
  }

  togglePlayButtonState(pauseAutoplay) {
    if (pauseAutoplay) {
      this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow);
    } else {
      this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused');
      this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow);
    }
  }

  autoRotateSlides() {
    const slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }

  setSlideVisibility() {
    this.sliderItemsToShow.forEach((item, index) => {
      const button = item.querySelector('a');
      if (index === this.currentPage - 1) {
        if (button) button.removeAttribute('tabindex');
        item.setAttribute('aria-hidden', 'false');
        item.removeAttribute('tabindex');
      } else {
        if (button) button.setAttribute('tabindex', '-1');
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
    });
  }

  linkToSlide(event) {
    event.preventDefault();
    const slideScrollPosition = this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * (this.sliderControlLinksArray.indexOf(event.currentTarget) + 1 - this.currentPage);
    this.slider.scrollTo({
      left: slideScrollPosition
    });
  }
}

customElements.define('slideshow-component', SlideshowComponent);

class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange);
  }

  onVariantChange() {
    this.updateOptions();
    this.updateMasterId();
    this.toggleAddButton(true, '', false);
    this.updatePickupAvailability();
    this.removeErrorMessage();

    if (!this.currentVariant) {
      this.toggleAddButton(true, '', true);
      this.setUnavailable();
    } else {
      this.updateMedia();
      this.updateURL();
      this.updateVariantInput();
      this.renderProductInfo();
      this.updateShareUrl();
    }
  }

  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (select) => select.value);
  }

  updateMasterId() {
    this.currentVariant = this.getVariantData().find((variant) => {
      return !variant.options.map((option, index) => {
        return this.options[index] === option;
      }).includes(false);
    });
  }

  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;

    const mediaGallery = document.getElementById(`MediaGallery-${this.dataset.section}`);
    mediaGallery.setActiveMedia(`${this.dataset.section}-${this.currentVariant.featured_media.id}`, true);

    const modalContent = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`);
    if (!modalContent) return;
    const newMediaModal = modalContent.querySelector( `[data-media-id="${this.currentVariant.featured_media.id}"]`);
    modalContent.prepend(newMediaModal);
  }

  updateURL() {
    if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateShareUrl() {
    const shareButton = document.getElementById(`Share-${this.dataset.section}`);
    if (!shareButton || !shareButton.updateUrl) return;
    shareButton.updateUrl(`${window.shopUrl}${this.dataset.url}?variant=${this.currentVariant.id}`);
  }

  updateVariantInput() {
    const productForms = document.querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`);
    productForms.forEach((productForm) => {
      const input = productForm.querySelector('input[name="id"]');
      input.value = this.currentVariant.id;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  updatePickupAvailability() {
    const pickUpAvailability = document.querySelector('pickup-availability');
    if (!pickUpAvailability) return;

    if (this.currentVariant && this.currentVariant.available) {
      pickUpAvailability.fetchAvailability(this.currentVariant.id);
    } else {
      pickUpAvailability.removeAttribute('available');
      pickUpAvailability.innerHTML = '';
    }
  }

  removeErrorMessage() {
    const section = this.closest('section');
    if (!section) return;

    const productForm = section.querySelector('product-form');
    if (productForm) productForm.handleErrorMessage();
  }

  renderProductInfo() {
    fetch(`${this.dataset.url}?variant=${this.currentVariant.id}&section_id=${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html')
        const destination = document.getElementById(`price-${this.dataset.section}`);
        const source = html.getElementById(`price-${this.dataset.originalSection ? this.dataset.originalSection : this.dataset.section}`);
        if (source && destination) destination.innerHTML = source.innerHTML;

        const price = document.getElementById(`price-${this.dataset.section}`);

        if (price) price.classList.remove('visibility-hidden');
        this.toggleAddButton(!this.currentVariant.available, window.variantStrings.soldOut);
      });
  }

  toggleAddButton(disable = true, text, modifyClass = true) {
    const productForm = document.getElementById(`product-form-${this.dataset.section}`);
    if (!productForm) return;
    const addButton = productForm.querySelector('[name="add"]');
    const addButtonText = productForm.querySelector('[name="add"] > span');
    if (!addButton) return;

    if (disable) {
      addButton.setAttribute('disabled', 'disabled');
      if (text) addButtonText.textContent = text;
    } else {
      addButton.removeAttribute('disabled');
      addButtonText.textContent = window.variantStrings.addToCart;
    }

    if (!modifyClass) return;
  }

  setUnavailable() {
    const button = document.getElementById(`product-form-${this.dataset.section}`);
    const addButton = button.querySelector('[name="add"]');
    const addButtonText = button.querySelector('[name="add"] > span');
    const price = document.getElementById(`price-${this.dataset.section}`);
    if (!addButton) return;
    addButtonText.textContent = window.variantStrings.unavailable;
    if (price) price.classList.add('visibility-hidden');
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }
}

customElements.define('variant-selects', VariantSelects);

class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }

  updateOptions() {
    const fieldsets = Array.from(this.querySelectorAll('fieldset'));
    this.options = fieldsets.map((fieldset) => {
      return Array.from(fieldset.querySelectorAll('input')).find((radio) => radio.checked).value;
    });
  }
}

customElements.define('variant-radios', VariantRadios);


window.customElements.define('count-down', class extends HTMLElement {
    static observedAttributes = ["endtime", "fontcolor", "fontweight", "fontfamily", "fontsize", 'ratio',
        'timezone'
    ];

    // config
    config = {
        endtime: 0,
        fields: ['days', 'hours', 'minutes', 'seconds'],
        units: ['days', 'hours', 'minutes', 'seconds'],
        days: 1000 * 60 * 60 * 24,
        hours: 1000 * 60 * 60,
        minutes: 1000 * 60,
        seconds: 1000,
        ratio: window.devicePixelRatio || 1,
        fontsize: 100,
        fontcolor: 'red',
        fontweight: '600',
        fontfamily: 'sans-serif',
        timezoneoffset: 0
    }

    width = 0
    height = 0
    textWidth = 0

    constructor() {
        // 必须首先调用 super 方法
        super();

        const shadow = this.attachShadow({
            mode: "open"
        });
        this.canvas = document.createElement('canvas')
        this.div = document.createElement('div')
        shadow.appendChild(this.canvas)
        shadow.appendChild(this.div)

        this.style.display = 'flex'
        this.style.flexDirection = 'column'
        this.style.alignItems = 'flex-start'
        this.style.justifyContent = 'center'
        this.style.userSelect = 'none'
        // this.style.letterSpacing = '0px'
    }

    getUTCTime(now = new Date()) {
        return now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + this.config.timezoneoffset
    }


    initCanvas() {
        this.context = this.canvas.getContext("2d");


        for (const unit of this.config.units) {
            const span = document.createElement('span')
            span.innerText = unit.toUpperCase()
            span.style.color = this.config.fontcolor
            span.style.fontSize = `${this.config.fontsize / 3.75}px`
            span.style.fontWeight = `${Number(this.config.fontweight) + 200}`
            span.style.flex = 1
            span.style.textAlign = 'center'
            span.style.display = 'flex'
            span.style.alignItems = 'center'
            span.style.justifyContent = 'center'
            span.style.width = '100%'
            span.style.minWidth = '100%'

            this.div.appendChild(span)
        }

        this.div.style.letterSpacing = '-1px'
        this.div.style.display = 'grid'
        this.div.style.gridTemplateColumns = `repeat(${this.config.units.length}, 1fr)`
        this.div.style.columnGap = '12%'

        window.onresize = () => this.onResize()
        this.onResize()
    }

    onResize(width = 0, height = 0) {
        console.log(width, height)

        this.width = Math.floor(width * this.config.ratio)
        this.height = Math.floor(height * this.config.ratio)

        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.width = `${this.width}px`
        this.canvas.style.height = `${this.height}px`
       this.context.scale(this.config.ratio, this.config.ratio);
    }


    startCountdown() {
        let cachedValues = {};

        const updateTimer = (timestamp) => {
            let timeDifference = this.config.endtime - this.getUTCTime();

            if (timeDifference <= 0) {
              this.parentNode.style.display = 'none'
                return console.log("Countdown Ended!");
            } else {
                const values = {};

                for (const field of this.config.fields) {
                    values[field] = Math.floor(timeDifference / this.config[field]);
                    timeDifference = timeDifference % this.config[field];
                }

                const hasChanged = Object.keys(values).some(field => values[field] !== cachedValues[field]);

                if (hasChanged) {
                    cachedValues = {
                        ...values
                    };


                    this.onResize(this.width, this.height)


                    this.context.clearRect(0, 0, this.width, this.height);
                    this.context.fillStyle = this.config.fontcolor;
                    this.context.font = `${this.config.fontweight} ${this.config.fontsize}px ${this.config.fontfamily}`;
                    // this.context.textAlign = 'center';
                    this.context.textBaseline = 'middle';

                    let text = "";
                    for (const field of this.config.fields) {
                        text += `${text === "" ? '' : ' : '}${String(values[field]).padStart(2, '0')}`
                    }

                    this.context.fillText(text, 0, this.height / 1.625);

                    const matrix = this.context.measureText(text);
                    this.height = Math.floor((matrix.actualBoundingBoxAscent + matrix.actualBoundingBoxDescent) * this.config.ratio * 1.4 )
                    this.width = Math.floor(matrix.width * this.config.ratio)
                
                    this.div.style.width = `${this.width}px`
                }
            }

            setTimeout(updateTimer, 1000)
        }

        setTimeout(updateTimer)
    }


    connectedCallback() {
        this.initCanvas()
        this.startCountdown();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, newValue)

        if (name === 'timezone') {
            const zone = newValue === 'us' ? 420 : -120
            return this.config.timezoneoffset = zone * 1000 * 60
        }

        if (name === 'endtime' && newValue) {
            const [y, m, d] = newValue.split('-').map(Number)
            this.config.endtime = this.getUTCTime(new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0) + this.config.timezoneoffset))
            return
        }


        this.config[name] = newValue
    }
})



      // 普通页面清掉这两个参数
      window.sessionStorage.checkout_email = ''
      window.sessionStorage.checkout_email_local = ''
          // 当前页面id
      const current_page_id = '{{ template }}'
      console.log('current_page_id:', current_page_id);

    
      function fetchBuried (name = '', type = '', data = {}, isSendBeacon = false) {
        const body = {
            module: "website-us",
            trace_name: `${name}-us`,
            trace_type: `${type}-${document.body.clientWidth > 768 ? 'pc' : 'mb'}`,
            extras: data
        }

        return isSendBeacon ? navigator.sendBeacon('https://api.newurtopia.com/third_part/traces', JSON.stringify(body)) : fetch("https://api.newurtopia.com/third_part/traces", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    // 查询url 参数
    function getSearchValues () {
      const search = {}

      // 页面url
      const url = new URL(location.href)

      for (const [k, v] of url.searchParams.entries()) {
          search[k] = v
      }

      return search
    }


    function replaceSearchValue (k, v) {
        if (!k || !v) {
            return
        }
    
        const url = new URL(location.href)
        url.searchParams.set(k, v)
    
        history.replaceState(null, '', url);
    }

    // product price 格式化函数
    function getPriceFormat (value = 0, ignoreZero = false) {
      const instance =  new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: Shopify.currency.active,
        roundingMode: 'floor',
        minimumFractionDigits: ignoreZero ? 0 : 2,
        maximumFractionDigits: ignoreZero ? 0 : 2
      })

      return instance.format(value / 100)
    }

    function throttle(method, delay, duration){
        var timer=null;
        var begin=new Date();    
        return function(){                
            var context=this, args=arguments;
            var current=new Date();        
            clearTimeout(timer);
            if(current-begin>=duration){
                method.apply(context,args);
                begin=current;
            }else{
                timer=setTimeout(function(){
                    method.apply(context,args);
                },delay);
            }
        }
    }


    function debounce(fn, wait = 300) {
        // 自由变量，debounce执行完成被释放，time也不会被释放
        let time;
        // 返回一个闭包，接受参数
        return function (...args) {
            // 保存闭包被调用时的this
            const this_ = this;
            // 清除上一次的定时器
            if (time) {
                clearTimeout(time);
            };
            // 不再是直接执行fn，在内部传递参数
            time = setTimeout(function () {
                // 通过apply修改fn的this
                fn.apply(this_, args);
            }, wait);
        }
    };


      // 视频播放
  function showVideoDialog (src = '') {
    console.log('src', src)

    if (!src) {
      return
    }

    const template = `<div class="video-box">
      <div style="position: relative">
        <iframe
          width="${document.body.clientWidth > 768 ? 840 : document.body.clientWidth * 0.84 }"
          height="${document.body.clientWidth > 768 ? 472 : 'auto'}"
          src="${src}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <span class="close" onclick="closeMiniDialog()">x</span>
      </div>
    </div>`

    showMiniDialog(template)
  }


  
  function showMiniDialog(html = '') {
    const mini_dialog = $('body .mini-dialog')

    if (mini_dialog.length) {
        return setTimeout(showMiniDialog, 5000, html)
    }

    setTimeout(() => {
      $("body").append(`<div class="mini-dialog" style="display: flex;">${html}</div>`)
    })
  }
  
  function closeMiniDialog() {
    // console.log(a === document.querySelector('body .mini-dialog'))
    $('body .mini-dialog').remove()
  }



  window.global_config = {
    sale_end_times: [
      {
        sale_name: 'Flash Sale',
        sale_end_time: '2024-12-9'
      },
      {
        sale_name: 'Flash Sale',
        sale_end_time: '2024-12-13'
      },
      {
        sale_name: 'Flash Sale',
        sale_end_time: '2024-12-16'
      },
    ],
      // 活动产品id
      event_bike_product_id: '7902779474168',
      // 活动送配件 variant_id
      event_accessories_variant_ids: ['43830635561208', '43858617204984'],
  
      // 是否是手机
      is_mobile: document.documentElement.clientWidth < 768,
       // 是否是 pc
      is_pc: !!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
      dialog: {
          email: {
            is_hide: false,
            subscribe_email_close_expires_time: 1,              // 邮件进入弹窗 关闭过期时间
            subscribe_email_message_close_expires_time_mb: 3,   // 邮件小弹窗 关闭过期时间 -> 移动端
            subscribe_email_message_close_expires_time_pc: 1,   // 邮件小弹窗 关闭过期时间 -> pc端
            submit_expires_time: 30,                            // 邮件类弹窗 提交过期时间
            close_expires_time: 3,                              // 邮件类弹窗 关闭过去时间
            show_delay_time: 15                                 // 邮件类延迟弹出时间，单位:s
          },
          test_ride: {
            is_hide: false,
            submit_expires_time: 7,
            close_expires_time: 3,
            show_delay_time: 15
          }
        },
        // carbon 产品页面配置
      carbon_order_page_config: {
          // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
          default_variant: 43556895916280,
          // variant 为 available:false 的情况下 也要强制显示 
          ignore_variants_available_false: [],
          size_map: {
              S: `Fit for 5’3’’~5’9’’ Inseam 30’’`,
              M: `Fit for 5’7’’~6’1’’ Inseam 31’’`,
              L: `Fit for 5’11’’~6’5’’ Inseam 33’’`
          },
        awards: [
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163215.png?v=1702542766',
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163208.png?v=1702542765'
        ],
          // 产品系列图
          product_images: {
              "Carbon 1 · 250W · Carbon Belt": {
                  Sirius: [
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18718.png?v=1688710795",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18719.png?v=1688710795",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18720.png?v=1688710795"
                  ],
                  Lyra: [
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18721.png?v=1688710795'
                  ],
                  "Midnight in Paris": [
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18722.png?v=1688710795"
                  ],
                  Vanilla: [],
                  // 公共图片
                  commonSwiper: [
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18729.png?v=1688710794",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18728.png?v=1688710795",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18727.png?v=1688710794",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18726.png?v=1688710795",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18725.png?v=1688710795",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18724.png?v=1688710795",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/ssss.png?v=1688710795"
                  ]
              },
              "Carbon 1s · 350W · Shimano 7-Speed": {
                  Sirius: [
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18748.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18749.png?v=1688711251",
                  ],
                  Lyra: [
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18746.png?v=1688711251'
                  ],
                  Vanilla: [
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18750.png?v=1688711251'
                  ],
                  "Midnight in Paris": [
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18747.png?v=1688711251"
                  ],
                  commonSwiper: [
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18741.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/45.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18739.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18738.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18737.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18736.png?v=1688711251",
                      "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/ssss_42ab57d5-1e69-4b74-8cba-ffc1452a3dec.png?v=1688711251"
                  ]
              }
          },
          // 产品图下面的media模块, 根据产品图 循环轮播 
          product_media_images: [
              {
                  text: `“The AI-powered co-pilot adds a new level<br>of intelligence and interactivity”`,
                  img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230913-173450.png?v=1694597715"
              },
              {
                  text: `“One of the smartest and lightest ebike”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/img_v2_1f5341a218124ab39b4bb5cd49cc335g-1668500914564.png"
              },
              {
                  text: `“Like a phone’s than a next-gen fixie”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/mask-group-181222x-1672131955609.png"
              },
              {
                  text: `“Does phone tech better than some phones”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/img_v2_c977d9efae3a4c46ad2ddac55c5dabfg-1668500914568.png"
              },
              {
                  text: `“It’s incredibly fun to ride”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/t/63/assets/20221227174330-1672134242872.png"
              }
          ],
          // 默认的发货时间 文案
          ebike_default_delivery_time: 'Free shipping <span>within 5 business days</span> from L.A. warehouse.',
          // 发货时间映射表
          // key:    vairant_id
          // value:  发货时间文案
          ebike_delivery_time: {
              // carbon 1
              43556899913976: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43556899979512: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43556899946744: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43645495443704: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43556900012280: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43556900077816: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43556900045048: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              43645495476472: 'Ships within <span>3 business days</span> from L.A. warehouse.',
              // carbon 1s
              43556899651832: 'Ships within <span>10 business days</span> from L.A. warehouse.',
              //lb l
              43556896014584: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              //pb s
              43556899684600: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              //pw s
              43556899750136: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              //pw l
              43556899881208: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              //sb m
              43556895916280: 'Ships between <span>January 1-15, 2023 </span>from L.A. warehouse.',
              //pb m
              43556896047352: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              43556899619064: 'Ships within <span>10 business days </span>from L.A. warehouse.',
              43645495345400: 'Ships within <span>10 business days </span>from L.A. warehouse.',
              //pw m
              43556899815672: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              //lb m
              43556895981816: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              43645495378168: 'Ships within <span>10 business days </span>from L.A. warehouse.',
              //sb l
              43556895949048: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              //pb l
              43556896080120: 'Ships within <span>5 business days</span> from L.A. warehouse.',
              43645495410936: 'Ships within <span>10 business days </span>from L.A. warehouse.',
              //日期写法： 'Ships between <span>July 10-20, 2023 </span>from L.A. warehouse.',
              // chord
              // chord x
          },
      },
      // carbon 产品页面配置
      carbon_fold_order_page_config: {
          // carbon 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
          default_variant: 45838852129016,
          // variant 为 available:false 的情况下 也要强制显示 
          ignore_variants_available_false: [],
          size_map: {
              'One Size': `Fit for 5’1’’~6’1’’`,
          },
          // 产品系列图
          product_images: {
              'Saffron Yellow': [
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185158.jpg?v=1729162376',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155815.jpg?v=1731052718',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155759.jpg?v=1731052717',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155820.jpg?v=1731052718',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155810.jpg?v=1731052717',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155805.jpg?v=1731052718',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241113-140713.jpg?v=1731478063',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185203.jpg?v=1729162376',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185140.jpg?v=1729162376',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185210.jpg?v=1729162376',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185150.jpg?v=1729162376',
              ],
              'Aegean Blue': [
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185454.jpg?v=1729162539',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155815.jpg?v=1731052718',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155759.jpg?v=1731052717',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155820.jpg?v=1731052718',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155810.jpg?v=1731052717',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241108-155805.jpg?v=1731052718',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185449.jpg?v=1729162539',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185513.jpg?v=1729162539',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185459.jpg?v=1729162539',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241017-185504.jpg?v=1729162539'
               ],
              commonSwiper: [
            ]
            },
            // 产品图下面的media模块, 根据产品图 循环轮播 
            product_media_images: [
                {
                    text: 'Carbon Fiber Expert',
                    img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
                },
                {
                    text: `“Visually stunning and lightweight bikes”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
                },
                {
                    text: `“The best electric bikes of 2024”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
                },
                {
                    text: `“Pack with copious use of technology”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
                },
                {
                    text: `“Pack with copious use of technology”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
                },
                {
                    text: `“The epitome of raw power”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
                },
                {
                    text: `“Carbon 1 Pro as ‘a bike with spirit”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
                },
                {
                    text: `“Standout feature lies in its integration with advanced technology. ”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
                },
                {
                    text: `“Interesting innovation or tech for tech’s sake”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
                },
                {
                    text: `“Completely crazy: This e-bike talks to the rider”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
                },
                {
                    text: `“The iPhone among e-bikes”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
                },
                {
                    text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
                    img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
                }
            ],
          // 默认的发货时间 文案
          ebike_default_delivery_time: 'Free shipping within 5 business days.',
          // 发货时间映射表
          // key:    vairant_id
          // value:  发货时间文案
          ebike_delivery_time: {
          },
          sizes_and_specs: {
              sizes: {
                  image: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241203-110142.png?v=1733194922',
                  parameters: [
                      [
                          '<span style="color: #fff;">xxxx</span>',
                          'Recomm. rider height',
                          'A. Adjustable seat range',
                          'B. Highest point of the seat post',
                          'C. Overall length',
                          'D. Handlebar grips height',
                          'E. Headset height',
                          'F. Seat tube length',
                          'G. Wheel diameter',
                          'H. Wheelbase',
                          'I. Height after folding',
                          'J. Overall length after folding',
                      ],
                      [
                          '<span class="u17DemiBold_v2">One Size</span>',
                          '5’1’’~6’1’’',
                          '220 mm',
                          '1020 mm',
                          '1480 mm',
                          '1090 mm',
                          '400 mm',
                          '310 mm',
                          '450 mm',
                          '1000 mm',
                          '680 mm',
                          '800 mm'
                      ],
                  ]
              },
              specs: [
                  {
                      title: 'General Info',
                      parameters: [
                          ["Model", "Carbon Folding E-Bike"],
                          ["Weight", "29 lbs"],
                          ["Material", "Carbon fiber (frame, fork)"],
                          ["Range", "40miles"],
                          ["Top Speed", "20mph"],
                          ["Total Weight Limit", "220 lbs"],
                          ["Rider Height", `5’1’’ - 6’1’’`],
                          ["Brakes", "TEKTRO hydraulic disc brakes"],
                          ["Wheels", `INNOVA 18" x 2.0`],
                          ["", ``],
                      ]
                  },
                  {
                      title: 'Ebike System',
                      parameters: [
                          ["Motor", "Peak 500W hub motor, 42Nm"],
                          ["Battery", "36V 7Ah (252 Wh) seat post battery"],
                          ["Pedal Assist", "5 levels"],
                          ["Charger", "3H fast charger, 42V 2Amp"],
                          ["Display", "Color display"],
                          ["Sensors", "Torque sensor"],
                          ["Headlights", "External headlights 160LM"],
                          ["Rearlights", "Integrated rear lights"],
                      ]
                  },
                  {
                      title: 'Drivetrain',
                      parameters: [
                          ["Chainrings", "53T"],
                          ["Cassette", "11-32T, 8 Speed"],
                          ["Chain", "Chain KMC Z7"],
                          ["Rear Derailleur", "Shimano Altus 8-Speed"],
                          ["Shift Lever", "8 Speed Trigger"],
                          ["", ``],
                      ]
                  }
              ] 
            },
      },
      // chrod order page 配置项
      chord_order_page_config: {
          // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
          default_variant: 43694976696568,
          // variant 为 available:false 的情况下 也要强制显示 
          ignore_variants_available_false: [],
          size_map: {
              'High-Step': `Fit for 5’7’’~6’5’’`,
              'Step-Through': `Fit for 5’3’’~6’1’’`
          },
        awards: [
          'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231214-163200.png?v=1702542765'
        ],
          // 产品图
          product_images: {
              "High-Step": {
                  White: [
                      "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18755.png?v=1689236358",
                      "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18760.png?v=1689236358",
                      "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18762.png?v=1689236358",
  
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18765.png?v=1689236562',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18769.png?v=1689236563',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18766.png?v=1689236562'
                  ],
                  Black: [
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18754.png?v=1689236445',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18758.png?v=1689236445',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18759.png?v=1689236445',
  
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18770_ae2056ef-cd08-42d1-a7b4-e8f125eae35a.png?v=1689237082',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18771.png?v=1689237081',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772_58e3cebc-b65d-42e2-bee0-f40c0662e725.png?v=1695388441'
                  ],
                  commonSwiper: [
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6129.jpg?v=1695387132',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6611.jpg?v=1695387132',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF2506.jpg?v=1695387132',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-5302.jpg?v=1695387132'
                  ]
              },
              "Step-Through": {
                  White: [
                      "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18757.png?v=1689237250",
                      "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18763.png?v=1689237250",
                      "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18764.png?v=1689237251",
  
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18765.png?v=1689236562',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18769.png?v=1689236563',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18766.png?v=1689236562'
                  ],
                  Black: [
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18756.png?v=1689237251',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18767.png?v=1689237251',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18768.png?v=1689237250',
  
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18770_ae2056ef-cd08-42d1-a7b4-e8f125eae35a.png?v=1689237082',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18771.png?v=1689237081',
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18772_58e3cebc-b65d-42e2-bee0-f40c0662e725.png?v=1695388441'
                  ],
                Gray: [
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_side.png?v=1696833425',
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_front.png?v=1696833426',
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_back.png?v=1696833425',
  
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_bar.png?v=1696833426',
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_gear.png?v=1696833426',
                      'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/chord_x_gr_downtube.png?v=1696833426'
                  ],
                  commonSwiper: [
                      'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230224-145010_f48cb52f-2d3d-4a4f-b7f7-c6c2980349c9.png?v=1689236897',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6129.jpg?v=1695387132',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-6611.jpg?v=1695387132',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/DSCF2506.jpg?v=1695387132',
            'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20230213-untitled-5302.jpg?v=1695387132'
                  ]
              }
          },
        product_media_images: [
              {
                text: `“The smoothest and cleanest look”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18675_2x_75c49337-c9e2-4f36-8d62-bf676477342b.png?v=1699861700"
              },
              {
                text: `“Battery integrated under the top tube like never before.”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18931_2x_4bfe7a5e-d7f8-4241-b453-6f1269875cd7.png?v=1699861708"
              },
              {
                text: `“A lifestyle piece incorporates cutting-edge technology”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18927_2x_221c18ab-9822-4bfd-8434-e4da565bc9ac.png?v=1699861715"
              },
              {
                text: `“The unusual smart e-bike is worth a look.”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18928_2x_4fa3a41f-c723-4589-be3c-1b499e871a3f.png?v=1699861725"
              },
              {
                text: `“This is a model destined to conquer the public.”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18929_2x_ab7441d3-d6ca-49f1-839a-1e01e2712a97.png?v=1699861731"
              },
              {
                text: `“one of the most beautiful and futuristic ebikes of 2023”`,
                img: "https://cdn.shopify.com/s/files/1/0633/2068/6808/files/Mask_Group_18930_2x_9c4e218a-1697-41e3-a5da-5e771d4b7a79.png?v=1699861737"
              }
            ],
          // 默认的发货时间 文案
          ebike_default_delivery_time: 'Free shipping <span>within 5 business days</span>',
          // 每一种variant 的发货时间文案
          ebike_delivery_time: {
             // chord
            43694976663800: 'Free shipping <span>within 5 business days</span>',
            43694976696568: 'Free shipping <span>within 5 business days</span>',
            // chord x
                //white
            43694976729336: 'Free shipping <span>within 5 business days</span>',
            43694976762104: 'Pre-order items shipped from October 15 - 30, 2023',
            //gray
            44047038447864:'Free shipping <span>within 5 business days</span>',
              
          }
      },
    carbon1pro_order_page_config: {
          // variant 为 available:false 的情况下 也要强制显示 
          ignore_variants_available_false: [],
          default_variant: 44288621314296,
          size_map: {
              S: `Fit for 5’3’’~5’9’’ Inseam 30’’`,
              M: `Fit for 5’7’’~6’1’’ Inseam 31’’`,
              L: `Fit for 5’11’’~6’5’’ Inseam 33’’`
          },
          product_images: {
            'Matte Black': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/3-1.jpg?v=1722064932',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24397.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231108-untitled-3641.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241015-153933.jpg?v=1728977983&width=800',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240910-184640.jpg?v=1725965247&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_-_c_2x_59857988-2ad6-42c3-ba78-b239cc591367.jpg?v=1721977733',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_-_c__1_1_2x_1b9d5dea-a84a-442b-80ec-3fa18757aabd.jpg?v=1721977738',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_1_1.jpg?v=1722064932',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1pro-_c_2x_4d3389e3-6c89-4584-a35d-a7586f6f0dec.jpg?v=1721977750',
            ],
            'Creme': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18878.jpg?v=1722064932',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24398.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240308-untitled-6217.jpg?v=1722064934&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-20.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-11.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18874.jpg?v=1722064932&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18870.jpg?v=1722064932&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18862.jpg?v=1722064932',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_18858.jpg?v=1722064933',
             ],
            'Blu': [
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241120-101942.png?v=1732069202&width=1000',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Group_24398.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240308-untitled-6217.jpg?v=1722064934&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-20.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Urtopia-11.jpg?v=1722064933&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192253.jpg?v=1727176998&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192241.jpg?v=1727176998&width=800',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192257.jpg?v=1727176997',
              'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20240924-192248.jpg?v=1727176998',
             ],
            commonSwiper: [
          ]
          },
          // 产品图下面的media模块, 根据产品图 循环轮播 
          product_media_images: [
              {
                  text: 'Carbon Fiber Expert',
                  img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
              },
              {
                  text: `“Visually stunning and lightweight bikes”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
              },
              {
                  text: `“The best electric bikes of 2024”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
              },
              {
                  text: `“Pack with copious use of technology”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
              },
              {
                  text: `“Pack with copious use of technology”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
              },
              {
                  text: `“The epitome of raw power”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
              },
              {
                  text: `“Carbon 1 Pro as ‘a bike with spirit”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
              },
              {
                  text: `“Standout feature lies in its integration with advanced technology. ”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
              },
              {
                  text: `“Interesting innovation or tech for tech’s sake”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
              },
              {
                  text: `“Completely crazy: This e-bike talks to the rider”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
              },
              {
                  text: `“The iPhone among e-bikes”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
              },
              {
                  text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
                  img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
              }
          ],
          sizes_and_specs: {
              sizes: {
                  image: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20231221-151050_2x_d883c889-6e52-477d-8672-a7dda6dbbbdd.png?v=1703577530',
                  parameters: [
                      [
                          '<span style="color: #fff;">xxxx</span>',
                          'Recomm. rider height',
                          'A. Standover height',
                          'B. Adjustable seat range',
                          'C. Handlebar grips height',
                          'D. Seat tube length',
                          'E. Wheelbase',
                          'F. Overall length',
                          'G. Wheel diameter',
                          'H. Top tube length (effective)',
                          'I. Head tube length',
                          'J. Headset height'
                      ],
                      [
                          '<span class="u17DemiBold_v2">Small</span>',
                          '5’3’’~5’9’’',
                          '779 mm',
                          '60 mm',
                          '995-1025 mm',
                          '421 mm',
                          '1065 mm',
                          '1766 mm',
                          '702 mm',
                          '594 mm',
                          '152 mm',
                          '90-120 mm'
                      ],
                      [
                          '<span class="u17DemiBold_v2">Medium</span>',
                          '5’7’’~6’1’’',
                          '804 mm',
                          '60 mm',
                          '1011-1041 mm',
                          '463 mm',
                          '1093 mm',
                          '1795 mm',
                          '702 mm',
                          '618 mm',
                          '170 mm',
                          '90-120 mm'
                      ],
                      [
                          '<span class="u17DemiBold_v2">Large</span>',
                          '5’11’’~6’5’’',
                          '833 mm',
                          '60 mm',
                          '1023-1053 mm',
                          '498 mm',
                          '1122 mm',
                          '1824 mm',
                          '702 mm',
                          '653 mm',
                          '180 mm',
                          '90-120 mm'
                      ],
                  ]
              },
              specs: [
                  {
                      title: 'General Info',
                      parameters: [
                          ["Model", "Carbon 1 Pro Lightweight E-bike"],
                          ["Weight", "37 lbs w/o acc."],
                          ["Material", "Carbon fiber (frame, fork)"],
                          ["Range", "Up to 80 miles"],
                          ["Top Speed", "25 mph"],
                          ["Total Weight Limit", "240 lbs"],
                          ["Rider Height", "5’3” - 6’5”"],
                          ["Brakes", "Dual-piston hydraulic disc brakes"],
                          ["Wheels", "27.5 x1.6”, puncture-proof tire"],
                          ["", ""],
                      ]
                  },
                  {
                      title: 'Ebike System',
                      parameters: [
                          ["Motor", "36V 350W (sustained), 750W (peak), rear hub"],
                          ["Battery", "36V 9.8Ah (352.8Wh), Samsung Li-ion, certified to UL-2271"],
                          ["Pedal Assist", "4 levels"],
                          ["Charger", "2.5H fast charger, 36V 4Amp"],
                          ["Display", "LED dot-matrix (Anti-glare)"],
                          ["Sensors", "Torque sensor, accelerometer, gyroscope"],
                          ["Lights", "Front: Integrated StVZO headlight Rear: StVZO rear light (Not ARES lights)"],
                          ["", ""],
                      ]
                  },
                  {
                      title: 'Drivetrain',
                      parameters: [
                          ["Chainrings", "44T"],
                          ["Crankset", "Aluminum alloy, 170mm"],
                          ["Cassette", "11-40T, 8 Speed"],
                          ["Chain", "Shimano 8 speed"],
                          ["Rear Derailleur", "Shimano 8 speed"],
                          ["Shift Lever", "8 Speed Trigger"],
                          ["Pedals", "9/16” Alloy Platform"],
                          ["", ""],
                      ]
                  },
                  {
                      title: 'Cockpit',
                      parameters: [
                          ["Urtopia Smartbar", "Aluminum alloy, Φ28.6mm, 720mm width, adjustable height 0/15/30mm, haptic interaction"],
                          ["Grips", "Durable ergonomic Grips, lockable"],
                          ["Seat Post", "Aluminum Alloy, φ31.6mm, 100mm (size M&L), 80mm (size S)"],
                          ["", ""],
                      ]
                  },
                  {
                      title: 'Smartbar',
                      parameters: [
                          ["Smartbox", "On-board navigation, fingerprint unlock, AI assistant, voice control, bluetooth speaker, OTA update (wireless firmware update)"],
                          ["Theft Defenses", "Movement alarm, Electronic Fence, Find My Bike (live GPS tracking), Beep"],
                          ["Connectivity", "eSIM with 4G, GPS, Bluetooth"],
                          ["eSIM/Connect Service", "Renewal via App (Urtopia)"],
                          ["App", "Urtopia (iOS & Android)"],
                          ["", ""],
                      ]
                  },
              ] 
            },
            // 默认的发货时间 文案
          ebike_default_delivery_time: 'Free shipping within 5 business days',
          // 发货时间映射表
          // key:    vairant_id
          // value:  发货时间文案
          ebike_delivery_time: {}
      },
      fusion_order_page_config: {
          // chord 车默认显示 variant_id, 只有 url 上的 variant 参数为空的时候生效
          default_variant: 45844150190328,
          ignore_variants_available_false: [],
          size_map: {
            'One Size': 'Fit for 5’3’’ - 6’3’’'
          },
          product_media_images: [
            {
                text: 'Carbon Fiber Expert',
                img: "https://newurtopia.com/cdn/shop/files/logo_0707__1.png?v=1684310857"
            },
            {
                text: `“Visually stunning and lightweight bikes”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19051_2x_3c234be0-e1cb-4ab0-b83c-02282fd42cb4.png?v=1705485418"
            },
            {
                text: `“The best electric bikes of 2024”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19052_2x_83b17023-7ff5-413b-9a87-571e8e6928ee.png?v=1705485424"
            },
            {
                text: `“Pack with copious use of technology”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19053_2x_2b4e11dc-d27b-47ad-9478-92c696e1fac7.png?v=1705485431"
            },
            {
                text: `“Pack with copious use of technology”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19054_2x_7feff357-8d1b-48a0-b9af-662442dc41f6.png?v=1705485437"
            },
            {
                text: `“The epitome of raw power”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19055_2x_612a45c4-04fe-4477-a252-302e8d11c40e.png?v=1705485444"
            },
            {
                text: `“Carbon 1 Pro as ‘a bike with spirit”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19056_2x_b61e963a-f2b3-49f3-8bc2-4aee5f8f2a4c.png?v=1705485451"
            },
            {
                text: `“Standout feature lies in its integration with advanced technology. ”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19057_2x_0eabb26b-a2fe-48e8-b00e-209ef2b986e0.png?v=1705485460"
            },
            {
                text: `“Interesting innovation or tech for tech’s sake”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19058_2x_b0454fa5-9c44-462e-8f04-5646db60456a.png?v=1705485466"
            },
            {
                text: `“Completely crazy: This e-bike talks to the rider”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19059_2x_14b271ba-3eae-41ea-8882-e6896e9f9948.png?v=1705485473"
            },
            {
                text: `“The iPhone among e-bikes”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19060_2x_e094650e-c53d-4e29-b805-7e89d127643d.png?v=1705485481"
            },
            {
                text: `“Thanks to its full carbon frame, the Urtopia e-bikes is light”`,
                img: "https://cdn.shopify.com/s/files/1/0583/5810/4213/files/Mask_Group_19061_2x_a24c29c4-0fff-421f-9977-25989e38b7e9.png?v=1705485487"
            }
        ],
          product_images: {
            'Elegant Grey': [
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/19562.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174014.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174022.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174027.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174032.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174037.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24909.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_3e6798ca-c8fa-4177-bd9b-89a4a927ad18.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/7c82b2eb5dc055162526ce40f6992a8e.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_f6663af0-be1a-4e39-b23d-b53876ed314e.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/92b8d6a675411b07ec7e7e53a0c8b8c7.jpg?v=1729305263'
              ],
              'Blazing Black': [
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/19561.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174014.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174022.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174027.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174032.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174037.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24908.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/ed7f58882819b78f9efde45cc0b5a2a2.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_d3123805-ad89-4f47-9f7b-2fd070d0722f.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/8ea15d93b62c474589503723f875bcfb.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/1_f07818b8-80f5-4b35-949b-57a5fa70b4b4.jpg?v=1729305263'
              ],
              'Vital Orange': [
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/19560.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174014.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174022.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174027.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174032.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/20241114-174037.jpg?v=1731577271&width=900',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24397.jpg?v=1729305263&width=1000',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2_acb43f5f-677a-4687-ae6f-a2ac348de8a6.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2_0bd94c6b-d30e-4d20-b599-a90e2fb36560.jpg?v=1729305263',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2.jpg?v=1729305262',
                'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/2_55d5d49f-9210-4f1d-8391-92dfb0471447.jpg?v=1729305263'
              ],
              commonSwiper: []
          },
          // 默认的发货时间 文案
          ebike_default_delivery_time: 'Free shipping within 5 business days.',
          // 每一种variant 的发货时间文案
          ebike_delivery_time: {
            45844150255864: 'Ships between January 15-30, 2024 from L.A. warehouse.',
            45844150190328: 'Ships between January 15-30, 2024 from L.A. warehouse.'
          },
          sizes_and_specs: {
            sizes: {
              image: 'https://cdn.shopify.com/s/files/1/0633/2068/6808/files/20240108-181634.png?v=1704709013',
              parameters: [
                [
                  '<span style="color: #fff;">xxxx</span>',
                  'Recomm. rider height',
                  'A. Adjustable seat range',
                  'B. Handlebar grips height',
                  'C. Seat tube length',
                  'D. Wheelbase',
                  'E. Overall length',
                  'F. Wheel diameter',
                  'G. Top tube length (effective)',
                  'H. Head tube length',
                  'I. Headset height'
                ],
                [
                  '<span style="color: #fff;">One Size</span>',
                  '5’3’’ - 6’3’’',
                  '140 mm',
                  '1085-1115 mm',
                  '485 mm',
                  '1205 mm',
                  '1935 mm',
                  '730 mm',
                  '633 mm',
                  '144 mm',
                  '90-120 mm'
                ],
              ]
            },
            specs: [
              {
                title: 'General Info',
                parameters: [
                  ["Model", "Carbon Fusion Lightweight E-SUV"],
                  ["Net Weight", "55 lbs"],
                  ["Material", "Carbon fiber frame"],
                  ["Range", "Up to 70 miles Extended to 120miles (Dual baterry)"],
                  ["Top Speed", "20mph by default 28mph upon unlock"],
                  ["Total Weight Limit", "330 lbs"],
                  ["Rider Height", "5’3’’ - 6’3’’"],
                  ["Brakes", "TEKTRO hydraulic disc brakes with power cut-off sensor"],
                  ["Wheels", "Kenda K1127 (29X2.05), puncture-proof tire"],
                  ["", ""],
                ]
              },
              {
                title: 'Ebike System',
                parameters: [
                  ["Motor", "1500W peak power (36V 350W 36Nm front hub motor, 36V 350W 36Nm rear drive hub motor)"],
                  ["Battery", "36V 14.7Ah (529.2 Wh), Samsung Li-ion, removable battery"],
                  ["Pedal Assist", "4 levels"],
                  ["Trottle", "Yes (up to 20mph)"],
                  ["Charger", "3.5H fast charger, 36V 4Amp"],
                  ["Display", "LED dot-matrix (Anti-glare)"],
                  ["Sensors", "Torque sensor, accelerometer, gyroscope"],
                  ["Lights", "Front: Integrated StVZO headlight Rear: StVZO rear light (Not ARES lights)"]
                ]
              },
              {
                title: 'Drivetrain',
                parameters: [
                  ["Chainrings", "44T"],
                  ["Crankset", "Aluminum alloy, 170mm"],
                  ["Cassette", "11-40T, 8 Speed"],
                  ["Chain", "YBN S8e, Silver"],
                  ["Rear Derailleur", "Shimano ACERA 8-Speed"],
                  ["Shift Lever", "8 Speed Trigger"],
                  ["Pedals", "9/16” Alloy Platform"],
                  ["", ""],
                ]
              },
              {
                title: 'Cockpit',
                parameters: [
                  ["Urtopia Smartbar", "Aluminum alloy, Φ28.6mm, 720mm width, adjustable height 0/15/30mm, haptic interaction"],
                  ["Grips", "ZOOM 188NS AMS 700C Suspension fork 60mm travel"],
                  ["Grips", "Durable ergonomic Grips, lockable"],
                  ["Seat Post", "Aluminum Alloy, φ31.6mm, 100mm (size M&L), 80mm (size S)"],
                ]
              },
              {
                title: 'Smartbar',
                parameters: [
                  ["Smartbox", "On-board navigation, fingerprint unlock, AI assistant, voice control, bluetooth speaker, OTA update (wireless firmware update)"],
                  ["Theft Defenses", "Movement alarm, Electronic Fence, Find My Bike (live GPS tracking), Beep"],
                  ["Connectivity", "eSIM with 4G, GPS, Bluetooth"],
                  ["eSIM/Connect Service", "Renewal via App (Urtopia)"],
                  ["App", "Urtopia (iOS & Android)"],
                  ["", ""],
                ]
              },
            ]
          },
        compare: {
            parameters: [
              ['', 'Fusion GT E-Bike', 'Other E-Bikes'],
              ['Frame Material', 'Carbon Fiber', 'Aluminum Alloy'],
              ['Motor', '1500W', '500W rear-hub motor'],
              ['Battery Option', '900Wh Dual-battery', '672Wh battery'],
              ['Charge Time', '3.5 Hrs', '5 Hrs'],
              ['Max Range', '120 Miles', '60 Miles'],
              ['Throttle', 'Yes, 20mph', 'Yes, 20mph'],
              ['Weight', '60 lbs', '77 lbs'],
              ['Anti-theft', 'GPS', 'X'],
              ['Luggage Rack', 'MIK, max. 60 lbs', 'Regular'],
              ['Max Load', '330 lbs', '300 lbs'],
            ],
            style: {
              image_0: '//newurtopia.com/cdn/shop/files/19566.png?v=1729236036&width=500',
              image_1: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/cccc_2x_366a8576-c889-4210-8bbf-05fa1c327bf8.png?v=1731912593',
              background: 'linear-gradient(180deg, #6b97be, #151d38)',
              title: '<h2 class="u36Medium_v2 mobileHide">What makes Carbon Fusion GT <br class="pcHide">the best e-SUV?</h2>',
              image_pc: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24890_2x_5ee70e3a-6ae6-4af8-b6f8-de3a0d065224.png?v=1729308382',
              image_mb: 'https://cdn.shopify.com/s/files/1/0583/5810/4213/files/24891_2x_2fdadff8-8384-4c6b-b678-4e604f8ff504.png?v=1729318520'
            }
          }
        }
  }


  document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
  if (Shopify.designMode) {
    document.documentElement.classList.add('shopify-design-mode');
  }