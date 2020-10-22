"use strict";

const InputGroup = (props) => {
    const container = `${props.classes} input-group mb-3`;
    return (
        <div className={container}>
            <div className="input-group-prepend">
                    <span className="input-group-text bg-dark text-white" id="basic-addon1">
                        <i className={props.icon} />
                    </span>
            </div>
            <input
                disabled={props.disabled}
                type="text"
                className="form-control"
                onChange={({target}) => props.handleChange(props.setValue, target.value)}
                onKeyPress={props.handleKeyPress}
                value={props.value}
                placeholder={props.placeholder}
                required
            />
        </div>
    )
}