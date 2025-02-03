// import display from "./elements.js";

// fetch("data.json")
//     .then(response => response.json())
//     .then(data => {
//          display(data.addresses);
//         });

document.addEventListener('DOMContentLoaded', function() {
    // Charger le fichier JSON et afficher la liste des adresses
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Extraire les noms de domaine des adresses email
            const domains = data.addresses.map(email => {
                return email.split('@')[1];
            });

            // Compter les occurrences de chaque nom de domaine
            const domainCount = domains.reduce((count, domain) => {
                count[domain] = (count[domain] || 0) + 1;
                return count;
            }, {});

            // Préparer les données pour le graphique en camembert
            const labels = Object.keys(domainCount);
            const counts = Object.values(domainCount);

            // Obtenir le contexte 2D du canevas
            const ctx = document.getElementById('pieChart').getContext('2d');

            // Créer le graphique en camembert
            const pieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: counts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Distribution des noms de domaine des adresses email'
                        }
                    }
                }
            });

            const domainList = document.querySelector('#domainList');
            labels.forEach(domain => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = domain;
                domainList.appendChild(li);
            });
            
            // Afficher la liste des adresses
            const addressList = document.querySelector('#addressList');
            const searchInput = document.querySelector('#search');

            function displayAddresses(addresses) {
                addressList.innerHTML = '';
                addresses.forEach(address => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.textContent = address;
                    addressList.appendChild(li);
                });
            }

            displayAddresses(data.addresses);

            // Filtrer la liste des adresses en fonction de la recherche
            searchInput.addEventListener('input', function() {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredAddresses = data.addresses.filter(address =>
                    address.toLowerCase().includes(searchTerm)
                );
                displayAddresses(filteredAddresses);
            });
        })
});
