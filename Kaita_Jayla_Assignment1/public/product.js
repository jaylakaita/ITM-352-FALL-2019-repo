var products = [
   { 
    "flower" : "Catharanthus",
    "price" : 4.00,
    "image" : "./images/catharanthus.jpg"
    },
    
    {
     "flower" : "Lantana",
     "price" : 3.00,
     "image" : "./images/Lantana.jpg"
    },
   
    {
     "flower" : "Marigold",
     "price" : 5.00,
     "image" : "./images/Marigold.jpg"
    },
   
    {
     "flower" : "Petunia",
     "price" : 8.00,
     "image" : "./images/Petunia.jpg"
    },
   
    {
     "flower" : "Rose",
     "price" : 5.00,
     "image" : "./images/Rose.jpg"
    },
];

if(typeof module != 'undefined') {
    module.exports = products;
}