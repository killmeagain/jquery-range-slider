class EventEmiter {
  private subscribers;

  constructor() {
    this.subscribers = [];
  }

  public on(event: string, handler: void) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(handler);
  }

  public emit(event: string, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((handler) => handler(data));
  }
}

export default new EventEmiter();
