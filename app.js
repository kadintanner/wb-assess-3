import express from 'express';
import session from 'express-session';
import lodash from 'lodash';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import ViteExpress from 'vite-express';
import axios from 'axios';

const app = express();
const port = '8884';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: '/img/australopith.png',
    name: 'Australopithecus',
    num_likes: 584,
  },
  quetz: {
    img: '/img/quetzal_torso.png',
    name: 'Quetzal',
    num_likes: 587,
  },
  steg: {
    img: '/img/stego_skull.png',
    name: 'Stegosaurus',
    num_likes: 598,
  },
  trex: {
    img: '/img/trex_skull.png',
    name: 'Tyrannosaurus Rex',
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: '/img/ammonite.png',
    name: 'Ammonite',
  },
  {
    img: '/img/mammoth_skull.png',
    name: 'Mammoth',
  },
  {
    img: '/img/ophthalmo_skull.png',
    name: 'Opthalmosaurus',
  },
  {
    img: '/img/tricera_skull.png',
    name: 'Triceratops',
  },
];

// TODO: Replace this comment with your code
app.get('/get-name', (req, res) => {
  let {name} = req.query
  res.render('top-fossils.html.njk', {MOST_LIKED_FOSSILS, name})
})

app.get('/random-fossil.json', (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

app.get('/', (req, res) => {
  res.render('homepage.html.njk')
})

app.post('/', (req, res) => {
  if (req.session.name) {
    res.render('/top-fossils.html.njk')
  } else {
    res.render('/homepage.html.njk')
  }
})

app.post('/like-fossil', (req,res)=>{
  const { selectedFossil } = req.body

  if (MOST_LIKED_FOSSILS[selectedFossil]) {
    MOST_LIKED_FOSSILS[selectedFossil].num_likes++

    const userName = req.session.name || 'Guest'
    res.render('thank-you.html.njk', { name: userName })
  } else {
    res.status(404).send('Not Found')
  }
  console.log(req.body.likeFossil)
})

