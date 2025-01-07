import os
from cs50 import SQL
from flask import Flask, render_template, request, redirect, flash, jsonify
from flask_session import Session
import random

app = Flask(__name__)

# Use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Use SQLite database
db = SQL("sqlite:///flashcards.db")


@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
def index():
    flashcards_true = db.execute("SELECT * FROM flashcards WHERE mark_for_review = 1")
    flashcards_false = db.execute("SELECT * FROM flashcards WHERE mark_for_review = 0")

    group = random.choices([flashcards_true, flashcards_false], weights=[3, 2], k=1)[0]
    flashcard = random.choice(group) if group else None

    return render_template("index.html", flashcard=flashcard)


@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        front = request.form.get("front")
        back = request.form.get("back")

        if not front or not back:
            flash("Both front and back fields are required", "error")
            return redirect("/add")

        db.execute("INSERT INTO flashcards (front, back) VALUES (?, ?)", front, back)
        flash("Flashcard added successfully!", "success")
        return redirect("/")
    else:
        return render_template("add.html")


@app.route("/mark_review/<int:card_id>", methods=["POST"])
def mark_review(card_id):
    db.execute("UPDATE flashcards SET mark_for_review = 0 WHERE id = ?", card_id)
    return jsonify({"status": "Card marked as reviewed."})


@app.route("/delete/<int:card_id>", methods=["POST"])
def delete(card_id):
    db.execute("DELETE FROM flashcards WHERE id = ?", card_id)
    return jsonify({"status": "Card deleted."})