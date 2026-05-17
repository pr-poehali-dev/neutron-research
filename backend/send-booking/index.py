import json
import os
import urllib.request


CHAT_ID = "1405167573"


def handler(event: dict, context) -> dict:
    """Отправляет заявку на бронирование в Telegram владельца ресторана."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    date = body.get("date", "").strip()
    guests = body.get("guests", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": {"error": "Имя и телефон обязательны"},
        }

    text = (
        "🍷 <b>Новая заявка на бронирование</b>\n\n"
        f"👤 <b>Имя:</b> {name}\n"
        f"📞 <b>Телефон:</b> {phone}\n"
        f"📅 <b>Дата и время:</b> {date or 'не указано'}\n"
        f"👥 <b>Гостей:</b> {guests or 'не указано'}\n"
        f"💬 <b>Комментарий:</b> {comment or 'нет'}\n\n"
        "Ресторан «Бархатный дворец»"
    )

    token = os.environ["TELEGRAM_BOT_TOKEN"]
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = json.dumps({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }).encode()

    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req) as resp:
        resp.read()

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }