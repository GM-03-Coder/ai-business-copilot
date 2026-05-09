# simple version (no JWT yet)

users_db = {}

def signup(user):
    if user.username in users_db:
        return {"error": "User already exists"}

    users_db[user.username] = user.password
    return {"message": "User created"}

def login(user):
    if users_db.get(user.username) == user.password:
        return {"message": "Login successful"}
    return {"error": "Invalid credentials"}