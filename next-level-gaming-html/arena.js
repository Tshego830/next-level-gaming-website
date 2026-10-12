const offerings = [
  { id: 'ultimate', name: 'Ultimate Gamer Pass', category: 'package', price: 1500, tag: 'THE ALL-ACCESS PASS', features: ['4 hours unlimited gaming', 'All PC titles included', '2 energy drinks', 'Priority seating', 'Locker storage'] },
  { id: 'vip', name: 'VIP Gaming Experience', category: 'package', price: 1500, tag: 'PLAY LIKE A VIP', features: ['6 hours gaming time', 'VIP lounge access', '4 beverages', 'Dedicated host', 'Reserved premium rig'] },
  { id: 'training', name: 'Esports Training Package', category: 'package', price: 1500, tag: 'LEVEL UP YOUR SKILLS', features: ['3 hours coached play', 'VOD review session', 'Stats report', 'One-on-one coaching', 'Practice drill sets'] },
  { id: 'birthday', name: 'Birthday Party Package', category: 'package', price: 1500, tag: 'BRING YOUR SQUAD', features: ['3 hours private room', '10 player slots', 'Catering included', 'Branded setup', 'Photo booth access'] },
  { id: 'vr', name: 'Virtual Reality Experience', category: 'experience', price: 750, tag: 'ENTER ANOTHER WORLD', features: ['VR headset & controllers', 'Choice of 20+ games', 'Staff assistance', '45-minute session'] },
  { id: 'racing', name: 'Racing Simulator Challenge', category: 'experience', price: 750, tag: 'CHASE THE PODIUM', features: ['Force-feedback wheel', 'GT or F1 car selection', '5-lap competitive session', 'Lap time certificate'] },
  { id: 'escape', name: 'Escape Room Challenge', category: 'experience', price: 750, tag: 'CRACK THE CODE', features: ['60-minute room access', 'Teams of 2–6 players', '3 themed rooms', 'Completion certificate'] },
];

const money = value => "R" + value.toLocaleString("en-ZA", {minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2}).replace(/\s/g, ",");
const discountRate = count => count >= 4 ? .15 : count === 3 ? .10 : count === 2 ? .05 : 0;
