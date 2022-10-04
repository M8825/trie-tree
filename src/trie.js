class Trie {
    constructor(parent=null, val, children = [],  complete=false) {
        this.parent = parent;
        this.val = val;
        this.children = children;
        this.complete = complete;
    }


    add(word) {
        let node = this;
        for (let i = 0; i < word.length; i++){
            if (this._isChild(node, word[i]) === false){
                let nextTrie = new Trie(node, word[i], [], false);
                
                node.children.push(nextTrie); 
                node = nextTrie;
            } else {
                node = this._getChildNode(node, word[i]);
            }
            
            if (i === word.length - 1) {
                node.complete = true;
            }
        }
    }


    buildWord() {
        let name = "";
        let node = this;

        while (node.parent !== null) {
            name = node.val + name
            node = node.parent;
        }

        return name;
    }


    search(str) {
        if (str.length === 0) return []
        let stack = [this];
        let name = [];

        let i = 0;
        while (stack.length > 0) {
            let currChar = str[i];
            let currNode = stack.pop();

            if (currChar !== undefined && this._isChild(currNode, currChar)) {
                let childNode = this._getChildNode(currNode, currChar);  // child with char as value
                stack.push(childNode);
                i++;
            } else {
                stack.push(...currNode.children.reverse());
                if (currNode.complete) {
                    name.push(currNode.buildWord());
                }
            }
        }

        return name;
    }


    _getChildNode(node, char) {
        for (let i = 0; i < node.children.length; i++) {
            let child = node.children[i];
            if (child.val === char) return child;
        }
    }

    _isChild(node, val) {
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].val === val) return true;
        }

        return false;
    }
}

module.exports = Trie;