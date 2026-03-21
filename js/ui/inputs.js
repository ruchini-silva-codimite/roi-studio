/**
 * UI components for rendering interactive input forms
 */

export function renderForm(containerId, fields, state) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'form-grid';

    fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = field.label;
        group.appendChild(label);

        if (field.type === 'select') {
            const select = document.createElement('select');
            select.dataset.key = field.key;
            field.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt.value;
                option.textContent = opt.label;
                if (state[field.key] === opt.value) option.selected = true;
                select.appendChild(option);
            });
            group.appendChild(select);
        } else {
            const input = document.createElement('input');
            input.type = field.type || 'number';
            input.dataset.key = field.key;
            input.value = state[field.key] || '';
            group.appendChild(input);
        }

        if (field.description) {
            const desc = document.createElement('p');
            desc.className = 'field-desc';
            desc.textContent = field.description;
            group.appendChild(desc);
        }

        grid.appendChild(group);
    });

    container.appendChild(grid);
}

export function bindStateInputs(containerIds, state, onUpdate) {
    containerIds.forEach(id => {
        const container = document.getElementById(id);
        if (!container) return;

        container.querySelectorAll('input, select').forEach(el => {
            el.addEventListener('change', (e) => {
                const key = e.target.dataset.key;
                let value = e.target.value;
                
                // Convert to number if applicable
                if (e.target.type === 'number') {
                    value = parseFloat(value);
                }

                state[key] = value;
                if (onUpdate) onUpdate(key, value);
            });
        });
    });
}
