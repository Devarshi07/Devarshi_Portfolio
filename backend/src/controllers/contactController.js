import Joi from 'joi';
import pool from '../config/database.js';
import emailService from '../services/emailService.js';

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(1000).required()
});

export const submitContact = async (req, res, next) => {
  try {
    console.log('📩 Contact form submission received:', req.body);

    // Validate input
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      console.error('❌ Validation error:', error.details[0].message);
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    const { name, email, message } = value;

    // Get metadata
    const metadata = {
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      userAgent: req.get('user-agent') || 'unknown'
    };

    console.log('💾 Saving to database...');

    // Save to database
    const result = await pool.query(
      `INSERT INTO contact_requests (name, email, message, ip_address, user_agent) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, created_at`,
      [name, email, message, metadata.ip, metadata.userAgent]
    );

    const contactId = result.rows[0].id;
    const createdAt = result.rows[0].created_at;

    console.log(`✅ Contact request saved (ID: ${contactId})`);

    // Send emails (async, don't block response)
    Promise.all([
      emailService.sendToVisitor(name, email),
      emailService.sendToOwner(name, email, message, metadata)
    ]).then(() => {
      console.log('✅ Emails sent successfully');
    }).catch(err => {
      console.error('⚠️  Email sending failed (non-critical):', err.message);
    });

    res.json({
      success: true,
      message: 'Message received successfully! Check your email for confirmation.',
      data: {
        id: contactId,
        timestamp: createdAt
      }
    });
  } catch (error) {
    console.error('❌ Contact submission error:', error);
    next(error);
  }
};

// Get all contact requests (for admin)
export const getContactRequests = async (req, res, next) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const result = await pool.query(
      `SELECT id, name, email, message, created_at, status 
       FROM contact_requests 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) as total FROM contact_requests'
    );

    res.json({
      success: true,
      data: result.rows,
      total: parseInt(countResult.rows[0].total),
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (error) {
    next(error);
  }
};

// Mark contact as read/responded
export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await pool.query(
      'UPDATE contact_requests SET status = $1 WHERE id = $2',
      [status, id]
    );

    res.json({
      success: true,
      message: 'Contact status updated'
    });
  } catch (error) {
    next(error);
  }
};