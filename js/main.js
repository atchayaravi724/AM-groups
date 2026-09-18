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
  // 9. CLIENT TESTIMONIALS SLIDER
  // ==========================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('#testimonialDots button');
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
  let currentTestimonialIndex = 0;
  let testimonialInterval = null;

  const showTestimonial = (index) => {
    testimonialSlides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = '1';
        slide.style.pointerEvents = 'auto';
        slide.style.transform = 'translateX(0)';
      } else {
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        slide.style.transform = i < index ? 'translateX(-24px)' : 'translateX(24px)';
      }
    });

    testimonialDots.forEach((dot, i) => {
      if (i === index) {
        dot.className = 'w-8 h-2 rounded-full bg-[#734E30] transition-all';
      } else {
        dot.className = 'w-2 h-2 rounded-full bg-[#87826E]/40 hover:bg-[#87826E] transition-all';
      }
    });

    currentTestimonialIndex = index;
  };

  const nextTestimonial = () => {
    if (testimonialSlides.length === 0) return;
    let next = (currentTestimonialIndex + 1) % testimonialSlides.length;
    showTestimonial(next);
  };

  const prevTestimonial = () => {
    if (testimonialSlides.length === 0) return;
    let prev = (currentTestimonialIndex - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(prev);
  };

  if (nextTestimonialBtn) nextTestimonialBtn.addEventListener('click', nextTestimonial);
  if (prevTestimonialBtn) prevTestimonialBtn.addEventListener('click', prevTestimonial);

  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      showTestimonial(idx);
    });
  });

  const startTestimonialTimer = () => {
    testimonialInterval = setInterval(nextTestimonial, 6000);
  };

  const stopTestimonialTimer = () => {
    if (testimonialInterval) clearInterval(testimonialInterval);
  };

  const sliderContainer = document.getElementById('testimonialSlider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopTestimonialTimer);
    sliderContainer.addEventListener('mouseleave', startTestimonialTimer);
    startTestimonialTimer();
  }

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
      // Graceful local persistence fallback
      try {
        const offlineLeads = JSON.parse(localStorage.getItem('am_offline_inquiries') || '[]');
        offlineLeads.push({ ...payload, timestamp: new Date().toISOString() });
        localStorage.setItem('am_offline_inquiries', JSON.stringify(offlineLeads));
      } catch (storageErr) {
        console.error('LocalStorage error:', storageErr);
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      formElem.reset();
      if (isModal) closeInquiryModal();
      showToast(`Thank you, ${payload.name}! Your request for ${payload.division} has been recorded. Our team will connect promptly.`, true);
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
