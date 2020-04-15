const dateComparator = (a, b) => {
    let dateA = new Date(a.date), dateB = new Date(b.date);
    return dateB - dateA;
};
const tableRows = result => {
    return `<tr tabindex="-1">
                    <td> <time datetime="${result.date}">${new Date(result.date).toLocaleDateString()}</time></td>
                    <td> ${result.confirmed} bevestigd</td>
                    <td> ${result.deaths} doden</td>
                    <td> ${result.recovered} hersteld</td>
                     </tr>`
};

const spinner = document.getElementById("spinner");

fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(result => {
        result.json()
            .then(json => {
                spinner.style.display = "none"
                Object.keys(json).sort().forEach((country, index) => {
                    let dataArray = json[country].slice(Math.max(json[country].length - 15, 1))
                    let table = document.createElement("table");
                    table.setAttribute("role", "grid")
                    table.innerHTML = `<caption tabindex="0"> ${country} Covid-19 gevallen</caption>
                                        <tr>
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
                            case "ArrowDown":
                                if (nextNode) {
                                    nextNode.focus()
                                }
                                break;
                            case "Up": // IE/Edge specific value
                            case "ArrowUp":
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
                });
            })
    });

