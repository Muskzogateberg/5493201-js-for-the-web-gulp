"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var api = 'https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets';
var loadButton = document.getElementById('load-button');

function getRequest(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);

    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status !== 200) {
          reject(JSON.parse(request.response));
        }

        resolve(JSON.parse(request.response));
      }
    };

    request.send();
  });
}

function getBlogPost() {
  return _getBlogPost.apply(this, arguments);
}

function _getBlogPost() {
  _getBlogPost = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var titlePromise, loremPromise, _yield$Promise$all, _yield$Promise$all2, titleResponse, loremResponse;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            titlePromise = getRequest(api + '/generate-title');
            loremPromise = getRequest(api + '/generate-lorem');
            _context2.prev = 2;
            _context2.next = 5;
            return Promise.all([titlePromise, loremPromise]);

          case 5:
            _yield$Promise$all = _context2.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            titleResponse = _yield$Promise$all2[0];
            loremResponse = _yield$Promise$all2[1];
            document.querySelector('main').appendChild(buildPostElement(titleResponse.title, loremResponse.lorem));
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](2);
            document.querySelector('main').appendChild(buildPostElement('An error occurred!', _context2.t0));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 12]]);
  }));
  return _getBlogPost.apply(this, arguments);
}

loadButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          getBlogPost();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));

function buildPostElement(title, content) {
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h2');
  var cardContent = document.createElement('p');
  card.classList.add('card');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title');
  cardContent.classList.add('card-text');
  cardTitle.textContent = title;
  cardContent.textContent = content;
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardContent);
  card.appendChild(cardBody);
  return card;
}