"use strict";

const InputGroup = ({disabled, value, placeholder, setValue, handleChange, columns}) => {
    return (
        <div className={`${columns} input-group mb-3`}>
            <div className="input-group-prepend">
                    <span className="input-group-text bg-dark text-white" id="basic-addon1">
                        <i className="fas fa-city" />
                    </span>
            </div>
            <input
                disabled={disabled}
                type="text"
                className="form-control"
                onChange={($event) => handleChange(setValue, $event.target.value)}
                value={value}
                placeholder={placeholder}
                required
            />
        </div>
    )
}