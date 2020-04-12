const path = require('path');
const fs = require('fs');

const cartDBPath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

class Cart {
    static async add(course) {
        const cart = await Cart.fetch();

        const idx = cart.courses.findIndex(c => c.id === course.id);
        const candidate = cart.courses[idx];

        if(candidate) {
            // course exists
            candidate.count++
            cart.courses[idx] = candidate;
        } else {
            // needs add course
            course.count = 1;
            cart.courses.push(course);
        }

        cart.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(cartDBPath, JSON.stringify(cart), err => {
                if(err) reject(err); 
                else resolve();
            })
        })
    };

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(cartDBPath, 'utf-8', (err, content) => {
                if(err) reject(err); 
                else resolve(JSON.parse(content));
            })

        })
    };

    static async remove(id) {
        const cart = await Cart.fetch();

        const idx = cart.courses.findIndex(c => c.id === id);
        const course = cart.courses[idx];

        if(course.count === 1) {
            // delete
            cart.courses = cart.courses.filter(c => c.id !== id);
        } else {
            // change quantity
            cart.courses[idx].count--;
        }

        cart.price -= course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(cartDBPath, JSON.stringify(cart), err => {
                if(err) reject(err); 
                else resolve(cart);
            })
        })
    }
}

module.exports = Cart;