"use strict";

const VilleList = ({villes}) => {
    const [list, setList] = React.useState(villes);

    const removeVille = (ville) => {
        if (confirm(`Confirmez-vous la suppression de la ville ${ville.nom} avec le code postal ${ville.codePostal} ?`)) {
            Ajax.delete(`/admin/villes/api/${ville.id}`).then();
            setList(prevList => prevList.filter(element => element !== ville));
        }
    }

    const persistVille = (id, nom, codePostal) => {
        Ajax.persist("/admin/villes/api", {id, nom, codePostal}).then(() => {
            Ajax.get("/admin/villes/api").then(villes => { setList(villes); })
        });
    };

    const getVilles = (nom = "") => {
        Ajax.get(`/admin/villes/api?nom=${nom}`).then(villes => {
            setList(villes);
        });
    }

    return (
        <div>
            <section className="row">
                <SearchBar onChange={getVilles} />
            </section>
            <section className="vh-100">
                <section className="row d-none d-lg-flex">
                    <h4 className="col-6">Ville</h4>
                    <h4 className="col-2">Code Postal</h4>
                    <h4 className="col-3">Actions</h4>
                </section>
                <section id="villes">
                    {list.map(ville => {
                        ville["submitText"]= ["Modifier", "Valider"];
                        return <VilleArticle key={ville.id} ville={ville} removeVille={removeVille} persistVille={persistVille}/>;
                    })}
                </section>
                <section className="mt-2">
                    <VilleArticle
                        ville={{
                            id: null,
                            nom: String(),
                            codePostal: String(),
                            placeholders: {nom: "Ville~", codePostal: "Code postal~"},
                            submitText: ["Ajouter"]
                        }}
                        removeVille={null}
                        persistVille={persistVille}
                    />
                </section>
            </section>
        </div>
    );
}

Ajax.get("/admin/villes/api").then(villes => {
    ReactDOM.render(
        <VilleList villes={villes} />,
        document.querySelector("#list")
    );
});




