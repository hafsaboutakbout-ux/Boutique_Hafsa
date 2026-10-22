Organisation des fichiers du projet

Pour réaliser mon projet Boutique Hafsa – TP4, j’ai organisé les fichiers dans plusieurs dossiers afin de faciliter le développement et la compréhension de mon application Web.
Le fichier index.html contient la structure principale du site, notamment la page d’accueil, les indicateurs, les filtres de recherche et l’affichage des commandes.
Le dossier css contient le fichier style.css, qui permet de personnaliser l’apparence du site avec les couleurs violet, beige et rose. Il permet également d’adapter l’affichage aux différentes tailles d’écran.
Le dossier data contient trois fichiers JSON. Le fichier customers.json regroupe les informations des clients, comme leurs noms, leurs villes et leurs identifiants. Le fichier products.json contient les produits avec leurs catégories, leurs prix et leurs stocks. Le fichier orders.json contient les commandes, leurs dates, leurs statuts et les produits commandés.
Ces trois fichiers sont reliés grâce aux identifiants customerId et productId, ce qui permet de retrouver les informations des clients et des produits associés à chaque commande.
Le dossier images regroupe les 12 photos des produits de la boutique, utilisées pour illustrer les articles dans l’interface.
Le dossier js contient cinq fichiers JavaScript. Le fichier app.js gère le fonctionnement général de l’application et les interactions avec l’utilisateur. Le fichier state.js conserve les données chargées et les filtres sélectionnés.
Le fichier dataService.js permet de charger les trois fichiers JSON grâce à fetch() et async/await. Le fichier selectors.js permet de rechercher, filtrer et relier les données, ainsi que de calculer automatiquement les montants des commandes.
Enfin, le fichier view.js permet d’afficher dynamiquement les commandes, les indicateurs et les détails des produits dans la page Web.

boutique hafsa/
│
├── index.html
│
├── css/
│   └── style.css
│
├── data/
│   ├── customers.json
│   ├── products.json
│   └── orders.json
│
├── images/
│   ├── airpods.jpg
│   ├── brosse.jpg
│   ├── collier perle.jpg
│   ├── creme.jpg
│   ├── lampe.jpg
│   ├── masque.jpg
│   ├── montre.jpg
│   ├── palette.jpg
│   ├── parfum.jpg
│   ├── robe.jpg
│   ├── rouge a levre.jpg
│   └── sac.jpg
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── dataService.js
│   ├── selectors.js
│   └── view.js
│
└── README.md
Cette organisation m’a permis de séparer les différentes responsabilités du code et de rendre mon projet plus clair, structuré et facile à modifier.

Relations entre les données
Exemple de relation :

Dans le fichier customers.json, le client ayant l’identifiant id: 1 s’appelle Nadia Rahmani et habite à Marrakech. Dans le fichier orders.json, une commande portant le numéro 101 contient customerId: 1, ce qui permet de retrouver automatiquement Nadia Rahmani. Si cette commande contient un produit avec productId: 10, l’application recherche ce produit dans products.json pour récupérer son nom et son prix.
Par exemple, si le produit coûte 250 DH et que la quantité commandée est de 2, le calcul sera :
Sous-total = 250 × 2 = 500 DH
L’application additionne ensuite les sous-totaux de tous les produits pour calculer le montant total de la commande. Cette organisation permet d’éviter la répétition des informations, de faciliter les calculs et de rendre l’affichage des commandes plus dynamique.
