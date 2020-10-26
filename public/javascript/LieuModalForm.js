$('#lieu-form').on('show.bs.modal', function (event) {
   Ajax.get("/admin/villes/api").then(villes => {
       const select = $("#ville-lieu");
       if (select.has('option').length === 0) {
           villes.forEach(ville => {
               select.append(new Option(`${ville.nom} (${ville.codePostal})`, ville.id));
           })
       }
   });
})

const addButton = $("#add-lieu");

addButton.click(() => {
    // Retrieve the data:
    const nom = $("#nom-lieu").val()
    const rue = $("#rue-lieu").val()
    const ville = $("#ville-lieu").val();
    const latitude = $("#latitude-lieu").val()
    const longitude = $("#longitude-lieu").val()
    const data = {nom, rue, ville, latitude, longitude};
    // Call the API:
    Ajax.persist("/lieu/api", data).then(lieu => {
        // Add the new entity to the options:
        const labelVille = `${lieu.ville.nom} (${lieu.ville.codePostal})`;
        const labelCoordinates = lieu.latitude && lieu.longitude ? `| {${lieu.latitude} - ${lieu.longitude}}` : "";
        const labelLieu = `${lieu.rue} | ${lieu.nom} ${labelCoordinates}`
        $("#sortie_lieu").append(new Option(`${labelVille} ${labelLieu}`, lieu.id));
        $("#lieu-form").modal("toggle");
    });
});

