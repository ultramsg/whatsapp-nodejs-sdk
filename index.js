const fetch = require("node-fetch")
class ultramsg {
    constructor(instance_id, token) {
        if (instance_id.startsWith("instance")) {
            this.instance_id = instance_id;
        } else {
            this.instance_id = "instance" + instance_id;
        }
        this.token = token;
    }

    async getMessages(page = 1, limit = 100, status = "all", sort = "asc", id = "", referenceId = "", from = "", to = "", ack = "") {
        const params = { page: page, limit: limit, status: status, sort: sort, id: id, referenceId: referenceId, from: from, to: to, ack: ack }
        return await this.sendRequest("GET", "messages", params);
    }

    getMessageStatistics() {
        return this.sendRequest("GET", "messages/statistics");
    }

    sendChatMessage(to, body, priority = 10, referenceId = "") {
        const params = { to: to, body: body, priority: priority, referenceId: referenceId };
        return this.sendRequest("POST", "messages/chat", params);
    }


    sendImageMessage(to, caption = "", image, priority = 10, referenceId = "", nocache = false) {
        const params = { to: to, caption: caption, image: image, priority: priority, referenceId: referenceId, nocache: nocache }
        return this.sendRequest("POST", "messages/image", params);
    }

    sendDocumentMessage(to, filename, document, priority = 10, referenceId = "", nocache = false) {
        const params = { to: to, filename: filename, document: document, priority: priority, referenceId: referenceId, nocache: nocache }
        return this.sendRequest("POST", "messages/document", params);
    }

    sendAudioMessage(to, audio, priority = 10, referenceId = "", nocache = false) {
        const params = { to: to, audio: audio, priority: priority, referenceId: referenceId, nocache: nocache }
        return this.sendRequest("POST", "messages/audio", params);
    }

    sendVoiceMessage(to, audio, priority = 10, referenceId = "", nocache = false) {
        const params = { to: to, audio: audio, priority: priority, referenceId: referenceId, nocache: nocache }
        return this.sendRequest("POST", "messages/voice", params);
    }

    sendVideoMessage(to, caption = "", video, priority = 10, referenceId = "", nocache = false) {
        const params = { to: to, caption: caption, video: video, priority: priority, referenceId: referenceId, nocache: nocache }
        return this.sendRequest("POST", "messages/video", params);
    }

    sendLinkMessage(to, link, priority = 10, referenceId = "") {
        const params = { to: to, link: link, priority: priority, referenceId: referenceId }
        return this.sendRequest("POST", "messages/link", params);
    }

    sendContactMessage(to, contact, priority = 10, referenceId = "") {
        const params = { to: to, contact: contact, priority: priority, referenceId: referenceId }
        return this.sendRequest("POST", "messages/contact", params);
    }

    sendLocationMessage(to, address, lat, lng, priority = 10, referenceId = "") {
        const params = { to: to, address: address, lat: lat, lng: lng, priority: priority, referenceId: referenceId }
        return this.sendRequest("POST", "messages/location", params);
    }

    sendVcardMessage(to, vcard, priority = 10, referenceId = "") {
        const params = { to: to, vcard: vcard, priority: priority, referenceId: referenceId }
        return this.sendRequest("POST", "messages/vcard", params);
    }
    sendClearMessage(status) {
        const params = { status: status }
        return this.sendRequest("POST", "messages/clear", params);
    }
    resendByStatus(status) {
        const params = { status: status }
        return this.sendRequest("POST", "messages/resendByStatus", params);
    }
    resendById(id) {
        const params = { id: id }
        return this.sendRequest("POST", "messages/resendById", params);
    }

    // instance

    getInstanceStatus() {
        return this.sendRequest("GET", "instance/status");
    }

    getInstanceQr() {
        return this.sendRequest("GET", "instance/qr");
    }

    getInstanceQrCode() {
        return this.sendRequest("GET", "instance/qrCode");
    }

    getInstanceScreenshot(encoding = "") {
        return this.sendRequest("GET", "instance/screenshot", { encoding: encoding });
    }

    getInstanceMe() {
        return this.sendRequest("GET", "instance/me");
    }

    getInstanceSettings() {
        return this.sendRequest("GET", "instance/settings");
    }

    sendInstanceTakeover() {
        return this.sendRequest("POST", "instance/takeover");
    }

    sendInstanceLogout() {
        return this.sendRequest("POST", "instance/logout");
    }

    sendInstanceRestart() {
        return this.sendRequest("POST", "instance/restart");
    }

    sendInstanceSettings(sendDelay = "1", webhook_url = "", webhook_message_received = false, webhook_message_create = false, webhook_message_ack = false, webhook_message_download_media = false) {
        const params = { sendDelay: sendDelay, webhook_url: webhook_url, webhook_message_received: webhook_message_received, webhook_message_create: webhook_message_create, webhook_message_ack: webhook_message_ack, webhook_message_download_media: webhook_message_download_media };
        return this.sendRequest("POST", "instance/settings", params);
    }

    sendInstanceClear() {
        return this.sendRequest("POST", "instance/clear");
    }


    // Chats

    getChats() {
        return this.sendRequest("GET", "chats");
    }

    getChatsMessages(chatId, limit = 100) {
        const params = { chatId: chatId, limit: limit }
        return this.sendRequest("GET", "chats/messages", params);
    }

    // Contacts

    getContacts() {
        return this.sendRequest("GET", "contacts");
    }

    getContact(chatId) {
        const params = { chatId: chatId }
        return this.sendRequest("GET", "contacts/contact", params);
    }

    getBlockedContacts() {
        return this.sendRequest("GET", "contacts/blocked");
    }

    checkContact(chatId) {
        const params = { chatId: chatId }
        return this.sendRequest("GET", "contacts/check", params);
    }

    blockContact(chatId) {
        const params = { chatId: chatId }
        return this.sendRequest("POST", "contacts/block", params);
    }

    unblockContact(chatId) {
        const params = { chatId: chatId }
        return this.sendRequest("POST", "contacts/unblock", params);
    }

    async sendRequest(method, path, params = {}) {
        let options = {}
        let url = "https://api.ultramsg.com/" + this.instance_id + "/" + path;
        params.token = this.token


        if (method === 'GET') {
            if (params) {
                url += (url.indexOf('?') === -1 ? '?' : '&') + this.queryParams(params);
            }
        }
        if (method === 'POST') {
            options = {
                method: method,
                body: new URLSearchParams(params),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType.includes("application/json")) {
                const data = await response.json();
                return data
            } else {
                if (contentType.includes("text/plain")) {
                    const data = await response.text();
                    return data
                } else {
                    const buffer = Buffer.from(await response.arrayBuffer()).toString('base64')
                    const data = `data:${contentType};base64,${buffer}`
                    return data
                }
            }

        } else {
            if (response.status == 404) {
                return { error: "instance not found or pending please check you instance id" };
            } else {
                return { error: "error" };
            }
        }

    }

    queryParams(params) {
        return Object.keys(params)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&');
    }
}









module.exports = ultramsg