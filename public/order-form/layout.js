const order = document.getElementById('order');
const size = document.getElementById('size');
const name = document.getElementById('name');
const address= document.getElementById('address');
const email = document.getElementById('email');
const country = document.getElementById('bruh');


let cutLink = (window.location.search)
console.log(cutLink);

cutLink = cutLink.split('?')
console.log(cutLink)
cutLink = cutLink[1].split(/['%' '=' '&']/)
console.log(cutLink)


let bruh = cutLink.filter((x, index ) => {
    if (index % 2 === 1){
        return x
    }
})
console.log(bruh)

order.innerText = `${bruh[0]}`
size.innerText = `${bruh[1]}`
name.innerText = `${bruh[2]} ${bruh[3]}`
address.innerText = `${bruh[5]} ${bruh[6]}`
email.innerText = `${bruh[4]}`
country.innerText = `${bruh[7]}`