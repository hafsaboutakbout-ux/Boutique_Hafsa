// 1. Fonction pour charger un fichier JSON

export const fetchData = async (url) => {

    // Envoyer une requête au fichier JSON
    const response = await fetch(url);

    // Vérifier si le chargement a réussi
    if (!response.ok) {
        throw new Error(
            "Erreur de chargement du fichier : " + url
        );
    }

    // Convertir la réponse en données JavaScript
    const data = await response.json();

    // Retourner les données
    return data;
};


// 2. Fonction pour charger les trois fichiers JSON

export const loadAllData = async () => {

    // Charger les clients, produits et commandes
    const [customers, products, orders] = await Promise.all([

        fetchData("./data/customers.json"),

        fetchData("./data/products.json"),

        fetchData("./data/orders.json")

    ]);

    // Vérifier que chaque fichier contient un tableau
    if (
        !Array.isArray(customers) ||
        !Array.isArray(products) ||
        !Array.isArray(orders)
    ) {
        throw new Error(
            "Les fichiers JSON doivent contenir des tableaux."
        );
    }

    // Retourner les trois tableaux
    return {
        customers,
        products,
        orders
    };
};