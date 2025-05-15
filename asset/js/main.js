// set detail button click
let button = document.getElementById("set-detail-button");
button.addEventListener("click", triggerSetDetailButton);

function triggerSetDetailButton() {
    let name = document.getElementById("txt-name").value;
    let address = document.getElementById("txt-address").value;
    let age = document.getElementById("txt-age").value;

    createStudentObject(name, address, age);
}

function createStudentObject(name, address, age) {
    let requestBody = {
        "name": name,
        "address": address,
        "age": age
    }

    fetch("http://localhost:8080/student/set-data", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            "Content-Type": "application/json",
        }

    }).then(data => {
        data.json()
    }).then(data => {
        Swal.fire({
            title: "Sucess!",
            text: data,
            icon: "success"
        });
    })
}



// get detail button click
let getButton = document.getElementById("get-detail-button");
getButton.addEventListener("click", triggerGetDetailButton);

function triggerGetDetailButton() {


    fetch("http://localhost:8080/student/get-data").then(response => {
        return response.json()
    }).then(data => {
        if (data && data.length > 0) {
            document.getElementById("student-table-container").classList.remove("d-none");
            let studentTable = document.getElementById("student-table-body");
            studentTable.innerHTML = "";

            data.forEach(student => {
                studentTable.innerHTML += `
                <tr class="text-center">
                    <td>${student.name}</td>
                    <td>${student.address}</td>
                    <td>${student.age}</td>
                </tr>
            `;
            });
        } else {
            document.getElementById("student-table-container").classList.add("d-none");
            Swal.fire({
                title: "Error!",
                text: "No data found",
                icon: "error"
            });
        }

    }).catch(error => {
        console.error("Error fetching student data:", error);
    });
}

// clear input fields
let clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearInputFields);

function clearInputFields() {
    document.getElementById("txt-name").value = "";
    document.getElementById("txt-address").value = "";
    document.getElementById("txt-age").value = "";
}