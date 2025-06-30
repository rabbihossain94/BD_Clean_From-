// Initialize
document.addEventListener('DOMContentLoaded', function() {
  const index = localStorage.getItem('editIndex');
  let history = JSON.parse(localStorage.getItem('formHistory')) || [];
  const form = document.getElementById('editForm');

  // Populate form with existing data
  const data = history[index];
  form.name.value = data.name;
  form.phone.value = data.phone;
  form.email.value = data.email || '';
  form.location.value = data.location;
  
  // Set selected category
  form.category.value = data.category;

  // Form submission
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const updatedData = {
      ...data,
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      category: form.category.value,
      location: form.location.value,
      timestamp: new Date().toLocaleString()
    };
    
    history[index] = updatedData;
    localStorage.setItem('formHistory', JSON.stringify(history));
    localStorage.removeItem('editIndex');
    
    // Telegram notification
    const message = `✏️ ফর্ম এডিট করা হয়েছে:\n👤 নাম: ${form.name.value}\n📞 মোবাইল: ${form.phone.value}\n📚 শ্রেণী: ${form.category.options[form.category.selectedIndex].text}\n📍 স্থান: ${form.location.value}\n⏱ সময়: ${updatedData.timestamp}`;
    sendTelegramNotification(message);
    
    window.location.href = 'history.html';
  });
});

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
