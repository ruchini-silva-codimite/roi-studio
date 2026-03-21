/**
 * Task 3: Implementation of form rendering and state binding logic.
 * This file strictly follows the requested functional structure.
 */

export function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

function createNumberField(label, value, key) {
    return `
        <div class="form-field">
            <label class="field-label">${label}</label>
            <input type="number" data-key="${key}" value="${value}">
        </div>
    `;
}

function createSelectField(label, value, options, key) {
    const optionsHtml = options.map(opt => 
        `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`
    ).join('');
    
    return `
        <div class="form-field">
            <label class="field-label">${label}</label>
            <select data-key="${key}">
                ${optionsHtml}
            </select>
        </div>
    `;
}

export function bindStateInputs(containerId, state, onUpdate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', (e) => {
            const key = e.target.getAttribute('data-key');
            let value = e.target.value;

            if (e.target.type === "number") {
                value = parseFloat(value);

                if (isNaN(value)) value = 0;
                if (value < 0) value = 0;

                if (key.includes("Percent") && value > 100) value = 100;
                if (key.includes("users") && value > 100000) value = 100000;
                if (key.includes("Rate") && value > 1000) value = 1000;
                if ((key.includes("time") || key.includes("Seconds") || key.includes("Minutes")) && value > 86400) value = 86400;
            }

            setNestedValue(state, key, value);
            if (onUpdate) onUpdate(key, value);
        });
    });
}

export function renderContextForm(state) {
    const container = document.getElementById('context-form');
    if (!container) return;

    container.innerHTML = `
        <div class="form-grid">
            ${createSelectField('Industry', state.organization.industry, [
                { value: 'generic', label: 'Generic Enterprise' },
                { value: 'healthcare', label: 'Healthcare' }
            ], 'organization.industry')}
            
            ${createNumberField('Number of Users', state.organization.userCount, 'organization.userCount')}
            
            ${createSelectField('Current Scenario', state.organization.currentScenario, [
                { value: 'manual', label: 'Manual ChromeOS' },
                { value: 'standard', label: 'Managed ChromeOS (Standard)' },
                { value: 'healthcare_traveler_onboarding', label: 'Healthcare Traveler Onboarding' }
            ], 'organization.currentScenario')}
        </div>
    `;

    bindStateInputs('context-form', state, () => renderAllForms(state));
}

export function renderUsageForm(state) {
    const container = document.getElementById('usage-form');
    if (!container) return;

    let html = `
        <div class="form-grid">
            ${createNumberField('Avg Daily Apps per User', state.productivity.avgDailyApps, 'productivity.avgDailyApps')}
            ${createNumberField('Session Frequency (per day)', state.productivity.sessionFrequency, 'productivity.sessionFrequency')}
            ${createNumberField('Employee Hourly Rate ($)', state.productivity.employeeHourlyRate, 'productivity.employeeHourlyRate')}
        </div>
    `;

    // Conditional Healthcare Section
    if (state.organization.industry === 'healthcare' || state.organization.currentScenario === 'healthcare_traveler_onboarding') {
        html += `
            <div class="form-section">
                <h3>Healthcare Specifics</h3>
                <div class="form-grid">
                    ${createNumberField('Clinician Hourly Rate ($)', state.healthcare.clinicianHourlyRate, 'healthcare.clinicianHourlyRate')}
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    bindStateInputs('usage-form', state);
}

export function renderOperationsForm(state) {
    const container = document.getElementById('operations-form');
    if (!container) return;

    container.innerHTML = `
        <div class="form-grid">
            ${createNumberField('VLauncher Subscription ($/user/mo)', state.cost.monthlySubscription, 'cost.monthlySubscription')}
            ${createNumberField('IT Admin Annual Salary ($)', state.productivity.itSalary, 'productivity.itSalary')}
        </div>
    `;

    bindStateInputs('operations-form', state);
}

export function renderAllForms(state) {
    renderContextForm(state);
    renderUsageForm(state);
    renderOperationsForm(state);
}
