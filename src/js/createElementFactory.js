/**
 * Function allowing the creation of DOM elements
 * @param {*} type
 * @param {*} attributes
 * @param  {...any} children
 * @returns {HTMLElement}
 */
const createElementFactory = (type, attributes, ...children) => {
  const elt = document.createElement(type);
  let key = "";

  for (key in attributes) {
    elt.setAttribute(key, attributes[key]);
  }

  children.forEach(child => {
    if (typeof child === "string") {
      elt.appendChild(document.createTextNode(child));
    } else {
      elt.appendChild(child);
    }
  });

  return elt;
};

export { createElementFactory };
