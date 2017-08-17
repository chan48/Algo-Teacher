class Node {
  constructor(value = null, left = null, right = null) {
    this.left = left;
    this.right = right;
    this.value = value;
  }
  serialize() {
    const ans = { value: this.value };
    ans.left = this.left === null ? null : this.left.serialize();
    ans.right = this.right === null ? null : this.right.serialize();
    return ans;
  }
}

class Test {
  constructor() {
    this.root = null;
  }

  add(value) {
    // 제일 처음에 비어있다면
    if(this.root === null) {
      this.root = new Node(value);
    } else {
      let current = this.root;

      while(true) {
        if(current.value > value) {
          if(current.left) {

          }
        }
      }
    }
  }
}
