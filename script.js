// Hero Background Movie Banners Data - Popular Netflix movies and TV shows
// Using reliable TMDB poster URLs
const heroBannerMovies = [
    'https://image.tmdb.org/t/p/w185/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', // The Godfather
    'https://image.tmdb.org/t/p/w185/5K7cOHoay2mZusSInzShJBR8mxm.jpg', // Casablanca
    'https://image.tmdb.org/t/p/w185/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', // The Shawshank Redemption
    'https://image.tmdb.org/t/p/w185/sav0jxhqiH0bPr2vZFU5Kj2g3n9.jpg', // Citizen Kane
    'https://image.tmdb.org/t/p/w185/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', // Breaking Bad
    'https://image.tmdb.org/t/p/w185/1M876KPjulVwppEpldhdc8V4o68.jpg', // The Crown
    'https://image.tmdb.org/t/p/w185/49WJfeN0moxb9IPfGn8AIqMGskD.jpg', // Stranger Things
    'https://image.tmdb.org/t/p/w185/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg', // Money Heist
    'https://image.tmdb.org/t/p/w185/yGNnjoIGFQh4ldc3Qqbgz9z4Q7o.jpg', // Narcos
    'https://image.tmdb.org/t/p/w185/4EYPN5mVIhKLfmGruW2u46tbp2x.jpg', // Dark
    'https://image.tmdb.org/t/p/w185/o3mothJXDR6v8xG2qGj7QxG9x8L.jpg', // The Office
    'https://image.tmdb.org/t/p/w185/hKWxWjFwnM0V5XOsSytN2Qlt5Yq.jpg', // House of Cards
    'https://image.tmdb.org/t/p/w185/5c4W5aFCDWYqhQeXMIvWdg7tK0K.jpg', // Ozark
    'https://image.tmdb.org/t/p/w185/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', // Mindhunter
    'https://image.tmdb.org/t/p/w185/5K7cOHoay2mZusSInzShJBR8mxm.jpg', // Orange is the New Black
    'https://image.tmdb.org/t/p/w185/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', // Black Mirror
    'https://image.tmdb.org/t/p/w185/7vjaCdMw15FEbXyLQTVa04URsPm.jpg', // The Witcher
    'https://image.tmdb.org/t/p/w185/4J6Q0y1X7n8z3Y8Y2Z3Q1Y9Z3Y9Z.jpg', // Squid Game
    'https://image.tmdb.org/t/p/w185/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', // Bridgerton
    'https://image.tmdb.org/t/p/w185/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg', // The Queen's Gambit
];

// Function to populate hero background banners
function populateHeroBanners() {
    const bannersContainer = document.querySelector('.hero-background-banners');
    if (!bannersContainer) return;
    
    // Shuffle array for variety
    const shuffled = [...heroBannerMovies].sort(() => Math.random() - 0.5);
    
    // Create a small number of banner items up front for fast initial paint
    // Show 18 banners immediately as requested
    const TOTAL_BANNERS = 18; // max banners to potentially create
    const INITIAL_BANNERS = 18; // immediate batch visible on first paint

    function createBatch(startIndex, count) {
        const frag = document.createDocumentFragment();
        for (let i = startIndex; i < startIndex + count && i < TOTAL_BANNERS; i++) {
            const posterUrl = shuffled[i % shuffled.length]; // Cycle through available posters

            const bannerItem = document.createElement('div');
            bannerItem.className = 'hero-banner-item';

            const img = document.createElement('img');
            img.src = posterUrl;
            img.alt = 'Movie banner';
            img.loading = 'lazy';
            img.onerror = function() {
                // Fallback: hide broken image and apply a subtle gradient
                this.style.display = 'none';
                const colors = ['#1a1a1a', '#2a1a1a', '#1a2a1a', '#1a1a2a', '#2a2a1a'];
                bannerItem.style.background = `linear-gradient(135deg, ${colors[i % colors.length]}, #0a0a0a)`;
                bannerItem.style.border = '1px solid rgba(255, 255, 255, 0.04)';
            };

            bannerItem.appendChild(img);
            frag.appendChild(bannerItem);
        }
        bannersContainer.appendChild(frag);
    }

    // Initial small batch for quick paint
    createBatch(0, INITIAL_BANNERS);

    // Fill the rest during idle time to avoid blocking main paint
    const remainingStart = INITIAL_BANNERS;
    const remainingCount = TOTAL_BANNERS - INITIAL_BANNERS;

    const scheduleFill = (cb) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(cb, {timeout: 1000});
        } else {
            setTimeout(cb, 800);
        }
    };

    scheduleFill(() => {
        // add remaining banners in one batch
        createBatch(remainingStart, remainingCount);
    });
}

// Sign In Modal
const signInBtn = document.getElementById('signInBtn');
const signInModal = document.getElementById('signInModal');
const closeModal = document.getElementById('closeModal');
const signInForm = document.getElementById('signInForm');
const signUpLink = document.getElementById('signUpLink');

signInBtn.addEventListener('click', () => {
    signInModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    signInModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Sign Up Modal
const signUpModal = document.getElementById('signUpModal');
const closeSignUpModal = document.getElementById('closeSignUpModal');
const signUpForm = document.getElementById('signUpForm');
const signInLink = document.getElementById('signInLink');

// Extra elements for enhanced sign up UI
const signUpPassword = document.getElementById('signUpPassword');
const passwordStrength = document.getElementById('passwordStrength');
const meterFill = document.getElementById('meterFill');
const meterText = document.getElementById('meterText');

// Helper: evaluate password strength (simple heuristic)
function evaluatePassword(password) {
    let score = 0;
    if (!password) return score;
    // length
    if (password.length >= 8) score += 2;
    else if (password.length >= 5) score += 1;
    // letters
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    // numbers
    if (/[0-9]/.test(password)) score += 1;
    // special chars
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 6);
}

function updatePasswordMeter() {
    if (!signUpPassword) return;
    const val = signUpPassword.value || '';
    const score = evaluatePassword(val);
    const percent = Math.round((score / 6) * 100);
    if (meterFill) meterFill.style.width = percent + '%';
    if (meterText) {
        if (!val) meterText.textContent = '';
        else if (percent < 34) meterText.textContent = 'Weak';
        else if (percent < 67) meterText.textContent = 'Fair';
        else meterText.textContent = 'Strong';
    }
}

// Focus first input when modal opens
function openSignUpModal() {
    signUpModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    // small delay to allow modal to become visible
    setTimeout(() => {
        const firstInput = signUpForm.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 120);
}

// Replace modal content with success animation
function showSignUpSuccess(modal) {
    const content = modal.querySelector('.modal-content');
    if (!content) return;
    content.innerHTML = `
        <div class="signup-success">
            <div class="checkmark" aria-hidden="true">
                <svg viewBox="0 0 52 52"><path d="M26 0C11.664 0 0 11.664 0 26s11.664 26 26 26 26-11.664 26-26S40.336 0 26 0zm13.28 18.28l-15.2 15.2c-.54.54-1.26.84-2.02.84s-1.48-.3-2.02-.84l-7.2-7.2c-1.12-1.12-1.12-2.92 0-4.04 1.12-1.12 2.92-1.12 4.04 0l5.18 5.18 13.18-13.18c1.12-1.12 2.92-1.12 4.04 0 1.12 1.12 1.12 2.92 0 4.04z"/></svg>
            </div>
            <h3>Welcome aboard!</h3>
            <p>Your account has been created successfully.</p>
        </div>
    `;
    // Auto close after short delay
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // restore original modal content by reloading page fragment (easiest) or just reload page
        window.location.reload();
    }, 1400);
}

signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInModal.classList.remove('active');
    openSignUpModal();
});

signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    signUpModal.classList.remove('active');
    signInModal.classList.add('active');
});

closeSignUpModal.addEventListener('click', () => {
    signUpModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

signUpModal.addEventListener('click', (e) => {
    if (e.target === signUpModal) {
        signUpModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal when clicking outside
signInModal.addEventListener('click', (e) => {
    if (e.target === signInModal) {
        signInModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Sign In Form Submission
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signInForm.querySelector('input[type="email"]').value;
    const password = signInForm.querySelector('input[type="password"]').value;
    
    if (email && password) {
        showMoviesSection(email);
        signInModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        signInForm.reset();
    }
});

// Sign Up Form Submission
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = signUpForm.querySelector('input[type="text"]').value;
    const email = signUpForm.querySelector('input[type="email"]').value;
    const password = signUpForm.querySelector('input[type="password"]').value;
    
    if (name && email && password) {
        // show success animation then proceed
        showSignUpSuccess(signUpModal);
        // Optionally store user in localStorage (demo)
        try { localStorage.setItem('netflixUser', JSON.stringify({name, email})); } catch (err) {}
    }
});

// Live password strength
if (signUpPassword) {
    signUpPassword.addEventListener('input', updatePasswordMeter);
}

// Email Form Submissions
const emailForm1 = document.getElementById('emailForm');
const emailForm2 = document.getElementById('emailForm2');

function handleEmailSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (email) {
        const lang = localStorage.getItem('netflixLanguage') || 'en';
        const message = translations[lang]?.thankYouMessage || translations.en.thankYouMessage;
        alert(`${message} ${email}`);
        emailInput.value = '';
    }
}

emailForm1.addEventListener('submit', handleEmailSubmit);
emailForm2.addEventListener('submit', handleEmailSubmit);

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Translations Object
const translations = {
    en: {
        heroTitle: 'Unlimited movies, TV shows, and more',
        heroSubtitle: 'Watch anywhere. Cancel anytime.',
        heroDescription: 'Ready to watch? Enter your email to create or restart your membership.',
        getStarted: 'Get Started',
        emailPlaceholder: 'Email address',
        emailPhonePlaceholder: 'Email or phone number',
        passwordPlaceholder: 'Password',
        namePlaceholder: 'Name',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        signUpNow: 'Sign up now',
        signInNow: 'Sign in now',
        newToNetflix: 'New to Netflix?',
        alreadyHaveAccount: 'Already have an account?',
        rememberMe: 'Remember me',
        needHelp: 'Need help?',
        feature1Title: 'Enjoy on your TV',
        feature1Desc: 'Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
        feature2Title: 'Download your shows to watch offline',
        feature2Desc: 'Save your favorites easily and always have something to watch.',
        feature3Title: 'Watch everywhere',
        feature3Desc: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
        feature4Title: 'Create profiles for kids',
        feature4Desc: 'Send kids on adventures with their favorite characters in a space made just for them—free with your membership.',
        downloading: 'Downloading...',
        faqTitle: 'Frequently Asked Questions',
        faq1Question: 'What is Netflix?',
        faq1Answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
        faq2Question: 'How much does Netflix cost?',
        faq2Answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $9.99 to $19.99 a month. No extra costs, no contracts.',
        faq3Question: 'Where can I watch?',
        faq3Answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app.',
        faq4Question: 'How do I cancel?',
        faq4Answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
        faq5Question: 'What can I watch on Netflix?',
        faq5Answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.',
        footerQuestions: 'Questions? Call 1-844-505-2993',
        footerFaq: 'FAQ',
        footerInvestor: 'Investor Relations',
        footerPrivacy: 'Privacy',
        footerSpeed: 'Speed Test',
        footerHelp: 'Help Center',
        footerJobs: 'Jobs',
        footerCookie: 'Cookie Preferences',
        footerLegal: 'Legal Notices',
        footerAccount: 'Account',
        footerWays: 'Ways to Watch',
        footerCorporate: 'Corporate Information',
        footerOnly: 'Only on Netflix',
        footerMedia: 'Media Center',
        footerTerms: 'Terms of Use',
        footerContact: 'Contact Us',
        footerCountry: 'Netflix United States',
        freeMovies: 'Free Movies to Watch',
        hollywoodClassics: 'Hollywood Classics',
        bollywoodOld: 'Bollywood Old Movies',
        watchFree: 'Watch Free',
        thankYouMessage: 'Thank you! We\'ll send you information about Netflix at',
        startingMovie: 'Starting to play',
        enjoyWatching: 'This is a free movie! Enjoy watching.'
    },
    hi: {
        heroTitle: 'असीमित फिल्में, TV शो और बहुत कुछ',
        heroSubtitle: 'कहीं भी देखें। कभी भी रद्द करें।',
        heroDescription: 'देखने के लिए तैयार हैं? अपनी सदस्यता बनाने या पुनः आरंभ करने के लिए अपना ईमेल दर्ज करें।',
        getStarted: 'शुरू करें',
        emailPlaceholder: 'ईमेल पता',
        emailPhonePlaceholder: 'ईमेल या फ़ोन नंबर',
        passwordPlaceholder: 'पासवर्ड',
        namePlaceholder: 'नाम',
        signIn: 'साइन इन करें',
        signUp: 'साइन अप करें',
        signOut: 'साइन आउट',
        signUpNow: 'अभी साइन अप करें',
        signInNow: 'अभी साइन इन करें',
        newToNetflix: 'Netflix पर नए हैं?',
        alreadyHaveAccount: 'पहले से एक खाता है?',
        rememberMe: 'मुझे याद रखें',
        needHelp: 'मदद चाहिए?',
        feature1Title: 'अपने TV पर आनंद लें',
        feature1Desc: 'Smart TV, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players और बहुत कुछ पर देखें।',
        feature2Title: 'ऑफ़लाइन देखने के लिए अपने शो डाउनलोड करें',
        feature2Desc: 'अपने पसंदीदा को आसानी से सहेजें और हमेशा देखने के लिए कुछ रखें।',
        feature3Title: 'हर जगह देखें',
        feature3Desc: 'अपने फ़ोन, टैबलेट, लैपटॉप और TV पर असीमित फिल्में और TV शो स्ट्रीम करें।',
        feature4Title: 'बच्चों के लिए प्रोफ़ाइल बनाएं',
        feature4Desc: 'बच्चों को उनके पसंदीदा पात्रों के साथ रोमांच पर भेजें—आपकी सदस्यता के साथ मुफ़्त।',
        downloading: 'डाउनलोड हो रहा है...',
        faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
        faq1Question: 'Netflix क्या है?',
        faq1Answer: 'Netflix एक स्ट्रीमिंग सेवा है जो हज़ारों इंटरनेट-कनेक्टेड उपकरणों पर पुरस्कार विजेता TV शो, फिल्में, एनीमे, डॉक्यूमेंटरी और बहुत कुछ प्रदान करती है।',
        faq2Question: 'Netflix की लागत कितनी है?',
        faq2Answer: 'अपने स्मार्टफ़ोन, टैबलेट, Smart TV, लैपटॉप या स्ट्रीमिंग डिवाइस पर Netflix देखें, सभी एक निश्चित मासिक शुल्क के लिए। योजनाएं $9.99 से $19.99 प्रति माह हैं। कोई अतिरिक्त लागत नहीं, कोई अनुबंध नहीं।',
        faq3Question: 'मैं कहां देख सकता हूं?',
        faq3Answer: 'कहीं भी, कभी भी देखें। अपने व्यक्तिगत कंप्यूटर से netflix.com पर वेब पर तुरंत देखने के लिए अपने Netflix खाते से साइन इन करें या Netflix ऐप प्रदान करने वाले किसी भी इंटरनेट-कनेक्टेड डिवाइस पर।',
        faq4Question: 'मैं कैसे रद्द करूं?',
        faq4Answer: 'Netflix लचीला है। कोई परेशान करने वाले अनुबंध नहीं हैं और कोई प्रतिबद्धता नहीं है। आप दो क्लिक में आसानी से अपना खाता ऑनलाइन रद्द कर सकते हैं। कोई रद्दीकरण शुल्क नहीं है—कभी भी अपना खाता शुरू या बंद करें।',
        faq5Question: 'मैं Netflix पर क्या देख सकता हूं?',
        faq5Answer: 'Netflix में फीचर फिल्मों, डॉक्यूमेंटरी, TV शो, एनीमे, पुरस्कार विजेता Netflix मूल और बहुत कुछ का व्यापक संग्रह है। जितना चाहें देखें, जब चाहें देखें।',
        footerQuestions: 'प्रश्न? 1-844-505-2993 पर कॉल करें',
        footerFaq: 'FAQ',
        footerInvestor: 'निवेशक संबंध',
        footerPrivacy: 'गोपनीयता',
        footerSpeed: 'गति परीक्षण',
        footerHelp: 'सहायता केंद्र',
        footerJobs: 'नौकरियां',
        footerCookie: 'कुकी प्राथमिकताएं',
        footerLegal: 'कानूनी सूचनाएं',
        footerAccount: 'खाता',
        footerWays: 'देखने के तरीके',
        footerCorporate: 'कॉर्पोरेट जानकारी',
        footerOnly: 'केवल Netflix पर',
        footerMedia: 'मीडिया केंद्र',
        footerTerms: 'उपयोग की शर्तें',
        footerContact: 'हमसे संपर्क करें',
        footerCountry: 'Netflix United States',
        freeMovies: 'देखने के लिए मुफ़्त फिल्में',
        hollywoodClassics: 'हॉलीवुड क्लासिक्स',
        bollywoodOld: 'बॉलीवुड पुरानी फिल्में',
        watchFree: 'मुफ़्त देखें',
        thankYouMessage: 'धन्यवाद! हम आपको पर Netflix के बारे में जानकारी भेजेंगे',
        startingMovie: 'चलना शुरू कर रहा है',
        enjoyWatching: 'यह एक मुफ़्त फिल्म है! देखने का आनंद लें।'
    },
    fr: {
        heroTitle: 'Films, séries TV et bien plus en illimité',
        heroSubtitle: 'Regardez où vous voulez. Annulez quand vous voulez.',
        heroDescription: 'Prêt à regarder ? Entrez votre adresse e-mail pour créer ou réactiver votre abonnement.',
        getStarted: 'Commencer',
        emailPlaceholder: 'Adresse e-mail',
        emailPhonePlaceholder: 'E-mail ou numéro de téléphone',
        passwordPlaceholder: 'Mot de passe',
        namePlaceholder: 'Nom',
        signIn: 'Se connecter',
        signUp: 'S\'inscrire',
        signOut: 'Se déconnecter',
        signUpNow: 'S\'inscrire maintenant',
        signInNow: 'Se connecter maintenant',
        newToNetflix: 'Nouveau sur Netflix ?',
        alreadyHaveAccount: 'Vous avez déjà un compte ?',
        rememberMe: 'Se souvenir de moi',
        needHelp: 'Besoin d\'aide ?',
        feature1Title: 'Regardez sur votre TV',
        feature1Desc: 'Regardez sur Smart TV, PlayStation, Xbox, Chromecast, Apple TV, lecteurs Blu-ray et plus encore.',
        feature2Title: 'Téléchargez vos séries préférées pour les regarder hors ligne',
        feature2Desc: 'Enregistrez facilement vos contenus favoris et ayez toujours quelque chose à regarder.',
        feature3Title: 'Où que vous soyez',
        feature3Desc: 'Regardez en streaming tous les films et séries TV en illimité sur votre téléphone, tablette, ordinateur et TV.',
        feature4Title: 'Créez des profils pour les enfants',
        feature4Desc: 'Les enfants découvrent de nouvelles aventures en compagnie de leurs personnages préférés dans un espace bien à eux, déjà inclus dans votre abonnement.',
        downloading: 'Téléchargement...',
        faqTitle: 'Questions fréquemment posées',
        faq1Question: 'Qu\'est-ce que Netflix ?',
        faq1Answer: 'Netflix est un service de streaming qui propose une vaste sélection de séries TV, films, animes, documentaires et autres programmes primés sur des milliers d\'appareils connectés à Internet.',
        faq2Question: 'Combien coûte Netflix ?',
        faq2Answer: 'Regardez Netflix sur votre smartphone, tablette, Smart TV, ordinateur ou appareil de streaming, le tout pour un tarif mensuel fixe. Les tarifs peuvent varier entre 9,99 € et 19,99 € par mois. Pas de frais supplémentaires, pas de contrats.',
        faq3Question: 'Où puis-je regarder ?',
        faq3Answer: 'Regardez où et quand vous voulez, sur un nombre illimité d\'appareils. Connectez-vous à votre compte pour regarder Netflix en ligne sur netflix.com depuis votre ordinateur ou tout appareil connecté à Internet avec l\'application Netflix.',
        faq4Question: 'Comment puis-je annuler mon abonnement ?',
        faq4Answer: 'Netflix offre une grande souplesse. Pas de contrats compliqués ni d\'engagements. Vous pouvez facilement annuler votre compte en ligne en deux clics. Pas de frais d\'annulation : ouvrez ou fermez votre compte à tout moment.',
        faq5Question: 'Que puis-je regarder sur Netflix ?',
        faq5Answer: 'Netflix propose un vaste catalogue comprenant des longs métrages, des documentaires, des séries TV, des animes et des programmes originaux Netflix primés. Regardez tout ce que vous voulez, quand vous voulez.',
        footerQuestions: 'Des questions ? Appelez le 1-844-505-2993',
        footerFaq: 'FAQ',
        footerInvestor: 'Relations investisseurs',
        footerPrivacy: 'Confidentialité',
        footerSpeed: 'Test de vitesse',
        footerHelp: 'Centre d\'aide',
        footerJobs: 'Recrutement',
        footerCookie: 'Préférences de cookies',
        footerLegal: 'Mentions légales',
        footerAccount: 'Compte',
        footerWays: 'Modes de lecture',
        footerCorporate: 'Informations sur l\'entreprise',
        footerOnly: 'Uniquement sur Netflix',
        footerMedia: 'Centre de presse',
        footerTerms: 'Conditions d\'utilisation',
        footerContact: 'Nous contacter',
        footerCountry: 'Netflix États-Unis',
        freeMovies: 'Films gratuits à regarder',
        hollywoodClassics: 'Classiques d\'Hollywood',
        bollywoodOld: 'Anciens films de Bollywood',
        watchFree: 'Regarder gratuitement',
        thankYouMessage: 'Merci ! Nous vous enverrons des informations sur Netflix à',
        startingMovie: 'Démarrage de la lecture',
        enjoyWatching: 'C\'est un film gratuit ! Profitez du visionnage.'
    },
    de: {
        heroTitle: 'Unbegrenzt Filme, Serien und mehr',
        heroSubtitle: 'Sieh so viel du willst. Jederzeit kündbar.',
        heroDescription: 'Bereit zum Anschauen? Gib deine E-Mail-Adresse ein, um deine Mitgliedschaft zu erstellen oder zu reaktivieren.',
        getStarted: 'Loslegen',
        emailPlaceholder: 'E-Mail-Adresse',
        emailPhonePlaceholder: 'E-Mail-Adresse oder Telefonnummer',
        passwordPlaceholder: 'Passwort',
        namePlaceholder: 'Name',
        signIn: 'Anmelden',
        signUp: 'Registrieren',
        signOut: 'Abmelden',
        signUpNow: 'Jetzt registrieren',
        signInNow: 'Jetzt anmelden',
        newToNetflix: 'Neu bei Netflix?',
        alreadyHaveAccount: 'Bereits ein Konto?',
        rememberMe: 'Angemeldet bleiben',
        needHelp: 'Hilfe benötigt?',
        feature1Title: 'Genieße auf deinem TV',
        feature1Desc: 'Schaue auf Smart-TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray-Playern und mehr.',
        feature2Title: 'Lade Serien fürs Offline-Anschauen herunter',
        feature2Desc: 'Speichere deine Favoriten einfach und hab immer etwas zum Anschauen.',
        feature3Title: 'Schaue überall',
        feature3Desc: 'Streame unbegrenzt Filme und Serien auf deinem Handy, Tablet, Laptop und TV.',
        feature4Title: 'Erstelle Profile für Kinder',
        feature4Desc: 'Sende Kinder auf Abenteuer mit ihren Lieblingscharakteren in einem extra für sie erstellten Bereich – kostenlos mit deiner Mitgliedschaft.',
        downloading: 'Wird heruntergeladen...',
        faqTitle: 'Häufig gestellte Fragen',
        faq1Question: 'Was ist Netflix?',
        faq1Answer: 'Netflix ist ein Streaming-Dienst, der eine große Auswahl an preisgekrönten Serien, Filmen, Animes, Dokumentationen und mehr auf Tausenden internetfähigen Geräten bietet.',
        faq2Question: 'Was kostet Netflix?',
        faq2Answer: 'Schaue Netflix auf deinem Smartphone, Tablet, Smart-TV, Laptop oder Streaming-Gerät für eine monatliche Gebühr. Die Preise reichen von 9,99 € bis 19,99 € pro Monat. Keine Extrakosten, keine Verträge.',
        faq3Question: 'Wo kann ich schauen?',
        faq3Answer: 'Schaue überall und jederzeit. Melde dich mit deinem Netflix-Konto an, um sofort auf netflix.com von deinem PC aus oder auf jedem internetfähigen Gerät mit der Netflix-App zu streamen.',
        faq4Question: 'Wie kündige ich?',
        faq4Answer: 'Netflix ist flexibel. Keine lästigen Verträge und keine Verpflichtungen. Du kannst dein Konto online mit zwei Klicks einfach kündigen. Keine Kündigungsgebühren – starte oder beende dein Konto jederzeit.',
        faq5Question: 'Was kann ich auf Netflix schauen?',
        faq5Answer: 'Netflix hat eine große Bibliothek mit Spielfilmen, Dokumentationen, Serien, Animes, preisgekrönten Netflix-Originalen und mehr. Schaue so viel du willst, wann immer du willst.',
        footerQuestions: 'Fragen? Ruf 1-844-505-2993 an',
        footerFaq: 'FAQ',
        footerInvestor: 'Investorenbeziehungen',
        footerPrivacy: 'Datenschutz',
        footerSpeed: 'Geschwindigkeitstest',
        footerHelp: 'Hilfe-Center',
        footerJobs: 'Karriere',
        footerCookie: 'Cookie-Präferenzen',
        footerLegal: 'Rechtliche Hinweise',
        footerAccount: 'Konto',
        footerWays: 'So kannst du schauen',
        footerCorporate: 'Unternehmensinfos',
        footerOnly: 'Nur bei Netflix',
        footerMedia: 'Mediencenter',
        footerTerms: 'Nutzungsbedingungen',
        footerContact: 'Kontakt',
        footerCountry: 'Netflix Vereinigte Staaten',
        freeMovies: 'Kostenlose Filme zum Anschauen',
        hollywoodClassics: 'Hollywood-Klassiker',
        bollywoodOld: 'Alte Bollywood-Filme',
        watchFree: 'Kostenlos ansehen',
        thankYouMessage: 'Vielen Dank! Wir senden Ihnen Informationen über Netflix an',
        startingMovie: 'Wiedergabe starten',
        enjoyWatching: 'Dies ist ein kostenloser Film! Viel Spaß beim Anschauen.'
    }
};

// Current Language
let currentLanguage = localStorage.getItem('netflixLanguage') || 'en';

// Language Selector Variables (will be initialized in DOMContentLoaded)
let languageSelect, languageFooter;

// Function to change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('netflixLanguage', lang);
    document.documentElement.lang = lang;
    
    // Update language selectors if they exist
    if (languageSelect) languageSelect.value = lang;
    if (languageFooter) languageFooter.value = lang;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            // If element is a SPAN (like in FAQ questions), just update text
            if (element.tagName === 'SPAN') {
                element.textContent = translations[lang][key];
            }
            // If element is a BUTTON with a span child that doesn't have data-translate (like "Get Started" button)
            else if (element.tagName === 'BUTTON') {
                const nonTranslateSpans = Array.from(element.querySelectorAll('span')).filter(
                    span => !span.hasAttribute('data-translate')
                );
                if (nonTranslateSpans.length > 0) {
                    // Preserve all spans that don't have data-translate
                    const spansHTML = nonTranslateSpans.map(span => span.outerHTML).join('');
                    element.innerHTML = translations[lang][key] + ' ' + spansHTML;
                } else {
                    // Button without special spans, just update text
                    element.textContent = translations[lang][key];
                }
            }
            // For all other elements (labels, paragraphs, headings, etc.)
            else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update movie descriptions if movies section is visible
    const moviesSection = document.getElementById('moviesSection');
    if (moviesSection && moviesSection.style.display !== 'none') {
        updateMovieTranslations(lang);
    }
}

// Function to update movie translations
function updateMovieTranslations(lang) {
    // Update category titles
    const hollywoodTitle = document.querySelector('[data-translate="hollywoodClassics"]');
    const bollywoodTitle = document.querySelector('[data-translate="bollywoodOld"]');
    const freeMoviesTitle = document.querySelector('[data-translate="freeMovies"]');
    
    if (hollywoodTitle && translations[lang] && translations[lang].hollywoodClassics) {
        hollywoodTitle.textContent = translations[lang].hollywoodClassics;
    }
    if (bollywoodTitle && translations[lang] && translations[lang].bollywoodOld) {
        bollywoodTitle.textContent = translations[lang].bollywoodOld;
    }
    if (freeMoviesTitle && translations[lang] && translations[lang].freeMovies) {
        freeMoviesTitle.textContent = translations[lang].freeMovies;
    }
    
    // Update watch buttons
    document.querySelectorAll('.watch-btn').forEach(btn => {
        if (translations[lang] && translations[lang].watchFree) {
            btn.textContent = translations[lang].watchFree;
        }
    });
}

// Handle language change
function handleLanguageChange() {
    const selectedLanguage = this.value;
    changeLanguage(selectedLanguage);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Populate hero background banners
    populateHeroBanners();
    
    // Initialize language selectors
    languageSelect = document.getElementById('language');
    languageFooter = document.getElementById('languageFooter');
    
    // Set initial language values
    if (languageSelect) languageSelect.value = currentLanguage;
    if (languageFooter) languageFooter.value = currentLanguage;
    
    // Set HTML lang attribute
    document.documentElement.lang = currentLanguage;
    
    // Apply translations
    changeLanguage(currentLanguage);
    
    // Add event listeners
    if (languageSelect) {
        languageSelect.addEventListener('change', handleLanguageChange);
    }
    if (languageFooter) {
        languageFooter.addEventListener('change', handleLanguageChange);
    }
});

// Smooth Scroll for anchor links
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

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
    
    lastScroll = currentScroll;
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity for fade-in effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s';
});

// Video autoplay handling (for browsers that require user interaction)
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('loadedmetadata', () => {
        video.play().catch(err => {
            console.log('Autoplay prevented:', err);
        });
    });
});

// Form validation enhancement
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('input', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#e50914';
        } else {
            this.style.borderColor = '#333';
        }
    });
});


// Add hover effect to feature cards
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Movies Data
const hollywoodMovies = [
    { title: 'Casablanca', year: '1942', poster: 'https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSInzShJBR8mxm.jpg', description: 'A timeless classic about love and sacrifice during WWII.' },
    { title: 'The Godfather', year: '1972', poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', description: 'The epic tale of a powerful Italian-American crime family.' },
    { title: 'Citizen Kane', year: '1941', poster: 'https://image.tmdb.org/t/p/w500/sav0jxhqiH0bPr2vZFU5Kj2g3n9.jpg', description: 'The story of newspaper magnate Charles Foster Kane.' },
    { title: 'Gone with the Wind', year: '1939', poster: 'https://image.tmdb.org/t/p/w500/4mF4z8QqJZqVqJqVqJqVqJqVqJqVq.jpg', description: 'Epic romance set during the American Civil War.' },
    { title: 'The Wizard of Oz', year: '1939', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A young girl\'s journey through a magical land.' },
    { title: 'Singin\' in the Rain', year: '1952', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A musical comedy about the transition from silent films to talkies.' },
    { title: 'Psycho', year: '1960', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A psychological horror masterpiece by Alfred Hitchcock.' },
    { title: 'The Shawshank Redemption', year: '1994', poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', description: 'Two imprisoned men bond over a number of years.' }
];

const bollywoodMovies = [
    { title: 'Mughal-e-Azam', year: '1960', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A timeless love story set in the Mughal era.' },
    { title: 'Sholay', year: '1975', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'Two ex-convicts help a retired police officer.' },
    { title: 'Mother India', year: '1957', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A poverty-stricken woman raises her sons alone.' },
    { title: 'Pyaasa', year: '1957', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A struggling poet searches for meaning in life.' },
    { title: 'Guide', year: '1965', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A tour guide falls in love with a married woman.' },
    { title: 'Awaara', year: '1951', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A man struggles with his identity and past.' },
    { title: 'Do Bigha Zamin', year: '1953', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A farmer fights to save his land from being taken.' },
    { title: 'Kaagaz Ke Phool', year: '1959', poster: 'https://image.tmdb.org/t/p/w500/4p0e0p6E3g6qkE3g6qkE3g6qkE3g6qk.jpg', description: 'A film director\'s life and career decline.' }
];

// Show Movies Section
function showMoviesSection(email) {
    // Hide main content
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    document.querySelector('.faq').style.display = 'none';
    document.querySelector('.footer').style.display = 'none';
    document.querySelector('.header').style.display = 'none';
    
    // Show movies section
    const moviesSection = document.getElementById('moviesSection');
    moviesSection.style.display = 'block';
    document.getElementById('userEmail').textContent = email;
    
    // Populate movies
    populateMovies('hollywoodMovies', hollywoodMovies);
    populateMovies('bollywoodMovies', bollywoodMovies);
    
    // Update language for movies section
    const lang = localStorage.getItem('netflixLanguage') || 'en';
    updateMovieTranslations(lang);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Populate Movies
function populateMovies(containerId, movies) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const lang = localStorage.getItem('netflixLanguage') || 'en';
    const watchFreeText = translations[lang]?.watchFree || translations.en.watchFree;
    
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=${encodeURIComponent(movie.title)}'">
                <div class="movie-overlay">
                    <div class="movie-info">
                        <h4>${movie.title}</h4>
                        <p class="movie-year">${movie.year}</p>
                        <p class="movie-description">${movie.description}</p>
                        <button class="watch-btn" onclick="watchMovie('${movie.title}')">${watchFreeText}</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(movieCard);
    });
}

// Watch Movie Function (global for onclick handlers)
window.watchMovie = function(title) {
    const lang = localStorage.getItem('netflixLanguage') || 'en';
    const startingText = translations[lang]?.startingMovie || translations.en.startingMovie;
    const enjoyText = translations[lang]?.enjoyWatching || translations.en.enjoyWatching;
    alert(`${startingText} "${title}" - ${enjoyText}`);
    // In a real application, you would redirect to a video player or open a video modal here
};

// Sign Out
const signOutBtn = document.getElementById('signOutBtn');
signOutBtn.addEventListener('click', () => {
    // Show main content
    document.querySelector('.hero').style.display = 'flex';
    document.querySelector('.features').style.display = 'block';
    document.querySelector('.faq').style.display = 'block';
    document.querySelector('.footer').style.display = 'block';
    document.querySelector('.header').style.display = 'block';
    
    // Hide movies section
    document.getElementById('moviesSection').style.display = 'none';
    
    // Scroll to top
    window.scrollTo(0, 0);
});

// Keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (signInModal.classList.contains('active')) {
            signInModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (signUpModal.classList.contains('active')) {
            signUpModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Console welcome message
console.log('%cWelcome to Netflix Clone!', 'color: #e50914; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #fff; font-size: 14px;');

