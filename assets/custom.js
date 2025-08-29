/** Santhosh: Custom JS for the dawn theme */

/** Custom function to open a link */
function customOpenLink(link, type = '_self') {
  if (type === '_self') {
    window.location.href = link;
  } else {
    window.open(link, type);
  }
}

/**
 * Custom Base Class
 * @extends {HTMLElement}
 */
class CustomBase extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Set a cookie
   * @param {string} name - The name of the cookie
   * @param {string} value - The value of the cookie
   * @param {number} days - The number of days to store the cookie
   */
  setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;
  }

  /**
   * Get a cookie
   * @param {string} name - The name of the cookie
   * @param {string} defaultValue - The default value to return if the cookie is not found
   * @returns {string} The value of the cookie
   */
  getCookie(name, defaultValue = '') {
    const cname = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length);
      }
    }
    return defaultValue;
  }

  /**
   * Delete a cookie
   * @param {string} name - The name of the cookie
   */
  deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

class CustomTruncate extends CustomBase {
  constructor() {
    super();
    this.readMore = this.querySelector('.custom-truncate__read-more');
    this.readLess = this.querySelector('.custom-truncate__read-less');
    this.truncated = this.querySelector('.custom-truncate__truncated');
    this.full = this.querySelector('.custom-truncate__full');
  }

  connectedCallback() {
    this.init();
  }

  init() {
    this.readMore.addEventListener('click', (event) => {
      event.preventDefault();
      this.readMoreClick();
    });
    this.readLess.addEventListener('click', (event) => {
      event.preventDefault();
      this.readLessClick();
    });
  }

  readMoreClick() {
    this.truncated.classList.add('hidden');
    this.full.classList.remove('hidden');
    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  readLessClick() {
    this.truncated.classList.remove('hidden');
    this.full.classList.add('hidden');
    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

customElements.define('custom-truncate', CustomTruncate);
