import { Socket, io } from "socket.io-client";
import { reactive, ref } from "vue";

interface User {
    id: number,
    username: string;
}

interface Message {
    user: User;
    text: string;
}

export interface IChat {
    id: number;
    user: User;
    color: string;
    messages: Message[];
};

class Controller {
    socket: Socket | null = null;
    chats: IChat[] = [];
    selectedChat = ref<IChat | null>(null);

    init() {
        this.socket = io("https://subscriber-service-c3rxvlmzmq-ew.a.run.app/");

        this.socket.on('message-packet', (packet: any) => this.messagePacketHandler(packet));
    }

    messagePacketHandler(packet: any) {
        const chat: IChat | undefined = this.findById(packet.chat_id);

        if (!chat) {
            this.chats = [...this.chats, {
                id: packet.chat_id,
                user: {
                    id: packet.user_id,
                    username: packet.username,
                },
                color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
                messages: [{
                    user: {
                        id: packet.user_id,
                        username: packet.username,
                    },
                    text: packet.message,
                }]
            }]
        } else {
            chat.messages = [...chat.messages, {
                user: {
                    id: packet.user_id,
                    username: packet.username,
                },
                text: packet.message,
            }]
        }
    }

    findById(id: number): IChat | undefined {
        return this.chats.find((chat) => chat.id == id);
    }
};

export const controller = reactive<Controller>(new Controller);