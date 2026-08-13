import Message from '../models/message.js';
import { validateContactInput } from '../utils/validator.js';
import { sendNotificationEmail } from '../services/email.service.js';

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const createMessage = async (req, res, next) => {
  try {
    const { errors, isValid } = validateContactInput(req.body);

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    const { name, email, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // Send notification email asynchronously
    sendNotificationEmail({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages
// @route   GET /api/contact/messages
// @access  Public
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a message status (read/unread)
// @route   PATCH /api/contact/messages/:id
// @access  Public
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'archived'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      data: updatedMessage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/messages/:id
// @access  Public
export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
