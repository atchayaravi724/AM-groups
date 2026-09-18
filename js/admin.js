/**
 * AM GLOBAL GROUPS — OWNER EXECUTIVE PORTAL JAVASCRIPT
 * Comprehensive Management, Analytics, 5 Division Growth Comparison & PDF Export
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DEFAULT DATASET (Sample Historical Leads across all 5 divisions)
  // =========================================================================
  const DEFAULT_LEADS = [
    {
      id: 'AM-L-1024',
      name: 'K. Senthil Kumar',
      phone: '+91 98421 54321',
      email: 'senthil.kumar@chennaicorp.com',
      division: 'A² Royal Events',
      message: 'Need full turnkey royal wedding planning, palace stage decoration, and luxury bridal car fleet for 1500 guests in Tirunelveli.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 450000,
      timestamp: '2026-09-17T11:20:00.000Z'
    },
    {
      id: 'AM-L-1023',
      name: 'R. Vignesh & Partners',
      phone: '+91 94432 87654',
      email: 'vignesh.infra@gmail.com',
      division: 'AM Real Estate\'s',
      message: 'Looking for 3 acres commercial plotted development land near Tenkasi – Ambasamudram highway with clear DTCP approval.',
      source: 'Cost Estimator Tool',
      status: 'Quoted',
      estimatedValue: 850000,
      timestamp: '2026-09-16T14:45:00.000Z'
    },
    {
      id: 'AM-L-1022',
      name: 'Dr. Anand Ramanathan',
      phone: '+91 88701 23456',
      email: 'anand.healthcare@yahoo.com',
      division: 'AM Infotech',
      message: 'Need a complete hospital patient appointment portal and cloud medical record management system with mobile app integration.',
      source: 'Website Contact Form',
      status: 'In Progress',
      estimatedValue: 75000,
      timestamp: '2026-09-15T09:30:00.000Z'
    },
    {
      id: 'AM-L-1021',
      name: 'Murugan Modern Mills',
      phone: '+91 98400 99881',
      email: 'muruganmills@rediffmail.com',
      division: 'SB Food Production',
      message: 'Requirement for bulk supply of authentic South Indian sambar powder and turmeric blend (500 kg monthly for retail distribution).',
      source: 'Modal Quick Inquiry',
      status: 'Converted',
      estimatedValue: 65000,
      timestamp: '2026-09-14T16:15:00.000Z'
    },
    {
      id: 'AM-L-1020',
      name: 'Priya Meenakshi Sundaram',
      phone: '+91 97890 11223',
      email: 'priya.sundar@outlook.com',
      division: 'AM Consultancy',
      message: 'Seeking educational consultancy and university admissions guidance for master degree in Germany & UK for 2 students.',
      source: 'Website Contact Form',
      status: 'Contacted',
      estimatedValue: 40000,
      timestamp: '2026-09-13T10:00:00.000Z'
    },
    {
      id: 'AM-L-1019',
      name: 'Captain J. Rajesh',
      phone: '+91 88703 99112',
      email: 'rajesh.events@gmail.com',
      division: 'A² Royal Events',
      message: 'Silver Jubilee wedding anniversary celebration banquet and theme lighting orchestration at Ambai Vrukshaa venue.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 180000,
      timestamp: '2026-09-10T15:30:00.000Z'
    },
    {
      id: 'AM-L-1018',
      name: 'Tirunelveli Agro Exports',
      phone: '+91 94862 33445',
      email: 'info@tirunelveliagro.in',
      division: 'AM Infotech',
      message: 'E-commerce export catalog website with multi-currency payment gateway and inventory tracking.',
      source: 'Cost Estimator Tool',
      status: 'Quoted',
      estimatedValue: 45000,
      timestamp: '2026-09-08T12:10:00.000Z'
    },
    {
      id: 'AM-L-1017',
      name: 'M. Selvakumar Builders',
      phone: '+91 99441 55667',
      email: 'selva.builders@gmail.com',
      division: 'AM Real Estate\'s',
      message: 'Facilitation of 4 residential plots in Urkad Senaiar street extension for independent villa constructions.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 400000,
      timestamp: '2026-09-04T11:00:00.000Z'
    },
    {
      id: 'AM-L-1016',
      name: 'Subramanian Caterers',
      phone: '+91 98842 77889',
      email: 'subramanian.food@gmail.com',
      division: 'SB Food Production',
      message: 'Regular order for pure ground rasam powder, sambar mix, and curry masala for industrial wedding catering contracts.',
      source: 'Direct WhatsApp Chat',
      status: 'Converted',
      estimatedValue: 35000,
      timestamp: '2026-08-28T14:20:00.000Z'
    },
    {
      id: 'AM-L-1015',
      name: 'Alagappa Educational Trust',
      phone: '+91 94421 88990',
      email: 'admissions@alagappaedu.org',
      division: 'AM Consultancy',
      message: 'Comprehensive regional branding, advertising campaign and student enrollment strategy for academic session 2026-27.',
      source: 'Website Contact Form',
      status: 'Quoted',
      estimatedValue: 80000,
      timestamp: '2026-08-22T09:45:00.000Z'
    },
    {
      id: 'AM-L-1014',
      name: 'A. Balakrishnan',
      phone: '+91 97500 44332',
      email: 'bala.krishnan@gmail.com',
      division: 'A² Royal Events',
      message: 'Corporate conference, stage backdrop, VIP audio-visual sound setup and buffet dinner arrangement for 400 executives.',
      source: 'Cost Estimator Tool',
      status: 'Converted',
      estimatedValue: 220000,
      timestamp: '2026-08-15T16:00:00.000Z'
    },
    {
      id: 'AM-L-1013',
      name: 'Deepak Textiles',
      phone: '+91 98432 11998',
      email: 'deepak.textiles@hotmail.com',
      division: 'AM Infotech',
      message: 'Custom POS billing software and cloud barcode inventory system for 3 retail showroom outlets in Tirunelveli.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 60000,
      timestamp: '2026-08-05T13:30:00.000Z'
    },
    {
      id: 'AM-L-1012',
      name: 'G. Sundaram Properties',
      phone: '+91 94433 22110',
      email: 'sundaram.realty@gmail.com',
      division: 'AM Real Estate\'s',
      message: 'Legal vetting and property brokerage advisory for 12,000 sq.ft commercial showroom building on High School Road.',
      source: 'Website Contact Form',
      status: 'Quoted',
      estimatedValue: 300000,
      timestamp: '2026-07-29T11:15:00.000Z'
    },
    {
      id: 'AM-L-1011',
      name: 'Vasanth Supermarket',
      phone: '+91 99941 77665',
      email: 'vasanth.retail@gmail.com',
      division: 'SB Food Production',
      message: 'White-label packaging contract for 200g and 500g sambar powder pouches for 5 chain stores.',
      source: 'Modal Quick Inquiry',
      status: 'Converted',
      estimatedValue: 48000,
      timestamp: '2026-07-18T10:00:00.000Z'
    },
    {
      id: 'AM-L-1010',
      name: 'Apex Academy',
      phone: '+91 98411 22334',
      email: 'contact@apexacademy.in',
      division: 'AM Consultancy',
      message: 'Market research on competitive educational coaching trends in southern districts and teacher training workshops.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 35000,
      timestamp: '2026-07-08T15:40:00.000Z'
    },
    {
      id: 'AM-L-1009',
      name: 'Dr. Revathi Wedding',
      phone: '+91 88701 44556',
      email: 'revathi.doc@gmail.com',
      division: 'A² Royal Events',
      message: 'South Indian Brahmin Royal Wedding with traditional floral mandap, grand reception illumination, and wedding car fleet.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 320000,
      timestamp: '2026-06-25T12:00:00.000Z'
    },
    {
      id: 'AM-L-1008',
      name: 'Sri Ganapathy Modern Rice Mill',
      phone: '+91 94431 66778',
      email: 'ganapathy.rice@gmail.com',
      division: 'AM Infotech',
      message: 'Web portal and customer dispatch tracking management software with automated SMS alerts.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 50000,
      timestamp: '2026-06-14T14:10:00.000Z'
    },
    {
      id: 'AM-L-1007',
      name: 'Ambasamudram Land Trust',
      phone: '+91 98425 11229',
      email: 'ambailand@gmail.com',
      division: 'AM Real Estate\'s',
      message: 'Boundary survey and joint development agreement documentation for 1.5 acres residential layout.',
      source: 'Website Contact Form',
      status: 'Converted',
      estimatedValue: 250000,
      timestamp: '2026-06-02T10:30:00.000Z'
    }
  ];

  // =========================================================================
  // 2. STATE & DATA INITIALIZATION
  // =========================================================================
  const PIN_CODE = '1234'; // Default Demo Owner PIN
  let leads = [];
  let divisionChartInstance = null;
  let statusChartInstance = null;
  let growthChartInstance = null;
  let currentMetricMode = 'leads'; // 'leads' or 'value'

  const loadLeadsData = () => {
    try {
      const stored = localStorage.getItem('am_global_leads');
      if (stored) {
        leads = JSON.parse(stored);
      } else {
        leads = [...DEFAULT_LEADS];
        localStorage.setItem('am_global_leads', JSON.stringify(leads));
      }
    } catch (e) {
      console.error('Error loading leads:', e);
      leads = [...DEFAULT_LEADS];
    }
  };

  const saveLeadsData = () => {
    try {
      localStorage.setItem('am_global_leads', JSON.stringify(leads));
    } catch (e) {
      console.error('Error saving leads:', e);
    }
  };

  // Toast Helper
  const showAdminToast = (msg, isSuccess = true) => {
    const toast = document.getElementById('adminToast');
    const toastMsg = document.getElementById('adminToastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold transform translate-y-0 opacity-100 transition-all duration-300 ${
      isSuccess ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
    }`;
    toast.classList.remove('hidden');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 4000);
  };

  // Live Clock
  const updateLiveClock = () => {
    const clockEl = document.getElementById('liveClock');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleDateString('en-IN', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  };
  setInterval(updateLiveClock, 1000);
  updateLiveClock();

  // =========================================================================
  // 3. AUTHENTICATION (SECURITY OVERLAY)
  // =========================================================================
  const authOverlay = document.getElementById('authOverlay');
  const mainDashboard = document.getElementById('mainDashboard');
  const authForm = document.getElementById('authForm');
  const pinInput = document.getElementById('pinInput');
  const authError = document.getElementById('authError');
  const rememberSession = document.getElementById('rememberSession');
  const togglePinVisibility = document.getElementById('togglePinVisibility');
  const logoutBtn = document.getElementById('logoutBtn');

  // Check if session is already remembered
  const isAuth = localStorage.getItem('am_owner_auth') === 'true' || sessionStorage.getItem('am_owner_auth') === 'true';

  const unlockDashboard = () => {
    if (authOverlay && mainDashboard) {
      authOverlay.classList.add('hidden');
      mainDashboard.classList.remove('hidden');
      renderDashboard();
    }
  };

  const lockDashboard = () => {
    localStorage.removeItem('am_owner_auth');
    sessionStorage.removeItem('am_owner_auth');
    if (authOverlay && mainDashboard) {
      mainDashboard.classList.add('hidden');
      authOverlay.classList.remove('hidden');
      if (pinInput) pinInput.value = '';
    }
  };

  if (isAuth) {
    unlockDashboard();
  }

  if (togglePinVisibility && pinInput) {
    togglePinVisibility.addEventListener('click', () => {
      const isPwd = pinInput.type === 'password';
      pinInput.type = isPwd ? 'text' : 'password';
      togglePinVisibility.innerHTML = isPwd ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = pinInput.value.trim();

      if (enteredPin === PIN_CODE) {
        if (rememberSession && rememberSession.checked) {
          localStorage.setItem('am_owner_auth', 'true');
        } else {
          sessionStorage.setItem('am_owner_auth', 'true');
        }
        authError.classList.add('hidden');
        unlockDashboard();
        showAdminToast('Welcome, Executive Owner! Dashboard unlocked.');
      } else {
        authError.classList.remove('hidden');
        pinInput.focus();
        pinInput.select();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      lockDashboard();
      showAdminToast('Dashboard locked successfully.');
    });
  }

  // =========================================================================
  // 4. COMPUTATIONS & SCORECARD LOGIC
  // =========================================================================
  const DIVISIONS = [
    { key: 'AM Infotech', name: 'AM Infotech', focus: 'Software & Web Platforms', color: '#2563EB' },
    { key: 'AM Consultancy', name: 'AM Consultancy', focus: 'Strategy & Education', color: '#059669' },
    { key: 'AM Real Estate\'s', name: 'AM Real Estate\'s', focus: 'Lands & Commercial Plots', color: '#D97706' },
    { key: 'A² Royal Events', name: 'A² Royal Events', focus: 'Weddings & Conventions', color: '#9333EA' },
    { key: 'SB Food Production', name: 'SB Food Production', focus: 'Spices & Pure Foods', color: '#0D9488' }
  ];

  const computeMetrics = () => {
    const totalLeads = leads.length;
    const totalValue = leads.reduce((acc, l) => acc + (Number(l.estimatedValue) || 0), 0);
    const wonCount = leads.filter(l => l.status === 'Converted').length;
    const activeCount = leads.filter(l => ['New', 'Contacted', 'Quoted', 'In Progress'].includes(l.status)).length;
    const conversionRate = totalLeads > 0 ? ((wonCount / totalLeads) * 100).toFixed(1) : 0;

    // Division Aggregates
    const divisionStats = {};
    DIVISIONS.forEach(div => {
      divisionStats[div.name] = {
        name: div.name,
        focus: div.focus,
        color: div.color,
        count: 0,
        value: 0,
        converted: 0
      };
    });

    leads.forEach(l => {
      const dName = l.division;
      if (divisionStats[dName]) {
        divisionStats[dName].count += 1;
        divisionStats[dName].value += (Number(l.estimatedValue) || 0);
        if (l.status === 'Converted') {
          divisionStats[dName].converted += 1;
        }
      }
    });

    // Find top division by pipeline value & leads
    let topDiv = DIVISIONS[3].name; // Default A2 Royal Events
    let maxVal = -1;
    Object.values(divisionStats).forEach(s => {
      if (s.value > maxVal) {
        maxVal = s.value;
        topDiv = s.name;
      }
    });

    return {
      totalLeads,
      totalValue,
      wonCount,
      activeCount,
      conversionRate,
      topDiv,
      divisionStats
    };
  };

  // =========================================================================
  // 5. CHARTS RENDERING (CHART.JS)
  // =========================================================================
  const initDivisionComparisonChart = (stats) => {
    const ctx = document.getElementById('divisionComparisonChart');
    if (!ctx) return;

    const labels = DIVISIONS.map(d => d.name);
    const dataLeads = DIVISIONS.map(d => stats[d.name]?.count || 0);
    const dataValueLakhs = DIVISIONS.map(d => ((stats[d.name]?.value || 0) / 100000).toFixed(2));
    const backgroundColors = DIVISIONS.map(d => d.color);

    if (divisionChartInstance) divisionChartInstance.destroy();

    const isLeads = currentMetricMode === 'leads';

    divisionChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: isLeads ? 'Number of Inquiries' : 'Pipeline Value (₹ in Lakhs)',
          data: isLeads ? dataLeads : dataValueLakhs,
          backgroundColor: backgroundColors,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0D1B2A',
            titleColor: '#FFFFFF',
            bodyColor: '#E2E8F0',
            borderColor: '#415A77',
            borderWidth: 1,
            callbacks: {
              label: (item) => isLeads ? `${item.raw} Inquiries` : `₹${item.raw} Lakhs`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#94A3B8',
              font: { size: 11, family: 'Plus Jakarta Sans' }
            }
          },
          y: {
            grid: { color: 'rgba(65, 90, 119, 0.15)' },
            ticks: {
              color: '#94A3B8',
              font: { size: 11 }
            }
          }
        }
      }
    });
  };

  const initStatusDoughnutChart = () => {
    const ctx = document.getElementById('statusDoughnutChart');
    if (!ctx) return;

    const statusCounts = {
      'New': 0,
      'Contacted': 0,
      'Quoted': 0,
      'Converted': 0,
      'Closed': 0
    };

    leads.forEach(l => {
      const s = l.status || 'New';
      if (statusCounts[s] !== undefined) {
        statusCounts[s]++;
      } else {
        statusCounts['Contacted']++;
      }
    });

    if (statusChartInstance) statusChartInstance.destroy();

    statusChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: [
            '#3B82F6', // New (Blue)
            '#F59E0B', // Contacted (Amber)
            '#8B5CF6', // Quoted (Purple)
            '#10B981', // Converted (Emerald)
            '#64748B'  // Closed (Slate)
          ],
          borderWidth: 2,
          borderColor: '#1B263B'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#CBD5E1',
              font: { size: 11, family: 'Plus Jakarta Sans' },
              padding: 14,
              boxWidth: 10
            }
          }
        },
        cutout: '70%'
      }
    });
  };

  const initMonthlyGrowthChart = () => {
    const ctx = document.getElementById('monthlyGrowthChart');
    if (!ctx) return;

    // Timeline analysis June to September 2026
    const months = ['June 2026', 'July 2026', 'August 2026', 'September 2026'];
    const leadVolumeTrend = [3, 4, 5, 8];
    const dealValueTrend = [6.2, 8.5, 12.8, 28.6]; // In Lakhs

    if (growthChartInstance) growthChartInstance.destroy();

    growthChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Monthly Inquiries Volume',
            data: leadVolumeTrend,
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            fill: true,
            tension: 0.35,
            yAxisID: 'y'
          },
          {
            label: 'Est. Deal Value (₹ in Lakhs)',
            data: dealValueTrend,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            fill: true,
            borderDash: [5, 5],
            tension: 0.35,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#CBD5E1', font: { size: 11 } }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#94A3B8' }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: 'rgba(65, 90, 119, 0.15)' },
            ticks: { color: '#3B82F6', precision: 0 }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              color: '#10B981',
              callback: (v) => `₹${v}L`
            }
          }
        }
      }
    });
  };

  // Metric Toggle Buttons
  const chartViewLeadsBtn = document.getElementById('chartViewLeadsBtn');
  const chartViewValueBtn = document.getElementById('chartViewValueBtn');

  if (chartViewLeadsBtn && chartViewValueBtn) {
    chartViewLeadsBtn.addEventListener('click', () => {
      currentMetricMode = 'leads';
      chartViewLeadsBtn.className = 'px-3 py-1.5 rounded-lg font-bold bg-blue-600 text-white transition-all';
      chartViewValueBtn.className = 'px-3 py-1.5 rounded-lg font-bold text-slate-400 hover:text-white transition-all';
      const m = computeMetrics();
      initDivisionComparisonChart(m.divisionStats);
    });

    chartViewValueBtn.addEventListener('click', () => {
      currentMetricMode = 'value';
      chartViewValueBtn.className = 'px-3 py-1.5 rounded-lg font-bold bg-blue-600 text-white transition-all';
      chartViewLeadsBtn.className = 'px-3 py-1.5 rounded-lg font-bold text-slate-400 hover:text-white transition-all';
      const m = computeMetrics();
      initDivisionComparisonChart(m.divisionStats);
    });
  }

  // =========================================================================
  // 6. RENDER SCORECARD & LEADS TABLE
  // =========================================================================
  const renderScorecardTable = (divisionStats) => {
    const tbody = document.getElementById('scorecardTableBody');
    if (!tbody) return;

    const rowsHtml = DIVISIONS.map(div => {
      const stat = divisionStats[div.name] || { count: 0, value: 0, converted: 0 };
      const convRate = stat.count > 0 ? ((stat.converted / stat.count) * 100).toFixed(1) : 0;
      const formattedVal = (stat.value / 100000).toFixed(2);
      
      const growthLabel = div.name === 'A² Royal Events' ? '+35% MoM' :
                          div.name === 'AM Real Estate\'s' ? '+28% MoM' :
                          div.name === 'AM Infotech' ? '+22% MoM' :
                          div.name === 'SB Food Production' ? '+19% MoM' : '+15% MoM';

      const statusBadge = convRate >= 60 ? '<span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">🚀 High Growth</span>' :
                          convRate >= 40 ? '<span class="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold">⭐ Steady</span>' :
                          '<span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">📈 Emerging</span>';

      return `
        <tr class="hover:bg-slate-800/40 transition-colors">
          <td class="py-3.5 px-4 font-bold text-white flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full" style="background-color: ${div.color}"></span>
            <span>${div.name}</span>
          </td>
          <td class="py-3.5 px-4 text-slate-300">${div.focus}</td>
          <td class="py-3.5 px-4 text-center font-bold text-white">${stat.count}</td>
          <td class="py-3.5 px-4 text-center font-semibold text-emerald-400">₹${formattedVal} Lakhs</td>
          <td class="py-3.5 px-4 text-center font-bold text-blue-400">${convRate}%</td>
          <td class="py-3.5 px-4 text-center font-semibold text-slate-300">${growthLabel}</td>
          <td class="py-3.5 px-4 text-right">${statusBadge}</td>
        </tr>
      `;
    }).join('');

    tbody.innerHTML = rowsHtml;
  };

  const renderLeadsTable = () => {
    const tbody = document.getElementById('leadsTableBody');
    const counterText = document.getElementById('leadsCounterText');
    const searchVal = (document.getElementById('leadSearchInput')?.value || '').toLowerCase().trim();
    const divFilter = document.getElementById('divisionFilterSelect')?.value || 'all';
    const statusFilter = document.getElementById('statusFilterSelect')?.value || 'all';

    if (!tbody) return;

    const filtered = leads.filter(l => {
      const matchSearch = (l.name || '').toLowerCase().includes(searchVal) ||
                          (l.phone || '').toLowerCase().includes(searchVal) ||
                          (l.email || '').toLowerCase().includes(searchVal) ||
                          (l.message || '').toLowerCase().includes(searchVal);
      const matchDiv = divFilter === 'all' || l.division === divFilter;
      const matchStatus = statusFilter === 'all' || l.status === statusFilter;
      return matchSearch && matchDiv && matchStatus;
    });

    if (counterText) {
      counterText.textContent = `Showing ${filtered.length} of ${leads.length} customer inquiries`;
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-slate-400">
            <i class="fa-solid fa-magnifying-glass text-2xl text-slate-600 block mb-2"></i>
            No matching inquiries found. Try changing your search or filter criteria.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(l => {
      const formattedDate = new Date(l.timestamp).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
      const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${l.name}, greetings from AM Global Groups! We are following up regarding your inquiry for ${l.division}.`)}`;

      const statusClass = l.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          l.status === 'Quoted' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' :
                          l.status === 'Contacted' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                          l.status === 'New' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40 animate-pulse' :
                          'bg-slate-700 text-slate-300';

      return `
        <tr class="hover:bg-slate-800/50 transition-colors">
          <td class="py-3 px-3">
            <span class="font-mono font-bold text-white block text-[11px]">${l.id}</span>
            <span class="text-[10px] text-slate-400">${formattedDate}</span>
          </td>
          <td class="py-3 px-3">
            <strong class="text-white block font-semibold">${l.name}</strong>
            <span class="text-slate-400 text-[11px] block">${l.phone}</span>
            <span class="text-slate-500 text-[10px] block truncate max-w-[140px]">${l.email || 'No email'}</span>
          </td>
          <td class="py-3 px-3">
            <span class="font-semibold text-slate-200 block">${l.division}</span>
            <span class="text-[10px] text-slate-400">${l.source || 'Website'}</span>
          </td>
          <td class="py-3 px-3 font-semibold text-emerald-400">
            ₹${Number(l.estimatedValue || 0).toLocaleString('en-IN')}
          </td>
          <td class="py-3 px-3 text-slate-300 max-w-[160px] truncate" title="${l.message || ''}">
            ${l.message || 'No details provided'}
          </td>
          <td class="py-3 px-3">
            <select class="lead-status-changer px-2 py-1 rounded-lg text-[10px] font-bold ${statusClass} outline-none cursor-pointer bg-slate-900" data-id="${l.id}">
              <option value="New" ${l.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${l.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="Quoted" ${l.status === 'Quoted' ? 'selected' : ''}>Quoted</option>
              <option value="Converted" ${l.status === 'Converted' ? 'selected' : ''}>Converted</option>
              <option value="Closed" ${l.status === 'Closed' ? 'selected' : ''}>Closed</option>
            </select>
          </td>
          <td class="py-3 px-3 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button class="view-lead-btn p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-400 transition-colors" title="View Full Details" data-id="${l.id}">
                <i class="fa-solid fa-eye text-xs"></i>
              </button>
              <a href="${waLink}" target="_blank" class="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-900/50 text-emerald-400 transition-colors" title="WhatsApp Customer">
                <i class="fa-brands fa-whatsapp text-xs"></i>
              </a>
              <a href="tel:${l.phone}" class="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-900/50 text-blue-300 transition-colors" title="Call Customer">
                <i class="fa-solid fa-phone text-[10px]"></i>
              </a>
              <button class="delete-lead-btn p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/50 text-rose-400 transition-colors" title="Delete" data-id="${l.id}">
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach row events
    attachLeadTableEvents();
  };

  const attachLeadTableEvents = () => {
    // Status changers
    document.querySelectorAll('.lead-status-changer').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = sel.getAttribute('data-id');
        const newStatus = sel.value;
        const target = leads.find(l => l.id === id);
        if (target) {
          target.status = newStatus;
          saveLeadsData();
          renderDashboard();
          showAdminToast(`Lead ${id} status updated to ${newStatus}`);
        }
      });
    });

    // View details
    document.querySelectorAll('.view-lead-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const target = leads.find(l => l.id === id);
        if (target) openLeadDetailModal(target);
      });
    });

    // Delete lead
    document.querySelectorAll('.delete-lead-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm(`Are you sure you want to delete lead ${id}?`)) {
          leads = leads.filter(l => l.id !== id);
          saveLeadsData();
          renderDashboard();
          showAdminToast(`Lead ${id} deleted.`);
        }
      });
    });
  };

  // Lead Detail Modal
  const leadDetailModal = document.getElementById('leadDetailModal');
  const closeLeadDetailModal = document.getElementById('closeLeadDetailModal');

  const openLeadDetailModal = (lead) => {
    if (!leadDetailModal) return;

    document.getElementById('detailCustomerName').textContent = lead.name;
    document.getElementById('detailLeadMeta').textContent = `Lead ID: ${lead.id} • ${new Date(lead.timestamp).toLocaleString('en-IN')}`;
    document.getElementById('detailDivision').textContent = lead.division;
    document.getElementById('detailValue').textContent = `₹${Number(lead.estimatedValue || 0).toLocaleString('en-IN')}`;
    document.getElementById('detailPhone').textContent = lead.phone || 'Not Provided';
    document.getElementById('detailEmail').textContent = lead.email || 'Not Provided';
    document.getElementById('detailMessage').textContent = lead.message || 'No description provided.';
    
    const badge = document.getElementById('detailStatusBadge');
    if (badge) {
      badge.textContent = lead.status;
      badge.className = `px-2 py-0.5 rounded-full text-[10px] font-bold ${
        lead.status === 'Converted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
      }`;
    }

    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const waBtn = document.getElementById('detailWhatsAppBtn');
    const callBtn = document.getElementById('detailCallBtn');
    if (waBtn) waBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${lead.name}, greetings from AM Global Groups regarding your inquiry for ${lead.division}.`)}`;
    if (callBtn) callBtn.href = `tel:${lead.phone}`;

    leadDetailModal.classList.remove('hidden');
  };

  if (closeLeadDetailModal && leadDetailModal) {
    closeLeadDetailModal.addEventListener('click', () => leadDetailModal.classList.add('hidden'));
    leadDetailModal.addEventListener('click', (e) => {
      if (e.target === leadDetailModal) leadDetailModal.classList.add('hidden');
    });
  }

  // =========================================================================
  // 7. ADD OFFLINE LEAD MODAL
  // =========================================================================
  const addLeadModal = document.getElementById('addLeadModal');
  const openAddLeadBtn = document.getElementById('openAddLeadBtn');
  const closeAddLeadModal = document.getElementById('closeAddLeadModal');
  const addLeadForm = document.getElementById('addLeadForm');

  if (openAddLeadBtn && addLeadModal) {
    openAddLeadBtn.addEventListener('click', () => addLeadModal.classList.remove('hidden'));
  }
  if (closeAddLeadModal && addLeadModal) {
    closeAddLeadModal.addEventListener('click', () => addLeadModal.classList.add('hidden'));
    addLeadModal.addEventListener('click', (e) => {
      if (e.target === addLeadModal) addLeadModal.classList.add('hidden');
    });
  }

  if (addLeadForm) {
    addLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newLead = {
        id: 'AM-L-' + Math.floor(2000 + Math.random() * 8000),
        name: document.getElementById('newLeadName').value.trim(),
        phone: document.getElementById('newLeadPhone').value.trim(),
        email: document.getElementById('newLeadEmail').value.trim() || 'Not Provided',
        division: document.getElementById('newLeadDivision').value,
        estimatedValue: Number(document.getElementById('newLeadValue').value) || 25000,
        message: document.getElementById('newLeadMessage').value.trim() || 'Direct walk-in / offline inquiry',
        source: 'Office Walk-in / Phone',
        status: 'New',
        timestamp: new Date().toISOString()
      };

      leads.unshift(newLead);
      saveLeadsData();
      addLeadForm.reset();
      addLeadModal.classList.add('hidden');
      renderDashboard();
      showAdminToast(`Lead for ${newLead.name} added successfully!`);
    });
  }

  // Search & Filter Listeners
  document.getElementById('leadSearchInput')?.addEventListener('input', renderLeadsTable);
  document.getElementById('divisionFilterSelect')?.addEventListener('change', renderLeadsTable);
  document.getElementById('statusFilterSelect')?.addEventListener('change', renderLeadsTable);

  // Refresh and Seed Controls
  document.getElementById('refreshDataBtn')?.addEventListener('click', () => {
    loadLeadsData();
    renderDashboard();
    showAdminToast('Dashboard data refreshed with latest records.');
  });

  document.getElementById('seedDataBtn')?.addEventListener('click', () => {
    if (confirm('Reset to comprehensive historical demonstration dataset?')) {
      leads = [...DEFAULT_LEADS];
      saveLeadsData();
      renderDashboard();
      showAdminToast('Demo historical dataset reloaded successfully.');
    }
  });

  // =========================================================================
  // 8. 1-CLICK PDF EXPORT SYSTEM (html2pdf.js)
  // =========================================================================
  const exportPdfBtn = document.getElementById('exportPdfBtn');

  const generatePdfReport = async () => {
    if (!exportPdfBtn) return;
    const originalBtnHtml = exportPdfBtn.innerHTML;
    exportPdfBtn.disabled = true;
    exportPdfBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Generating PDF...
    `;

    // 1. Prepare PDF template contents
    const metrics = computeMetrics();
    const todayStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    document.getElementById('pdfReportDate').textContent = todayStr;
    document.getElementById('pdfKpiTotal').textContent = metrics.totalLeads;
    document.getElementById('pdfKpiValue').textContent = `₹${(metrics.totalValue / 100000).toFixed(2)} Lakhs`;
    document.getElementById('pdfKpiConv').textContent = `${metrics.conversionRate}%`;
    document.getElementById('pdfKpiTop').textContent = metrics.topDiv;

    // Populate PDF Scorecard Table
    const pdfScorecardBody = document.getElementById('pdfScorecardBody');
    if (pdfScorecardBody) {
      pdfScorecardBody.innerHTML = DIVISIONS.map((div, i) => {
        const stat = metrics.divisionStats[div.name] || { count: 0, value: 0, converted: 0 };
        const convRate = stat.count > 0 ? ((stat.converted / stat.count) * 100).toFixed(1) : 0;
        const valLakhs = (stat.value / 100000).toFixed(2);
        const growth = div.name === 'A² Royal Events' ? '+35%' : div.name === 'AM Real Estate\'s' ? '+28%' : '+20%';
        const bg = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC';

        return `
          <tr style="background-color: ${bg}; border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 7px 10px; font-weight: 700; color: #1E293B;">${div.name}</td>
            <td style="padding: 7px 10px; color: #4B5563;">${div.focus}</td>
            <td style="padding: 7px 10px; text-align: center; font-weight: 700;">${stat.count}</td>
            <td style="padding: 7px 10px; text-align: center; color: #16A34A; font-weight: 700;">₹${valLakhs} L</td>
            <td style="padding: 7px 10px; text-align: center; color: #2563EB; font-weight: 700;">${convRate}%</td>
            <td style="padding: 7px 10px; text-align: center; font-weight: 700; color: #16A34A;">${growth}</td>
          </tr>
        `;
      }).join('');
    }

    // Populate PDF Leads Table (top 15 recent inquiries)
    const pdfLeadsBody = document.getElementById('pdfLeadsBody');
    if (pdfLeadsBody) {
      const topLeads = leads.slice(0, 14);
      pdfLeadsBody.innerHTML = topLeads.map((l, i) => {
        const bg = i % 2 === 0 ? '#FFFFFF' : '#F9FAFB';
        const dStr = new Date(l.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        return `
          <tr style="background-color: ${bg}; border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 6px 8px; font-weight: 600; font-family: monospace;">${l.id} (${dStr})</td>
            <td style="padding: 6px 8px; font-weight: 700; color: #111827;">${l.name}</td>
            <td style="padding: 6px 8px; color: #4B5563;">${l.phone}</td>
            <td style="padding: 6px 8px; color: #1F2937;">${l.division}</td>
            <td style="padding: 6px 8px; font-weight: 600; color: #15803D;">₹${Number(l.estimatedValue || 0).toLocaleString('en-IN')}</td>
            <td style="padding: 6px 8px; text-align: center; font-weight: 700; color: ${l.status === 'Converted' ? '#16A34A' : '#2563EB'};">${l.status}</td>
          </tr>
        `;
      }).join('');
    }

    // 2. html2pdf settings
    const element = document.getElementById('pdfReportTemplate');
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `AM_Global_Groups_Executive_Report_${new Date().toISOString().slice(0,10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
      showAdminToast('Executive PDF Report exported and downloaded successfully!');
    } catch (pdfErr) {
      console.error('PDF export error:', pdfErr);
      showAdminToast('Could not generate PDF directly, please check browser settings.', false);
    } finally {
      exportPdfBtn.disabled = false;
      exportPdfBtn.innerHTML = originalBtnHtml;
    }
  };

  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', generatePdfReport);
  }

  // =========================================================================
  // 9. MASTER RENDER CONTROLLER
  // =========================================================================
  const renderDashboard = () => {
    loadLeadsData();
    const metrics = computeMetrics();

    // Update KPI counters
    const kpiTotal = document.getElementById('kpiTotalLeads');
    const kpiVal = document.getElementById('kpiPipelineValue');
    const kpiConv = document.getElementById('kpiConversionRate');
    const kpiTop = document.getElementById('kpiTopDivision');
    const kpiWon = document.getElementById('kpiWonCount');
    const kpiActive = document.getElementById('kpiActiveCount');

    if (kpiTotal) kpiTotal.textContent = metrics.totalLeads;
    if (kpiVal) kpiVal.textContent = `₹${(metrics.totalValue / 100000).toFixed(2)}L`;
    if (kpiConv) kpiConv.textContent = `${metrics.conversionRate}%`;
    if (kpiTop) kpiTop.textContent = metrics.topDiv;
    if (kpiWon) kpiWon.textContent = metrics.wonCount;
    if (kpiActive) kpiActive.textContent = metrics.activeCount;

    // Render Charts
    initDivisionComparisonChart(metrics.divisionStats);
    initStatusDoughnutChart();
    initMonthlyGrowthChart();

    // Render Tables
    renderScorecardTable(metrics.divisionStats);
    renderLeadsTable();
  };

  // Initial load
  loadLeadsData();
  if (isAuth) {
    renderDashboard();
  }
});
