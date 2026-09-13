var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MockWhatsAppProvider_1;
import { Injectable, Logger } from '@nestjs/common';
let MockWhatsAppProvider = MockWhatsAppProvider_1 = class MockWhatsAppProvider {
    logger = new Logger(MockWhatsAppProvider_1.name);
    async sendRideShareMessage(recipientPhone, shareUrl, customerName) {
        this.logger.log(`[WHATSAPP MOCK] To: ${recipientPhone} - ${customerName} has shared a live ride: ${shareUrl}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
MockWhatsAppProvider = MockWhatsAppProvider_1 = __decorate([
    Injectable()
], MockWhatsAppProvider);
export { MockWhatsAppProvider };
//# sourceMappingURL=whatsapp-messaging-provider.js.map