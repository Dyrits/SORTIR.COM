"use strict";

const Line = ({line}) => {
    const id = line.id;

    // By default, the line which are not inserting entity in the database are disabled.
    const [disabled, setDisabled] = React.useState(!line.insert);

    // Every input value is hooked to a state with its setter.
    line.inputs.forEach(input => { [input.value, input.setValue] = React.useState(input.value); })

    // INSERT | UPDATE
    const send = () => {
        // If the inputs are not disabled...
        if (!line.disabled) {
            const values = [];
            // ...every value is verified and pushed to a list of values.
            // If a value is not valid or missing...
            if (!line.inputs.every(input => {
                let isValid = input.validation && input.value.match(input.validation)
                values.push(input.value)
                return input.value && isValid;
                // ...an alert is raised.
            })) { return alert("Veuillez remplir les différents champs avec des valeurs valides."); }
            // The entity is inserted or updated in the database:
            line.persist(id, ...values)
        }
        !line.insert && setDisabled(previous => !previous);
    }

    const handleClick = (button) => {
        switch (button.type) {
            case "remove":
                line.remove(line);
                break;
            case "persist":
                send();
                break;
            case "link":
                window.location = button.link[line.etat ? line.etat.libelle : disabled];
                break;
            case "post":
                let endpoint = button.endpoint[line.etat ? line.etat.libelle : disabled];
                let data = button.data[line.etat ? line.etat.libelle : disabled]
                Ajax.persist(endpoint, data).then();
                break;
        }
    }

    // If "Enter" is pressed, the send() method is called to send the new or updated data.
    const handleKeyPress = (key) => { (key === "Enter") && send(); }

    // On change, every hooked value is updated to the new value provided.
    const handleChange = (setValue, value) => { setValue(value); }

    const labelColumn = (label, index) => label.link ?
            <div className={label.classes} key={index}><a href={label.link}>{label.value}</a></div> :
            <div className={label.classes} key={index}>{label.value}</div>;


    return (
        <article className="row mb-2">
            {/*If a line has inputs, they are displayed as columns.*/}
            {line.inputs && line.inputs.map((input, index) =>
                <div key={index} className={`${input.classes} input-group mb-3`}>
                    <div className="input-group-prepend">
                    <span className="input-group-text bg-dark text-white" id="basic-addon1">
                        <i className={input.icon} />
                    </span>
                    </div>
                    <input
                        disabled={input.disabled}
                        type="text"
                        className="form-control"
                        onChange={({target}) => handleChange(input.setValue, target.value)}
                        onKeyPress={({key}) => handleKeyPress(key)}
                        value={input.value}
                        placeholder={input.placeholder && input.placeholder}
                        required
                    />
                </div>
            )}
            {/*If a line has texts, they are displayed as columns.*/}
            {line.labels && line.labels.map((label, index) => labelColumn(label, index))}
            <div className={line.actions.classes}>
                {/*The lines buttons are the different actions available for each line.*/}
                {line.buttons.map((button, index) =>
                    <input
                        key={index}
                        type="submit"
                        value={button.value[line.etat ? line.etat.libelle : disabled]}
                        onClick={() => handleClick(button)}
                        className={button.classes[line.etat ? line.etat.libelle : disabled]} />
                )}
            </div>
        </article>
    );
};