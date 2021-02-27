import { DOMProps } from "./constants";

const getOnlyDOMProps = (props) => {
  const attrs = Object.keys(props)
    .filter((key) => DOMProps.some((prop) => prop === key))
    .map((key) => ({ [key]: props[key] }));
  if (attrs.length > 0) {
    return Object.assign(...attrs);
  }
};

const addThemeAttrs = ({ theme, classList }) => {
  if (classList) {
    return [...classList.split(" "), "smooth-appearance"]
      .map((className) => `${className} ${className}_theme_${theme}`)
      .join(" ");
  }
};

export { getOnlyDOMProps, addThemeAttrs };
