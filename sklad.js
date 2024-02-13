const produkty = [
    { nazev: "BMW s1000rr", cenaZaKus: 459899, pocetNaSklade: 5 },
    { nazev: "Yamaha R6", cenaZaKus: 319999, pocetNaSklade: 10 },
    { nazev: "Yamaha R1", cenaZaKus: 419999, pocetNaSklade: 8 },
    { nazev: "Ninja H2", cenaZaKus: 719999, pocetNaSklade: 3 },
    { nazev: "Ninja H2R", cenaZaKus: 819999, pocetNaSklade: 1 },
    
];

function inicializujAplikaci() {
    const produktyTable = document.getElementById('produktyTable');

    produkty.forEach(produkt => {
        const row = produktyTable.insertRow(-1);
        const cellNazev = row.insertCell(0);
        const cellCena = row.insertCell(1);
        const cellMnozstvi = row.insertCell(2);

        cellNazev.textContent = produkt.nazev;
        cellCena.textContent = produkt.cenaZaKus;
        cellMnozstvi.textContent = produkt.pocetNaSklade;
    });
}

function filtrujProdukty() {
    const hranicniMnozstvi = parseInt(document.getElementById('mnozstviFilter').value);
    const filtrovaneProdukty = produkty.filter(produkt => produkt.pocetNaSklade < hranicniMnozstvi);


    const produktyTable = document.getElementById('produktyTable');
    produktyTable.innerHTML = '<tr><th>Název</th><th>Cena za kus</th><th>Množství na skladě</th></tr>';

    filtrovaneProdukty.forEach(produkt => {
        const row = produktyTable.insertRow(-1);
        const cellNazev = row.insertCell(0);
        const cellCena = row.insertCell(1);
        const cellMnozstvi = row.insertCell(2);

        cellNazev.textContent = produkt.nazev;
        cellCena.textContent = produkt.cenaZaKus;
        cellMnozstvi.textContent = produkt.pocetNaSklade;
    });
}

function najdiNejdrahsiProdukt() {
    const nejdrahsiProdukt = produkty.reduce((maxProdukt, produkt) => (produkt.cenaZaKus > maxProdukt.cenaZaKus) ? produkt : maxProdukt, produkty[0]);

    alert(`Nejdražší produkt je: ${nejdrahsiProdukt.nazev} s cenou ${nejdrahsiProdukt.cenaZaKus} za kus.`);
}

function spocitejCelkovouHodnotu() {
    const celkovaHodnota = produkty.reduce((suma, produkt) => suma + (produkt.cenaZaKus * produkt.pocetNaSklade), 0);

    alert(`Celková hodnota zásob je: ${celkovaHodnota} Kč.`);
}

function aktualizujMnozstvi() {
    const nazevProduktu = document.getElementById('nazevProduktu').value;
    const noveMnozstvi = parseInt(document.getElementById('aktualizaceMnozstvi').value);

    const aktualizovanyProdukt = produkty.find(produkt => produkt.nazev === nazevProduktu);

    if (aktualizovanyProdukt) {
        const staraHodnota = aktualizovanyProdukt.pocetNaSklade;
        aktualizovanyProdukt.pocetNaSklade = noveMnozstvi;

        // Update the table cell with new quantity
        const produktyTable = document.getElementById('produktyTable');
        const rows = produktyTable.rows;

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const nazevCell = row.cells[0];
            const mnozstviCell = row.cells[2];

            if (nazevCell.textContent === nazevProduktu) {
                mnozstviCell.textContent = noveMnozstvi;
                break;
            }
        }

        alert(`Množství produktu ${nazevProduktu} bylo aktualizováno z ${staraHodnota} na ${noveMnozstvi}.`);
    } else {
        alert(`Produkt s názvem ${nazevProduktu} nebyl nalezen.`);
    }
}


window.onload = inicializujAplikaci;


