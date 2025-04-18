// Problem 1: Create JSON for each employee
const employees = [
    {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true
    },
    {
        firstName: "Mary",
        department: "Finance",
        designation: "Trainee",
        salary: 18500,
        raiseEligible: true
    },
    {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: false
    }
];

// Problem 2: Create JSON for the company
const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};

// Problem 3: Add a new employee
const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false
};

company.employees.push(newEmployee);

// Problem 4: Calculate total salary for all company employees
let totalSalary = 0;
company.employees.forEach(employee => {
    totalSalary += employee.salary;
});

// Problem 5: Give raises to eligible employees
function giveRaises(company) {
    company.employees.forEach(employee => {
        if (employee.raiseEligible) {
            employee.salary *= 1.10; // Increase salary by 10%
            employee.raiseEligible = false; // Set eligibility to false
        }
    });
}

giveRaises(company);

// Problem 6: Update WFH status
const workingFromHome = ['Anna', 'Sam'];

company.employees.forEach(employee => {
    employee.wfh = workingFromHome.includes(employee.firstName);
});

// Display information on the page
function displayCompanyInfo() {
    const companyInfoDiv = document.getElementById('company-info');
    companyInfoDiv.innerHTML = `
        <div class="company-details">
            <p><strong>Company Name:</strong> ${company.companyName}</p>
            <p><strong>Website:</strong> ${company.website}</p>
            <p><strong>Total Salary:</strong> $${totalSalary.toLocaleString()}</p>
        </div>
    `;
}

function displayEmployees() {
    const employeeListDiv = document.getElementById('employee-list');
    employeeListDiv.innerHTML = '';
    
    company.employees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.className = 'employee-card';
        employeeCard.innerHTML = `
            <h3>${employee.firstName}</h3>
            <div class="employee-property">
                <span class="property-name">Department:</span>
                <span>${employee.department}</span>
            </div>
            <div class="employee-property">
                <span class="property-name">Designation:</span>
                <span>${employee.designation}</span>
            </div>
            <div class="employee-property">
                <span class="property-name">Salary:</span>
                <span>$${employee.salary.toLocaleString()}</span>
            </div>
            <div class="employee-property">
                <span class="property-name">Raise Eligible:</span>
                <span>${employee.raiseEligible ? 'Yes' : 'No'}</span>
            </div>
            <div class="employee-property">
                <span class="property-name">Working From Home:</span>
                <span>${employee.wfh ? 'Yes' : 'No'}</span>
            </div>
        `;
        employeeListDiv.appendChild(employeeCard);
    });
}

// Initialize the display
displayCompanyInfo();
displayEmployees();

// Console logs for grading
console.log("Problem 1: Employee JSON");
console.log(employees);
console.log("Problem 2: Company JSON");
console.log(company);
console.log("Problem 3: Updated Company JSON with new employee");
console.log(company);
console.log("Problem 4: Total salary for all employees");
console.log(`Total Salary: $${totalSalary}`);
console.log("Problem 5: Updated salaries after raises");
console.log(company.employees);
console.log("Problem 6: Updated employees with WFH status");
console.log(company.employees);