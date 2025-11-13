from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    balance = db.Column(db.Integer, default=100)
    sent_this_month = db.Column(db.Integer, default=0)
    last_reset = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "balance": self.balance,
            "sent_this_month": self.sent_this_month,
        }

class Recognition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    from_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    to_id = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    credits = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    endorsements = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "from_id": self.from_id,
            "to_id": self.to_id,
            "credits": self.credits,
            "message": self.message,
            "created_at": self.created_at.isoformat(),
            "endorsements": self.endorsements
        }

class Voucher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    credits = db.Column(db.Integer)
    value_inr = db.Column(db.Integer)
    code = db.Column(db.String(12))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "credits": self.credits,
            "value_inr": self.value_inr,
            "code": self.code,
            "created_at": self.created_at.isoformat(),
        }