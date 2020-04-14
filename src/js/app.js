const dateComparator = (a, b) => {
    let dateA = new Date(a.date), dateB = new Date(b.date);
    return dateB - dateA;
};
const tableRows = result => {
    return `<tr tabindex="-1">
                    <td> <time datetime="${result.date}">${result.date}.</time></td>
                    <td> ${result.confirmed} confirmed.</td>
                    <td> ${result.deaths} deaths.</td>
                    <td> ${result.recovered} recovered.</td>
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
                    table.innerHTML = `<caption tabindex="0"> ${country} Covid-19 Cases</caption>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Confirmed</th>
                                            <th scope="col">Deaths</th>
                                            <th scope="col">Recovered</th>
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

