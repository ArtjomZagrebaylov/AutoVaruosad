let page = 1;

function fetchSpareParts(name = '', sn = '', page = 1) {
    let params = new URLSearchParams({
        name: name,
        sn: sn,
        page: page
    });

    fetch(`http://localhost:3300/spare-parts?${params.toString()}`)
        .then(response => response.json())
        .then(data => {
            const sparePartsDiv = document.getElementById('spare-parts');

            sparePartsDiv.innerHTML = '';

            const list = document.createElement('ul');

            data.forEach(sparePart => {
                const listItem = document.createElement('li');
                listItem.textContent = `${sparePart.name}, Hind: ${sparePart.hind_km}, SN: ${sparePart.sn}`;
                list.appendChild(listItem);
            });

            sparePartsDiv.appendChild(list);
        })
        .catch(error => console.error('Error:', error));
}

document.getElementById('search-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const sn = document.getElementById('sn').value;

    page = 1;

    fetchSpareParts(name, sn, page);
});

document.getElementById('jargmine').addEventListener('click', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const sn = document.getElementById('sn').value;

    page++;

    fetchSpareParts(name, sn, page);
});

document.getElementById('eelmine').addEventListener('click', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const sn = document.getElementById('sn').value;

    page = Math.max(1, page - 1);

    fetchSpareParts(name, sn, page);
});

fetchSpareParts();