import React from "react";

const Button = ({number, getNumber, disabledState}) => {

    return (
        <button
            onClick={() => getNumber(number)}
            disabled={disabledState}>
            {number}
        </button>
    )
};

export default Button;
