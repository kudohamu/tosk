export default class MoveTODOQueue {
  constructor() {
    this.queue = new Array();
  }

  enqueue(id) {
    this.queue.push(id);
  }

  dequeue() {
    return this.queue.shift();
  }

  getMovingTODOid() {
    return this.movingTODOid;
  }

  setMovingTODOid(id) {
    console.log(`set:${id}`);
    this.movingTODOid = id;
  }
}
