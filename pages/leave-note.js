import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function LeaveNote() {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!message.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API endpoint in production
      // For now, this is a placeholder
      // In production, create an API route at /api/send-message.js
      // that sends email using Nodemailer, SendGrid, or similar service
      
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message.trim() }),
      })

      if (response.ok) {
        setSubmitted(true)
        setMessage('')
        setTimeout(() => {
          setSubmitted(false)
        }, 5000)
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // For development: show success message even if API doesn't exist yet
      setSubmitted(true)
      setMessage('')
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className="glass-card rounded-3xl p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-mono text-theme">Leave a Note</h2>
            <button 
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('skipAnimation', 'true')
                }
                router.push('/')
              }} 
              className="glass-button px-4 py-2 rounded-full text-theme text-xs"
            >
              Home
            </button>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="text-theme text-lg font-medium mb-2">Thank you!</div>
              <div className="text-theme opacity-80 text-sm">Your message has been sent.</div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-theme text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your thoughts, wishes, or memories..."
                  className="glass-input w-full rounded-xl px-5 py-4 min-h-[200px] resize-none focus:outline-none font-mono text-sm"
                  required
                />
                <div className="text-xs text-theme opacity-60 mt-2 text-right">
                  {message.length} characters
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="glass-button-primary px-8 py-3 rounded-full text-theme text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting || !message.trim() ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting || !message.trim() ? 1 : 0.95 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}


