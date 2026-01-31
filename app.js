const form = document.getElementById('waitlistForm');
const emailInput = document.getElementById('email');
const statusEl = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// This version keeps emails in the browser only (localStorage).
// If you want REAL saving (database), tell me and I’ll add Vercel Storage KV in 2 files.
function saveLocal(email) {
  const key = "oxpay_waitlist_emails";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  if (list.includes(email)) return { ok: true, message: "You’re already on the list." };
  list.unshift(email);
  localStorage.setItem(key, JSON.stringify(list));
  return { ok: true, message: "You’re in. Welcome to OxPay." };
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = (emailInput.value || '').trim().toLowerCase();
  statusEl.textContent = "";

  if (!isValidEmail(email)) {
    statusEl.style.color = "#fecaca";
    statusEl.textContent = "Please enter a valid email.";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Joining…";

  try {
    // Local save (simple). Replace later with real storage.
    const res = saveLocal(email);

    statusEl.style.color = "#a7f3d0";
    statusEl.textContent = res.message;
    emailInput.value = "";
  } catch (err) {
    statusEl.style.color = "#fecaca";
    statusEl.textContent = "Something went wrong. Try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Join Waitlist";
  }
});
