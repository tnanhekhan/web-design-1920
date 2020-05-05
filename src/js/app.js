const spinner = document.getElementById("spinner");
const months = ["jan", "feb", "mrt", "apr", "mei", "jun",
    "jul", "aug", "sep", "okt", "nov", "dec"
];

const dateComparator = (a, b) => {
    let dateA = new Date(a.date), dateB = new Date(b.date);
    return dateB - dateA;
};

const tableRows = result => {
    const date = new Date(result.date);
    const dateString = `${date.getDate()} ${months[date.getMonth()]}  ${date.getFullYear()}`

    return "<tr> " +
        "<td><a href='#rij" + result.index + "' aria-label='" + result.arialabel + "'>" + result.index + "</a></td>" +
        "<td>" + dateString + "</td>" +
        "<td>" + result.confirmed + " bevestigd </td>" +
        "<td>" + result.deaths + " doden </td>" +
        "<td>" + result.recovered + " hersteld </td>" +
        "</tr>"
};

function parseDate(date) {
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()} ${months[parsedDate.getMonth()]}  ${parsedDate.getFullYear()}`;
}

function parseDateIso(date) {
    const parsedDate = new Date(date);
    let month;
    let day;

    if (parsedDate.getMonth() < 9) {
        month = Number("0" + parsedDate.getMonth())
    } else {
        month = parsedDate.getMonth()
    }

    if (parsedDate.getDate() < 9) {
        day = Number("0" + parsedDate.getDate())
    } else {
        parsedDate.getDate()
    }

    return `${parsedDate.getFullYear()}-${month}-${day}`;
}

fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(result => {
        result.json()
            .then(json => {
                spinner.style.display = "none"
                Object.keys(json).sort().forEach((country, index) => {
                    if (country === "Netherlands") {
                        let dataArray = json[country].slice(Math.max(json[country].length - 10, 1))
                        for (let i = 0; i < dataArray.length; i++) {
                            const date = new Date(dataArray[i].date)
                            dataArray[i]["index"] = (i + 1);
                            dataArray[i]["arialabel"] = "Op " + date.getDate() + " " + months[date.getMonth()] + " " +
                                date.getFullYear() + " waren er " + dataArray[i].confirmed + " bevestigde gevallen, " + dataArray[i].deaths + " doden, en " +
                                dataArray[i].recovered + " herstelden bijgekomen";
                        }

                        let table = document.createElement("table");
                        table.setAttribute("role", "grid")
                        table.setAttribute("summary", "Covid 19 gevallen in Nederland")
                        table.innerHTML = `<caption>Nederland Covid 19 gevallen</caption>
                                                <tr>
                                                   <th scope="col">#</th>                                             
                                                   <th scope="col">Datum</th>
                                                   <th scope="col">Bevestigd</th>
                                                   <th scope="col">Doden</th>
                                                   <th scope="col">Hersteld</th>
                                                </tr> 
                                        ${dataArray.map(tableRows).join("")}`

                        const latestData = dataArray[dataArray.length - 1];
                        const penultimateData = dataArray[dataArray.length - 2];
                        const antePenultimateData = dataArray[dataArray.length - 3];

                        document.getElementById("status-title").innerText = `Covid-19 status van ${parseDate(dataArray[dataArray.length - 1].date)}`
                        if (latestData.confirmed - penultimateData.confirmed > penultimateData.confirmed - antePenultimateData.confirmed) {
                            document.getElementById("increase").insertAdjacentHTML("beforeend", `<a href="#" id="confirmed-delta" aria-label="Op ${parseDate(latestData.date)} waren er ${latestData.confirmed - penultimateData.confirmed} bijgekomen gevallen tegenover, de ${penultimateData.confirmed - antePenultimateData.confirmed} bijgekomen gevallen van ${parseDate(penultimateData.date)}. Dat is een verschil van ${(latestData.confirmed - penultimateData.confirmed) - (penultimateData.confirmed - antePenultimateData.confirmed)} meer"><i class="arrow up"></i> ${latestData.confirmed - penultimateData.confirmed} bijgekomen gevallen.</a>`)
                        } else {
                            document.getElementById("increase").insertAdjacentHTML("beforeend", `<a href="#" id="confirmed-delta" aria-label="Op ${parseDate(latestData.date)} waren er ${latestData.confirmed - penultimateData.confirmed} bijgekomen gevallen tegenover, de ${penultimateData.confirmed - antePenultimateData.confirmed} bijgekomen gevallen van ${parseDate(penultimateData.date)}. Dat is een verschil van ${(penultimateData.confirmed - antePenultimateData.confirmed) - (latestData.confirmed - penultimateData.confirmed)} minder"><i class="arrow down"></i> ${latestData.confirmed - penultimateData.confirmed} bijgekomen gevallen.</a>`)
                        }

                        if (latestData.deaths - penultimateData.deaths > penultimateData.deaths - antePenultimateData.deaths) {
                            document.getElementById("increase").insertAdjacentHTML("beforeend", `<a href="#" id="deaths-delta" aria-label="Op ${parseDate(latestData.date)} waren er ${latestData.deaths - penultimateData.deaths} bijgekomen doden tegenover, de ${penultimateData.deaths - antePenultimateData.deaths} bijgekomen doden van ${parseDate(penultimateData.date)}. Dat is een verschil van ${(latestData.deaths - penultimateData.deaths) - (penultimateData.deaths - antePenultimateData.deaths)} meer"><i class="arrow up"></i> ${latestData.deaths - penultimateData.deaths} bijgekomen doden.</a>`)
                        } else {
                            document.getElementById("increase").insertAdjacentHTML("beforeend", `<a href="#" id="deaths-delta" aria-label="Op ${parseDate(latestData.date)} waren er ${latestData.deaths - penultimateData.deaths} bijgekomen doden tegenover, de ${penultimateData.deaths - antePenultimateData.deaths} bijgekomen doden van ${parseDate(penultimateData.date)}. Dat is een verschil van ${(penultimateData.deaths - antePenultimateData.deaths) - (latestData.deaths - penultimateData.deaths)} minder"><i class="arrow down"></i> ${latestData.deaths - penultimateData.deaths} bijgekomen doden.</a>`)
                        }

                        if (latestData.recovered - penultimateData.recovered < penultimateData.recovered - antePenultimateData.recovered) {
                            document.getElementById("increase").insertAdjacentHTML("beforeend", `<a href="#" id="recovered-delta" aria-label="Op ${parseDate(latestData.date)} waren er ${latestData.recovered - penultimateData.recovered} bijgekomen herstelden tegenover, de ${penultimateData.recovered - antePenultimateData.recovered} bijgekomen herstelden van ${parseDate(penultimateData.date)}. Dat is een verschil van ${(latestData.recovered - penultimateData.recovered) - (penultimateData.recovered - antePenultimateData.recovered)} minder"><i class="arrow up"></i> ${latestData.recovered - penultimateData.recovered} bijgekomen herstelden.</a>`)
                        } else {
                            document.getElementById("increase").insertAdjacentHTML("beforeend", `<a href="#" id="recovered-delta" aria-label="Op ${parseDate(latestData.date)} waren er ${latestData.recovered - penultimateData.recovered} bijgekomen herstelden tegenover, de ${penultimateData.recovered - antePenultimateData.recovered} bijgekomen herstelden van ${parseDate(penultimateData.date)}. Dat is een verschil van ${(penultimateData.recovered - antePenultimateData.recovered) - (latestData.recovered - penultimateData.recovered)} meer"><i class="arrow down"></i> ${latestData.recovered - penultimateData.recovered} bijgekomen herstelden.</a>`)
                        }

                        document.getElementById("total").insertAdjacentHTML("beforeend", `<a href="#">Totaal: ${latestData.confirmed} gevallen</a>`)
                        document.getElementById("total").insertAdjacentHTML("beforeend", `<a href="#">Totaal: ${latestData.deaths} doden</a>`)
                        document.getElementById("total").insertAdjacentHTML("beforeend", `<a href="#">Totaal: ${latestData.recovered} herstelden</a>`)

                        let url = 'http://newsapi.org/v2/top-headlines?' +
                            'q=Corona&' +
                            'q=Coronavirus&' +
                            // 'from=' + (parseDateIso(latestData.date)) + '&' +
                            'country=nl&' +
                            'apiKey=3b6f0e89d5fc46afbe5d32169d5317ee';
                        let req = new Request(url);
                        document.getElementById("articles-title").innerText = `Relevante Covid-19 artikelen van ${parseDate(latestData.date)}`
                        fetch(req)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(data => {
                                data.articles.forEach(article => {
                                    document.getElementById("articles-container")
                                        .insertAdjacentHTML("beforeend", `<a href="${article.url}">${article.source.name}: ${article.title} </a>`)
                                });
                            });
                    }
                });
            })
    });

