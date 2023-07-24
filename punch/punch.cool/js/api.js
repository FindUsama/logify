"use strict"



let form = document.querySelector('form');
let firstName = document.getElementById('drip-first-name');
let lastName = document.getElementById('drip-last-name');
let email = document.getElementById('drip-email');
let phone = document.getElementById('drip-phone-general');
// let organizationName = document.getElementById('drip-organization-name');
// let organizationWebsite = document.getElementById('drip-organization-website');
let message = document.getElementById('drip-message');


let budgetSelect = document.getElementById('client-budget');



form.addEventListener('submit', function (event) {
    // event.preventDefault();
    console.log(firstName.value + " " + lastName.value)
    console.log(lastName.value)
    console.log(email.value)
    console.log(phone.value)
   


    let services = [];
    let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
        services.push(checkboxes[i].value);
    }
    console.log(services.join(", "))
    console.log(budgetSelect.value)


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "name": firstName.value + " " + lastName.value,
            "email": email.value,
            "description": message.value,
            "budget": budgetSelect.value,
            "services": services.join(", "),
            "uniqueId": "a",
            "domain": "https://logify.com/"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://16.170.255.24:3335/leads/add", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            alert("We got your request. We'll get back to you as soon as possible.");

            // Clear input fields
            firstName.value = '';
            lastName.value = '';
            email.value = '';
            phone.value = '';
            message.value = '';
            
        })
        .catch(error => console.log('error', error));

       

})










//




















