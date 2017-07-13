export default (app) => {
  app.get('/api/reverse', (req, res) => {
    let reverse = req.query.string.split('').reverse().join('')
    res.json({ reverse })
  })

  return app
}
