"use strict";

// @todo: Get the current user.
const partipant = null;

const Sortie = ({data}) => {

    const headers = [
        {label: "Nom de la sortie", classes: "col-4 col-lg-2"},
        {label: "Date de la sortie", classes: "col-4 col-lg-2"},
        {label: "Clôture", classes: "d-none d-lg-flex col-lg-2"},
        {label: "Inscrits/Places", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Etat", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Inscrit", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Organisateur", classes: "d-none d-lg-flex col-lg-1"},
        {label: "Lieu", classes: "d-flex d-lg-none col-4"}
    ]

    const [sorties, setSorties] = React.useState(data);

    const get = (nom = "",
                 campus = "",
                 debut = null,
                 fin = null,
                 isOrganisateur = false,
                 isInscrit = false,
                 isFinie = false) => {
        const parameters = {nom, campus, debut, fin, isOrganisateur, isInscrit, isFinie};
        let endpoint = "/sorties/api?"
        for (let [pointer, value] of Object.entries(parameters)) {
            if (value) { endpoint += `${pointer}=${value}&`; }
        }
        Ajax.get(endpoint).then(campus => {
            setSorties(campus);
        });
    }

    const hydrate = (sortie = null, insert = false) => {
        // @todo: Get the list of participants ID.
        sortie.participation = `${sortie.participants.length}/${sortie.nbInscriptionsMax}`;
        sortie.isInscrit = sortie.participants.includes(partipant) && "X";
        sortie.isOrganisateur = sortie.organisateur === partipant;
        sortie.columns = [
            sortie.nom,
            sortie.dateHeureDebut,
            sortie.dateLimiteInscription,
            sortie.participation,
            sortie.etat.libelle,
            sortie.isInscrit,
            sortie.organisateur.pseudo,
            sortie.lieu.nom
        ]
        sortie.inputs = [];
        sortie.actions = { classes: "d-none d-lg-flex col-lg-2 input-group mb-3 row" };
        sortie.buttons = [{
                value: Helpers.setDefaultValue({"Créée": "Modifier"}, "Afficher"),
                classes: {true: "btn btn-info col-5", false: "btn btn-warning col-5"}
            }]
        new Array("En cours", "Clôturée", "Passée").includes(sortie.etat.libelle) &&
        sortie.buttons.push({
                value: {
                    "Ouverte": sortie.isOrganisateur ? "Annuler" : sortie.isInscrit ? "Se désister" : "S'inscrire",
                    "Créée": "Publier"
                },
                classes: Helpers.setDefaultValue({}, "btn btn-danger col-5 offset-1")
        });
        return sortie;
    }

    return (
        <div>
            <SearchBar onChange={get} />
            <Table data={sorties} headers={headers} hydrate={hydrate} addLine={false} />
        </div>
    );
}

Ajax.get("/sorties/api").then(sorties => {
    ReactDOM.render(
        <Sortie data={sorties}/>,
        document.querySelector("#table")
    );
});