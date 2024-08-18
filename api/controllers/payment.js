import Payment from "../models/Payment.js";

// Create a new payment record
export const createPayment = async (req, res) => {
    try {
      const payment = new Payment(req.body);
      const savedPayment = await payment.save();
      res.status(201).json(savedPayment)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create payment', message: error.message });
    }
  };
  
  // Get a list of all payments
  export const getPayments = async (req, res) => {
    try {
      const payments = await Payment.find();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payments', message: error.message });
    }
  };
  
  // Get a single payment by ID
  export const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch payment', message: error.message });
    }
  };
  
  // Update a payment by ID
  export const updatePayment = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedPayment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update payment', message: error.message });
    }
  };
  
  // Delete a payment by ID
  export const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedPayment = await Payment.findByIdAndRemove(id);
      if (!deletedPayment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.status(204).json(); // No content response for successful deletion
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete payment', message: error.message });
    }
  };