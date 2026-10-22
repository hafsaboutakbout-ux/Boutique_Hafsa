import { state } from "./state.js";
import { loadAllData } from "./dataService.js";
import {
    getOrdersWithDetails,
    getFilteredOrders,
    getStats
} from "./selectors.js";
import {
    renderOrders,
    renderStats,
    renderResultCount,
    renderDetails,
    renderError,
    clearError
} from "./view.js";

const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const resetFilters = document.querySelector("#resetFilters");
const orderList = document.querySelector("#orderList");

const EMPTY_STATS = {
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    revenue: 0
};

function render() {
    const filteredOrders = getFilteredOrders();

    renderOrders(filteredOrders);
    renderResultCount(filteredOrders.length);
    renderStats(getStats());
}

function bindFilter(input, event, key) {
    input.addEventListener(event, () => {
        state[key] = input.value.trim();
        render();
    });
}

bindFilter(searchInput, "input", "search");
bindFilter(statusFilter, "change", "status");
bindFilter(categoryFilter, "change", "category");

resetFilters.addEventListener("click", () => {
    state.search = "";
    state.status = "all";
    state.category = "all";

    searchInput.value = "";
    statusFilter.value = "all";
    categoryFilter.value = "all";

    render();
});

orderList.addEventListener("click", event => {
    const button = event.target.closest(".detail-btn");
    if (!button) return;

    const id = Number(button.dataset.id);
    const order = getOrdersWithDetails().find(order => order.id === id);

    if (order) renderDetails(order);
});

function hasValidReferences({ orders, customers, products }) {
    const customerIds = new Set(customers.map(c => c.id));
    const productIds = new Set(products.map(p => p.id));

    return orders.every(order =>
        customerIds.has(order.customerId) &&
        Array.isArray(order.items) &&
        order.items.every(item => productIds.has(item.productId))
    );
}

async function init() {
    try {
        clearError();

        const data = await loadAllData();
        state.customers = data.customers;
        state.products = data.products;
        state.orders = data.orders;

        if (!hasValidReferences(state)) {
            throw new Error("Certaines commandes contiennent des identifiants inconnus.");
        }

        render();
    } catch (error) {
        console.error(error);
        renderError("Erreur : impossible de charger les données de Boutique Hafsa.");
        orderList.innerHTML = "";
        renderResultCount(0);
        renderStats(EMPTY_STATS);
    }
}

init();