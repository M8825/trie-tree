const { __esModule } = require("live/lib/logging");

// Without OOP we have to literally create objects manually one-by-one;
let person1 = {
    "name" : "Jonathan",
    "heigh" : "5'8",
    "weight" : 155,
    "color" : "brown"
}

// Instead we can create class
// name, heigh, weight, color are called instance variables and class attributes
// This called incapsulation
class Person {
    constructor(name, heigh, weight, color) {
        this.name = name;
        this.heigh = heigh;
        this.weight = weight;
        this.color = color;
    }

    addWeight(num) {
        this.weight += num;
    }
}


let p1 = new Person('Jonathan', "5'8", 155, "brown");  // This guy is a new instance of the person class


// The beauty is that we can create class with exclusive characteristics

// take not ewhen you creat a class:
    // 1. empty object is created
    // 2. constracor method called and it is bound to an object
    // 3. new object is returned agter constructor method is completed


class Trie {
    constructor(parent=null, children = [], val, complete=false) {
        this.parent = parent;
        this.children = children;
        this.val = val;
        this.complete = complete;
    }

    childVals() {
        let retArr = [];

        for (let i = 0; i < this.children.length; i++) {
            retArr.push(this.children[i].val);
        }

        return retArr;
    }

    add(str) {
        let curr = this;
        let childValues = curr.childVals();
        let next;
        let tempIdx;
        
        for (let i = 0; i < str.length; i++) {
            tempIdx = childValues.indexOf(str[i]);

            if (tempIdx !== -1) {
                curr = curr.children[tempIdx];
                if (i === str.length - 1) {
                    curr.complete = true;
                }
            } else {
                if (i !== str.length -1) {
                    next = new Trie (curr, [], str[i], false);
                } else {
                    next = new Trie (curr, [], str[i], true);
                }

                curr.children.push(next);
                curr = next;
                childValues = curr.childVals();
            }
        }

    }

    search(str) {
        currChildren = this.children;
        
    }

    // // returns query that prints out childred on the parent node
    // search(str) {

    //     let tempStr = ""; // m
    //     let retArr = [];
    //     let curr = this
    //     let childValues = curr.childVals();
    //     let anchor;
        
    //     for (let i = 0; i < str.length; i++) {
    //       let tempIdx = childValues.indexOf(str[i]);
    //       if (tempIdx === -1) {
    //         return -1;
    //       } else {
    //         curr = curr.children[tempIdx];
    //         tempStr += curr.val;  
    //       }
    //     }
        
    //     anchor = curr;
        
    //     for (let i = 0; i < anchor.childValues().length; i++) {
    //       retArr.push(tempStr);
    //     }
        
        
    //     for (let i = i; i < anchor.childValues().length; i++) {
    //       while (curr.children.length !== 0) {
    //         curr = curr.children[i];


    //         // retArr[i].push(curr.children[i].val)
    //       }
    //     }
    // }
}

module.exports = Trie;