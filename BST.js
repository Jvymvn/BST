//BST

// class Node {
//     constructor(data) {
//         this.data = data;
//         this.left = null;
//         this.right = null;
//     }

//     insert(value) {
//         if (value <= data) {
//             if (left == null) {
//                 left = new Node(value);
//             } else {
//                 this.left.insert(value);
//             }
//         } else {
//             if (right == null) {
//                 right = new Node(value);
//             } else {
//                 this.right.insert(value);
//             }
//         }
//     }

//     contains(value) {
//         if (value == data) {
//             return true;
//         } else if (value < data) {
//             if (left == null) {
//                 return false;
//             } else {
//                 return this.left.contains(value);
//             }
//         } else {
//             if (right == null) {
//                 return false;
//             } else {
//                 return this.right.contains(value);
//             }
//         }
//     }

//     printInOrder() {
//         if (left != null) {
//             this.left.printInOrder();
//         }
//         console.log(data);
//         if (right != null) {
//             this.right.printInOrder();
//         }
//     }
// }

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    };
};

class BinarySearchTree {
    constructor() {
        //Root of BST
        this.root = null;
    };

    //function to be implemented
    //insert(data)
    //remove(data)


    //helper functions
    //findMinNode()
    //getRootNode()
    //inorder(node)
    //preorder(node)
    //postOrder(node)
    //search(node, data)

    //method to insert a node in a tree
    //it moves over the tree to find the location
    //to insert a node with a given data
    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        }
        //if the data is more than the node
        //move data right of the tree
        else {
            //if right is null insert node here
            if (node.right === null) {
                node.right = newNode;
            } else {
                //if right is not null recurr until
                //null is found
                this.insertNode(node.right, newNode);
            }
        }
    };

    insert(data) {
        //creating a node ant initializing with data
        let newNode = new Node(data);

        //root is null then node will be added to the tree and made root.
        if (this.root === null) {
            this.root = newNode;
        } else {
            //find correct position in the tree and add the node
            this.insertNode(this.root, newNode)
        }
    };

    //method to remove node with a given data it recurrs over the tree
    //to find the data and removes it
    removeNode(node, key) {
        //if the root is null then tree is empty
        if (node === null) {
            return null;
        }
        //IF DATA TO BE DEleted is less than roots daya then move ti the left subtree
        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        //if data to be delete is greater than roots data then move to right subtree
        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }

        //if data is similar to the root's data then delete this node
        else {
            //deleting node with no children
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            //deleting node with one children
            if (node.left === null) {
                node = node.left;
                return node;
            }
            else if (node.right === null) {
                node = node.right;
                return node;
            }
            //deleting node with two children
            //minimum node of the right subtree
            //is stored in aux
            let aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }
    };

    //helper method that calls the removeNode with a given data
    remove(data) {
        //root is re-initialized with 
        //root of a modified tree.
        this.root = this.removeNode(this.root, data);
    };

    //Tree traversal//////

    //Performs inorder traversal of a tree starting from a given node
    //traverse left subtree
    //visit root
    //traverse right subtree
    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.data);
            this.inOrder(node.right);
        }
    };

    //performs preorder traversal
    //visit root
    //traverse left
    //traverse right
    preorder(node) {
        if (node != null) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.rigth);
        }
    };

    //performs postorder traversal
    //traverse left subtree
    //traverse right subtree
    //visit root
    postorder(node) {
        if (node != null) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    };

    findMinNode(node) {
        //if left of a node is null
        //then it must be minimum node
        if (node.left === null) {
            return node;
        } else {
            return this.findMinNode(node.left);
        }
    };

    getRootNode() {
        return this.root;
    };

    search(node, data) {
        //if tree is empty return null
        if (node === null)
            return null;

        //if data is less than node's data
        //move left
        else if (data < node.data)
            return this.search(node.left, data);

        else if (data > node.data)
            return this.search(node.right, data);

        else
            return node;
    };

};

function main() {
    let BST = new BinarySearchTree();

    BST.insert(15);
    BST.insert(25);
    BST.insert(10);
    BST.insert(7);
    BST.insert(22);
    BST.insert(17);
    BST.insert(13);
    BST.insert(5);
    BST.insert(9);
    BST.insert(27);

    //          15 
    //         /  \ 
    //        10   25 
    //       / \   / \ 
    //      7  13 22  27 
    //     / \    / 
    //    5   9  17 

    let root = BST.getRootNode();
    console.log(root);

    //prints 57 7 9 10 13 15 17 22 25 27
    BST.inOrder(root);

    //removing node with no children
    BST.remove(5);


    //          15 
    //         /  \ 
    //        10   25 
    //       / \   / \ 
    //      7  13 22  27 
    //       \    / 
    //        9  17  

    BST.inOrder(root);

    BST.remove(15);

    //          17 
    //         /  \ 
    //        10   25 
    //       / \   / \ 
    //      9  13 22  27 

    console.log('Inorder traversal');
    BST.inOrder(root);
    console.log('Postorder Traversal');
    BST.postorder(root);
    console.log("preorder traversal");
    BST.preorder(root);
};

main();