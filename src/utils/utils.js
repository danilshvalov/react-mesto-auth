import DOMProps from "./constants";

const getOnlyDOMProps = (props) => {
  const attrs = Object.keys(props)
    .filter((key) => DOMProps.some((prop) => prop === key))
    .map((key) => ({ [key]: props[key] }));
  if (attrs.length > 0) {
    return Object.assign(...attrs);
  }
};

export default getOnlyDOMProps;
