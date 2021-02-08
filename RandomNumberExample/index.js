const sharp = require('sharp')
const express = require('express')

const app = express()
const counts = {}

const random = () => Math.floor(Math.random() * 9) + 1
const buildImage = async (svg) => await sharp(Buffer.from(svg)).png().toBuffer()
const makeSvg = (str, x, y, size) =>
  `<svg viewBox="0 0 500 400"><text x="${x}" y="${y}" fill="white" font-size="${size}px">${str}</text></svg>`

app.get('/', async (req, res) => {
  console.log(req.ip)
  const { meta = '0' } = req.query
  
  const url =
    counts[meta] > 1
      ? '/2.png?meta=' + random()
      : '/1.png'

  counts[meta] = (counts[meta] || 0) + 1
  res.redirect(302, url)
})

app.get('/1.png', async (_, res) => res.set('Content-Type', 'image/png').send(await buildImage(makeSvg('(Click Here)', 110, 210, 50))))
app.get('/2.png', async (_, res) => res.set('Content-Type', 'image/png').send(await buildImage(makeSvg('Your number is: ' + random(), 100, 210, 40))))

app.listen(process.env.PORT || 8080, () => console.log('server is online'))
