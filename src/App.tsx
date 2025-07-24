import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState('de');
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('eisdebona-language') || 'de';
    setCurrentLanguage(savedLanguage);
  }, []);

  const switchLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('eisdebona-language', lang);
  };

  const getText = (deText: string, enText: string) => {
    return currentLanguage === 'de' ? deText : enText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h2 className="text-2xl font-bold text-pink-500 cursor-pointer" onClick={() => setCurrentPage('home')}>
              EisdeBona
            </h2>
            <div className="hidden md:flex gap-6">
              <button 
                onClick={() => setCurrentPage('home')} 
                className={`font-medium transition-colors ${currentPage === 'home' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
              >
                {getText('Startseite', 'Home')}
              </button>
              <button 
                onClick={() => setCurrentPage('catalog')} 
                className={`font-medium transition-colors ${currentPage === 'catalog' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
              >
                {getText('Unser Sortiment', 'Flavors')}
              </button>
              <button 
                onClick={() => setCurrentPage('merchandise')} 
                className={`font-medium transition-colors ${currentPage === 'merchandise' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
              >
                {getText('Merchandise', 'Merchandise')}
              </button>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className={`font-medium transition-colors ${currentPage === 'contact' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
              >
                {getText('Kontakt', 'Contact')}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => switchLanguage('de')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentLanguage === 'de' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                DE
              </button>
              <button 
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${currentLanguage === 'en' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                EN
              </button>
            </div>
            <Authenticated>
              <SignOutButton />
            </Authenticated>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <Authenticated>
          <EisdeBonaContent currentPage={currentPage} setCurrentPage={setCurrentPage} getText={getText} />
        </Authenticated>
        <Unauthenticated>
          <div className="min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-pink-500 mb-4">EisdeBona</h1>
                <p className="text-xl text-gray-600">
                  {getText('Melde dich an, um unsere Eisdiele zu erkunden', 'Sign in to explore our ice cream shop')}
                </p>
              </div>
              <SignInForm />
            </div>
          </div>
        </Unauthenticated>
      </main>
      <Toaster />
    </div>
  );
}

function EisdeBonaContent({ currentPage, setCurrentPage, getText }: { 
  currentPage: string; 
  setCurrentPage: (page: string) => void; 
  getText: (de: string, en: string) => string;
}) {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  const flavorData = {
    strawberry: {
      name: getText('Erdbeere', 'Strawberry'),
      description: getText(
        'Unser beliebtes Erdbeereis wird aus frischen, sonnengereiften Erdbeeren hergestellt. Die natürliche Süße und das intensive Aroma machen es zu einem echten Sommerfavoriten.',
        'Our popular strawberry ice cream is made from fresh, sun-ripened strawberries. The natural sweetness and intense aroma make it a true summer favorite.'
      ),
      allergens: getText('Enthält: Milch, Eier', 'Contains: Milk, Eggs'),
      image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    chocolate: {
      name: getText('Schokolade', 'Chocolate'),
      description: getText(
        'Reichhaltiges Schokoladeneis aus feinster belgischer Schokolade. Cremig, intensiv und unwiderstehlich für alle Schokoladenliebhaber.',
        'Rich chocolate ice cream made from finest Belgian chocolate. Creamy, intense and irresistible for all chocolate lovers.'
      ),
      allergens: getText('Enthält: Milch, Eier, kann Spuren von Nüssen enthalten', 'Contains: Milk, Eggs, may contain traces of nuts'),
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    vanilla: {
      name: getText('Vanille', 'Vanilla'),
      description: getText(
        'Klassisches Vanilleeis mit echter Bourbon-Vanille. Cremig, elegant und zeitlos - die perfekte Basis für viele Desserts.',
        'Classic vanilla ice cream with real Bourbon vanilla. Creamy, elegant and timeless - the perfect base for many desserts.'
      ),
      allergens: getText('Enthält: Milch, Eier', 'Contains: Milk, Eggs'),
      image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    pistachio: {
      name: getText('Pistazie', 'Pistachio'),
      description: getText(
        'Exquisites Pistazieneis aus sizilianischen Pistazien. Nussig, aromatisch und mit der charakteristischen grünen Farbe.',
        'Exquisite pistachio ice cream made from Sicilian pistachios. Nutty, aromatic and with the characteristic green color.'
      ),
      allergens: getText('Enthält: Milch, Eier, Pistazien', 'Contains: Milk, Eggs, Pistachios'),
      image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    mango: {
      name: getText('Mango', 'Mango'),
      description: getText(
        'Tropisches Mangoeis aus reifen, süßen Mangos. Fruchtig, erfrischend und wie ein Urlaub im Glas.',
        'Tropical mango ice cream made from ripe, sweet mangoes. Fruity, refreshing and like a vacation in a glass.'
      ),
      allergens: getText('Enthält: Milch, Eier', 'Contains: Milk, Eggs'),
      image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    mint: {
      name: getText('Minze-Schokolade', 'Mint Chocolate Chip'),
      description: getText(
        'Erfrischende Minze trifft auf dunkle Schokoladenstückchen. Eine perfekte Kombination aus Frische und Süße.',
        'Refreshing mint meets dark chocolate chips. A perfect combination of freshness and sweetness.'
      ),
      allergens: getText('Enthält: Milch, Eier, kann Spuren von Nüssen enthalten', 'Contains: Milk, Eggs, may contain traces of nuts'),
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  };

  if (currentPage === 'home') {
    return (
      <div>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center bg-gradient-to-br from-pink-50 to-blue-50 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {getText('EisdeBona – Handgemachtes Eis in Deutschland', 'EisdeBona – Handcrafted Ice Cream in Germany')}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {getText('Entdecke unsere beliebten Sorten – von fruchtig bis schokoladig!', 'Discover our popular flavors – from fruity to chocolatey!')}
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setCurrentPage('catalog')}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  {getText('Unser Sortiment', 'View Flavors')}
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  {getText('Besuche uns', 'Visit Us')}
                </button>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Delicious ice cream" 
                className="rounded-3xl shadow-2xl max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Discount Banner */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-400 py-8">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {getText('🍦 Sommeraktion: 10% Rabatt auf alle Sorten!', '🍦 Summer Special: 10% off all flavors!')}
            </h3>
            <p className="text-gray-800">
              {getText('Gültig bis Ende August', 'Valid until end of August')}
            </p>
          </div>
        </section>

        {/* Featured Flavors */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              {getText('Unsere beliebtesten Sorten', 'Our Most Popular Flavors')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {Object.entries(flavorData).slice(0, 3).map(([key, flavor]) => (
                <div key={key} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50">
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{flavor.name}</h3>
                    <p className="text-gray-600">{flavor.description.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button 
                onClick={() => setCurrentPage('catalog')}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                {getText('Alle Sorten entdecken', 'Discover All Flavors')}
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {getText('Handgemacht mit Liebe', 'Handcrafted with Love')}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {getText(
                    'Seit über 20 Jahren stellen wir in unserer Manufaktur täglich frisches Eis her. Nur die besten Zutaten und traditionelle Rezepte kommen bei uns zum Einsatz.',
                    'For over 20 years, we have been making fresh ice cream daily in our manufactory. We only use the finest ingredients and traditional recipes.'
                  )}
                </p>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white text-pink-500 border-2 border-pink-500 px-8 py-4 rounded-full font-semibold hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  {getText('Besuche unsere Eisdiele', 'Visit Our Ice Cream Shop')}
                </button>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Ice cream making process"
                  className="rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-pink-400 mb-4">EisdeBona</h3>
                <p className="text-gray-300">
                  {getText('Handgemachtes Eis seit 2003', 'Handcrafted ice cream since 2003')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-4">
                  {getText('Kontakt', 'Contact')}
                </h4>
                <p className="text-gray-300">Musterstraße 123<br/>12345 Berlin</p>
                <p className="text-gray-300">Tel: +49 30 12345678</p>
                <p className="text-gray-300">info@eisdebona.de</p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-4">
                  {getText('Öffnungszeiten', 'Opening Hours')}
                </h4>
                <p className="text-gray-300">
                  {getText('Mo-So: 10:00 - 22:00', 'Mon-Sun: 10:00 - 22:00')}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-pink-400 mb-4">
                  {getText('Folge uns', 'Follow Us')}
                </h4>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">📘</a>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">📷</a>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">🐦</a>
                </div>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-gray-700">
              <p className="text-gray-300">
                &copy; 2024 EisdeBona. {getText('Alle Rechte vorbehalten.', 'All rights reserved.')}
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  if (currentPage === 'catalog') {
    return (
      <div>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {getText('Unser Sortiment', 'Our Flavors')}
            </h1>
            <p className="text-xl text-gray-600">
              {getText('Entdecke unsere handgemachten Eissorten – täglich frisch zubereitet', 'Discover our handcrafted ice cream flavors – freshly made daily')}
            </p>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(flavorData).map(([key, flavor]) => (
                <div 
                  key={key} 
                  className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedFlavor(key)}
                >
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50">
                    <img 
                      src={flavor.image} 
                      alt={flavor.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{flavor.name}</h3>
                    <p className="text-gray-600">{flavor.description.substring(0, 100)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal */}
        {selectedFlavor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button 
                onClick={() => setSelectedFlavor(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold z-10"
              >
                ×
              </button>
              <div className="p-8">
                <img 
                  src={flavorData[selectedFlavor as keyof typeof flavorData].image} 
                  alt={flavorData[selectedFlavor as keyof typeof flavorData].name}
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {flavorData[selectedFlavor as keyof typeof flavorData].name}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {flavorData[selectedFlavor as keyof typeof flavorData].description}
                </p>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {getText('Allergene:', 'Allergens:')}
                  </h4>
                  <p className="text-gray-600">
                    {flavorData[selectedFlavor as keyof typeof flavorData].allergens}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (currentPage === 'merchandise') {
    const merchandiseItems = [
      {
        name: getText('EisdeBona T-Shirt', 'EisdeBona T-Shirt'),
        description: getText(
          'Hochwertiges Bio-Baumwoll-Shirt mit unserem Logo. Verfügbar in verschiedenen Farben und Größen.',
          'High-quality organic cotton shirt with our logo. Available in various colors and sizes.'
        ),
        price: '€19.99',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: getText('EisdeBona Tasse', 'EisdeBona Mug'),
        description: getText(
          'Keramiktasse mit unserem charakteristischen Design. Perfekt für deinen Morgenkaffee.',
          'Ceramic mug with our distinctive design. Perfect for your morning coffee.'
        ),
        price: '€12.99',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: getText('EisdeBona Stofftasche', 'EisdeBona Tote Bag'),
        description: getText(
          'Nachhaltige Baumwolltasche für deinen Einkauf. Umweltfreundlich und stylisch.',
          'Sustainable cotton bag for your shopping. Eco-friendly and stylish.'
        ),
        price: '€8.99',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: getText('EisdeBona Kappe', 'EisdeBona Cap'),
        description: getText(
          'Stylische Baseballkappe mit gesticktem Logo. Schützt vor Sonne beim Eisgenuss.',
          'Stylish baseball cap with embroidered logo. Protects from sun while enjoying ice cream.'
        ),
        price: '€15.99',
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: getText('EisdeBona Sticker-Set', 'EisdeBona Sticker Pack'),
        description: getText(
          'Bunte Sticker mit verschiedenen Eismotiven. Perfekt für Laptop, Handy oder Notizbuch.',
          'Colorful stickers with various ice cream motifs. Perfect for laptop, phone or notebook.'
        ),
        price: '€4.99',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: getText('EisdeBona Hoodie', 'EisdeBona Hoodie'),
        description: getText(
          'Kuscheliger Hoodie für kältere Tage. Mit großem Logo-Print auf der Vorderseite.',
          'Cozy hoodie for colder days. With large logo print on the front.'
        ),
        price: '€39.99',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ];

    return (
      <div>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {getText('Merchandise', 'Merchandise')}
            </h1>
            <p className="text-xl text-gray-600">
              {getText('Zeige deine Liebe zu EisdeBona mit unseren exklusiven Produkten', 'Show your love for EisdeBona with our exclusive products')}
            </p>
          </div>
        </section>

        {/* Merchandise Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {merchandiseItems.map((item, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                  <div className="h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-blue-50">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="text-xl font-bold text-pink-500">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
              <p className="text-lg text-gray-600 mb-6">
                {getText(
                  'Alle Merchandise-Artikel sind in unserem Laden erhältlich. Für Bestellungen kontaktiere uns gerne!',
                  'All merchandise items are available in our store. For orders, please contact us!'
                )}
              </p>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-pink-600 hover:to-pink-700 transition-all transform hover:-translate-y-1 shadow-lg"
              >
                {getText('Kontaktiere uns', 'Contact Us')}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (currentPage === 'contact') {
    return (
      <div>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-pink-50 to-blue-50 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {getText('Kontakt', 'Contact')}
            </h1>
            <p className="text-xl text-gray-600">
              {getText('Besuche uns in unserer Eisdiele oder kontaktiere uns', 'Visit us at our ice cream shop or contact us')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getText('📍 Adresse', '📍 Address')}
                    </h3>
                    <p className="text-gray-600">
                      EisdeBona<br/>
                      Musterstraße 123<br/>
                      12345 Berlin<br/>
                      Deutschland
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getText('📞 Telefon', '📞 Phone')}
                    </h3>
                    <p className="text-gray-600">+49 30 12345678</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getText('✉️ E-Mail', '✉️ Email')}
                    </h3>
                    <p className="text-gray-600">info@eisdebona.de</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getText('🕒 Öffnungszeiten', '🕒 Opening Hours')}
                    </h3>
                    <p className="text-gray-600">
                      {getText('Montag - Sonntag', 'Monday - Sunday')}<br/>
                      {getText('10:00 - 22:00 Uhr', '10:00 AM - 10:00 PM')}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {getText('📱 Social Media', '📱 Social Media')}
                    </h3>
                    <div className="flex gap-4">
                      <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">📘 Facebook</a>
                      <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">📷 Instagram</a>
                      <a href="#" className="text-gray-600 hover:text-pink-500 transition-colors">🐦 Twitter</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {getText('Schreibe uns eine Nachricht', 'Send us a message')}
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {getText('Name', 'Name')}
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {getText('E-Mail', 'Email')}
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {getText('Betreff', 'Subject')}
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                      required 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {getText('Nachricht', 'Message')}
                    </label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 transition-all transform hover:-translate-y-1 shadow-lg"
                  >
                    {getText('Nachricht senden', 'Send Message')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {getText('Finde uns', 'Find Us')}
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4092748929716!2d13.404953976707!3d52.52000697206508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c655f20989%3A0x26bbfb4e84674c63!2sBrandenburger%20Tor!5e0!3m2!1sde!2sde!4v1703123456789!5m2!1sde!2sde" 
                width="100%" 
                height="400" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
}
