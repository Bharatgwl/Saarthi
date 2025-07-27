import { io, Socket } from 'socket.io-client';
class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(userId: string, userType: 'vendor' | 'supplier') {
    // For demo purposes, we'll simulate WebSocket connection
    this.socket = io('ws://localhost:3001', {
      query: { userId, userType },
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('reconnect_attempt', (attemptNumber) => {
      this.reconnectAttempts = attemptNumber;
      console.log(`Reconnection attempt ${attemptNumber}`);
    });

    return this.socket;
  }

  // Real-time messaging
  sendMessage(recipientId: string, message: string) {
    if (this.socket) {
      this.socket.emit('send_message', {
        recipientId,
        message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Order tracking updates
  updateOrderStatus(orderId: string, status: string, details?: any) {
    if (this.socket) {
      this.socket.emit('order_status_update', {
        orderId,
        status,
        details,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Inventory updates
  updateInventory(productId: string, quantity: number, action: 'add' | 'remove' | 'update') {
    if (this.socket) {
      this.socket.emit('inventory_update', {
        productId,
        quantity,
        action,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Subscribe to events
  onMessage(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('new_message', callback);
    }
  }

  onOrderUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('order_update', callback);
    }
  }

  onInventoryUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on('inventory_update', callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new WebSocketService();