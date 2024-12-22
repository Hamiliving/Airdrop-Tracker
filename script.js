// script.js

// Select form and list elements
const form = document.getElementById('airdrop-form');
const airdropList = document.getElementById('airdrop-list');

// Load airdrops from localStorage
let airdrops = JSON.parse(localStorage.getItem('airdrops')) || [];
renderAirdrops();

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('airdrop-name').value;
  const link = document.getElementById('airdrop-link').value;
  const startDate = document.getElementById('start-date').value;
  const deadline = document.getElementById('deadline').value;
  const notes = document.getElementById('notes').value;

  // Create airdrop object
  const airdrop = { name, link, startDate, deadline, notes, done: false };
  airdrops.push(airdrop);

  // Save to localStorage
  localStorage.setItem('airdrops', JSON.stringify(airdrops));

  // Clear form and render
  form.reset();
  renderAirdrops();
});

// Render airdrops in the list
function renderAirdrops() {
  airdropList.innerHTML = ''; // Clear current list
  airdrops.forEach((airdrop, index) => {
    const item = document.createElement('div');
    item.classList.add('airdrop-item');
    item.innerHTML = `
      <h3>${airdrop.name}</h3>
      <p><a href="${airdrop.link}" target="_blank">Visit Airdrop</a></p>
      <p>Start Date: ${airdrop.startDate}</p>
      <p>Deadline: ${airdrop.deadline}</p>
      <p>${airdrop.notes}</p>
      <button class="mark-done ${airdrop.done ? 'done' : ''}" onclick="toggleDone(${index})">
        ${airdrop.done ? 'Done' : 'Mark as Done'}
      </button>
      <button onclick="deleteAirdrop(${index})">Delete</button>
    `;
    airdropList.appendChild(item);
  });
}

// Mark an airdrop activity as done
function toggleDone(index) {
  airdrops[index].done = !airdrops[index].done;
  localStorage.setItem('airdrops', JSON.stringify(airdrops));
  renderAirdrops();
}

// Delete an airdrop
function deleteAirdrop(index) {
  airdrops.splice(index, 1);
  localStorage.setItem('airdrops', JSON.stringify(airdrops));
  renderAirdrops();
}
