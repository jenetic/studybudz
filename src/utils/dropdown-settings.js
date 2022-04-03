// STYLES
const light = {
  background: "#FCEEEE",
  text: "#29298A",
  accent: "#E77474",
  selected: "#fcd2d2"
}

const dark = {
  background: "#242446",
  text: "#9a84d4",
  accent: "#ca7070",
  selected: "#30306b"
}

export const stylesLight = ({
  control: (provided) => ({
    ...provided,
    backgroundColor: light.background,
    borderRadius: "0.5rem",
    boxShadow: "none",
    border: "none",
    color: light.accent, 
    fontSize: "0.82rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: light.box
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: light.box
  }),
  singleValue: (provided) => ({
    ...provided,
    color: light.text
  }),
  option: (provided, state) => ({
    ...provided,
    color: light.text,
    backgroundColor: state.isSelected ? light.selected : light.background,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: light.background,
    
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: light.background,
    borderRadius: "0.5rem",
    boxShadow: "none",
    border: "none",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: light.selected
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: light.text
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: light.text
  }),
});

export const stylesDark = ({
  control: (provided) => ({
    ...provided,
    backgroundColor: dark.background,
    borderRadius: "0.5rem",
    boxShadow: "none",
    border: "none",
    color: dark.accent, 
    fontSize: "0.82rem",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: dark.box
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: dark.box
  }),
  singleValue: (provided) => ({
    ...provided,
    color: dark.text
  }),
  option: (provided, state) => ({
    ...provided,
    color: dark.text,
    backgroundColor: state.isSelected ? dark.selected : dark.background,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: dark.background,
    
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: dark.background,
    borderRadius: "0.5rem",
    boxShadow: "none",
    border: "none",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: dark.selected
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: dark.text
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: dark.text
  }),
});

// OPTIONS

export const classOptions = {

}
