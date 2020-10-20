"use strict";

const VilleArticle = ({ville, removeVille, persistVille} ) => {
    const [initialText, secondaryText] = ville.submitText;
    const addition = !removeVille;

    const [disabled, setDisabled] = React.useState(!addition);
    const [submitText, setSubmitText] = React.useState(initialText);
    const [id, setId] = React.useState(ville.id);
    const [nom, setNom] = React.useState(ville.nom);
    const [codePostal, setCodePostal] = React.useState(ville.codePostal);

    const handleClick = () => {
        if (!disabled) { persistVille(id, nom, codePostal); }
        if (!addition) {
            setDisabled(prevDisabled => { setDisabled(!prevDisabled) });
            setSubmitText(prevSubmitText => { setSubmitText(prevSubmitText === initialText ? secondaryText : initialText)});
        }
    }

    const handleChange = (setValue, value) => { setValue(value); }

    return (
        <article className="row">
            <InputGroup
                disabled={disabled}
                value={nom}
                placeholder={ville.placeholders && ville.placeholders["nom"]}
                setValue={setNom}
                handleChange={handleChange}
                onSubmit={handleClick}
                columns="col-lg-6 col-12"
            />
            <InputGroup
                disabled={disabled}
                value={codePostal}
                placeholder={ville.placeholders && ville.placeholders.codePostal}
                setValue={setCodePostal}
                handleChange={handleChange}
                columns="col-lg-2 col-6" />
            <div className="col-lg-3 col-6 input-group mb-3 row">
                <SubmitInput
                    value={submitText}
                    onClick={handleClick}
                    classes={`btn btn-${addition ? "success" : disabled ? "info" : "warning"} col-5`}
                />
                {removeVille &&
                <SubmitInput
                    value="Supprimer"
                    onClick={() => removeVille(ville)}
                    classes="btn btn-danger col-6 offset-1"
                />}
            </div>
        </article>
    );
};