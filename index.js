const  Trie = require('./trie.js');

let root = new Trie();
let names = [
    'malkhaz',
    'malo',
    'mal',
    'jonathan',
    'jon',
    'john',
    'david',
    'dave',
    'daniel'
]

for (let i = 0; i < names.length; i++) {
    root.add(names[i]);
}

console.log(root.search('malk'))
// console.log(root.children[0].children[0].children[0].children)