// Import Express
const express = require('express')

// Create an Express app
const app = express()



// Define routes here (we'll add them soon)
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}!`)
})

app.get('/roll/:number', (req, res) => {
    const number = req.params.number

    
    if (isNaN(number)) {
        return res.send("You must specify a number.")
    }

    const maxNumber = parseInt(number, 10)
    const randomNumber = Math.floor(Math.random() * (maxNumber + 1))
    res.send(`You rolled a ${randomNumber}.`)
});

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index
  

  if (index < 0 || index >= collectibles.length) {
    return res.send("This item is not yet in stock. Check back soon!")
}

const item = collectibles[index]

res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const minPrice = req.query['min-price'];
    const maxPrice = req.query['max-price'];
    const type = req.query.type;
    let filteredShoes = [];

    for (let i = 0; i < shoes.length; i++) {
        let shoe = shoes[i];
        
        if (minPrice && shoe.price < Number(minPrice)) {
            continue; 
        }
        if (maxPrice && shoe.price > Number(maxPrice)) {
            continue; 
        }

        if (type && shoe.type !== type) {
            continue; 
        }

        filteredShoes.push(shoe);
    }
    if (!minPrice && !maxPrice && !type) {
        filteredShoes = shoes;
    }
    res.send(filteredShoes);
});


// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
  