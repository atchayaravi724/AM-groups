/**
 * AM GLOBAL GROUPS — Enterprise Database Engine
 * Persistent Relational SQLite Database Driver & Data Layer
 * 
 * Supports zero-config persistent storage (node:sqlite / SQLite3)
 * Registered under Ministry of MSME, Govt of India (UDYAM-TN-18-0102459)
 */

const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

// Path Configuration
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'am_global_groups.sqlite');
const LEGACY_JSON = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let dbInstance = null;

/**
 * Initialize Database Connection and Schemas
 */
function initDatabase() {
  try {
    const isNew = !fs.existsSync(DB_FILE);
    dbInstance = new DatabaseSync(DB_FILE);

    // Enable WAL mode for high performance concurrency
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    dbInstance.exec('PRAGMA synchronous = NORMAL;');
    dbInstance.exec('PRAGMA foreign_keys = ON;');

    // 1. Inquiries Table
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT,
        division TEXT NOT NULL,
        message TEXT,
        source TEXT DEFAULT 'Website Portal',
        quote_details TEXT,
        status TEXT DEFAULT 'Pending',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // Performance Indexes
    dbInstance.exec(`
      CREATE INDEX IF NOT EXISTS idx_inquiries_division ON inquiries(division);
      CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
    `);

    // 2. Newsletter Subscribers Table
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'Active',
        subscribed_at TEXT NOT NULL
      );
    `);

    // 3. System Audit Log Table
    dbInstance.exec(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        entity_id TEXT,
        details TEXT,
        created_at TEXT NOT NULL
      );
    `);

    console.log(`[DATABASE] SQLite Database connected successfully: ${DB_FILE}`);

    // Migrate legacy inquiries.json if needed
    migrateLegacyData();

    return dbInstance;
  } catch (err) {
    console.error('[DATABASE] Initialization error:', err);
    throw err;
  }
}

/**
 * Migrate legacy data/inquiries.json into SQLite on startup
 */
function migrateLegacyData() {
  try {
    if (!fs.existsSync(LEGACY_JSON)) return;
    const content = fs.readFileSync(LEGACY_JSON, 'utf8');
    const records = JSON.parse(content || '[]');
    if (!Array.isArray(records) || records.length === 0) return;

    const countStmt = dbInstance.prepare('SELECT COUNT(*) as count FROM inquiries');
    const { count } = countStmt.get();

    if (count === 0) {
      console.log(`[DATABASE] Migrating ${records.length} legacy records from inquiries.json into SQLite...`);
      const insertStmt = dbInstance.prepare(`
        INSERT OR IGNORE INTO inquiries (
          id, name, phone, email, division, message, source, quote_details, status, created_at, updated_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `);

      for (const rec of records) {
        insertStmt.run(
          rec.id || `INQ-2026-${Date.now()}`,
          rec.name || 'Anonymous Client',
          rec.phone || 'N/A',
          rec.email || '',
          rec.division || 'AM Global Groups',
          rec.message || '',
          rec.source || 'Website Form',
          rec.quoteDetails || null,
          rec.status || 'Pending',
          rec.createdAt || new Date().toISOString(),
          rec.updatedAt || new Date().toISOString()
        );
      }
      console.log(`[DATABASE] Migration complete! ${records.length} records secured in SQLite.`);
    }
  } catch (err) {
    console.error('[DATABASE] Migration warning:', err);
  }
}

/**
 * Get active DB instance
 */
function getDB() {
  if (!dbInstance) {
    return initDatabase();
  }
  return dbInstance;
}

/**
 * Sync snapshot to inquiries.json for backup/portability
 */
function syncBackupJSON() {
  try {
    const list = getAllInquiries();
    fs.writeFileSync(LEGACY_JSON, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[DATABASE] Backup sync warning:', err.message);
  }
}

// ==========================================
// CRUD OPERATIONS FOR INQUIRIES
// ==========================================

/**
 * Create a new inquiry lead
 */
function createInquiry(data) {
  const db = getDB();
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM inquiries');
  const { count } = countStmt.get();

  const id = `INQ-2026-${String(count + 1).padStart(3, '0')}`;
  const now = new Date().toISOString();

  const insertStmt = db.prepare(`
    INSERT INTO inquiries (
      id, name, phone, email, division, message, source, quote_details, status, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  insertStmt.run(
    id,
    data.name.trim(),
    data.phone.trim(),
    (data.email || '').trim(),
    data.division || 'AM Global Groups',
    (data.message || '').trim(),
    data.source || 'Website Portal',
    data.quoteDetails || null,
    'Pending',
    now,
    now
  );

  // Log audit
  logAudit('CREATE_INQUIRY', id, `Lead created for ${data.name} (${data.division})`);

  const created = getInquiryById(id);
  syncBackupJSON();
  return created;
}

/**
 * Get inquiry by ID
 */
function getInquiryById(id) {
  const db = getDB();
  const stmt = db.prepare('SELECT * FROM inquiries WHERE id = ?');
  const row = stmt.get(id);
  if (!row) return null;
  return formatInquiry(row);
}

/**
 * Get all inquiries with optional filtering
 */
function getInquiries({ division, status, search } = {}) {
  const db = getDB();
  let sql = 'SELECT * FROM inquiries WHERE 1=1';
  const params = [];

  if (division && division !== 'all') {
    sql += ' AND LOWER(division) LIKE ?';
    params.push(`%${division.toLowerCase()}%`);
  }

  if (status && status !== 'all') {
    sql += ' AND LOWER(status) = ?';
    params.push(status.toLowerCase());
  }

  if (search && search.trim()) {
    const q = `%${search.trim().toLowerCase()}%`;
    sql += ' AND (LOWER(name) LIKE ? OR LOWER(phone) LIKE ? OR LOWER(email) LIKE ? OR LOWER(division) LIKE ? OR LOWER(message) LIKE ? OR LOWER(id) LIKE ?)';
    params.push(q, q, q, q, q, q);
  }

  sql += ' ORDER BY created_at DESC';

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params);
  return rows.map(formatInquiry);
}

/**
 * Helper to get all without filters
 */
function getAllInquiries() {
  const db = getDB();
  const stmt = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC');
  return stmt.all().map(formatInquiry);
}

/**
 * Update inquiry status
 */
function updateInquiryStatus(id, newStatus) {
  const db = getDB();
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    UPDATE inquiries 
    SET status = ?, updated_at = ?
    WHERE id = ?
  `);
  stmt.run(newStatus, now, id);

  logAudit('UPDATE_STATUS', id, `Status updated to ${newStatus}`);
  syncBackupJSON();
  return getInquiryById(id);
}

/**
 * Delete inquiry
 */
function deleteInquiry(id) {
  const db = getDB();
  const stmt = db.prepare('DELETE FROM inquiries WHERE id = ?');
  stmt.run(id);

  logAudit('DELETE_INQUIRY', id, `Inquiry record deleted`);
  syncBackupJSON();
  return true;
}

/**
 * Add newsletter subscriber
 */
function addNewsletterSubscriber(email) {
  const db = getDB();
  const now = new Date().toISOString();
  try {
    const stmt = db.prepare(`
      INSERT INTO newsletter_subscribers (email, status, subscribed_at)
      VALUES (?, 'Active', ?)
      ON CONFLICT(email) DO UPDATE SET status = 'Active'
    `);
    stmt.run(email.trim().toLowerCase(), now);
    logAudit('NEWSLETTER_SUBSCRIBE', null, `Subscriber added: ${email}`);
    return { success: true, email };
  } catch (err) {
    console.error('[DATABASE] Newsletter subscriber error:', err);
    throw err;
  }
}

/**
 * Record system audit log
 */
function logAudit(action, entityId, details) {
  try {
    const db = getDB();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO audit_logs (action, entity_id, details, created_at)
      VALUES (?, ?, ?, ?)
    `);
    stmt.run(action, entityId || null, details || null, now);
  } catch (err) {
    console.warn('[DATABASE] Audit log warning:', err.message);
  }
}

/**
 * Get aggregate statistics via SQL
 */
function getStatistics() {
  const db = getDB();

  // Total count
  const totalStmt = db.prepare('SELECT COUNT(*) as count FROM inquiries');
  const { count: totalInquiries } = totalStmt.get();

  // Past 24 hours
  const past24hISO = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const last24hStmt = db.prepare('SELECT COUNT(*) as count FROM inquiries WHERE created_at >= ?');
  const { count: newLast24h } = last24hStmt.get(past24hISO);

  // Group by Division
  const byDivision = {
    'AM Infotech': 0,
    'AM Consultancy': 0,
    "AM Real Estate's": 0,
    'A² Royal Events': 0,
    'SB Food Production': 0,
    'Multi-Service / General': 0
  };

  const divStmt = db.prepare('SELECT division, COUNT(*) as count FROM inquiries GROUP BY division');
  const divRows = divStmt.all();
  divRows.forEach(row => {
    let matched = false;
    for (const key of Object.keys(byDivision)) {
      if (row.division && row.division.toLowerCase().includes(key.toLowerCase())) {
        byDivision[key] += row.count;
        matched = true;
        break;
      }
    }
    if (!matched) byDivision['Multi-Service / General'] += row.count;
  });

  // Group by Status
  const byStatus = {
    'Pending': 0,
    'In Progress': 0,
    'Contacted': 0,
    'Completed': 0,
    'Cancelled': 0
  };

  const statusStmt = db.prepare('SELECT status, COUNT(*) as count FROM inquiries GROUP BY status');
  const statusRows = statusStmt.all();
  statusRows.forEach(row => {
    if (byStatus[row.status] !== undefined) {
      byStatus[row.status] = row.count;
    } else {
      byStatus['Pending'] += row.count;
    }
  });

  // Subscribers count
  let subscriberCount = 0;
  try {
    const subStmt = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers');
    subscriberCount = subStmt.get().count;
  } catch (e) {}

  return {
    totalInquiries,
    newLast24h,
    subscriberCount,
    byDivision,
    byStatus
  };
}

/**
 * Get comprehensive Database Status & Health diagnostics
 */
function getDatabaseStatus() {
  const db = getDB();
  let fileSize = 0;
  try {
    if (fs.existsSync(DB_FILE)) {
      fileSize = fs.statSync(DB_FILE).size;
    }
  } catch (e) {}

  const inquiriesCount = db.prepare('SELECT COUNT(*) as c FROM inquiries').get().c;
  const subscribersCount = db.prepare('SELECT COUNT(*) as c FROM newsletter_subscribers').get().c;
  const auditLogsCount = db.prepare('SELECT COUNT(*) as c FROM audit_logs').get().c;

  return {
    connected: true,
    engine: 'SQLite Relational Database (Node.js Native Engine)',
    dbType: 'SQLite 3.x (WAL Mode Enabled)',
    dbFile: 'data/am_global_groups.sqlite',
    dbAbsolutePath: DB_FILE,
    fileSizeBytes: fileSize,
    fileSizeFormatted: `${(fileSize / 1024).toFixed(2)} KB`,
    tables: [
      { name: 'inquiries', rowCount: inquiriesCount, description: 'Client lead pipelines and service quotations' },
      { name: 'newsletter_subscribers', rowCount: subscribersCount, description: 'Corporate updates and email subscribers' },
      { name: 'audit_logs', rowCount: auditLogsCount, description: 'Administrative action audit trail' }
    ],
    timestamp: new Date().toISOString()
  };
}

/**
 * Format DB row to camelCase response format
 */
function formatInquiry(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    division: row.division,
    message: row.message,
    source: row.source,
    quoteDetails: row.quote_details,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

module.exports = {
  initDatabase,
  getDB,
  createInquiry,
  getInquiryById,
  getInquiries,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  addNewsletterSubscriber,
  logAudit,
  getStatistics,
  getDatabaseStatus
};
