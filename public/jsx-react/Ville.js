"use strict";

const Ville = ({data}) => {

    // CONSTANTS & STATES

    const headers = [
        {label: "Ville", classes: "col-6"},
        {label: "Code postal", classes: "col-2"},
        {label: "Actions", classes: "col-3"},
    ]

    const [villes, setVilles] = React.useState(data);


    // METHODS

    const remove = (ville) => {
        if (confirm(`Confirmez-vous la suppression de la ville ${ville.nom} avec le code postal ${ville.codePostal} ?`)) {
            Ajax.delete(`/admin/villes/api/${ville.id}`).then();
            setVilles(prevList => prevList.filter(element => element !== ville));
        }
    }

    const persist = (id, nom, codePostal) => {
        Ajax.persist("/admin/villes/api", {id, nom, codePostal}).then(() => {
            Ajax.get("/villes/api").then(villes => { setVilles(villes); })
        });
    };

    const get = (nom = "") => {
        Ajax.get(`/villes/api?nom=${nom}`).then(villes => {
            setVilles(villes);
        });
    }

    const hydrate = (ville = null, insert = true) => {
        ville = ville ? ville : {};
        ville.id = ville ? ville.id : null;
        ville.insert = insert;
        ville.persist = persist;
        ville.remove = remove;
        ville.inputs = [
            {
                value: ville.nom || String(),
                placeholder: insert ? "Ville~" : String(),
                classes: "col-lg-6 col-12",
                icon: "fas fa-city",
                validation: /\D+/
            },
            {
                value: ville.codePostal || String(),
                placeholder: insert ? "Code postal~" : String(),
                classes: "col-lg-2 col-6",
                icon: "fas fa-mail-bulk",
                validation: /\d{5}/
            }
        ];
        ville.actions = { classes: "col-lg-3 col-6 input-group mb-3 row" };
        if (insert) {
            ville.buttons = [
                {
                    type: "persist",
                    value: Helpers.setDefaultValue({}, "Ajouter"),
                    classes: Helpers.setDefaultValue({}, "btn btn-success col-5")
                }
            ]
        } else {
            ville.buttons = [
                {
                    type: "persist",
                    value: {true: "Modifier", false: "Valider"},
                    classes: {true: "btn btn-info col-5", false: "btn btn-warning col-5"}
                },
                {
                    type: "remove",
                    value: Helpers.setDefaultValue({}, "Supprimer"),
                    classes: Helpers.setDefaultValue({}, "btn btn-danger col-5 offset-1")
                }
            ]
        }
        return ville;
    }


    // RENDER

    return (
        <div>
            <SearchBar onChange={get} />
            <Table data={villes} headers={headers} hydrate={hydrate} insertLine={true} />
        </div>
    );
}

Ajax.get("/villes/api").then(villes => {
    ReactDOM.render(
        <Ville data={villes}/>,
        document.querySelector("#table")
    );
});




