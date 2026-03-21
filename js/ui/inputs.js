/**
 * Input field components and form rendering logic for Task 3
 */

function createNumberField(label, value, key, onChange) {
    const field = document.createElement('div');
    field.className = 'form-field';
    field.innerHTML = `
        <label class="field-label">${label}</label>
        <input type="number" data-key="${key}" value="${value || 0}">
    `;
    field.querySelector('input').addEventListener('input', (e) => onChange(key, parseFloat(e.target.value)));
    return field;
}

function createSelectField(label, value, options, key, onChange) {
    const field = document.createElement('div');
    field.className = 'form-field';
    const optionsHtml = options.map(opt => `<option value="${opt.value}" ${opt.value === value ? 'selected' : ''}>${opt.label}</option>`).join('');
    field.innerHTML = `
        <label class="field-label">${label}</label>
        <select data-key="${key}">
            ${optionsHtml}
        </select>
    `;
    field.querySelector('select').addEventListener('change', (e) => onChange(key, e.target.value));
    return field;
}

function setNestedValue(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
}

export function renderContextForm(state) {
    const container = document.getElementById('context-form');
    if (!container) return;
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'form-grid';

    const onUpdate = (key, val) => {
        setNestedValue(state, key, val);
        renderAllForms(state); // Re-render to handle conditional healthcare fields
    };

    grid.appendChild(createSelectField('Industry', state.organization.industry, [
        { value: 'generic', label: 'Generic Enterprise' },
        { value: 'healthcare', label: 'Healthcare' }
    ], 'organization.industry', onUpdate));

    grid.appendChild(createNumberField('Number of Users', state.organization.userCount, 'organization.userCount', onUpdate));

    grid.appendChild(createSelectField('Current Scenario', state.organization.currentScenario, [
        { value: 'manual', label: 'Manual ChromeOS' },
        { value: 'standard', label: 'Managed ChromeOS (Standard)' },
        { value: 'healthcare_traveler_onboarding', label: 'Healthcare Traveler Onboarding' }
    ], 'organization.currentScenario', onUpdate));

    container.appendChild(grid);
}

export function renderUsageForm(state) {
    const container = document.getElementById('usage-form');
    if (!container) return;
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'form-grid';

    const onUpdate = (key, val) => setNestedValue(state, key, val);

    grid.appendChild(createNumberField('Avg Daily Apps per User', state.productivity.avgDailyApps, 'productivity.avgDailyApps', onUpdate));
    grid.appendChild(createNumberField('Session Frequency (per day)', state.productivity.sessionFrequency, 'productivity.sessionFrequency', onUpdate));
    grid.appendChild(createNumberField('Employee Hourly Rate ($)', state.productivity.employeeHourlyRate, 'productivity.employeeHourlyRate', onUpdate));

    // Conditional Healthcare Section
    if (state.organization.industry === 'healthcare' || state.organization.currentScenario === 'healthcare_traveler_onboarding') {
        const hcSection = document.createElement('div');
        hcSection.className = 'form-section';
        hcSection.innerHTML = '<h3>Healthcare Specifics</h3>';
        const hcGrid = document.createElement('div');
        hcGrid.className = 'form-grid';
        hcGrid.appendChild(createNumberField('Clinician Hourly Rate ($)', state.healthcare.clinicianHourlyRate, 'healthcare.clinicianHourlyRate', onUpdate));
        hcSection.appendChild(hcGrid);
        grid.appendChild(hcSection);
    }

    container.appendChild(grid);
}

export function renderOperationsForm(state) {
    const container = document.getElementById('operations-form');
    if (!container) return;
    container.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'form-grid';

    const onUpdate = (key, val) => setNestedValue(state, key, val);

    grid.appendChild(createNumberField('VLauncher Subscription ($/user/mo)', state.cost.monthlySubscription, 'cost.monthlySubscription', onUpdate));
    grid.appendChild(createNumberField('IT Admin Annual Salary ($)', state.productivity.itSalary, 'productivity.itSalary', onUpdate));

    container.appendChild(grid);
}

export function renderAllForms(state) {
    renderContextForm(state);
    renderUsageForm(state);
    renderOperationsForm(state);
}
