const request = require('request');

/*
n: Noun
a: Adjective
t: Verb (Transitive)
i: Verb (Inransitive)
e: Adverb
z: Interjection
s: Preposition
*/

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function randInt(min, max) {
  return Math.floor(Math.random() * max) + min
}

const techyStuff = [
  'Server',
  'Request',
  'User',
  'Service',
  'Gateway',
  'Proxy',
  'Status'
]

const variants = [
  {
    // Adjective + Noun
    form: {
      Pos1: 'a',
      Pos2: 'n',
      Pos3: '',
      Pos4: ''
    },
    parse: txt => txt
  },
  {
    // Adjective + Techy stuff
    form: {
      Pos1: 'a',
      Pos2: '',
      Pos3: '',
      Pos4: ''
    },
    parse: txt => txt + ' ' + randomFromArray(techyStuff)
  },
  {
    // Interjection
    form: {
      Pos1: 'z',
      Pos2: '',
      Pos3: '',
      Pos4: ''
    },
    parse: txt => randomFromArray(['No ', '']) + txt
  }
]

module.exports = (callback) => {
  const status = randomFromArray(variants)
  const form = Object.assign({
    Level1: randInt(10, 40),
    Level2: randInt(10, 40),
    Level3: randInt(10, 40),
    Level4: randInt(10, 40)
  }, status.form)
  request.post({url:'http://watchout4snakes.com/wo4snakes/Random/RandomPhrase', form}, function(err, response, body) {
    if (err) callback(err, false)
    else callback(false, status.parse(toTitleCase(body)))
  })
}