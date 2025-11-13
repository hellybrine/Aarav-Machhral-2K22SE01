from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import random, string
from models import db, Student, Recognition, Voucher

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

# --------------------------------------------------------------------
# Helper: monthly reset with 50-credit carry-forward
# --------------------------------------------------------------------
def reset_monthly_credits(student: Student):
    now = datetime.utcnow()
    if not student.last_reset or (student.last_reset.month != now.month):
        carry = min(student.balance, 50)
        student.balance = 100 + carry
        student.sent_this_month = 0
        student.last_reset = now
        db.session.commit()

# --------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------

@app.route("/init", methods=["POST"])
def init_data():
    """Seed a few students"""
    db.drop_all()
    db.create_all()
    names = ["Alice", "Bob", "Charlie", "Diana"]
    for name in names:
        db.session.add(Student(name=name))
    db.session.commit()
    return jsonify({"message": "Database initialized", "students": [s.to_dict() for s in Student.query.all()]})


@app.route("/students", methods=["GET"])
def list_students():
    return jsonify([s.to_dict() for s in Student.query.all()])


@app.route("/students/<int:sid>", methods=["GET"])
def get_student(sid):
    s = Student.query.get_or_404(sid)
    reset_monthly_credits(s)
    recs = Recognition.query.filter_by(to_id=sid).order_by(Recognition.created_at.desc()).limit(5).all()
    vouchers = Voucher.query.filter_by(student_id=sid).all()
    data = s.to_dict()
    data["recent_recognitions"] = [r.to_dict() for r in recs]
    data["vouchers"] = [v.to_dict() for v in vouchers]
    return jsonify(data)


@app.route("/recognitions", methods=["POST"])
def create_recognition():
    data = request.json
    from_id, to_id = data["from_id"], data["to_id"]
    credits = int(data["credits"])
    msg = data.get("message", "")

    if from_id == to_id:
        return jsonify({"error": "Cannot recognize yourself"}), 400

    sender = Student.query.get(from_id)
    receiver = Student.query.get(to_id)

    reset_monthly_credits(sender)
    reset_monthly_credits(receiver)

    if not sender or not receiver:
        return jsonify({"error": "Invalid student id"}), 404
    if sender.balance < credits:
        return jsonify({"error": "Not enough balance"}), 400
    if sender.sent_this_month + credits > 100:
        return jsonify({"error": "Monthly sending limit reached"}), 400

    sender.balance -= credits
    sender.sent_this_month += credits
    receiver.balance += credits

    rec = Recognition(from_id=from_id, to_id=to_id, credits=credits, message=msg)
    db.session.add(rec)
    db.session.commit()
    return jsonify(rec.to_dict())


@app.route("/recognitions/<int:rid>/endorse", methods=["POST"])
def endorse_recognition(rid):
    rec = Recognition.query.get_or_404(rid)
    rec.endorsements += 1
    db.session.commit()
    return jsonify({"message": "Endorsed", "endorsements": rec.endorsements})


@app.route("/students/<int:sid>/redeem", methods=["POST"])
def redeem_credits(sid):
    s = Student.query.get_or_404(sid)
    data = request.json
    credits = int(data["credits"])

    if credits <= 0 or credits > s.balance:
        return jsonify({"error": "Invalid credits"}), 400

    s.balance -= credits
    value = credits * 5
    code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
    v = Voucher(student_id=sid, credits=credits, value_inr=value, code=code)
    db.session.add(v)
    db.session.commit()

    return jsonify(v.to_dict())


@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    limit = int(request.args.get("limit", 10))
    students = Student.query.all()

    board = []
    for s in students:
        recs = Recognition.query.filter_by(to_id=s.id).all()
        total_credits = sum(r.credits for r in recs)
        endorsements = sum(r.endorsements for r in recs)
        board.append({
            "id": s.id,
            "name": s.name,
            "total_received": total_credits,
            "recognitions_received": len(recs),
            "endorsements_received": endorsements,
        })
    board.sort(key=lambda x: (-x["total_received"], x["id"]))
    return jsonify(board[:limit])


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
