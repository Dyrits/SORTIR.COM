"use strict";

const Table = ({data, headers, hydrate}) => {
    data.forEach(line => { hydrate(line, false) });
    return (
        <section className="vh-100">
            <section className="row d-none d-lg-flex">
                { headers.map((header, index) => <h4 key={index} className={header.classes}>{header.label}</h4>) }
            </section>
            <section id="villes">
                { data.map(line => <Line key={line.id} line={line}/>) }
            </section>
            <section className="mt-2">
                <Line line={hydrate()} />
            </section>
        </section>
    )
}