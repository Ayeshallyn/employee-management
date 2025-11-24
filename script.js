let employees = JSON.parse(localStorage.getItem('employees')) || [];

const employeeForm = document.getElementById('employeeForm');
const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];

function saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function renderTable() {
    employeeTable.innerHTML = '';
    employees.forEach((emp, index) => {
        const row = employeeTable.insertRow();
        row.insertCell(0).innerText = emp.name;
        row.insertCell(1).innerText = emp.position;
        row.insertCell(2).innerText = emp.salary;
        const actions = row.insertCell(3);
        actions.innerHTML = `
            <button class="edit" onclick="editEmployee(${index})">Edit</button>
            <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
        `;
    });
}

function editEmployee(index) {
    const emp = employees[index];
    document.getElementById('name').value = emp.name;
    document.getElementById('position').value = emp.position;
    document.getElementById('salary').value = emp.salary;
    employeeForm.onsubmit = function(e) {
        e.preventDefault();
        employees[index] = {
            name: document.getElementById('name').value,
            position: document.getElementById('position').value,
            salary: document.getElementById('salary').value
        };
        saveEmployees();
        renderTable();
        employeeForm.reset();
        employeeForm.onsubmit = addEmployee;
    };
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    saveEmployees();
    renderTable();
}

function addEmployee(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const salary = document.getElementById('salary').value;
    employees.push({name, position, salary});
    saveEmployees();
    renderTable();
    employeeForm.reset();
}

employeeForm.onsubmit = addEmployee;
renderTable();
