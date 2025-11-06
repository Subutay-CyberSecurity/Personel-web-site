// Mobil menü açma/kapama - display: none/inline-block ile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  
  // display property ile göster/gizle
  if (nav.style.display === 'block') {
    nav.style.display = 'none';
  } else {
    nav.style.display = 'block';
  }
});

// Tüm menü bağlantılarını seç
const navLinks = document.querySelectorAll('nav a');

// Her bir menü bağlantısına tıklama olayı ekle
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // Menü açıkken bir bağlantıya tıklanırsa menüyü kapat
    menuToggle.classList.remove('active');
    nav.style.display = 'none';
  });
});

// Menü dışına tıklanınca menüyü kapat
document.addEventListener('click', (event) => {
  const isClickInsideNav = nav.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);
  
  if (!isClickInsideNav && !isClickOnToggle && nav.style.display === 'block') {
    menuToggle.classList.remove('active');
    nav.style.display = 'none';
  }
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