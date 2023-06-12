const contactForm = document.getElementById("contactForm");
const contactTable = document.getElementById("contactTable");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const firstName = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;
  const phone = document.getElementById("telefono").value;

  const newRow = contactTable.insertRow(-1);
  const nameCell = newRow.insertCell(0);
  const lastNameCell = newRow.insertCell(1);
  const phoneCell = newRow.insertCell(2);
  nameCell.innerHTML = firstName;
  lastNameCell.innerHTML = lastName;
  phoneCell.innerHTML = phone;

  contactForm.reset();
});

// Api de http://www.raydelto.org/agenda.php

function displayContacts(contacts) {
  contactTable.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
        </tr>
    `;

  contacts.forEach((contact) => {
    const newRow = contactTable.insertRow(-1);
    const nameCell = newRow.insertCell(0);
    const lastNameCell = newRow.insertCell(1);
    const phoneCell = newRow.insertCell(2);
    nameCell.innerHTML = contact.nombre;
    lastNameCell.innerHTML = contact.apellido;
    phoneCell.innerHTML = contact.telefono;
  });
}

function getContacts() {
  fetch("https://railway-node-express-production-3b13.up.railway.app/scrape")
    .then((response) => response.json())
    .then((data) => displayContacts(data))
    .catch((error) => console.error("Error al obtener los contactos:", error));
}

function saveContact(firstName, lastName, phone) {
  const newContact = {
    nombre: firstName,
    apellido: lastName,
    telefono: phone,
  };

  fetch("https://railway-node-express-production-3b13.up.railway.app/scrape", {
    method: "POST",
    body: JSON.stringify(newContact),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.resultado === "OK") {
        getContacts();
        contactForm.reset();
      } else {
        console.error("Error al guardar el contacto:", data.mensaje);
      }
    })
    .catch((error) => console.error("Error al guardar el contacto:", error));
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const firstName = document.getElementById("nombre").value;
  const lastName = document.getElementById("apellido").value;
  const phone = document.getElementById("telefono").value;

  saveContact(firstName, lastName, phone);
});
getContacts();
