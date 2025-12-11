import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Read the CSV file from public directory
    const filePath = path.join(process.cwd(), 'public', 'GUESTSFORWEBSITE.csv')
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'CSV file not found' })
    }

    // Read the CSV file using xlsx (which can handle CSV)
    const workbook = XLSX.readFile(filePath, { type: 'file' })
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    
    // Convert to JSON with header row
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
    
    // Parse CSV data: Column 1 (index 0) is Table, Column 2 (index 1) is Name
    const guests = []
    
    // Skip header row (index 0) and parse data rows
    for (let i = 1; i < data.length; i++) {
      const row = data[i]
      if (Array.isArray(row) && row.length >= 2) {
        const tableValue = String(row[0] || '').trim()
        const name = String(row[1] || '').trim()
        
        // Skip empty rows
        if (!name || !tableValue) continue
        
        // Extract table number - handle numeric values and "Vendor Table" format
        let tableNumber = tableValue
        const parsed = parseInt(tableValue)
        if (!isNaN(parsed)) {
          // It's a numeric table number
          tableNumber = parsed
        } else {
          // Keep as string for special tables like "Vendor Table"
          tableNumber = tableValue
        }
        
        guests.push({
          name: name,
          table: tableNumber
        })
      }
    }
    
    if (guests.length === 0) {
      return res.status(400).json({ error: 'Could not parse guests from CSV file. Please check the file format.' })
    }
    
    return res.status(200).json(guests)
  } catch (error) {
    console.error('Error reading CSV file:', error)
    return res.status(500).json({ error: 'Failed to read CSV file', details: error.message })
  }
}

