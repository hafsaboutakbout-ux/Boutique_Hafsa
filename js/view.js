// 1. RECUPERER LES ELEMENTS HTML

const orderList = document.querySelector("#orderList");
const totalOrders = document.querySelector("#totalOrders");
const deliveredOrders = document.querySelector("#deliveredOrders");
const pendingOrders = document.querySelector("#pendingOrders");
const revenue = document.querySelector("#revenue");
const resultCount = document.querySelector("#resultCount");
const errorMessage = document.querySelector("#errorMessage");
const modalTitle = document.querySelector("#orderModalLabel");
const modalBody = document.querySelector("#modalBody");
// 2. FORMATER LES PRIX EN DIRHAMS

function formatPrice(price) {

    return Number(price).toLocaleString("fr-FR") + " D";

}


// 3. PROTEGER LES TEXTES HTML

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, character => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];

    });

}


// 4. AFFICHER LES STATUTS EN FRANCAIS

function formatStatus(status) {

    if (status === "Livree") {
        return "Livrée";
    }

    if (status === "Annulee") {
        return "Annulée";
    }

    return status;

}


// 5. CHOISIR LA COULEUR DU STATUT

function getStatusClass(status) {

    if (status === "Livree") {
        return "bg-success";
    }

    if (status === "Annulee") {
        return "bg-danger";
    }

    return "bg-warning text-dark";

}


// 6. AFFICHER LES CARTES DES COMMANDES

export function renderOrders(orders) {

    // Effacer les anciennes cartes
    orderList.innerHTML = "";

    // Vérifier si aucune commande n'est trouvée
    if (orders.length === 0) {

        orderList.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning text-center">
                    Aucune commande trouvée.
                </div>
            </div>
        `;

        return;

    }

    // Transformer les commandes en cartes HTML
    const cards = orders.map(order => {

        const statusClass = getStatusClass(order.status);

        return `
            <div class="col-md-6 col-lg-4">

                <div class="card order-card h-100">

                    <div class="card-body">

                        <div class="d-flex justify-content-between
                                    align-items-center mb-3">

                            <h5 class="card-title mb-0">
                                Commande n° ${Number(order.id)}
                            </h5>

                            <span class="badge ${statusClass}">
                                ${escapeHTML(formatStatus(order.status))}
                            </span>

                        </div>

                        <p>
                            <strong>Client :</strong>
                            ${escapeHTML(order.customerName)}
                        </p>

                        <p>
                            <strong>Ville :</strong>
                            ${escapeHTML(order.customerCity)}
                        </p>

                        <p>
                            <strong>Date :</strong>
                            ${escapeHTML(order.date)}
                        </p>

                        <p>
                            <strong>Nombre de produits :</strong>
                            ${order.details.length}
                        </p>

                        <h4 class="order-total">
                            ${formatPrice(order.total)}
                        </h4>

                        <button
                            type="button"
                            class="btn btn-primary w-100 detail-btn"
                            data-id="${Number(order.id)}">

                            Voir les détails

                        </button>

                    </div>

                </div>

            </div>
        `;

    });

    // Afficher les cartes dans le HTML
    orderList.innerHTML = cards.join("");

}


// 7. AFFICHER LES QUATRE INDICATEURS

export function renderStats(stats) {

    totalOrders.textContent = stats.totalOrders;

    deliveredOrders.textContent = stats.deliveredOrders;

    pendingOrders.textContent = stats.pendingOrders;

    revenue.textContent = formatPrice(stats.revenue);

}


// 8. AFFICHER LE NOMBRE DE RESULTATS

export function renderResultCount(count) {

    resultCount.textContent =
        count + " commande(s) trouvée(s).";

}


// 9. AFFICHER LES DETAILS D'UNE COMMANDE

export function renderDetails(order) {

    modalTitle.textContent =
        "Détails de la commande n° " + order.id;

    // Créer les lignes des produits
    const productsHTML = order.details.map(item => {

        return `
            <div class="row align-items-center
                        border-bottom py-3 g-3">

                <div class="col-md-3">

                    <img
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.name)}"
                        class="img-fluid detail-product-image"
                    >

                </div>

                <div class="col-md-9">

                    <h6>${escapeHTML(item.name)}</h6>

                    <p class="mb-1">
                        Catégorie :
                        ${escapeHTML(item.category)}
                    </p>

                    <p class="mb-1">
                        Prix unitaire :
                        ${formatPrice(item.price)}
                    </p>

                    <p class="mb-1">
                        Quantité :
                        ${Number(item.quantity)}
                    </p>

                    <p class="mb-0">
                        <strong>Sous-total :</strong>
                        ${formatPrice(item.subtotal)}
                    </p>

                </div>

            </div>
        `;

    }).join("");

    // Afficher les informations complètes
    modalBody.innerHTML = `
        <div class="mb-4">

            <p>
                <strong>Client :</strong>
                ${escapeHTML(order.customerName)}
            </p>

            <p>
                <strong>Ville :</strong>
                ${escapeHTML(order.customerCity)}
            </p>

            <p>
                <strong>Date :</strong>
                ${escapeHTML(order.date)}
            </p>

            <p>
                <strong>Statut :</strong>
                ${escapeHTML(formatStatus(order.status))}
            </p>

        </div>

        <h5>Produits commandés</h5>

        ${productsHTML}

        <div class="text-end mt-4">

            <h4 class="order-total">
                Total : ${formatPrice(order.total)}
            </h4>

        </div>
    `;

    // Ouvrir la fenêtre Bootstrap
    const modal = bootstrap.Modal.getOrCreateInstance(
        document.querySelector("#orderModal")
    );

    modal.show();

}


// 10. AFFICHER UN MESSAGE D'ERREUR

export function renderError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.remove("d-none");

}


// 11. MASQUER LE MESSAGE D'ERREUR

export function clearError() {

    errorMessage.textContent = "";

    errorMessage.classList.add("d-none");

}