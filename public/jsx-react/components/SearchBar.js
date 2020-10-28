"use strict";

const SearchBar = ({onChange}) => {
    return (
        <section className="row col-12">
            <div className="input-group mb-3 col-11">
                <div className="input-group-prepend">
                    <span className="input-group-text">Le nom contient:</span>
                </div>
                <input type="text" className="form-control" onChange={({target}) => onChange(target.value)}/>
                    <div className="input-group-append">
                        <span className="input-group-text"><i className="fas fa-search"/></span>
                    </div>
            </div>
        </section>
    );
}