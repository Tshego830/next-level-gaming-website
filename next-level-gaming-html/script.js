const params = new URLSearchParams(location.search);
const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => {
 const open = document.querySelector('.navigation').classList.toggle('is-open');
 menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
 menu.setAttribute('aria-expanded', String(open));
});
const filters = [...document.querySelectorAll('.filter-tabs button')];
filters.forEach((button, index) => button.addEventListener('click', () => {
 filters.forEach((b, i) => { b.classList.toggle('is-active', i === index); b.setAttribute('aria-pressed', String(i === index)); });
 const section = document.querySelector('.filter-tabs').parentElement;
 const grids = section.querySelectorAll('.offerings-grid');
 grids[0].hidden = index === 2;
 grids[0].previousElementSibling.hidden = index === 2;
 grids[1].hidden = index === 1;
 grids[1].previousElementSibling.hidden = index === 1;
 grids[1].previousElementSibling.previousElementSibling.hidden = index === 1;
}));
if (filters.length) filters[0].classList.add('is-active');
const boxes = [...document.querySelectorAll('.selection-row input')];
function updateQuote() {
 const chosen = offerings.filter((o, i) => boxes[i].checked);
 const subtotal = chosen.reduce((sum, o) => sum + o.price, 0);
 const rate = discountRate(chosen.length);
 boxes.forEach(box => box.closest('label').classList.toggle('selected', box.checked));
 document.querySelector('.quote-header p').textContent = `${chosen.length} ${chosen.length === 1 ? 'booking' : 'bookings'} selected`;
 const body = document.querySelector('.quote-body');
 body.innerHTML = `${chosen.length ? chosen.map(o => `<div class="quote-line"><span>${o.name}</span><strong>${money(o.price)}</strong></div>`).join('') : '<p class="empty-quote">Your next level is waiting.</p>'}<div class="quote-line subtotal"><span>Subtotal</span><strong>${money(subtotal)}</strong></div><span class="eyebrow">YOUR DISCOUNT TIER</span><div class="quote-tiers">${[0,5,10,15].map((r,i) => `<div class="${rate*100 === r ? 'current' : ''}"><strong>${r}%</strong><span>${i === 3 ? '4+' : i+1} ${i === 0 ? 'booking' : 'bookings'}</span></div>`).join('')}</div><div class="quote-line"><span>Discount (${rate*100}%)</span><strong>−${money(subtotal*rate)}</strong></div><div class="quote-line quote-total"><span>Total</span><strong>${money(subtotal*(1-rate))}</strong></div><a class="export-button ${chosen.length ? '' : 'disabled-link'}" aria-disabled="${!chosen.length}" href="contact.html?${new URLSearchParams({quote:chosen.map(o=>o.name).join(', '),total:String(subtotal*(1-rate))})}">Proceed to booking ↗</a>`;
}
if (boxes.length) {
 boxes.forEach((box,i) => { box.checked = offerings[i].id === params.get('selected'); box.addEventListener('change', updateQuote); });
 updateQuote();
}
const form = document.querySelector('main form');
if (form) {
 const quote = params.get('quote');
 if (quote) { form.elements.booking.value = 'Custom quotation'; form.elements.message.value = `I'd like to book: ${quote}.\nQuoted total: ${money(Number(params.get('total') || 0))}.`; }
 form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nBooking: ${data.get('booking')}\nPreferred date: ${data.get('date')}\n\n${data.get('message')}`;
  location.href = `mailto:info@nextlevelgaming.co.za?subject=${encodeURIComponent('Next Level Gaming booking inquiry')}&body=${encodeURIComponent(body)}`;
  let status = form.querySelector('.form-status');
  if (!status) { status = document.createElement('p'); status.className = 'form-status'; status.setAttribute('role','status'); form.append(status); }
  status.textContent = 'Your inquiry is ready in your email app. Send it there to contact the arena; your booking is not yet confirmed.';
 });
}
