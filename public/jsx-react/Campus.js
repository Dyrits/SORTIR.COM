"use strict";

const Campus = ({data}) => {

    // CONSTANTS & STATES

    const headers = [
        {label: "Campus", classes: "col-8"},
        {label: "Actions", classes: "col-3"},
    ]

    const [campus, setCampus] = React.useState(data);


    // METHODS

    const remove = ($campus) => {
        if (confirm(`Confirmez-vous la suppression du campus ${$campus.nom} ?`)) {
            Ajax.delete(`/admin/campus/api/${$campus.id}`).then();
            setCampus(prevList => prevList.filter(element => element !== $campus));
        }
    }

    const persist = (id, nom) => {
        Ajax.persist("/admin/campus/api", {id, nom}).then(() => {
            Ajax.get("/campus/api").then(campus => { setCampus(campus); })
        });
    };

    const get = (nom = "") => {
        Ajax.get(`/campus/api?nom=${nom}`).then(campus => {
            setCampus(campus);
        });
    }

    const hydrate = ($campus = null, insert = true) => {
        $campus = $campus ? $campus : {};
        $campus.id = $campus ? $campus.id : null;
        $campus.insert = insert;
        $campus.persist = persist;
        $campus.remove = remove;
        $campus.inputs = [
            {
                value: $campus.nom || String(),
                placeholder: insert ? "Campus~" : String(),
                classes: "col-lg-8 col-12",
                icon: "fas fa-university",
                validation: /\D+/
            }
        ];
        $campus.actions = { classes: "col-lg-3 col-6 input-group mb-3 row" };
        if (insert) {
            $campus.buttons = [
                {
                    type: "persist",
                    value: Helpers.setDefaultValue({}, "Ajouter"),
                    classes: Helpers.setDefaultValue({}, "btn btn-success col-5"),
                }
            ]
        } else {
            $campus.buttons = [
                {
                    type: "persist",
                    value: {"true": "Modifier", "false": "Valider"},
                    classes: {"true": "btn btn-info col-5", "false": "btn btn-warning col-5"}
                },
                {
                    type: "remove",
                    value: Helpers.setDefaultValue({}, "Supprimer"),
                    classes: Helpers.setDefaultValue({}, "btn btn-danger col-5 offset-1")
                }
            ]
        }
        return $campus;
    }


    // RENDER

    return (
        <div>
            <SearchBar onChange={get} />
            <Table data={campus} headers={headers} hydrate={hydrate} insertLine={true} />
        </div>
    );
}

Ajax.get("/campus/api").then(campus => {
    ReactDOM.render(
        <Campus data={campus}/>,
        document.querySelector("#table")
    );
});




