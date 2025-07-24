// Language switching functionality
let currentLanguage = 'de';

// Flavor data for modal
const flavorData = {
  strawberry: {
    de: {
      name: 'Erdbeere',
      description: 'Unser beliebtes Erdbeereis wird aus frischen, sonnengereiften Erdbeeren hergestellt. Die natürliche Süße und das intensive Aroma machen es zu einem echten Sommerfavoriten.',
      allergens: 'Enthält: Milch, Eier'
    },
    en: {
      name: 'Strawberry',
      description: 'Our popular strawberry ice cream is made from fresh, sun-ripened strawberries. The natural sweetness and intense aroma make it a true summer favorite.',
      allergens: 'Contains: Milk, Eggs'
    },
    image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  chocolate: {
    de: {
      name: 'Schokolade',
      description: 'Reichhaltiges Schokoladeneis aus feinster belgischer Schokolade. Cremig, intensiv und unwiderstehlich für alle Schokoladenliebhaber.',
      allergens: 'Enthält: Milch, Eier, kann Spuren von Nüssen enthalten'
    },
    en: {
      name: 'Chocolate',
      description: 'Rich chocolate ice cream made from finest Belgian chocolate. Creamy, intense and irresistible for all chocolate lovers.',
      allergens: 'Contains: Milk, Eggs, may contain traces of nuts'
    },
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  vanilla: {
    de: {
      name: 'Vanille',
      description: 'Klassisches Vanilleeis mit echter Bourbon-Vanille. Cremig, elegant und zeitlos - die perfekte Basis für viele Desserts.',
      allergens: 'Enthält: Milch, Eier'
    },
    en: {
      name: 'Vanilla',
      description: 'Classic vanilla ice cream with real Bourbon vanilla. Creamy, elegant and timeless - the perfect base for many desserts.',
      allergens: 'Contains: Milk, Eggs'
    },
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  pistachio: {
    de: {
      name: 'Pistazie',
      description: 'Exquisites Pistazieneis aus sizilianischen Pistazien. Nussig, aromatisch und mit der charakteristischen grünen Farbe.',
      allergens: 'Enthält: Milch, Eier, Pistazien'
    },
    en: {
      name: 'Pistachio',
      description: 'Exquisite pistachio ice cream made from Sicilian pistachios. Nutty, aromatic and with the characteristic green color.',
      allergens: 'Contains: Milk, Eggs, Pistachios'
    },
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  mango: {
    de: {
      name: 'Mango',
      description: 'Tropisches Mangoeis aus reifen, süßen Mangos. Fruchtig, erfrischend und wie ein Urlaub im Glas.',
      allergens: 'Enthält: Milch, Eier'
    },
    en: {
      name: 'Mango',
      description: 'Tropical mango ice cream made from ripe, sweet mangoes. Fruity, refreshing and like a vacation in a glass.',
      allergens: 'Contains: Milk, Eggs'
    },
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  },
  mint: {
    de: {
      name: 'Minze-Schokolade',
      description: 'Erfrischende Minze trifft auf dunkle Schokoladenstückchen. Eine perfekte Kombination aus Frische und Süße.',
      allergens: 'Enthält: Milch, Eier, kann Spuren von Nüssen enthalten'
    },
    en: {
      name: 'Mint Chocolate Chip',
      description: 'Refreshing mint meets dark chocolate chips. A perfect combination of freshness and sweetness.',
      allergens: 'Contains: Milk, Eggs, may contain traces of nuts'
    },
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  }
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Set up language toggle
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
  });

  // Set up mobile menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Set up contact form
  const contactForm = document.querySelector('form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Load saved language preference
  const savedLanguage = localStorage.getItem('eisdebona-language') || 'de';
  switchLanguage(savedLanguage);
});

// Language switching function
function switchLanguage(lang) {
  currentLanguage = lang;
  
  // Update language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update all translatable elements
  document.querySelectorAll('[data-de][data-en]').forEach(element => {
    const text = element.getAttribute(`data-${lang}`);
    if (text) {
      element.textContent = text;
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update page title
  const titles = {
    de: {
      'index.html': 'EisdeBona - Handgemachtes Eis in Deutschland',
      'catalog.html': 'Unser Sortiment - EisdeBona',
      'merchandise.html': 'Merchandise - EisdeBona',
      'contact.html': 'Kontakt - EisdeBona'
    },
    en: {
      'index.html': 'EisdeBona - Handcrafted Ice Cream in Germany',
      'catalog.html': 'Our Flavors - EisdeBona',
      'merchandise.html': 'Merchandise - EisdeBona',
      'contact.html': 'Contact - EisdeBona'
    }
  };

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (titles[lang] && titles[lang][currentPage]) {
    document.title = titles[lang][currentPage];
  }

  // Save language preference
  localStorage.setItem('eisdebona-language', lang);
}

// Modal functions
function openModal(flavorId) {
  const modal = document.getElementById('flavorModal');
  const modalBody = document.getElementById('modalBody');
  const flavor = flavorData[flavorId];
  
  if (!flavor || !modal || !modalBody) return;

  const flavorInfo = flavor[currentLanguage];
  
  modalBody.innerHTML = `
    <img src="${flavor.image}" alt="${flavorInfo.name}" class="modal-flavor-image">
    <h2>${flavorInfo.name}</h2>
    <p>${flavorInfo.description}</p>
    <div class="allergen-info">
      <h4>${currentLanguage === 'de' ? 'Allergene:' : 'Allergens:'}</h4>
      <p>${flavorInfo.allergens}</p>
    </div>
  `;
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('flavorModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  const modal = document.getElementById('flavorModal');
  if (event.target === modal) {
    closeModal();
  }
});

// Handle contact form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Simulate form submission
  const submitButton = event.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  submitButton.textContent = currentLanguage === 'de' ? 'Wird gesendet...' : 'Sending...';
  submitButton.disabled = true;
  
  setTimeout(() => {
    alert(currentLanguage === 'de' 
      ? 'Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.' 
      : 'Thank you for your message! We will get back to you soon.');
    
    event.target.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
  }
});
