function Fieldset(props) {
  const defaultClass = "fieldset";
  const darkThemeClass = "fieldset_dark";
  const className = `${defaultClass} ${props.darkTheme ? darkThemeClass : ""}`
}

export default Fieldset;