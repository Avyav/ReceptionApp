// API route for sending messages to TaranAvyav2025@gmail.com
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Configure email transporter
    // You'll need to set these environment variables:
    // SMTP_USER: Your Gmail address (the sender)
    // SMTP_PASS: Your Gmail app password (not your regular password)
    // To get a Gmail app password: Google Account > Security > 2-Step Verification > App passwords
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send email to TaranAvyav2025@gmail.com
    await transporter.sendMail({
      from: process.env.SMTP_USER || 'noreply@reception.com',
      to: 'TaranAvyav2025@gmail.com',
      subject: 'New Message from Reception Guest',
      text: message,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #333;">New Message from Reception Guest</h2>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="white-space: pre-wrap; color: #333; line-height: 1.6;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 20px;">Sent from the Reception App</p>
      </div>`,
    })

    // Return success response
    return res.status(200).json({ success: true, message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error sending message:', error)
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' })
  }
}


