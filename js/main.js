// Mobil menü açma/kapama
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Tüm menü bağlantılarını seç
const navLinks = document.querySelectorAll('nav a');

// Her bir menü bağlantısına tıklama olayı ekle
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Menü açıkken bir bağlantıya tıklanırsa menüyü kapat
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Form gönderimi
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mesajınız için teşekkürler! En kısa sürede size geri dönüş yapacağım.');
    this.reset();
  });
}