<script setup lang="ts">
import { ref } from 'vue';
import { controller } from '../controller';

const message = ref<string>("");

const submit = () => {
	if (message.value.length == 0) return;

	if (controller.selectedChat) {
		fetch("http://localhost:3000/response", {
			headers: {
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				type: "SUPPORT",
				chat_id: controller.selectedChat.id,
				message: message.value
			})
		});

		controller.selectedChat.messages = [...controller.selectedChat?.messages, {
			user: {
				id: 0,
				username: "Atención al cliente",
			},
			text: message.value
		}]
		message.value = "";
	}
}
</script>

<template>
	<div class="chat" v-if="controller.selectedChat">
		<div class="messages">
			<div class="message" v-for="chatMessage in controller.selectedChat.messages" :class="{ active: chatMessage.user.id == 0}">
				<h4>{{ chatMessage.user.username }}</h4>
				<p>{{ chatMessage.text }}</p>
			</div>
		</div>
		<div>
			<form v-on:submit.prevent="submit">
				<input placeholder="Escribe un mensaje..." v-model="message">
			</form>
		</div>
	</div>
</template>

<style scoped>

.chat {
	position: fixed;
	width: calc(72% - 110px);
	right: 0%;
	top: 45px;
	bottom: 0%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #36AEE290;
	border-radius: 30px;
	padding: 20px;
	margin: 15px;
}

.messages {
	display: flex;
	flex-direction: column;
	margin-bottom: 5px;
	gap: 5px;
	overflow: scroll;
}

.messages.active {
	align-items: end;
}

.chat input {
  	width: 100%;
  	box-sizing: border-box;
  	padding: 10px;
  	text-indent: 5px;
}

.chat input:focus {
	outline-color: #A9C6D8;
}


.message {
	display:flex;
	flex-direction: column;
	justify-content: start;
	width: fit-content;
  	background-color: #ffffff30;
  	border-radius: 20px;
  	padding: 10px;
	padding-right: 15px;
  	text-indent: 5px;
}

.message h4 {
  	margin: 2px;
  	color: #ffffff90;
}

.message p {
	margin: 2px;
  	font-size: small;
  	color: white;
}

.message.active {
	background-color: #A9C6D880;

}

</style>