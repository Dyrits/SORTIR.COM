"use strict";

const SearchFilter = ({onChange}) => {

    // CONSTANTS

    const [nom, setNom] = React.useState("");
    const [campus, setCampus] = React.useState([]);


    // METHODS

    React.useEffect(() => { onChange("nom", nom); }, [nom])

    const handleChange = ($event) => {
        switch ($event.target.type) {
            case "checkbox":
                onChange($event.target.name, $event.target.checked);
                break;
            default:
                onChange($event.target.name, $event.target.value);
                break;
        }
    }

    const getCampus = async () => {
        return await Ajax.get("/campus/api").then(campus => {
            setCampus(campus);
        });
    }


    // LOGIC

    !campus.length && getCampus();


    // RENDER

    return (
        <div className="row my-3">
            <div className="col-6">
                <section className="input-group my-3 col-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Campus: </span>
                    </div>
                    <select name="campus" id="campus" onChange={handleChange}>
                        <option value="" className="text-secondary">-Aucun-</option>
                        {campus.map($campus =>
                            <option key={$campus.id} value={$campus.id} id={$campus.nom}>{$campus.nom}</option>
                        )}
                    </select>
                </section>
                <SearchBar onChange={setNom} />
                <section className="input-group col-12">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1">Entre </span>
                    </div>
                    <input type="date" name="from" id="from" onChange={handleChange} />
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"> et </span>
                    </div>
                    <input type="date" name="to" id="to" onChange={handleChange} />
                </section>
            </div>
            <div className="col-6 d-flex flex-column justify-content-end">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isOrganisateur" id="isOrganisateur" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isOrganisateur">
                            Sorties dont je suis l'organisateur/trice
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isInscrit" id="isInscrit" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isInscrit">
                            Sorties auxquelles je suis inscrit/e
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isNotInscrit"  id="isNotInscrit" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isNotInscrit">
                            Sorties auxquelles je ne suis pas inscrit/e
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="isFinie" id="isFinie" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="isFinie">
                            Sorties passées
                        </label>
                </div>
            </div>
        </div>
    );
}