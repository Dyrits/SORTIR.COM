"use strict";

const Line = ({line}) => {
    const id = line.id;

    const [disabled, setDisabled] = React.useState(!line.insert);

    line.inputs.forEach(input => { [input.value, input.setValue] = React.useState(input.value); })

    const update = () => {
        if (!line.disabled) {
            const values = [];
            if (!line.inputs.every(input => {
                values.push(input.value)
                return input.value;
            })) { return alert("Veuillez remplir les différents champs et ne pas laisser de valeur vide."); }
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