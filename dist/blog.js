"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=e[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){o=!0,a=e}finally{try{n||null==s.return||s.return()}finally{if(o)throw a}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function asyncGeneratorStep(e,t,r,n,o,a,i){try{var s=e[a](i),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(n,o)}function _asyncToGenerator(s){return function(){var e=this,i=arguments;return new Promise(function(t,r){var n=s.apply(e,i);function o(e){asyncGeneratorStep(n,t,r,o,a,"next",e)}function a(e){asyncGeneratorStep(n,t,r,o,a,"throw",e)}o(void 0)})}}var api="https://us-central1-open-classrooms-js-for-the-web.cloudfunctions.net/widgets",loadButton=document.getElementById("load-button");function getRequest(n){return new Promise(function(e,t){var r=new XMLHttpRequest;r.open("GET",n),r.onreadystatechange=function(){4===r.readyState&&(200!==r.status&&t(JSON.parse(r.response)),e(JSON.parse(r.response)))},r.send()})}function getBlogPost(){return _getBlogPost.apply(this,arguments)}function _getBlogPost(){return(_getBlogPost=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=getRequest(api+"/generate-title"),r=getRequest(api+"/generate-lorem"),e.prev=2,e.next=5,Promise.all([t,r]);case 5:t=e.sent,r=_slicedToArray(t,2),t=r[0],r=r[1],document.querySelector("main").appendChild(buildPostElement(t.title,r.lorem)),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(2),document.querySelector("main").appendChild(buildPostElement("An error occurred!",e.t0));case 15:case"end":return e.stop()}},e,null,[[2,12]])}))).apply(this,arguments)}function buildPostElement(e,t){var r=document.createElement("div"),n=document.createElement("div"),o=document.createElement("h2"),a=document.createElement("p");return r.classList.add("card"),n.classList.add("card-body"),o.classList.add("card-title"),a.classList.add("card-text"),o.textContent=e,a.textContent=t,n.appendChild(o),n.appendChild(a),r.appendChild(n),r}loadButton.addEventListener("click",_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:getBlogPost();case 1:case"end":return e.stop()}},e)})));