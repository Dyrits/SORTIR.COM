"use strict";

const Line = ({line}) => {
    const id = line.id;

    const [disabled, setDisabled] = React.useState(!line.insert);

    line.inputs.forEach(input => { [input.value, input.setValue] = React.useState(input.value); })

    const handleClick = (input) => {
        if (input.remove) { line.remove(line); }
        else if (!line.disabled) {
            const values = [];
            line.inputs.forEach(input => {
                if (!input.value) { return; }
                values.push(input.value)
            });
            line.persist(id, ...values)
        }
        !line.insert && setDisabled(previous => !previous);
    }

    const handleKeyPress = (key) => {
        if (key === "Enter" && !line.disabled) {
            const values = [];
            line.inputs.forEach(input => {
                if (!input.value) { return; }
                values.push(input.value)
            });
            line.persist(id, ...values);
            !line.insert && setDisabled(previous => !previous);
        }

    }

    const handleChange = (setValue, value) => { setValue(value); }

    return (
        <article className="row mb-2">
            {line.inputs.map((input, index) => {
                return (
                    <InputGroup
                        key={index}
                        disabled={  disabled}
                        value={input.value}
                        setValue={input.setValue}
                        placeholder={input.placeholder && input.placeholder}
                        handleChange={handleChange}
                        handleKeyPress={({key}) => handleKeyPress(key)}
                        classes={input.classes}
                        icon={input.icon}
                    />
                );
            })}
            <div className={line.actions.classes}>
                {line.buttons.map((button, index) =>
                    <input
                        key={index}
                        type="submit"
                        value={button.value[line.etat || disabled]}
                        onClick={() => handleClick(button)}
                        className={button.classes[line.etat || disabled]} />
                )}
            </div>
        </article>
    );
};