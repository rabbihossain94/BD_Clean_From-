// Telegram Config
const token = "7757315317:AAHhlhX7UwuOnqSGE7C3PihIJCN-d_Gpbc4";
const chatId = "-4937302574";

// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menuBtn');
  sidebar.classList.toggle('closed');
  menuBtn.style.left = sidebar.classList.contains('closed') ? '15px' : (sidebar.offsetWidth + 15) + 'px';
}

// Form Submission
document.getElementById('eventForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value;
  const phone = this.phone.value;
  const email = this.email.value;
  const category = this.category.value;
  const location = this.location.value;
  const timestamp = new Date().toLocaleString();

  // Save to local storage
  let history = JSON.parse(localStorage.getItem('formHistory')) || [];
  const newEntry = {
    name, phone, email, category, location, timestamp,
    status: 'pending'
  };
  history.push(newEntry);
  localStorage.setItem('formHistory', JSON.stringify(history));

  // Send Telegram notification
  const message = `📢 নতুন ফর্ম জমা:\n👤 নাম: ${name}\n📞 মোবাইল: ${phone}\n📧 ইমেইল: ${email || 'N/A'}\n📚 শ্রেণী: ${category}\n📍 স্থান: ${location}\n⏱ সময়: ${timestamp}`;

  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
  .then(() => {
    alert("✅ ফর্ম সাবমিট হয়েছে!");
    this.reset();
    window.location.href = 'history.html';
  })
  .catch(error => {
    console.error('Error:', error);
    alert("❌ ত্রুটি হয়েছে!");
  });
});
