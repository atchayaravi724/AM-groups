/**
 * AM GLOBAL GROUPS — Official Corporate Backend & CRM API Server
 * Registered under Ministry of MSME, Govt of India (UDYAM-TN-18-0102459)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Data Storage Paths
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Database Helper Functions
const readDB = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      // Initialize with sample inquiries for immediate CRM demonstration
      const initialData = [
        {
          id: 'INQ-2026-001',
          name: 'K. Ramanathan',
          phone: '+91 98421 54321',
          email: 'ramanathan@enterprises.com',
          division: 'AM Infotech',
          message: 'Interested in building an enterprise web portal with custom cloud hosting and responsive UI/UX architecture.',
          source: 'Contact Form',
          quoteDetails: 'Professional Web App & Cloud Setup (₹25,000 – ₹45,000)',
          status: 'Contacted',
          createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
        },
        {
          id: 'INQ-2026-002',
          name: 'S. Murugan & Family',
          phone: '+91 94432 10987',
          email: 'murugan.events@gmail.com',
          division: 'A² Royal Events',
          message: 'Planning grand royal wedding reception. Need complete palace stage architecture, luxury BMW/Audi motorcade, and banquet feast.',
          source: 'Quote Estimator',
          quoteDetails: 'Grand Royal Wedding & Motorcade (₹1,50,000 – ₹3,50,000)',
          status: 'In Progress',
          createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
        },
        {
          id: 'INQ-2026-003',
          name: 'Anand Prabhu',
          phone: '+91 88703 11223',
          email: 'anand.catering@yahoo.co.in',
          division: 'SB Food Production',
          message: 'Looking for bulk monthly supply of authentic stone-ground sambar powder and turmeric for 5 catering kitchens.',
          source: 'Modal Quick Form',
          quoteDetails: 'Commercial Bulk Supply for Banquets (₹15,000 – ₹35,000)',
          status: 'Pending',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
        }
      ];
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content || '[]');
  } catch (err) {
    console.error('Error reading database:', err);
    return [];
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing database:', err);
    return false;
  }
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(__dirname));

// Route for Admin CRM Dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==========================================
// REST API ROUTES
// ==========================================

// 1. Submit New Inquiry / Quote
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, phone, email, division, message, source, quoteDetails } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Name and Phone number are required fields.'
      });
    }

    const inquiries = readDB();
    const newId = `INQ-2026-${String(inquiries.length + 1).padStart(3, '0')}`;

    const newInquiry = {
      id: newId,
      name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      division: division || 'AM Global Groups',
      message: (message || '').trim(),
      source: source || 'Website Portal',
      quoteDetails: quoteDetails || null,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    inquiries.unshift(newInquiry);
    writeDB(inquiries);

    console.log(`[NEW LEAD] ${newInquiry.id} - ${newInquiry.name} (${newInquiry.division})`);

    return res.status(201).json({
      success: true,
      message: 'Inquiry successfully registered in AM Global Groups Governance System.',
      data: newInquiry
    });
  } catch (err) {
    console.error('Error creating inquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// 2. Get Inquiries with Search & Filter
app.get('/api/inquiries', (req, res) => {
  try {
    let inquiries = readDB();
    const { division, status, search } = req.query;

    if (division && division !== 'all') {
      inquiries = inquiries.filter(item => 
        item.division.toLowerCase().includes(division.toLowerCase())
      );
    }

    if (status && status !== 'all') {
      inquiries = inquiries.filter(item => 
        item.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      inquiries = inquiries.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.division.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// 3. Update Inquiry Status
app.patch('/api/inquiries/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'In Progress', 'Contacted', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const inquiries = readDB();
    const itemIndex = inquiries.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return res.status(400).json({
        success: false,
        error: 'Inquiry record not found.'
      });
    }

    inquiries[itemIndex].status = status;
    inquiries[itemIndex].updatedAt = new Date().toISOString();
    writeDB(inquiries);

    return res.json({
      success: true,
      message: `Status updated to '${status}'.`,
      data: inquiries[itemIndex]
    });
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// 4. Delete Inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    let inquiries = readDB();
    const initialLen = inquiries.length;

    inquiries = inquiries.filter(item => item.id !== id);

    if (inquiries.length === initialLen) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry record not found.'
      });
    }

    writeDB(inquiries);

    return res.json({
      success: true,
      message: `Inquiry ${id} deleted successfully.`
    });
  } catch (err) {
    console.error('Error deleting inquiry:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// 5. Aggregate Analytics & Stats
app.get('/api/stats', (req, res) => {
  try {
    const inquiries = readDB();
    
    const byDivision = {
      'AM Infotech': 0,
      'AM Consultancy': 0,
      "AM Real Estate's": 0,
      'A² Royal Events': 0,
      'SB Food Production': 0,
      'Multi-Service / General': 0
    };

    const byStatus = {
      'Pending': 0,
      'In Progress': 0,
      'Contacted': 0,
      'Completed': 0
    };

    inquiries.forEach(item => {
      // Division grouping
      let matchedDiv = false;
      for (const key of Object.keys(byDivision)) {
        if (item.division && item.division.toLowerCase().includes(key.toLowerCase())) {
          byDivision[key]++;
          matchedDiv = true;
          break;
        }
      }
      if (!matchedDiv) byDivision['Multi-Service / General']++;

      // Status grouping
      if (byStatus[item.status] !== undefined) {
        byStatus[item.status]++;
      } else {
        byStatus['Pending']++;
      }
    });

    const now = new Date();
    const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const newLast24h = inquiries.filter(i => new Date(i.createdAt) >= past24h).length;

    return res.json({
      success: true,
      totalInquiries: inquiries.length,
      newLast24h,
      byDivision,
      byStatus
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
});

// 6. CSV Export of Inquiries
app.get('/api/export/csv', (req, res) => {
  try {
    const inquiries = readDB();
    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Division', 'Status', 'Source', 'Quote Details', 'Message'];
    
    const rows = inquiries.map(item => [
      `"${item.id || ''}"`,
      `"${new Date(item.createdAt).toLocaleString('en-IN')}"`,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${(item.email || '').replace(/"/g, '""')}"`,
      `"${(item.division || '').replace(/"/g, '""')}"`,
      `"${(item.status || '').replace(/"/g, '""')}"`,
      `"${(item.source || '').replace(/"/g, '""')}"`,
      `"${(item.quoteDetails || '').replace(/"/g, '""')}"`,
      `"${(item.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="AM_Global_Groups_Leads_${new Date().toISOString().split('T')[0]}.csv"`);
    return res.send(csvContent);
  } catch (err) {
    console.error('Error exporting CSV:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate CSV export.'
    });
  }
});

// 7. Direct Project ZIP Archive Download
app.get(['/download/zip', '/api/download/project-zip', '/download/project.zip'], (req, res) => {
  const zipFile = path.join(__dirname, 'AM_Global_Groups_Complete_Project.zip');
  if (fs.existsSync(zipFile)) {
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="AM_Global_Groups_Complete_Project.zip"');
    return res.sendFile(zipFile);
  } else {
    return res.status(404).json({
      success: false,
      error: 'ZIP archive file not found. Please generate it on the server.'
    });
  }
});

app.listen(PORT, () => {
  console.log('====================================================');
  console.log(` AM GLOBAL GROUPS — Enterprise Server Active`);
  console.log(` Registered Udyam: UDYAM-TN-18-0102459 (MSME Govt of India)`);
  console.log(` Portal URL:    http://localhost:${PORT}`);
  console.log(` CRM Admin URL: http://localhost:${PORT}/admin`);
  console.log(` API Endpoint:  http://localhost:${PORT}/api/inquiries`);
  console.log('====================================================');
});
