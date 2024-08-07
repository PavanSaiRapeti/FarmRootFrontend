import React, { useState } from "react";
import PropTypes from "prop-types";
import FrButton from "./FrButton";

const MultiSelect = ({ options, onChange, value, className }) => {
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  const handleOptionClick = (option) => {
    const newValue = [...value];
    if (!newValue.includes(option.value)) {
      newValue.push(option.value);
      onChange(newValue);
    }
  };

  const handleRemoveOption = (option) => {
    const newValue = value.filter((item) => item !== option);
    onChange(newValue);
  };

  return (
    <div className={`multi-select ${className}`}>
      <textarea
        placeholder="Add ingredients"
        value={value.join(", ")}
        onChange={(e) => {
          const newValue = e.target.value.split(", ");
          if (e.key === "Enter") {
            onChange(newValue);
          }
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="selected-options w-full p-2 border border-gray-300 rounded-md"
      />
      <div className="options flex flex-wrap justify-center mt-10">
        {options.map((category) => (
          <div key={category.category} className="flex flex-col bg-frGraydark p-4 rounded-lg shadow-lg mx-4 mb-4">
            <h3 className="text-lg font-bold mb-2 text-frBlack">{category.category}</h3>
            <div className="flex flex-wrap">
              {options.filter((option) => option.category === category.category).map((opt, index) => (
                <React.Fragment key={index}>
                  {opt.options.map((option, idx) => (
                    <FrButton
                    text= {option.label}
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                      className="m-1 focus:outline-none break-words"
                      style={{ maxWidth: 'calc(100% - 1rem)', overflow: 'break-all', whiteSpace: 'normal' }} // Adjust max-width to fit within container, allow text to break, and preserve whitespace
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
</div>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

MultiSelect.defaultProps = {
  value: [],
  placeholder: "",
  className: "",
  disabled: false,
};

export default MultiSelect;
