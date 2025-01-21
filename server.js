import express from 'express';
import path from 'path';
import multer from 'multer';
import {mergePdfs} from './Merge.js'
import { fileURLToPath } from 'url';
const app = express();
const upload = multer({ dest: 'uploads/' });
app.use('/static', express.static('public'))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000;
//const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.get('/', (req, res) => {
  const indexPath = path.resolve(__dirname, 'templates', 'index.html');
  res.sendFile(indexPath);
});
app.post('/merge', upload.array('pdfs', 2),  async(req, res, next) =>{
  try{
    let d = await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
  }
  catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})