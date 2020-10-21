"use strict";

const Line = ({line}) => {
    const id = line.id;

    [line.disabled, line.setDisabled] = React.useState(!line.insert);

    line.columns.forEach(column => { [column.value, column.setValue] = React.useState(column.value); })

    line.buttons.forEach(button => {
        [button.value, button.setValue] = React.useState(button.primary);
        [button.classes, button.setClasses] = React.useState(button.primaryClasses);
    })

    const handleClick = (button, line) => {
        if (button.remove) { button.function(line); }
        else if (!line.disabled) {
            const values = [];
            line.columns.forEach(column => { values.push(column.value) })
            button.function(id, ...values)
        }
        !line.insert && line.setDisabled(previous => !previous);
        button.secondary && button.setValue(line.disabled ? button.secondary : button.primary);
        button.secondaryClasses && button.setClasses(line.disabled ? button.secondaryClasses : button.primaryClasses);

    }

    const handleChange = (setValue, value) => { setValue(value); }

    return (
        <article className="row mb-2">
            {line.columns.map((column, index) => {
                return (
                    <InputGroup
                        key={index}
                        disabled={line.disabled}
                        value={column.value}
                        setValue={column.setValue}
                        placeholder={column.placeholder && column.placeholder}
                        handleChange={handleChange}
                        classes={column.classes}
                        icon={column.icon}
                    />
                );
            })}
            <div className={line.actions.classes}>
                {line.buttons.map((button, index) => {
                    return (
                        <SubmitInput
                            key={index}
                            value={button.value}
                            onClick={() => handleClick(button, line)}
                            classes={button.classes}
                        />
                    );
                })}
            </div>
        </article>
    );
};