(function () {
  class Model {

    constructor(attributes = {}) {
      Object.keys(attributes).forEach((key) => {
        if (attributes[key] === undefined) {
          delete attributes[key];
        }
      });
      this.attributes = Object.assign({}, this.defaults, attributes);
    }

    get host() {
      return 'http://127.0.0.1:8080';
    }

    get defaults() {
      return {};
    }

    get url() {
      return '/';
    }

    send(method, data = {}) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, this.url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            }
            reject();
          }
        };

        xhr.onerror = function () {
          alert(xhr.message);
          reject();
        };

        console.log(JSON.stringify(data));
        xhr.send(JSON.stringify(data));
      });
    }

    save() {
      const method = this.attributes.id ? 'PUT' : 'POST';

      return this.send(method, this.attributes);
    }

    fetch() {
      return this.send('GET', { id: this.attributes.id })
        .then(data => JSON.parse(data))
        .then((json) => {
          this.attributes = json;
          return this.attributes;
        });
    }
  }

  // export
  window.Model = Model;
})();
