// Initialize
document.addEventListener('DOMContentLoaded', function() {
  loadHistory();
});

function loadHistory() {
  const history = JSON.parse(localStorage.getItem('formHistory')) || [];
  const tableBody = document.querySelector('#historyTable tbody');
  tableBody.innerHTML = '';
  
  // Populate table
  history.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.location}</td>
      <td>${item.timestamp}</td>
      <td class="${item.status}">${item.status === 'pending' ? '⏳ পেন্ডিং' : '✅ অ্যাপ্রুভড'}</td>
      <td>
        <button onclick="editEntry(${index})">✏️</button>
        <button onclick="deleteEntry(${index})">🗑️</button>
        ${item.status === 'pending' ? `<button onclick="approveEntry(${index})">✅</button>` : ''}
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Edit function
function editEntry(index) {
  localStorage.setItem('editIndex', index);
  window.location.href = 'edit.html';
}

// Delete function
function deleteEntry(index) {
  if (confirm('আপনি কি নিশ্চিত?')) {
    let history = JSON.parse(localStorage.getItem('formHistory'));
    const deletedItem = history[index];
    history.splice(index, 1);
    localStorage.setItem('formHistory', JSON.stringify(history));
    loadHistory();
    
    // Telegram notification
    const message = `🗑️ ফর্ম ডিলিট করা হয়েছে:\n👤 নাম: ${deletedItem.name}\n📞 মোবাইল: ${deletedItem.phone}\n📍 স্থান: ${deletedItem.location}`;
    sendTelegramNotification(message);
  }
}

// Approve function
function approveEntry(index) {
  let history = JSON.parse(localStorage.getItem('formHistory'));
  history[index].status = 'approved';
  localStorage.setItem('formHistory', JSON.stringify(history));
  loadHistory();
  
  // Telegram notification
  const item = history[index];
  const message = `✅ ফর্ম অ্যাপ্রুভড:\n👤 নাম: ${item.name}\n📞 মোবাইল: ${item.phone}\n📍 স্থান: ${item.location}\n⏱ সময়: ${item.timestamp}`;
  sendTelegramNotification(message);
}

// Telegram notification helper
function sendTelegramNotification(message) {
  const token = "7757315317:AAHhlhX7UwuOnqSGE7C3PihIJCN-d_Gpbc4";
  const chatId = "-4937302574";
  
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  }).catch(error => console.error('Telegram notification error:', error));
}

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  sidebar.classList.toggle('closed');
  menuBtn.style.left = sidebar.classList.contains('closed') ? '15px' : (sidebar.offsetWidth + 15) + 'px';
}