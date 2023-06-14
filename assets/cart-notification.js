class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById("cart-notification");
    this.header = document.querySelector("sticky-header");
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener(
      "keyup",
      (evt) => evt.code === "Escape" && this.close()
    );
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener("click", this.close.bind(this))
    );
  }

  open() {
    this.notification.classList.add("animate", "active");

    this.notification.addEventListener(
      "transitionend",
      () => {
        this.notification.focus();
        trapFocus(this.notification);
      },
      { once: true }
    );

    document.body.addEventListener("click", this.onBodyClick);

    
    setTimeout(() => {
      $('.cart-notification__links .button--primary').text(window.show_notification_checkout_button ? 'Check out with klarna' : 'Check out')
    })
  }

  close() {
    this.notification.classList.remove("active");

    document.body.removeEventListener("click", this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.cartItemKey = parsedState.key;
    /*additional 判断加入购物车是否有E-Bike，有的话*/
    let bikeQuantity = 0;
    fetch("/cart.js", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res1) => {
        let discountSavedPrice = 0;
        res1.items.forEach((item) => {
          const title = item.product_title
          if (title.indexOf("Carbon One")!=-1 || title.indexOf("Carbon 1")!=-1) {
            bikeQuantity += item.quantity;
          }
          discountSavedPrice += (item.original_line_price - item.final_line_price);
        });

        discountSavedPrice /= 100;
        if (bikeQuantity) {
          const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          });
          $(this.notification)
            .find(".notification-tips>span")
            .html(formatter.format(discountSavedPrice+bikeQuantity*600));
          $(this.notification)
            .find(".notification-tips")
            .css("display", "flex");
        } else {
          $(this.notification)
            .find(".notification-tips")
            .css("display", "none");
        }
      });
    /* */
    if (parsedState.items) {
      this.cartItems = parsedState.items;
    }
    this.getSectionsToRender().forEach((section) => {
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector,
        parsedState
      );
    });

    if (this.header) this.header.reveal();
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: "cart-notification-product",
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: "cart-notification-button",
      },
      {
        id: "cart-icon-bubble",
      },
    ];
  }

  getSectionInnerHTML(html, selector = ".shopify-section") {
    if (this.cartItemKey || selector == ".shopify-section") {
      return new DOMParser()
        .parseFromString(html, "text/html")
        .querySelector(selector).innerHTML;
    } else if (this.cartItems) {
      var resHtml = "";
      this.cartItems.forEach((item) => {
        resHtml +=
          "<div style='display:flex;'>" +
          new DOMParser()
            .parseFromString(html, "text/html")
            .querySelector(`[id="cart-notification-product-${item.key}"]`)
            .innerHTML +
          "</div>";
      });
      return resHtml;
    }
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest("cart-notification")) {
      const disclosure = target.closest("details-disclosure, header-menu");
      this.activeElement = disclosure
        ? disclosure.querySelector("summary")
        : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define("cart-notification", CartNotification);
