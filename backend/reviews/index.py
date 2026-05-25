import json
import os
import urllib.request
import psycopg2

CHAT_ID = "1405167573"

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def send_telegram(token: str, text: str):
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = json.dumps({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML"}).encode()
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    urllib.request.urlopen(req)


def handler(event: dict, context) -> dict:
    """Получает и сохраняет отзывы о ресторане, отправляет уведомление в Telegram."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    if event.get("httpMethod") == "GET":
        cur.execute("SELECT id, name, rating, text, created_at FROM reviews ORDER BY created_at DESC LIMIT 20")
        rows = cur.fetchall()
        reviews = [
            {"id": r[0], "name": r[1], "rating": r[2], "text": r[3], "created_at": r[4].isoformat()}
            for r in rows
        ]
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps(reviews, ensure_ascii=False)}

    body = json.loads(event.get("body") or "{}")
    name = (body.get("name") or "").strip()
    rating = body.get("rating")
    text = (body.get("text") or "").strip()

    if not name or not rating or not text:
        cur.close()
        conn.close()
        return {"statusCode": 400, "headers": CORS_HEADERS, "body": json.dumps({"error": "Заполните все поля"})}

    cur.execute(
        "INSERT INTO reviews (name, rating, text) VALUES (%s, %s, %s) RETURNING id",
        (name, int(rating), text)
    )
    conn.commit()
    cur.close()
    conn.close()

    stars = "⭐" * int(rating)
    token = os.environ["TELEGRAM_BOT_TOKEN"]
    send_telegram(token, f"💬 <b>Новый отзыв!</b>\n👤 {name}\n{stars}\n\n{text}")

    return {"statusCode": 200, "headers": CORS_HEADERS, "body": json.dumps({"ok": True})}
