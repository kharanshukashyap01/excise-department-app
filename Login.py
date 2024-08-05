from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import uuid
from flask_cors import CORS
from models import UserRole, Role, Dashboard

app = Flask(__name__)
CORS(app) 
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Kharanshu23@localhost/gov_user_data'
db = SQLAlchemy(app)

# Enable CORS for all routes


class user(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

class UserRole(db.Model):
    __tablename__ = 'user_roles'
    user_id = db.Column(db.Integer, primary_key=True)
    role_id = db.Column(db.Integer, primary_key=True)

class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    role_name = db.Column(db.String(255), nullable=False)

class Tokens(db.Model):
    __tablename__ = 'tokens'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token = db.Column(db.String(500), nullable=False)
    expires_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Dashboard(db.Model):
    __tablename__ = 'dashboards'
    role_name = db.Column(db.String(255), primary_key=True)
    link = db.Column(db.Text, nullable=False)

with app.app_context():
    db.create_all()

@app.route('/api/users/<int:user_id>/roles', methods=['GET'])
def get_user_roles(user_id):
    roles = UserRole.query.filter_by(user_id=user_id).all()
    role_ids = [role.role_id for role in roles]
    role_names = Role.query.filter(Role.id.in_(role_ids)).all()
    role_names_list = [role.role_name for role in role_names]
    return jsonify({'roles': role_names_list})


@app.route('/api/roles-links/<int:user_id>', methods=['GET'])
def get_role_links(user_id):
    try:
        # Fetch role_ids for the given user_id
        roles = UserRole.query.filter_by(user_id=user_id).all()
        role_ids = [role.role_id for role in roles]

        if not role_ids:
            return jsonify({"error": "No roles found for the given user ID"}), 404

        # Get the corresponding role names
        role_names = Role.query.filter(Role.id.in_(role_ids)).all()
        role_names_list = [role.role_name for role in role_names]

        if not role_names_list:
            return jsonify({"error": "No role names found for the given role IDs"}), 404

        # Handle the case where roles might be concatenated in a single string
        role_names_list = ','.join(role_names_list).split(',')

        # Fetch links from Dashboard table based on role names
        links = Dashboard.query.filter(Dashboard.role_name.in_(role_names_list)).all()
        links_list = [link.link for link in links]

        if not links_list:
            return jsonify({"error": "No links found for the given role names"}), 404

        return jsonify(links_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route('/api/latest-token/<user_id>', methods=['GET'])
def get_latest_token(user_id):
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({'message': 'Invalid user_id'}), 400

    print(user_id)
    print("token")
    
    latest_token = Tokens.query.filter_by(user_id=user_id).order_by(Tokens.id.desc()).first()
    if latest_token:
        return jsonify({'token': latest_token.token})
    else:
        return jsonify({'message': 'Token not found'}), 404



@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    new_user = user(username=data['username'], email=data['email'], password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user1 = user.query.filter_by(username=data['username']).first()
    from datetime import datetime, timedelta
    if not user1 or not check_password_hash(user1.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    now = datetime.now()

    expires_at = now + timedelta(minutes = 30)
    token = jwt.encode(
        {'id': user1.id, 'exp': expires_at}, 
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

    new_token = Tokens(user_id=user1.id, token=token, expires_at=expires_at)
    db.session.add(new_token)
    db.session.commit()

    return jsonify({'user1':user1.id})

if __name__ == '__main__':
    app.run(debug=True)
