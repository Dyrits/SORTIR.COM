"use strict";

const Campus = ({data}) => {

    const headers = [
        {label: "Campus", classes: "col-8"},
        {label: "Actions", classes: "col-3"},
    ]

    const [campus, setCampus] = React.useState(data);

    const remove = ($campus) => {
        if (confirm(`Confirmez-vous la suppression du campus ${$campus.nom} ?`)) {
            Ajax.delete(`/admin/campus/api/${$campus.id}`).then();
            setCampus(prevList => prevList.filter(element => element !== $campus));
        }
    }

    const persist = (id, nom) => {
        Ajax.persist("/admin/campus/api", {id, nom}).then(() => {
            Ajax.get("/admin/campus/api").then(campus => { setCampus(campus); })
        });
    };

    const get = (nom = "") => {
        Ajax.get(`/admin/campus/api?nom=${nom}`).then(campus => {
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
                    persist: true,
                    value: Helpers.setDefaultValue({}, "Ajouter"),
                    classes: Helpers.setDefaultValue({}, "btn btn-success col-5"),
                }
            ]
        } else {
            $campus.buttons = [
                {
                    persist: true,
                    value: {"true": "Modifier", "false": "Valider"},
                    classes: {"true": "btn btn-info col-5", "false": "btn btn-warning col-5"}
                },
                {
                    remove: true,
                    value: Helpers.setDefaultValue({}, "Supprimer"),
                    classes: Helpers.setDefaultValue({}, "btn btn-danger col-5 offset-1")
                }
            ]
        }
        return $campus;
    }

    return (
        <div>
            <SearchBar onChange={get} />
            <Table data={campus} headers={headers} hydrate={hydrate} addLine={true} />
        </div>
    );
}

Ajax.get("/admin/campus/api").then(campus => {
    ReactDOM.render(
        <Campus data={campus}/>,
        document.querySelector("#table")
    );
});




