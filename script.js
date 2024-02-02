const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}



renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

//----------------------------------------------
let selectedDate = null;

document.querySelectorAll('.days li').forEach((day) => {
    day.addEventListener('click', function(event) {
        const clickedDay = parseInt(event.target.innerText);
        selectedDate = new Date(currYear, currMonth, clickedDay);
        document.getElementById('eventDate').value = formatDate(selectedDate);
        openModal();
    });
});

function openModal() {
    document.getElementById('reservationModal').style.display = 'block';
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function submitReservation() {
    if (selectedDate !== null && validateForm()) {
        const form = document.getElementById('reservationForm');
        const formData = new FormData(form);

        // Ajoutez la date sélectionnée au FormData
        formData.append('eventDate', selectedDate.toISOString().split('T')[0]);

        // Envoyer les données via AJAX (utilisation de Fetch API)
        fetch('saveEvent.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // Afficher le message de la réponse (peut être remplacé par une logique différente)
                alert(data);
                // Fermer la fenêtre modale après la soumission
                closeModal();
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi des données:', error);
            });
    } else {
        alert('Sélectionnez une date avant de soumettre la réservation.');
    }
}

function closeModal() {
    document.getElementById('reservationModal').style.display = 'none';
}

function validateForm() {
    const requiredFields = ['eventName', 'clientName', 'email', 'phoneNumber', 'region'];

    for (const field of requiredFields) {
        const value = document.getElementById(field).value.trim();
        if (!value) {
            alert(`Le champ "${field}" est requis.`);
            return false;
        }
    }

    const email = document.getElementById('email').value.trim();
    if (!isValidEmail(email)) {
        alert('Veuillez saisir une adresse e-mail valide.');
        return false;
    }

    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (!isValidPhoneNumber(phoneNumber)) {
        alert('Le numéro de téléphone doit contenir uniquement des chiffres.');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    if (phoneNumber.indexOf('+33') !== -1) phoneNumber = phoneNumber.replace('+33', '0');
    var re = /^0[1-7]\d{8}$/;
    return re.test(phoneNumber);
}

//----------------------------------------------