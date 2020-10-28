"use strict";

const Sortie = ({data}) => {

    // CONSTANTS

    const participant = parseInt(document.querySelector("#app-user").value);

    const headers = [
        {label: "Nom de la sortie", classes: "col-4 col-lg-2"},
        {label: "Date de la sortie", classes: "col-4 col-lg-2"},
        {label: "Clôture", classes: "d-none d-lg-flex col-lg-2"},
        {label: "Inscrits", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Etat", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Inscrit", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Organisateur", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Lieu", classes: "d-flex d-lg-none col-4"}
    ]

    const [sorties, setSorties] = React.useState(data);
    const [parameters, setParameters] = React.useState({participant: participant});


    // METHODS

    React.useEffect(() => { get(); })

    const handleChange = (parameter, value) => {
        setParameters(prevParameters => {
            prevParameters[parameter] = value;
            return prevParameters;
        })
    }

    const get = () => {
        let endpoint = "/sorties/api?"
        console.log(parameters);
        console.log(Object.entries(parameters));
        for (let [pointer, value] of Object.entries(parameters)) {
            console.log(pointer, value);
            if (value) { endpoint += `${pointer}=${value}&`; }
        }
        console.log(endpoint);
        Ajax.get(endpoint).then(sorties => {
            setSorties(sorties);
        });
    }

    const hydrate = (sortie = null, insert = false) => {
        // Participation rate (Subscriptions / Capacity):
        sortie.participation = `${sortie["participants"].length}/${sortie["nbInscriptionsMax"]}`;
        // Current user is subscribed to the event:
        const participants = sortie["participants"].map(participant => participant.id)
        sortie.isInscrit = participants.includes(participant) && "X";
        // Current user is organizing the event:
        sortie.isOrganisateur = sortie["organisateur"].id === participant;
        // Labels of the different columns:
        sortie.labels = [
            {value: sortie.nom, classes: "col-4 col-lg-2"},
            {value: new Date(sortie["dateHeureDebut"]).toLocaleDateString("fr-FR"), classes: "col-4 col-lg-2"},
            {value: new Date(sortie["dateLimiteInscription"]).toLocaleDateString("fr-FR"), classes: "d-none d-lg-flex col-lg-2"},
            {value: sortie.participation, classes: "d-none d-lg-flex col-lg-1"},
            {value: sortie["etat"]["libelle"], classes: "d-none d-lg-flex col-lg-1"},
            {value: sortie.isInscrit, classes: "d-none d-lg-flex col-lg-1"},
            {
                value: sortie["organisateur"]["pseudo"],
                classes: "d-none d-lg-flex col-lg-1",
                link: `http://localhost/sortir.com/public/participant/${sortie["organisateur"]["id"]}`
            },
            // Only displayed in small screen:
            {value: sortie["lieu"]["nom"], classes: "d-flex d-lg-none col-4"},
        ]
        // The table has no inputs:
        sortie.inputs = [];
        sortie.actions = { classes: "d-none d-lg-flex col-lg-2 input-group mb-3 row" };
        sortie.buttons = [{
                value: Helpers.setDefaultValue({"Créée": "Modifier"}, "Afficher"),
                classes: Helpers.setDefaultValue({"Créée": "btn btn-warning col-5"},"btn btn-info col-5"),
                type: "link",
                link: Helpers.setDefaultValue(
                    {"Créée" : `http://localhost/sortir.com/public/sortie/${sortie.id}/persist`},
                    `http://localhost/sortir.com/public/sortie/${sortie.id}`
                    )
            }]
        // Creating and adding the second button if necessary:
        if (!["En cours", "Clôturée", "Passée"].includes(sortie.etat.libelle)) {
            const value = {}
            const classes = {}
            const link = {}
            if (sortie.isOrganisateur) {
                value["Ouverte"] = "Annuler";
                classes["Ouverte"] = "btn btn-danger col-5 offset-1";
                link["Ouverte"] = ""; // @todo: Cancellation action.
                value["Créée"] = "Publier";
                classes["Créée"] = "btn btn-success col-5 offset-1";
                link["Créée"] = ""; // @todo: Publish action.
            } else {
                value["Ouverte"] = sortie.isInscrit ? "Se désister" : "S'inscrire";
                classes["Ouverte"] = sortie.isInscrit ? "btn btn-warning col-5 offset-1" : "btn btn-success col-5 offset-1";
                link["Ouverte"] = ""; // @todo: Subscribe / Unsubscribe action.
            }
            sortie.buttons.push({
                value: value,
                classes: Helpers.setDefaultValue(classes, "btn btn-danger col-5 offset-1"),
                link: "http://localhost/sortir.com/public/",
                type: "link"
            });
        }
        return sortie;
    }


    // RENDER

    return (
        <div>
            <SearchFilter onChange={handleChange} />
            <Table data={sorties} headers={headers} hydrate={hydrate} insertLine={false} />
            <a href="http://localhost/sortir.com/public/sortie/0/persist">
                <button type="button" className="btn btn-primary btn-lg">Créeer une sortie</button>
            </a>
        </div>
    );
}

Ajax.get("/sorties/api").then(sorties => {
    ReactDOM.render(
        <Sortie data={sorties}/>,
        document.querySelector("#table")
    );
});