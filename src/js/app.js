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

                        document.body.appendChild(table);

                        window.addEventListener("keydown", event => {
                            const currentNode = event.target
                            let nextNode;
                            let previousNode;
                            if (currentNode.tagName === "CAPTION") {
                                nextNode = currentNode.parentNode.rows[1]
                                previousNode = null
                            } else {
                                nextNode = currentNode.parentNode.rows[currentNode.rowIndex + 1]
                                previousNode = currentNode.parentNode.rows[currentNode.rowIndex - 1]
                            }

                            if (event.defaultPrevented) {
                                return; // Do nothing if the event was already processed
                            }

                            switch (event.key) {
                                case "Down": // IE/Edge specific value
                                case "F10":
                                    if (nextNode) {
                                        nextNode.focus()
                                    }
                                    break;
                                case "Up": // IE/Edge specific value
                                case "F9":
                                    if (previousNode) {
                                        previousNode.focus()
                                    }
                                    break;
                                case "Home":
                                    document.activeElement.blur()
                                    break;
                                case "End":
                                    document.activeElement.blur()
                                    break;
                                default:
                                    return; // Quit when this doesn't handle the key event.
                            }

                            // Cancel the default action to avoid it being handled twice
                            event.preventDefault();
                        }, true);
                        document.activeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
                    }
                });
            })
    });

