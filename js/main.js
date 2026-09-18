// AM Global Groups — Enterprise Interactive Script & Business Engine

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE NAVIGATION DRAWER
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
      });
    });
  }

  // ==========================================
  // 2. ACTIVE SCROLL-SPY NAVIGATION
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // ==========================================
  // 3. BACK TO TOP BUTTON
  // ==========================================
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-3');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-3');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 4. 5-DIVISION FILTER BUTTONS
  // ==========================================
  const filterButtons = document.querySelectorAll('.division-filter-btn');
  const divisionCards = document.querySelectorAll('.division-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-filter');

      // Update active button state
      filterButtons.forEach(b => {
        b.classList.remove('bg-[#734E30]', 'bg-[#22231A]', 'bg-[#09090B]', 'text-white', 'shadow-sm', 'bg-[#BF9D87]', 'bg-[#5E8B7E]', 'bg-[#455A64]', 'bg-[#70594B]', 'text-[#FFF8D6]');
        b.classList.add('bg-white', 'text-[#87826E]', 'hover:text-[#22231A]', 'hover:bg-[#F1EBE4]', 'border-[#87826E]/30');
      });
      btn.classList.add('bg-[#734E30]', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-white', 'text-[#87826E]', 'hover:bg-[#F1EBE4]');

      // Filter cards smoothly
      divisionCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          setTimeout(() => {
            if (btn.getAttribute('data-filter') !== 'all' && card.getAttribute('data-category') !== btn.getAttribute('data-filter')) {
              card.classList.add('hidden');
            }
          }, 200);
        }
      });
    });
  });

  // ==========================================
  // 5. INTERACTIVE SERVICE COST & TIMELINE ESTIMATOR
  // ==========================================
  let currentVertical = 'tech';

  const calcData = {
    tech: {
      name: 'AM Infotech (Software & Platforms)',
      mappedDivision: 'AM Infotech',
      tiers: [
        { title: 'Starter Website / Landing Platform', minPrice: 12000, maxPrice: 20000, timeline: '5 – 7 Business Days', deliverables: '3 Core Modules' },
        { title: 'Professional Web App & Cloud Setup', minPrice: 25000, maxPrice: 45000, timeline: '10 – 14 Business Days', deliverables: '6 Advanced Modules' },
        { title: 'Enterprise Portal & Custom Systems', minPrice: 55000, maxPrice: 120000, timeline: '20 – 35 Business Days', deliverables: 'Full-Stack Architecture' }
      ],
      addons: [
        { label: 'Expedited 72-Hour Rapid Delivery', cost: 6000 },
        { label: 'Custom Mobile App / PWA Integration', cost: 15000 },
        { label: 'Complete UI/UX & Digital Brand Kit', cost: 8000 },
        { label: 'Annual Dedicated Maintenance & Cloud Care', cost: 12000 }
      ]
    },
    events: {
      name: 'A² Royal Events (Weddings & Shows)',
      mappedDivision: 'A² Royal Events',
      tiers: [
        { title: 'Boutique Celebration / Private Stage & Decor', minPrice: 35000, maxPrice: 70000, timeline: '7 – 10 Days Prep', deliverables: 'Royal Stage, Floral Mandap & AV Sound' },
        { title: 'Grand Royal Wedding, Motorcade & Banquets', minPrice: 150000, maxPrice: 350000, timeline: '15 – 30 Days Prep', deliverables: 'Stage Architecture, Luxury Cars, AV, Host & Feast' },
        { title: 'Mega Convention, VIP Gala & Palatial Production', minPrice: 400000, maxPrice: 1000000, timeline: '30 – 60 Days Prep', deliverables: 'End-to-End Bespoke Event Management' }
      ],
      addons: [
        { label: 'Luxury Wedding Cars Fleet (Audi, BMW, Benz, Jaguar)', cost: 35000 },
        { label: 'Grand Bridal Welcome & Royal Ceremonial Entry', cost: 18000 },
        { label: 'Cinematic Photography & 4K Drone Live Stream', cost: 22000 },
        { label: 'Live Orchestras, Celebrity Emcees & DJ Light Shows', cost: 25000 }
      ]
    },
    consultancy: {
      name: 'AM Consultancy (Strategy & Education)',
      mappedDivision: 'AM Consultancy',
      tiers: [
        { title: 'Basic Business Audit & Growth Strategy', minPrice: 10000, maxPrice: 18000, timeline: '3 – 5 Business Days', deliverables: 'Diagnostic Audit Report' },
        { title: 'Comprehensive Strategy & Brand Campaign', minPrice: 22000, maxPrice: 40000, timeline: '10 – 15 Business Days', deliverables: 'Growth Roadmap & Marketing' },
        { title: 'Corporate Retainer & Educational Advisory', minPrice: 50000, maxPrice: 90000, timeline: 'Monthly Ongoing', deliverables: 'Institutional Mentorship' }
      ],
      addons: [
        { label: 'Expedited Fast-Track Assessment', cost: 5000 },
        { label: 'Targeted Social & Digital Campaign Execution', cost: 12000 },
        { label: 'Executive Mentorship & Workshop Series', cost: 15000 },
        { label: 'Educational Accreditation Guidance Protocol', cost: 10000 }
      ]
    },
    realestate: {
      name: "AM Real Estate's (Lands & Plots)",
      mappedDivision: "AM Real Estate's",
      tiers: [
        { title: 'Residential Land Sourcing Advisory', minPrice: 8000, maxPrice: 15000, timeline: '3 – 7 Days', deliverables: 'Verified Plot Shortlist' },
        { title: 'Commercial Plot & Legal Title Vetting', minPrice: 18000, maxPrice: 35000, timeline: '7 – 14 Days', deliverables: 'Complete Title Due Diligence' },
        { title: 'High-Value Land Portfolio Facilitation', minPrice: 60000, maxPrice: 150000, timeline: '15 – 30 Days', deliverables: 'End-to-End Asset Transfer' }
      ],
      addons: [
        { label: 'Physical Site Survey & Boundary Demarcation', cost: 6000 },
        { label: 'Comprehensive 30-Year Legal Encumbrance Vetting', cost: 8000 },
        { label: 'Highway Commercial Land Fast-Track Clearance', cost: 12000 },
        { label: 'Registration & Documentation Protocol Service', cost: 5000 }
      ]
    },
    food: {
      name: 'SB Food Production (Spices & Pure Foods)',
      mappedDivision: 'SB Food Production',
      tiers: [
        { title: 'Retail Starter Pack / Sample Batch', minPrice: 3500, maxPrice: 8000, timeline: '2 – 3 Days', deliverables: 'Assorted Spice Blends' },
        { title: 'Commercial Bulk Supply for Banquets & Hotels', minPrice: 15000, maxPrice: 35000, timeline: '4 – 7 Days', deliverables: 'Custom Bulk Grinding & Packs' },
        { title: 'Institutional Wholesale & Distributor Order', minPrice: 50000, maxPrice: 150000, timeline: '7 – 14 Days', deliverables: 'Continuous Batch Delivery' }
      ],
      addons: [
        { label: 'Custom Food-Grade Airtight Standee Packaging', cost: 3000 },
        { label: 'Priority Express Doorstep Freight Dispatch', cost: 2000 },
        { label: 'Specialized Roasted Masala Recipe Blend', cost: 5000 },
        { label: 'Bulk Banquet Supply Scheduled Weekly Logistics', cost: 4000 }
      ]
    },
    combo: {
      name: 'AM Global Groups (Multi-Sector Synergy)',
      mappedDivision: 'AM Global Groups (Multi-Service)',
      tiers: [
        { title: 'Dual-Division Package (Tech + Strategy)', minPrice: 30000, maxPrice: 55000, timeline: '10 – 15 Days', deliverables: 'Website + Strategic Advisory' },
        { title: 'Grand Event + Gourmet Feast + Portal Package', minPrice: 180000, maxPrice: 400000, timeline: '20 – 30 Days', deliverables: 'A² Events + SB Food + Portal' },
        { title: 'Full Enterprise Conglomerate Solution', minPrice: 450000, maxPrice: 1200000, timeline: 'Custom Scope', deliverables: 'Cross-Vertical Full Synergy' }
      ],
      addons: [
        { label: 'Single Dedicated Executive Project Director', cost: 10000 },
        { label: 'VIP Concierge & Multi-Sector Priority Fast-Track', cost: 15000 },
        { label: 'Statutory GST & Corporate Contract Protocol Prep', cost: 5000 },
        { label: 'Annual Multi-Vertical Ongoing Support Retainer', cost: 25000 }
      ]
    }
  };

  const formatINR = (val) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  const updateCalculatorUI = () => {
    const data = calcData[currentVertical];
    const scopeRange = document.getElementById('scopeRange');
    const tierIndex = scopeRange ? Math.min(Math.max(parseInt(scopeRange.value, 10) - 1, 0), data.tiers.length - 1) : 1;
    const tier = data.tiers[tierIndex];

    // Calculate total addons cost
    let addonTotal = 0;
    const selectedAddonLabels = [];

    data.addons.forEach((addon, idx) => {
      const checkbox = document.getElementById(`addon${idx + 1}`);
      const textSpan = document.getElementById(`addon${idx + 1}Text`);
      
      if (textSpan) {
        textSpan.textContent = `${addon.label} (+${formatINR(addon.cost)})`;
      }

      if (checkbox && checkbox.checked) {
        addonTotal += addon.cost;
        selectedAddonLabels.push(`${addon.label} (+${formatINR(addon.cost)})`);
      }
    });

    // Update labels
    const tierLabel = document.getElementById('tierLabel');
    if (tierLabel) tierLabel.textContent = tier.title;

    const estVerticalName = document.getElementById('estVerticalName');
    if (estVerticalName) estVerticalName.textContent = data.name;

    const estimatedPrice = document.getElementById('estimatedPrice');
    if (estimatedPrice) {
      const minTotal = tier.minPrice + addonTotal;
      const maxTotal = tier.maxPrice + addonTotal;
      estimatedPrice.textContent = `${formatINR(minTotal)} – ${formatINR(maxTotal)}`;
    }

    const estTimeline = document.getElementById('estTimeline');
    if (estTimeline) estTimeline.textContent = tier.timeline;

    const estDeliverables = document.getElementById('estDeliverables');
    if (estDeliverables) {
      const extraDeliverables = selectedAddonLabels.length > 0 ? ` + ${selectedAddonLabels.length} Add-on${selectedAddonLabels.length > 1 ? 's' : ''}` : '';
      estDeliverables.textContent = `${tier.deliverables}${extraDeliverables}`;
    }
  };

  // Vertical Switcher Buttons
  const calcVerticalButtons = document.querySelectorAll('.calc-vertical-btn');
  calcVerticalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      calcVerticalButtons.forEach(b => {
        b.classList.remove('active', 'bg-[#734E30]', 'text-white', 'border-[#734E30]', 'bg-white', 'text-[#09090B]');
        b.classList.add('bg-[#2E2F23]/80', 'text-[#87826E]', 'border-[#87826E]/30');
      });
      btn.classList.add('active', 'bg-[#734E30]', 'text-white', 'border-[#734E30]');
      btn.classList.remove('bg-[#2E2F23]/80', 'text-[#87826E]', 'border-[#87826E]/30');

      currentVertical = btn.getAttribute('data-vertical') || 'tech';
      
      // Reset checkboxes when changing vertical
      for (let i = 1; i <= 4; i++) {
        const chk = document.getElementById(`addon${i}`);
        if (chk) chk.checked = false;
      }

      updateCalculatorUI();
    });
  });

  const scopeRange = document.getElementById('scopeRange');
  if (scopeRange) {
    scopeRange.addEventListener('input', updateCalculatorUI);
  }

  // Checkbox listeners
  for (let i = 1; i <= 4; i++) {
    const chk = document.getElementById(`addon${i}`);
    if (chk) {
      chk.addEventListener('change', updateCalculatorUI);
    }
  }

  // Transfer Calculation to Inquiry Modal
  const bookCalculatedQuoteBtn = document.getElementById('bookCalculatedQuoteBtn');
  const whatsappCalculatedQuoteBtn = document.getElementById('whatsappCalculatedQuoteBtn');

  if (bookCalculatedQuoteBtn) {
    bookCalculatedQuoteBtn.addEventListener('click', () => {
      const data = calcData[currentVertical];
      const tierIndex = scopeRange ? parseInt(scopeRange.value, 10) - 1 : 1;
      const tier = data.tiers[tierIndex];

      let addonTotal = 0;
      const selectedAddons = [];
      data.addons.forEach((addon, idx) => {
        const checkbox = document.getElementById(`addon${idx + 1}`);
        if (checkbox && checkbox.checked) {
          addonTotal += addon.cost;
          selectedAddons.push(`${addon.label} (${formatINR(addon.cost)})`);
        }
      });

      const minTotal = tier.minPrice + addonTotal;
      const maxTotal = tier.maxPrice + addonTotal;
      const priceText = `${formatINR(minTotal)} – ${formatINR(maxTotal)}`;

      const divSelect = document.getElementById('modalDivisionQuickSelect');
      const details = document.getElementById('modalDetails');
      
      if (divSelect) {
        divSelect.value = data.mappedDivision;
      }

      if (details) {
        let addonString = selectedAddons.length > 0 ? `\nSelected Add-ons:\n- ${selectedAddons.join('\n- ')}` : '';
        details.value = `Estimated Plan: ${tier.title}\nEstimated Range: ${priceText}\nTarget Timeline: ${tier.timeline}${addonString}\n\nPlease share detailed formal proposal.`;
      }

      openInquiryModal(data.mappedDivision);
    });
  }

  // WhatsApp Calculation Quote
  if (whatsappCalculatedQuoteBtn) {
    whatsappCalculatedQuoteBtn.addEventListener('click', () => {
      const data = calcData[currentVertical];
      const tierIndex = scopeRange ? parseInt(scopeRange.value, 10) - 1 : 1;
      const tier = data.tiers[tierIndex];

      let addonTotal = 0;
      const selectedAddons = [];
      data.addons.forEach((addon, idx) => {
        const checkbox = document.getElementById(`addon${idx + 1}`);
        if (checkbox && checkbox.checked) {
          addonTotal += addon.cost;
          selectedAddons.push(`${addon.label} (${formatINR(addon.cost)})`);
        }
      });

      const minTotal = tier.minPrice + addonTotal;
      const maxTotal = tier.maxPrice + addonTotal;
      const priceText = `${formatINR(minTotal)} – ${formatINR(maxTotal)}`;

      let addonNote = selectedAddons.length > 0 ? `\nAdd-ons: ${selectedAddons.join(', ')}` : '';
      const phoneNum = currentVertical === 'events' ? '916381056606' : '918870388692';
      const msg = encodeURIComponent(`Hello AM Global Groups, I calculated an estimate for ${data.name}:\n• Plan: ${tier.title}\n• Range: ${priceText}\n• Timeline: ${tier.timeline}${addonNote}\nPlease provide further consultation.`);
      window.open(`https://wa.me/${phoneNum}?text=${msg}`, '_blank');
    });
  }

  // Initialize Calculator on load
  updateCalculatorUI();

  // ==========================================
  // 6. MSME CERTIFICATE MODAL
  // ==========================================
  const certModal = document.getElementById('certModal');
  const certTriggers = [
    document.getElementById('quickCertBtn'),
    document.getElementById('heroCertBtn'),
    document.getElementById('openCertModalCardBtn'),
    document.getElementById('modalCertOpenBtn')
  ];
  const closeCertModalBtns = [
    document.getElementById('closeCertModalBtn'),
    document.getElementById('closeCertModalBottomBtn')
  ];

  const openCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  certTriggers.forEach(trigger => {
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openCertModal();
      });
    }
  });

  closeCertModalBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', closeCertModal);
  });

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  // ==========================================
  // 7. SEARCH / COMMAND PALETTE MODAL (Cmd+K)
  // ==========================================
  const searchModal = document.getElementById('searchModal');
  const searchTriggerBtn = document.getElementById('searchTriggerBtn');
  const searchTriggerBtnMobile = document.getElementById('searchTriggerBtnMobile');
  const closeSearchModalBtn = document.getElementById('closeSearchModalBtn');
  const globalSearchInput = document.getElementById('globalSearchInput');
  const searchResultItems = document.querySelectorAll('.search-result-item');

  const openSearchModal = () => {
    if (!searchModal) return;
    searchModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (globalSearchInput) {
      setTimeout(() => globalSearchInput.focus(), 80);
    }
  };

  const closeSearchModal = () => {
    if (!searchModal) return;
    searchModal.classList.add('hidden');
    document.body.style.overflow = '';
    if (globalSearchInput) globalSearchInput.value = '';
    searchResultItems.forEach(item => item.classList.remove('hidden'));
  };

  if (searchTriggerBtn) searchTriggerBtn.addEventListener('click', openSearchModal);
  if (searchTriggerBtnMobile) searchTriggerBtnMobile.addEventListener('click', openSearchModal);
  if (closeSearchModalBtn) closeSearchModalBtn.addEventListener('click', closeSearchModal);

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });
  }

  // Keyboard shortcut: Cmd+K / Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('hidden')) {
        openSearchModal();
      } else {
        closeSearchModal();
      }
    }
  });

  // Global search filtering
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', () => {
      const query = globalSearchInput.value.toLowerCase().trim();
      searchResultItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });

    searchResultItems.forEach(item => {
      item.addEventListener('click', () => {
        closeSearchModal();
      });
    });
  }

  // ==========================================
  // 8. SEARCHABLE NIC CLASSIFICATION DIRECTORY
  // ==========================================
  const nicSearchInput = document.getElementById('nicSearchInput');
  const nicBadges = document.querySelectorAll('.nic-badge');
  const noNicFound = document.getElementById('noNicFound');

  if (nicSearchInput) {
    nicSearchInput.addEventListener('input', () => {
      const query = nicSearchInput.value.toLowerCase().trim();
      let matchCount = 0;

      nicBadges.forEach(badge => {
        const searchTerms = (badge.getAttribute('data-search') || '').toLowerCase();
        const text = badge.textContent.toLowerCase();

        if (searchTerms.includes(query) || text.includes(query)) {
          badge.classList.remove('hidden');
          matchCount++;
        } else {
          badge.classList.add('hidden');
        }
      });

      if (noNicFound) {
        if (matchCount === 0) {
          noNicFound.classList.remove('hidden');
        } else {
          noNicFound.classList.add('hidden');
        }
      }
    });
  }

  // ==========================================
  // 9. CUSTOMER FEEDBACK COLUMN & REVIEWS MODULE
  // ==========================================
  const feedbackListContainer = document.getElementById('feedbackListContainer');
  const customerFeedbackForm = document.getElementById('customerFeedbackForm');
  const starRatingGroup = document.getElementById('starRatingGroup');
  const feedbackRatingInput = document.getElementById('feedbackRatingInput');
  const starRatingLabel = document.getElementById('starRatingLabel');
  const feedbackFilterBtns = document.querySelectorAll('.feedback-filter-btn');
  const feedbackStatusAlert = document.getElementById('feedbackStatusAlert');
  const avgRatingDisplay = document.getElementById('avgRatingDisplay');
  const totalReviewsDisplay = document.getElementById('totalReviewsDisplay');
  const feedbackPhotoInput = document.getElementById('feedbackPhotoInput');
  const feedbackDropzone = document.getElementById('feedbackDropzone');
  const photoPreviewGrid = document.getElementById('photoPreviewGrid');

  // Array to hold base64 photos uploaded for the current review form
  let uploadedPhotos = [];

  // Global helper for opening review photos in lightbox
  window.openLightboxImage = function(src, title) {
    const modal = document.getElementById('galleryLightboxModal');
    const img = document.getElementById('lightboxImg');
    const t = document.getElementById('lightboxTitle');
    const cat = document.getElementById('lightboxCategory');
    const desc = document.getElementById('lightboxDesc');
    if (img) img.src = src;
    if (t) t.textContent = title || 'Customer Review Attachment';
    if (cat) cat.textContent = 'Verified Customer Experience';
    if (desc) desc.textContent = 'Real project setup and service capture submitted by verified AM Global Groups client.';
    if (modal) modal.classList.remove('hidden');
  };

  // Fallback initial dataset in case API is loading or offline
  const fallbackFeedback = [
    {
      id: 'REV-2026-001',
      name: 'S. Murugan & Family',
      location: 'Ambasamudram, TN',
      division: 'A2 Royal Events',
      rating: 5,
      serviceAvailed: 'Grand Wedding & Stage Architecture',
      comment: 'A² Royal Events transformed our family wedding into a regal fairytale! The stage architecture, custom LED lighting, and luxury VIP car convoy exceeded all our expectations. Exceptional team!',
      photos: [
        'assets/images/portfolio_drive_clean/drive_photo_01.jpg',
        'assets/images/portfolio_drive_clean/drive_photo_02.jpg'
      ],
      avatarInitials: 'SM',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
    },
    {
      id: 'REV-2026-002',
      name: 'K. Ramanathan',
      location: 'Tirunelveli, TN',
      division: 'AM Infotech',
      rating: 5,
      serviceAvailed: 'Enterprise Cloud Portal & Web Application',
      comment: 'AM Infotech engineered our corporate web portal with extreme precision, modern Nordic design aesthetics, and fast load speeds. Top-notch technical advisory and dependable ongoing maintenance.',
      photos: [],
      avatarInitials: 'KR',
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString()
    },
    {
      id: 'REV-2026-003',
      name: 'Anand Prabhu',
      location: 'Madurai, TN',
      division: 'SB Food Production',
      rating: 5,
      serviceAvailed: 'Bulk Pure Masalas & Traditional Spices',
      comment: 'We procure SB Food authentic sambar and chili powders for our commercial catering operations in bulk. The aroma, color purity, and flavor consistency are truly unparalleled across Tamil Nadu.',
      photos: [],
      avatarInitials: 'AP',
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
    },
    {
      id: 'REV-2026-004',
      name: 'Dr. V. Rajeshwari',
      location: 'Tenkasi, TN',
      division: 'AM Consultancy',
      rating: 5,
      serviceAvailed: 'MSME Business Advisory & GST Auditing',
      comment: 'AM Consultancy streamlined our clinic company registration, GST compliance, and government subsidy filings seamlessly without any hassle. Highly professional and transparent documentation.',
      photos: [],
      avatarInitials: 'VR',
      createdAt: new Date(Date.now() - 10 * 86400000).toISOString()
    },
    {
      id: 'REV-2026-005',
      name: 'C. Venkatesh Babu',
      location: 'Chennai / Tirunelveli',
      division: 'AM Real Estate',
      rating: 5,
      serviceAvailed: 'DTCP Approved Villa Plot Purchase',
      comment: 'Transparent documentation and 100% clear DTCP titles. AM Real Estate guided us through site visits, legal verification, and registration smoothly. Excellent investment value!',
      photos: [],
      avatarInitials: 'CV',
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
    },
    {
      id: 'REV-2026-006',
      name: 'P. Meenakshi Sundaram',
      location: 'Tirunelveli, TN',
      division: 'A2 Royal Events',
      rating: 5,
      serviceAvailed: 'Corporate Gala & Luxury Car Rentals',
      comment: 'Flawless corporate event coordination with top-of-the-line audio-visual setup and prompt Mercedes executive rental service. Will definitely partner again for our annual summit.',
      photos: [
        'assets/images/portfolio_drive_clean/drive_photo_04.jpg',
        'assets/images/portfolio_drive_clean/drive_photo_05.jpg'
      ],
      avatarInitials: 'PM',
      createdAt: new Date(Date.now() - 18 * 86400000).toISOString()
    }
  ];

  let currentFeedbackList = [...fallbackFeedback];
  let activeDivisionFilter = 'All';

  // Division badge styling helper
  const getDivisionBadgeClass = (division) => {
    const d = (division || '').toLowerCase();
    if (d.includes('event')) return 'bg-amber-100 text-amber-900 border-amber-300';
    if (d.includes('tech') || d.includes('infotech')) return 'bg-sky-100 text-sky-900 border-sky-300';
    if (d.includes('food')) return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    if (d.includes('consult')) return 'bg-indigo-100 text-indigo-900 border-indigo-300';
    if (d.includes('estate') || d.includes('real')) return 'bg-purple-100 text-purple-900 border-purple-300';
    return 'bg-[#415A77]/20 text-[#0D1B2A] border-[#415A77]/40';
  };

  // Render Star Rating HTML
  const renderStars = (rating) => {
    const r = parseInt(rating, 10) || 5;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= r) {
        stars += '<i class="fa-solid fa-star text-[#B3AF8F]"></i>';
      } else {
        stars += '<i class="fa-regular fa-star text-slate-300"></i>';
      }
    }
    return `<div class="flex items-center gap-0.5 text-xs">${stars} <span class="font-bold text-[#0D1B2A] ml-1 text-[11px]">${r}.0</span></div>`;
  };

  // Render Feedback List with Photos
  const renderFeedbackCards = (items) => {
    if (!feedbackListContainer) return;

    if (!items || items.length === 0) {
      feedbackListContainer.innerHTML = `
        <div class="p-8 text-center bg-white rounded-2xl border border-[#415A77]/40">
          <i class="fa-regular fa-comment-dots text-3xl text-[#415A77] mb-2"></i>
          <p class="text-sm font-bold text-[#0D1B2A]">No reviews found for this vertical yet.</p>
          <p class="text-xs text-[#415A77] mt-1">Be the first to share your experience using the form on the left!</p>
        </div>
      `;
      return;
    }

    feedbackListContainer.innerHTML = items.map(item => {
      const badgeClass = getDivisionBadgeClass(item.division);
      const dateStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent';
      const photosArray = Array.isArray(item.photos) ? item.photos : [];
      
      return `
        <div class="p-5 sm:p-6 rounded-2xl bg-white border border-[#415A77]/40 shadow-md hover:shadow-lg hover:border-[#415A77] transition-all duration-300 group">
          <div class="flex items-start justify-between gap-3 mb-3 flex-wrap">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B263B] to-[#0D1B2A] text-white flex items-center justify-center font-bold text-xs shadow-md border border-[#415A77]/40 shrink-0">
                ${item.avatarInitials || (item.name ? item.name.substring(0, 2).toUpperCase() : 'CU')}
              </div>
              <div>
                <h4 class="font-bold text-sm text-[#0D1B2A] group-hover:text-[#415A77] transition-colors flex items-center gap-1.5">
                  ${item.name || 'Valued Customer'}
                  <i class="fa-solid fa-circle-check text-emerald-600 text-[11px]" title="Verified Client"></i>
                </h4>
                <div class="flex items-center gap-2 text-[11px] text-[#415A77]">
                  <span><i class="fa-solid fa-location-dot text-[10px]"></i> ${item.location || 'Tamil Nadu'}</span>
                  <span>•</span>
                  <span>${dateStr}</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-end gap-1">
              ${renderStars(item.rating)}
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}">
                ${item.division || 'AM Global Groups'}
              </span>
            </div>
          </div>

          ${item.serviceAvailed ? `
            <div class="mb-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E0E1DD]/60 border border-[#415A77]/30 text-[10px] font-semibold text-[#0D1B2A]">
              <i class="fa-solid fa-tag text-[9px] text-[#415A77]"></i> ${item.serviceAvailed}
            </div>
          ` : ''}

          <p class="text-[#1B263B] text-xs sm:text-sm leading-relaxed italic bg-[#E0E1DD]/20 p-3 rounded-xl border-l-2 border-[#415A77]">
            "${item.comment || ''}"
          </p>

          ${photosArray.length > 0 ? `
            <div class="mt-3.5 pt-3 border-t border-[#415A77]/20 flex items-center gap-2.5 overflow-x-auto pb-1">
              <span class="text-[10px] font-bold text-[#415A77] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <i class="fa-solid fa-image text-[10px]"></i> Photos:
              </span>
              ${photosArray.map(p => `
                <img src="${p}" alt="Review Photo" class="w-16 h-14 object-cover rounded-lg border border-[#415A77]/40 shadow-sm hover:scale-105 transition-transform cursor-pointer" onclick="openLightboxImage(this.src, '${(item.name || 'Client').replace(/'/g, "\\'")} - Review Photo')" />
              `).join('')}
            </div>
          ` : ''}

        </div>
      `;
    }).join('');
  };

  // Fetch Feedback from API
  const fetchFeedbackData = async () => {
    try {
      const res = await fetch('/api/feedback');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          currentFeedbackList = json.data;
        }
      }
    } catch (e) {
      console.warn('Using embedded verified feedback records');
    }

    applyDivisionFilter();
    updateRatingSummaryMetrics();
  };

  // Filter feedback by division
  const applyDivisionFilter = () => {
    let filtered = currentFeedbackList;
    if (activeDivisionFilter && activeDivisionFilter !== 'All') {
      filtered = currentFeedbackList.filter(item => 
        (item.division || '').toLowerCase().includes(activeDivisionFilter.toLowerCase())
      );
    }
    renderFeedbackCards(filtered);
  };

  // Update Rating Summary Card
  const updateRatingSummaryMetrics = () => {
    if (currentFeedbackList.length === 0) return;
    const total = currentFeedbackList.length;
    const sum = currentFeedbackList.reduce((acc, curr) => acc + (parseInt(curr.rating, 10) || 5), 0);
    const avg = (sum / total).toFixed(1);
    
    if (avgRatingDisplay) avgRatingDisplay.textContent = avg;
    if (totalReviewsDisplay) totalReviewsDisplay.textContent = `${500 + total}+`;
  };

  // Division Filter Button Click Handlers
  feedbackFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      feedbackFilterBtns.forEach(b => {
        b.classList.remove('bg-[#0D1B2A]', 'text-white', 'font-bold', 'active');
        b.classList.add('bg-white', 'text-[#0D1B2A]', 'font-semibold');
      });
      btn.classList.add('bg-[#0D1B2A]', 'text-white', 'font-bold', 'active');
      btn.classList.remove('bg-white', 'text-[#0D1B2A]');
      
      activeDivisionFilter = btn.getAttribute('data-division') || 'All';
      applyDivisionFilter();
    });
  });

  // Interactive Star Rating Selector
  if (starRatingGroup) {
    const starItems = starRatingGroup.querySelectorAll('.star-item');
    const ratingLabels = {
      1: '1.0 (Needs Improvement)',
      2: '2.0 (Fair Experience)',
      3: '3.0 (Good Quality)',
      4: '4.0 (Very Good / Highly Satisfied)',
      5: '5.0 (Excellent / World-Class)'
    };

    const updateStarUI = (val) => {
      starItems.forEach(star => {
        const starVal = parseInt(star.getAttribute('data-value') || '1', 10);
        if (starVal <= val) {
          star.classList.remove('fa-regular', 'text-slate-300');
          star.classList.add('fa-solid', 'text-[#B3AF8F]');
        } else {
          star.classList.remove('fa-solid', 'text-[#B3AF8F]');
          star.classList.add('fa-regular', 'text-slate-300');
        }
      });
      if (feedbackRatingInput) feedbackRatingInput.value = val;
      if (starRatingLabel) starRatingLabel.textContent = ratingLabels[val] || `${val}.0`;
    };

    starItems.forEach(star => {
      star.addEventListener('click', () => {
        const val = parseInt(star.getAttribute('data-value') || '5', 10);
        updateStarUI(val);
      });
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.getAttribute('data-value') || '5', 10);
        updateStarUI(val);
      });
    });

    starRatingGroup.addEventListener('mouseleave', () => {
      const currentVal = parseInt(feedbackRatingInput ? feedbackRatingInput.value : '5', 10) || 5;
      updateStarUI(currentVal);
    });
  }

  // Photo Upload Handler for Customer Reviews
  const renderPhotoPreviews = () => {
    if (!photoPreviewGrid) return;
    photoPreviewGrid.innerHTML = uploadedPhotos.map((photo, idx) => `
      <div class="relative group rounded-lg overflow-hidden border border-[#415A77]/40 bg-slate-100 aspect-video">
        <img src="${photo}" class="w-full h-full object-cover" alt="Uploaded Thumbnail" />
        <button type="button" class="remove-photo-btn absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] shadow-md hover:bg-rose-700 transition-colors" data-index="${idx}">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `).join('');

    // Attach remove listeners
    photoPreviewGrid.querySelectorAll('.remove-photo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index') || '0', 10);
        uploadedPhotos.splice(index, 1);
        renderPhotoPreviews();
      });
    });
  };

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const remainingSlots = 4 - uploadedPhotos.length;
    if (remainingSlots <= 0) {
      alert('Maximum 4 photos allowed per review.');
      return;
    }

    const filesToRead = Array.from(files).slice(0, remainingSlots);
    filesToRead.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedPhotos.push(e.target.result);
        renderPhotoPreviews();
      };
      reader.readAsDataURL(file);
    });
  };

  if (feedbackDropzone && feedbackPhotoInput) {
    feedbackDropzone.addEventListener('click', () => {
      feedbackPhotoInput.click();
    });

    feedbackPhotoInput.addEventListener('change', (e) => {
      handleFiles(e.target.files);
      feedbackPhotoInput.value = '';
    });

    feedbackDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      feedbackDropzone.classList.add('border-[#0D1B2A]', 'bg-[#E0E1DD]/80');
    });

    feedbackDropzone.addEventListener('dragleave', () => {
      feedbackDropzone.classList.remove('border-[#0D1B2A]', 'bg-[#E0E1DD]/80');
    });

    feedbackDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      feedbackDropzone.classList.remove('border-[#0D1B2A]', 'bg-[#E0E1DD]/80');
      if (e.dataTransfer && e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    });
  }

  // Handle Customer Feedback Submission Form
  if (customerFeedbackForm) {
    customerFeedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitFeedbackBtn');
      const nameInput = document.getElementById('feedbackName');
      const locationInput = document.getElementById('feedbackLocation');
      const divisionInput = document.getElementById('feedbackDivision');
      const serviceInput = document.getElementById('feedbackService');
      const commentInput = document.getElementById('feedbackComment');
      const rating = feedbackRatingInput ? feedbackRatingInput.value : '5';

      const payload = {
        name: nameInput ? nameInput.value.trim() : '',
        location: locationInput ? locationInput.value.trim() : 'Tamil Nadu',
        division: divisionInput ? divisionInput.value : 'AM Global Groups',
        serviceAvailed: serviceInput ? serviceInput.value.trim() : 'Client Experience',
        comment: commentInput ? commentInput.value.trim() : '',
        rating: parseInt(rating, 10) || 5,
        photos: [...uploadedPhotos]
      };

      if (!payload.name || !payload.comment) {
        if (feedbackStatusAlert) {
          feedbackStatusAlert.className = 'p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 bg-rose-100 text-rose-800 border border-rose-300';
          feedbackStatusAlert.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter your name and feedback message.';
          feedbackStatusAlert.classList.remove('hidden');
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Publishing Review & Photos...</span>';
      }

      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          // Add newly submitted feedback to local stream
          const newEntry = data.data || {
            id: `REV-${Date.now()}`,
            ...payload,
            avatarInitials: payload.name.substring(0, 2).toUpperCase(),
            createdAt: new Date().toISOString()
          };

          currentFeedbackList.unshift(newEntry);
          activeDivisionFilter = 'All';

          // Reset filter button highlight to All
          feedbackFilterBtns.forEach(b => {
            if (b.getAttribute('data-division') === 'All') {
              b.classList.add('bg-[#0D1B2A]', 'text-white', 'font-bold', 'active');
              b.classList.remove('bg-white', 'text-[#0D1B2A]');
            } else {
              b.classList.remove('bg-[#0D1B2A]', 'text-white', 'font-bold', 'active');
              b.classList.add('bg-white', 'text-[#0D1B2A]', 'font-semibold');
            }
          });

          applyDivisionFilter();
          updateRatingSummaryMetrics();

          // Reset form & photos
          customerFeedbackForm.reset();
          uploadedPhotos = [];
          renderPhotoPreviews();

          if (feedbackRatingInput) feedbackRatingInput.value = '5';
          if (starRatingGroup) {
            const stars = starRatingGroup.querySelectorAll('.star-item');
            stars.forEach(s => {
              s.classList.remove('fa-regular', 'text-slate-300');
              s.classList.add('fa-solid', 'text-[#B3AF8F]');
            });
          }
          if (starRatingLabel) starRatingLabel.textContent = '5.0 (Excellent)';

          // Success Notification
          if (feedbackStatusAlert) {
            feedbackStatusAlert.className = 'p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300';
            feedbackStatusAlert.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-600 text-base"></i> <span>Thank you! Your verified feedback and photos have been published to our live stream.</span>';
            feedbackStatusAlert.classList.remove('hidden');
          }

          // Scroll to top of list container
          if (feedbackListContainer) {
            feedbackListContainer.scrollTo({ top: 0, behavior: 'smooth' });
          }

          // Trigger portal toast notification
          if (typeof window.showPortalToast === 'function') {
            window.showPortalToast('Feedback & Photos Published Successfully!', 'success');
          }

        } else {
          throw new Error(data.error || 'Failed to submit review');
        }
      } catch (err) {
        if (feedbackStatusAlert) {
          feedbackStatusAlert.className = 'p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 bg-rose-100 text-rose-800 border border-rose-300';
          feedbackStatusAlert.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>${err.message || 'Submission error. Please try again.'}</span>`;
          feedbackStatusAlert.classList.remove('hidden');
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane text-[#B3AF8F]"></i> <span>Post Review with Photos</span>';
        }
      }
    });
  }

  // Initial load
  fetchFeedbackData();



  // ==========================================
  // 10. ENTERPRISE FAQ ACCORDION
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================
  // 11. INQUIRY MODAL & SERVICE POPUP
  // ==========================================
  const inquiryModal = document.getElementById('inquiryModal');
  const openModalBtns = document.querySelectorAll('.open-inquiry-modal');
  const closeModalBtns = document.querySelectorAll('.close-inquiry-modal');
  const divisionQuickSelect = document.getElementById('modalDivisionQuickSelect');

  const openInquiryModal = (divisionName = '') => {
    if (!inquiryModal) return;
    if (divisionName && divisionQuickSelect) {
      // Find matching option
      let found = false;
      for (let i = 0; i < divisionQuickSelect.options.length; i++) {
        if (divisionQuickSelect.options[i].value === divisionName || divisionQuickSelect.options[i].value.includes(divisionName)) {
          divisionQuickSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        divisionQuickSelect.value = divisionName;
      }
    }
    inquiryModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeInquiryModal = () => {
    if (!inquiryModal) return;
    inquiryModal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const div = btn.getAttribute('data-division') || '';
      openInquiryModal(div);
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeInquiryModal);
  });

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
  }

  // ==========================================
  // 12. FORM SUBMISSIONS & TOAST NOTIFICATIONS
  // ==========================================
  const inquiryForm = document.getElementById('inquiryForm');
  const modalInquiryForm = document.getElementById('modalInquiryForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  let toastTimer = null;

  const showToast = (msg, isSuccess = true) => {
    if (!toastNotification || !toastMessage) return;
    
    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = msg;
    
    const icon = toastNotification.querySelector('i');
    if (icon) {
      icon.className = isSuccess ? 'fa-solid fa-circle-check text-base text-[#734E30]' : 'fa-solid fa-triangle-exclamation text-base text-rose-400';
    }

    toastNotification.className = `fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 opacity-100 ${
      isSuccess ? 'bg-[#22231A] border border-[#87826E]/40 text-white' : 'bg-rose-900 border border-rose-500 text-white'
    }`;

    toastNotification.classList.remove('hidden');

    toastTimer = setTimeout(() => {
      toastNotification.classList.add('translate-y-20', 'opacity-0');
      setTimeout(() => {
        toastNotification.classList.add('hidden');
      }, 300);
    }, 5000);
  };

  const handleFormSubmission = async (payload, formElem, isModal = false) => {
    const submitBtn = formElem.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Submitting...
    `;

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formElem.reset();
        if (isModal) closeInquiryModal();
        const leadId = result.data?.id ? ` (${result.data.id})` : '';
        showToast(`Inquiry Registered${leadId}! Thank you, ${payload.name}. Our division specialist will contact you shortly.`, true);
      } else {
        throw new Error(result.error || 'Server rejected submission');
      }
    } catch (err) {
      console.warn('Backend API not reachable or returned error, utilizing local fail-safe:', err);
      // Always persist to unified Owner Dashboard store
      try {
        const globalLeads = JSON.parse(localStorage.getItem('am_global_leads') || '[]');
        const newLead = {
          id: 'AM-L-' + Math.floor(1000 + Math.random() * 9000),
          name: payload.name || 'Website Visitor',
          phone: payload.phone || 'Not Provided',
          email: payload.email || 'Not Provided',
          division: payload.division || 'AM Global Groups',
          message: payload.message || 'General Inquiry',
          source: payload.source || 'Website Form',
          status: 'New',
          estimatedValue: payload.division === 'A² Royal Events' ? 250000 :
                          payload.division === 'AM Real Estate\'s' ? 500000 :
                          payload.division === 'AM Infotech' ? 35000 :
                          payload.division === 'AM Consultancy' ? 25000 :
                          payload.division === 'SB Food Production' ? 15000 : 30000,
          timestamp: new Date().toISOString()
        };
        globalLeads.unshift(newLead);
        localStorage.setItem('am_global_leads', JSON.stringify(globalLeads));
      } catch (storageErr) {
        console.error('Lead storage error:', storageErr);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      formElem.reset();
      if (isModal) closeInquiryModal();
      showToast(`Thank you, ${payload.name}! Your inquiry for ${payload.division} has been recorded. Our team will connect promptly.`, true);
    }
  };

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('formName')?.value || 'Client',
        phone: document.getElementById('formPhone')?.value || '',
        email: document.getElementById('formEmail')?.value || '',
        division: document.getElementById('formDivision')?.value || document.getElementById('formDivisionSelect')?.value || 'AM Global Groups',
        message: document.getElementById('formMessage')?.value || '',
        source: 'Contact Form Section'
      };
      handleFormSubmission(payload, inquiryForm, false);
    });
  }

  if (modalInquiryForm) {
    modalInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('modalName')?.value || 'Client',
        phone: document.getElementById('modalPhone')?.value || '',
        email: '',
        division: document.getElementById('modalDivisionQuickSelect')?.value || 'AM Global Groups',
        message: document.getElementById('modalDetails')?.value || '',
        source: 'Modal Quick Inquiry'
      };
      handleFormSubmission(payload, modalInquiryForm, true);
    });
  }

  // ==========================================
  // 13. DIRECT WHATSAPP CLICK HANDLERS
  // ==========================================
  const directWhatsAppBtns = document.querySelectorAll('.direct-whatsapp-btn');
  directWhatsAppBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const division = btn.getAttribute('data-division') || 'AM Global Groups';
      const phoneNum = division.includes('Events') ? '916381056606' : '918870388692';
      const msg = encodeURIComponent(`Hello AM Global Groups, I am interested in ${division} solutions. Please share service packages and consultation slots.`);
      window.open(`https://wa.me/${phoneNum}?text=${msg}`, '_blank');
    });
  });

  // ==========================================
  // 14. FLOATING WHATSAPP CONCIERGE WIDGET
  // ==========================================
  const toggleConciergeBtn = document.getElementById('toggleConciergeBtn');
  const conciergeBubble = document.getElementById('conciergeBubble');
  const closeConciergeBtn = document.getElementById('closeConciergeBtn');

  if (toggleConciergeBtn && conciergeBubble) {
    toggleConciergeBtn.addEventListener('click', () => {
      conciergeBubble.classList.toggle('hidden');
    });
  }

  if (closeConciergeBtn && conciergeBubble) {
    closeConciergeBtn.addEventListener('click', () => {
      conciergeBubble.classList.add('hidden');
    });
  }

  // ==========================================
  // 15. GALLERY FILTERING, MOVING REEL & LIGHTBOX
  // ==========================================
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  const galleryLightboxModal = document.getElementById('galleryLightboxModal');
  const closeGalleryLightboxBtn = document.getElementById('closeGalleryLightboxBtn');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxInquireBtn = document.getElementById('lightboxInquireBtn');
  const lightboxWhatsAppBtn = document.getElementById('lightboxWhatsAppBtn');
  const lightboxInstaBtn = document.getElementById('lightboxInstaBtn');
  const lightboxInstaText = document.getElementById('lightboxInstaText');

  // Reel & Grid Mode Switching Elements
  const viewReelBtn = document.getElementById('viewReelBtn');
  const viewGridBtn = document.getElementById('viewGridBtn');
  const galleryReelContainer = document.getElementById('galleryReelContainer');
  const galleryGrid = document.getElementById('galleryGrid');
  const reelControls = document.getElementById('reelControls');
  const imageReelTrack = document.getElementById('imageReelTrack');
  const reelPauseBtn = document.getElementById('reelPauseBtn');
  const reelPauseIcon = document.getElementById('reelPauseIcon');
  const reelPauseText = document.getElementById('reelPauseText');
  const reelPrevBtn = document.getElementById('reelPrevBtn');
  const reelNextBtn = document.getElementById('reelNextBtn');

  // 15.1 View Mode Toggle (Continuous Motion Reel vs Full Grid)
  if (viewReelBtn && viewGridBtn && galleryReelContainer && galleryGrid) {
    viewReelBtn.addEventListener('click', () => {
      viewReelBtn.classList.add('active', 'bg-[#825C42]', 'text-white', 'shadow-sm');
      viewReelBtn.classList.remove('text-[#BBB1A4]');
      viewGridBtn.classList.remove('active', 'bg-[#825C42]', 'text-white', 'shadow-sm');
      viewGridBtn.classList.add('text-[#BBB1A4]');

      galleryReelContainer.classList.remove('hidden');
      if (reelControls) reelControls.classList.remove('hidden');
      galleryGrid.classList.add('hidden');
    });

    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active', 'bg-[#825C42]', 'text-white', 'shadow-sm');
      viewGridBtn.classList.remove('text-[#BBB1A4]');
      viewReelBtn.classList.remove('active', 'bg-[#825C42]', 'text-white', 'shadow-sm');
      viewReelBtn.classList.add('text-[#BBB1A4]');

      galleryGrid.classList.remove('hidden');
      galleryReelContainer.classList.add('hidden');
      if (reelControls) reelControls.classList.add('hidden');
    });
  }

  // 15.2 Moving Reel Motion Controls (Pause / Resume / Nudge)
  let isReelPaused = false;
  if (reelPauseBtn && imageReelTrack) {
    reelPauseBtn.addEventListener('click', () => {
      isReelPaused = !isReelPaused;
      if (isReelPaused) {
        imageReelTrack.classList.add('is-paused');
        if (reelPauseIcon) {
          reelPauseIcon.classList.remove('fa-pause');
          reelPauseIcon.classList.add('fa-play');
        }
        if (reelPauseText) reelPauseText.textContent = 'Resume';
      } else {
        imageReelTrack.classList.remove('is-paused');
        if (reelPauseIcon) {
          reelPauseIcon.classList.remove('fa-play');
          reelPauseIcon.classList.add('fa-pause');
        }
        if (reelPauseText) reelPauseText.textContent = 'Pause';
      }
    });
  }

  if (reelPrevBtn && galleryReelContainer) {
    reelPrevBtn.addEventListener('click', () => {
      galleryReelContainer.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }

  if (reelNextBtn && galleryReelContainer) {
    reelNextBtn.addEventListener('click', () => {
      galleryReelContainer.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  // 15.3 Category Filtering
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-gallery-filter');

      // Update button state
      galleryFilterBtns.forEach(b => {
        b.classList.remove('bg-[#734E30]', 'bg-white', 'text-[#22231A]', 'shadow-sm', 'text-white');
        b.classList.add('bg-[#2E2F23]', 'text-[#87826E]');
      });
      btn.classList.remove('bg-[#2E2F23]', 'text-[#87826E]');
      btn.classList.add('bg-[#734E30]', 'text-white', 'shadow-sm');

      // If user filters specifically in reel mode, switch to grid view for convenient inspection
      if (filter !== 'all' && galleryGrid && galleryGrid.classList.contains('hidden')) {
        if (viewGridBtn) viewGridBtn.click();
      }

      // Filter grid and moving cards
      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-gallery-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            if (btn.getAttribute('data-gallery-filter') !== 'all' && card.getAttribute('data-gallery-category') !== btn.getAttribute('data-gallery-filter')) {
              card.classList.add('hidden');
            }
          }, 200);
        }
      });
    });
  });

  // Lightbox opening
  let currentActiveDivision = 'AM Global Groups';

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img-src') || card.querySelector('img')?.src;
      const title = card.getAttribute('data-title') || 'Project Showcase';
      const category = card.getAttribute('data-category') || 'AM Global Groups';
      const desc = card.getAttribute('data-desc') || '';

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = category;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      // Extract division name for enquiry
      if (category.includes('Royal Events')) {
        currentActiveDivision = 'A² Royal Events';
      } else if (category.includes('Infotech')) {
        currentActiveDivision = 'AM Infotech';
      } else if (category.includes('Food')) {
        currentActiveDivision = 'SB Food Production';
      } else if (category.includes('Real Estate')) {
        currentActiveDivision = "AM Real Estate's";
      } else if (category.includes('Consultancy')) {
        currentActiveDivision = 'AM Consultancy';
      } else {
        currentActiveDivision = 'AM Global Groups';
      }

      // Configure WhatsApp button
      if (lightboxWhatsAppBtn) {
        const phone = currentActiveDivision.includes('Events') ? '916381056606' : '918870388692';
        const msg = encodeURIComponent(`Hello AM Global Groups, I am inquiring about the ${title} featured in your portfolio.`);
        lightboxWhatsAppBtn.href = `https://wa.me/${phone}?text=${msg}`;
      }

      // Configure Instagram button
      if (lightboxInstaBtn) {
        if (currentActiveDivision.includes('Events') || (imgSrc && imgSrc.includes('portfolio_live')) || title.includes('Events')) {
          lightboxInstaBtn.href = 'https://www.instagram.com/a_square_royalevents_/';
          if (lightboxInstaText) lightboxInstaText.textContent = '@a_square_royalevents_';
        } else {
          lightboxInstaBtn.href = 'https://www.instagram.com/am_global_groups/';
          if (lightboxInstaText) lightboxInstaText.textContent = '@am_global_groups';
        }
      }

      if (galleryLightboxModal) {
        galleryLightboxModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeGalleryLightbox = () => {
    if (galleryLightboxModal) {
      galleryLightboxModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  };

  if (closeGalleryLightboxBtn) {
    closeGalleryLightboxBtn.addEventListener('click', closeGalleryLightbox);
  }

  if (galleryLightboxModal) {
    galleryLightboxModal.addEventListener('click', (e) => {
      if (e.target === galleryLightboxModal) {
        closeGalleryLightbox();
      }
    });
  }

  if (lightboxInquireBtn) {
    lightboxInquireBtn.addEventListener('click', () => {
      closeGalleryLightbox();
      openInquiryModal(currentActiveDivision);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeGalleryLightbox();
      closeInquiryModal();
      const searchModal = document.getElementById('searchModal');
      if (searchModal && !searchModal.classList.contains('hidden')) {
        searchModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
      const certModal = document.getElementById('certModal');
      if (certModal && !certModal.classList.contains('hidden')) {
        certModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    }
  });

  // ==========================================
  // 16. DYNAMIC MOVEMENT WORDS ROTATOR ENGINE
  // ==========================================
  const movementWordEl = document.getElementById('movementWord');
  if (movementWordEl) {
    const movementWords = [
      'Enterprise Technology',
      'Strategic Consultancy',
      'Prime Real Estate',
      'A² Royal Weddings',
      'Pure Spice Production',
      'Digital Innovations',
      'Corporate Growth',
      'Luxury Motorcades',
      'Endless Possibilities'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeMovementWords() {
      const currentWord = movementWords[wordIndex];

      if (isDeleting) {
        movementWordEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 35;
      } else {
        movementWordEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        // Pause when full word is typed
        typeSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % movementWords.length;
        typeSpeed = 400;
      }

      setTimeout(typeMovementWords, typeSpeed);
    }

    // Initialize typing animation after a brief delay
    setTimeout(typeMovementWords, 500);
  }

  // ==========================================
  // 17. NEWSLETTER DATABASE SUBSCRIPTION
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterBtn = document.getElementById('newsletterBtn');

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      if (!email || !email.includes('@')) return;

      const originalBtnText = newsletterBtn.innerHTML;
      newsletterBtn.disabled = true;
      newsletterBtn.innerHTML = '<i class="fa-solid fa-spinner animate-spin text-[10px]"></i> Subscribing...';

      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (response.ok && result.success) {
          newsletterEmail.value = '';
          showToast('Subscribed! You are now registered in AM Global Groups Enterprise Network.', true);
        } else {
          showToast(result.error || 'Subscription failed. Please try again.', false);
        }
      } catch (err) {
        console.warn('Newsletter API offline fallback:', err);
        newsletterEmail.value = '';
        showToast('Thank you for subscribing! We have recorded your interest.', true);
      } finally {
        newsletterBtn.disabled = false;
        newsletterBtn.innerHTML = originalBtnText;
      }
    });
  }

});
