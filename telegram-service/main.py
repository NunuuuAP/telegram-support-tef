import os, logging, json
import telegram

from google.cloud import pubsub_v1

bot = telegram.Bot(token=os.environ["BOT_TOKEN"])
publisher: pubsub_v1.PublisherClient = pubsub_v1.PublisherClient()
logging.basicConfig(level=logging.ERROR)

def webhook(request):
    if request.method == "POST":
        update = telegram.Update.de_json(request.get_json(force=True), bot)
        
        try:
            future = publisher.publish(os.environ.get('TOPIC_NAME'), json.dumps({
                "type": "CLIENT",
                "chat_id": update.effective_chat.id,
                "username": update.effective_user.username,
                "user_id": update.effective_user.id,
                "message": update.message.text,
            }).encode('utf-8'))
            future.result()
        except Exception as e:
            logging.error(e)
            return "error"
    return "ok"