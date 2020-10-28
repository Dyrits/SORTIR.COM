"use strict";

const Table = ({data, headers, hydrate, insertLine}) => {
    data.forEach(line => { hydrate(line, false) });
    return (
        <section className="vh-75">
            <section className="row d-none d-lg-flex">
                { headers.map((header, index) => <h4 key={index} className={header.classes}>{header.label}</h4>) }
            </section>
            <section className="lines">
                { data.map(line => <Line key={line.id} line={line}/>) }
            </section>
            {insertLine &&
            <section className="mt-2">
                <Line line={hydrate()} />
            </section>
            }
        </section>
    )
}