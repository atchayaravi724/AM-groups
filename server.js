/**
 * AM GLOBAL GROUPS — Official Corporate Backend & CRM API Server
 * Registered under Ministry of MSME, Govt of India (UDYAM-TN-18-0102459)
 * 
 * Powered by Persistent SQLite Relational Database Engine
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Database Layer
const db = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database on server startup
try {
  db.initDatabase();
} catch (dbInitErr) {
  console.error('[DATABASE] Critical: Failed to start database:', dbInitErr);
}

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

// 0. Database Status & Diagnostics Health Check
app.get('/api/db/status', (req, res) => {
  try {
    const status = db.getDatabaseStatus();
    return res.json({
      success: true,
      ...status
    });
  } catch (err) {
    console.error('Error fetching database status:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve database status'
    });
  }
});

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

    const createdInquiry = db.createInquiry({
      name,
      phone,
      email,
      division,
      message,
      source,
      quoteDetails
    });

    console.log(`[SQL INSERT] ${createdInquiry.id} - ${createdInquiry.name} (${createdInquiry.division})`);

    return res.status(201).json({
      success: true,
      message: 'Inquiry successfully registered in AM Global Groups SQL Database.',
      data: createdInquiry
    });
  } catch (err) {
    console.error('Error creating inquiry in database:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Database Error'
    });
  }
});

// 2. Get Inquiries with Search & Filter
app.get('/api/inquiries', (req, res) => {
  try {
    const { division, status, search } = req.query;
    const inquiries = db.getInquiries({ division, status, search });

    return res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    console.error('Error fetching inquiries from database:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Database Error'
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

    const existing = db.getInquiryById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry record not found in database.'
      });
    }

    const updated = db.updateInquiryStatus(id, status);

    return res.json({
      success: true,
      message: `Status updated to '${status}' in SQL Database.`,
      data: updated
    });
  } catch (err) {
    console.error('Error updating status in database:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Database Error'
    });
  }
});

// 4. Delete Inquiry
app.delete('/api/inquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.getInquiryById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry record not found in database.'
      });
    }

    db.deleteInquiry(id);

    return res.json({
      success: true,
      message: `Inquiry ${id} deleted successfully from database.`
    });
  } catch (err) {
    console.error('Error deleting inquiry from database:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Database Error'
    });
  }
});

// 5. Aggregate Analytics & Stats
app.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStatistics();
    return res.json({
      success: true,
      ...stats
    });
  } catch (err) {
    console.error('Error fetching statistics:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Database Error'
    });
  }
});

// 6. Newsletter Subscription
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'A valid email address is required.'
      });
    }

    db.addNewsletterSubscriber(email);

    return res.status(201).json({
      success: true,
      message: 'Subscribed to AM Global Groups updates successfully.'
    });
  } catch (err) {
    console.error('Error adding subscriber:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to record subscription.'
    });
  }
});

// 7. CSV Export of Inquiries
app.get('/api/export/csv', (req, res) => {
  try {
    const inquiries = db.getAllInquiries();
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

// 8. Direct Project ZIP Archive Download
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

// ==========================================
// CUSTOMER FEEDBACK & REVIEWS API
// ==========================================

// 9. Get Customer Feedback List
app.get('/api/feedback', (req, res) => {
  try {
    const { division, search, limit, status } = req.query;
    const feedbackList = db.getFeedbackList({
      division,
      search,
      limit: limit ? parseInt(limit, 10) : 50,
      status: status || 'Approved'
    });
    return res.json({
      success: true,
      count: feedbackList.length,
      data: feedbackList
    });
  } catch (err) {
    console.error('Error fetching customer feedback:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error fetching reviews'
    });
  }
});

// 10. Submit New Customer Feedback
app.post('/api/feedback', (req, res) => {
  try {
    const { name, location, division, rating, serviceAvailed, comment } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Customer name is required.'
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Feedback message / review comment is required.'
      });
    }

    const created = db.createFeedback({
      name: name.trim(),
      location: location ? location.trim() : 'Tamil Nadu',
      division: division || 'AM Global Groups',
      rating: rating ? parseInt(rating, 10) : 5,
      serviceAvailed: serviceAvailed || 'Client Experience',
      comment: comment.trim(),
      status: 'Approved'
    });

    console.log(`[FEEDBACK INSERT] ${created.id} - ${created.name} (${created.rating}★, ${created.division})`);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your feedback has been published successfully.',
      data: created
    });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to record customer feedback'
    });
  }
});

// 11. Aggregate Feedback Stats
app.get('/api/feedback/stats', (req, res) => {
  try {
    const stats = db.getFeedbackStats();
    return res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    console.error('Error getting feedback stats:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to compute feedback stats'
    });
  }
});

// 12. Admin Feedback Management
app.get('/api/admin/feedback', (req, res) => {
  try {
    const { division, search, limit } = req.query;
    const allFeedback = db.getFeedbackList({ division, search, limit, status: 'All' });
    return res.json({
      success: true,
      data: allFeedback
    });
  } catch (err) {
    console.error('Error fetching admin feedback:', err);
    return res.status(500).json({ success: false, error: 'Internal Error' });
  }
});

app.delete('/api/admin/feedback/:id', (req, res) => {
  try {
    const { id } = req.params;
    const ok = db.deleteFeedback(id);
    return res.json({ success: ok, message: 'Feedback entry deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Delete error' });
  }
});


app.listen(PORT, () => {
  const dbStatus = db.getDatabaseStatus();
  console.log('====================================================');
  console.log(` AM GLOBAL GROUPS — Enterprise Server Active`);
  console.log(` Registered Udyam: UDYAM-TN-18-0102459 (MSME Govt of India)`);
  console.log(` Database:      🟢 CONNECTED (${dbStatus.dbType})`);
  console.log(` Database File: ${dbStatus.dbFile} (${dbStatus.fileSizeFormatted})`);
  console.log(` Portal URL:    http://localhost:${PORT}`);
  console.log(` CRM Admin URL: http://localhost:${PORT}/admin`);
  console.log(` API Endpoint:  http://localhost:${PORT}/api/inquiries`);
  console.log(` DB Status API: http://localhost:${PORT}/api/db/status`);
  console.log('====================================================');
});
