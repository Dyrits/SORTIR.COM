"use strict";

const Line = ({line}) => {
    const id = line.id;

    const [disabled, setDisabled] = React.useState(!line.insert);

    line.inputs.forEach(input => { [input.value, input.setValue] = React.useState(input.value); })

    const update = () => {
        if (!line.disabled) {
            const values = [];
            if (!line.inputs.every(input => {
                let isValid = input.validation && input.value.match(input.validation)
                values.push(input.value)
                return input.value && isValid;
            })) { return alert("Veuillez remplir les différents champs avec des valeurs valides."); }
            line.persist(id, ...values)
        }
        !line.insert && setDisabled(previous => !previous);
    }

    const handleClick = (input) => {
        if (input.remove) { return line.remove(line); }
        if (input.persist) { return update(); }
    }

    const handleKeyPress = (key) => { (key === "Enter") && update(); }

    const handleChange = (setValue, value) => { setValue(value); }

    console.log(line.columns);

    return (
        <article className="row mb-2">
            {line.inputs && line.inputs.map((input, index) =>
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
            )}
            {line.columns && line.columns.map((column, index) => <p key={index}>{column}</p>)}
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