// This should input a "record_id", & update the airtable record's
// "Node Master Scanned At" field with the current time

export async function setNodeMasterScan(record_id) {
  const endpoint = `https://api2.hackclub.com/v0.1/SOM Sticker Requests/Sticker Requests?authKey=${process.env.AIRBRIDGE_TOKEN}`
  const rawRecords = await fetch(endpoint, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: record_id,
      fields: {
        'Node Master Scanned At': Date.now()
      }
    })
  })
  const record = await rawRecords.json()
  return record
}

export default async (req, res) => {
  const { record_id } = req.query
  if (!record_id || record_id === undefined) {
    return res.status(404).json({ status: 404, error: 'missing record ID' })
  }

  const record = await setNodeMasterScan(record_id)

  res.json(record)
}
