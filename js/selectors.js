// 1. IMPORTER L'ETAT DE L'APPLICATION

import { state } from "./state.js";


// 2. RECHERCHER UN CLIENT PAR SON ID

export function getCustomer(customerId) {

    return state.customers.find(customer => {
        return customer.id === customerId;
    });

}


// 3. RECHERCHER UN PRODUIT PAR SON ID

export function getProduct(productId) {

    return state.products.find(product => {
        return product.id === productId;
    });

}


// 4. CALCULER LE TOTAL D'UNE COMMANDE

export function calculateOrderTotal(order) {

    let total = 0;

    order.items.forEach(item => {

        // Retrouver le produit
        const product = getProduct(item.productId);

        // Vérifier que le produit existe
        if (product) {

            // Prix du produit x quantité
            total += product.price * item.quantity;

        }

    });

    return total;
}


// 5. RELIER LES COMMANDES AUX CLIENTS ET PRODUITS

export function getOrdersWithDetails() {

    return state.orders.map(order => {

        // Retrouver le client
        const customer = getCustomer(order.customerId);

        // Retrouver chaque produit commandé
        const details = order.items.map(item => {

            const product = getProduct(item.productId);

            return {

                productId: item.productId,

                name: product ? product.name : "Produit inconnu",

                category: product ? product.category : "",

                price: product ? product.price : 0,

                image: product ? product.image : "",

                quantity: item.quantity,

                subtotal: product
                    ? product.price * item.quantity
                    : 0

            };

        });

        // Retourner une commande enrichie
        return {

            ...order,

            customerName: customer
                ? customer.name
                : "Client inconnu",

            customerCity: customer
                ? customer.city
                : "Ville inconnue",

            details: details,

            total: calculateOrderTotal(order)

        };

    });

}


// 6. FILTRER LES COMMANDES

export function getFilteredOrders() {

    // Récupérer les commandes avec leurs détails
    const orders = getOrdersWithDetails();

    return orders.filter(order => {

        // Recherche par nom du client
        const rechercheOK = order.customerName
            .toLowerCase()
            .includes(state.search.toLowerCase());

        // Filtre par statut
        const statutOK =
            state.status === "all" ||
            order.status === state.status;

        // Filtre par catégorie de produit
        const categorieOK =
            state.category === "all" ||
            order.details.some(item => {
                return item.category === state.category;
            });

        // Combiner tous les critères
        return rechercheOK &&
               statutOK &&
               categorieOK;

    });

}


// 7. CALCULER LES INDICATEURS

export function getStats() {

    const orders = getOrdersWithDetails();

    let chiffreAffaires = 0;
    let commandesLivrees = 0;
    let commandesEnAttente = 0;

    orders.forEach(order => {

        if (order.status === "Livree") {

            commandesLivrees++;

            // Ne compter que les commandes livrées
            chiffreAffaires += order.total;

        }

        if (order.status === "En attente") {
            commandesEnAttente++;
        }

    });

    return {

        totalOrders: orders.length,

        deliveredOrders: commandesLivrees,

        pendingOrders: commandesEnAttente,

        revenue: chiffreAffaires

    };

}