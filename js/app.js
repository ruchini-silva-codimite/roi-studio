import { initRouter } from "./router.js";
import { initState } from "./state.js";
import { renderResults } from "./ui/results.js";
import { renderForm, bindStateInputs } from "./ui/inputs.js";

const CONTEXT_FIELDS = [
    { key: 'industry', label: 'Industry', type: 'select', options: [
        { value: 'generic', label: 'Generic Enterprise' },
        { value: 'healthcare', label: 'Healthcare' }
    ]},
    { key: 'currentScenario', label: 'Comparison Scenario', type: 'select', options: [
        { value: 'manual', label: 'Manual ChromeOS' },
        { value: 'standard', label: 'Managed ChromeOS (Standard)' }
    ]},
    { key: 'userCount', label: 'Number of Users', type: 'number', description: 'Total employees using the platform' }
];

const USAGE_FIELDS = (industry) => {
    const base = [
        { key: 'avgDailyApps', label: 'Avg Apps per User', type: 'number' },
        { key: 'sessionFrequency', label: 'Sessions per Day', type: 'number' }
    ];
    if (industry === 'healthcare') {
        base.push({ key: 'clinicianHourlyRate', label: 'Clinician Hourly Rate ($)', type: 'number' });
    } else {
        base.push({ key: 'employeeHourlyRate', label: 'Avg Employee Hourly Rate ($)', type: 'number' });
    }
    return base;
};

const OPS_FIELDS = [
    { key: 'monthlySubscription', label: 'VLauncher Fee ($/user/mo)', type: 'number' },
    { key: 'itSalary', label: 'IT Admin Annual Salary ($)', type: 'number' }
];

function renderAllForms() {
    renderForm('context-form', CONTEXT_FIELDS, window.appState);
    renderForm('usage-form', USAGE_FIELDS(window.appState.industry), window.appState);
    renderForm('operations-form', OPS_FIELDS, window.appState);

    bindStateInputs(['context-form', 'usage-form', 'operations-form'], window.appState, (key) => {
        if (key === 'industry') {
            renderForm('usage-form', USAGE_FIELDS(window.appState.industry), window.appState);
            bindStateInputs(['usage-form'], window.appState);
        }
    });
}

function initApp() {
    initState();
    initRouter();
    renderAllForms();

    // Navigation Wiring
    document.getElementById("start-btn").addEventListener("click", () => window.navigate("context"));
    document.getElementById("to-landing").addEventListener("click", () => window.navigate("landing"));
    document.getElementById("to-usage").addEventListener("click", () => window.navigate("usage"));
    document.getElementById("to-context").addEventListener("click", () => window.navigate("context"));
    document.getElementById("to-operations").addEventListener("click", () => window.navigate("operations"));
    document.getElementById("to-usage-back").addEventListener("click", () => window.navigate("usage"));

    document.getElementById("to-results").addEventListener("click", () => {
        renderResults(window.appState);
        window.navigate("results");
    });

    document.getElementById("edit-inputs").addEventListener("click", () => window.navigate("context"));
}

initApp();
