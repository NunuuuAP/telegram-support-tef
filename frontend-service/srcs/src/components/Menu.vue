<script setup lang="ts">
import { ref } from 'vue';
import { controller, IChat } from '../controller';
import Chat from './Chat.vue';

const opened = ref<string | null>(null);

const selectChat = (chat: IChat) => {
  controller.selectedChat = controller.selectedChat == chat ? null : chat;
  opened.value = controller.selectedChat ? 'chat' + controller.selectedChat.id : null;
};

</script>

<template>
	<menu>
		<div v-for="chat in controller.chats" v-on:click="selectChat(chat)" class="user-conv" :class="{ active: opened == 'chat' + chat.id }">
			  <div class="user-info">
				<div class="user-image" :style="{ backgroundColor: chat.color }">
					<div class="user-image-h5">
						{{ chat.user.username[0] }}
					</div>
				</div>
				<div class="user-chat" >
					  <h5>{{ chat.user.username }}</h5>
					  <p>{{ chat.messages[chat.messages.length - 1].text }}</p>
				</div>
			  </div>
			  <img v-if="opened != 'chat' + chat.id" src="/assets/arrow.svg">
		</div>
	</menu>
	<div v-if="controller.selectedChat">
		<Chat></Chat>
	</div>
	<div v-else class="no-chat-selected">
		<p><strong>No hay ningún chat seleccionado</strong></p>
		<p>Haga click en la conversación deseada del menú de la izquierda</p>
	</div>
</template>

<style scoped>
menu {
	position: fixed;
	top: 50px;
	bottom: 0px;
	display: flex;
	flex-direction: column;
	background-color: white;
	color: black;
	border: none;
	border-top-right-radius: 30px;
	border-bottom-right-radius: 30px;
	padding: 20px;
	margin-top: 10px;
	margin-left: 10px;
	width: 28%;
	overflow: auto;
}

.user-conv {
	display: flex;
	justify-content: space-between;
	align-items: center;
	cursor: pointer;
	padding: 10px;
}

.user-conv.active {
	background-color: #36AEE2;
	border-radius: 20px;
}
.user-conv.active p {
	color: white;
}

.user-conv:hover {
	background-color: #C8DAEA;
	border-radius: 20px;
}

.user-conv:hover p {
	color: white;
}

.user-conv.active:hover {
	background-color: #36AEE2;
	border-radius: 20px;
	color: white;
}

.user-image {
	height: 55px;
	width: 55px;
	border-radius: 30px;
}

.user-conv img {
	height: 20px;
}

.user-image-h5 {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
	font-size: 20px;
	color: white;
	font-weight: 400;
}

.user-info {
	display: flex;
	justify-content: center;
}

.user-chat {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	margin-left: 15px;
}

.user-chat h5 {
	margin: 0px;
}

.user-chat p {
	margin: 0px;
	font-size: small;
	color: #8198a6;
}

.no-chat-selected {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #ffffff80;
	font-size: small;
	width: 72%;
}

.no-chat-selected {
	position: fixed;
	width: 72%;
	right: 0%;
	top: calc(50% - 45px);
}

.no-chat-selected p {
	margin: 5px;
}
</style>