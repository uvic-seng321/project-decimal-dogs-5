from db import get_db

db = get_db()

def send_query(query):
    """Sends a query to the database and returns the result as a list of tuples"""
    db.reconnect()
    cur = db.cursor()
    try:
        cur.execute(query)
        if query[:6].lower() == "insert":
            db.commit()
        result = cur.fetchall()
        return list(result)
    except:
        return 0