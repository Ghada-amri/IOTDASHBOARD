from flask import Flask, render_template, request
import eventlet
from flask import json
from flask_mqtt import Mqtt
from flask_socketio import SocketIO
from flask_bootstrap import Bootstrap
from flaskext.mysql import MySQL
from flask import jsonify
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify

app = Flask(__name__)
api = Api(app)
bootstrap = Bootstrap(app)
eventlet.monkey_patch()
CORS(app)

app.config['SECRET'] = 'my secret key'
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_BROKER_URL'] = '192.168.43.244'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False

mysql = MySQL()
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
app.config['MYSQL DATABASE PORT'] = '3306'
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'ghada'
app.config['MYSQL_DATABASE_DB'] = 'smarthome'
mysql.init_app(app)

conn = mysql.connect()
cur = conn.cursor()

mqtt = Mqtt(app)
socketio = SocketIO(app)

mqtt.subscribe('home/temperature_humidite')

"""mqtt.subscribe('home/temperature_humidite')
mqtt.subscribe('home/gaz')
mqtt.subscribe('home/smoke')
mqtt.subscribe('home/eclairage/piece')
mqtt.subscribe('home/eclairage/jardin')
mqtt.subscribe('home/eclairage/garage')
mqtt.subscribe('home/eclairage/hall')
mqtt.subscribe('home/porteexterieur/motdepasse')
mqtt.subscribe('home/portegarage')
mqtt.subscribe('home/vol')"""

"""@mqtt.on_message()
def handle_messages(client, userdata, message):
  print('Received message on topic {}: {}'
        .format(message.topic, message.payload.decode()))
  data = message.payload.decode()
  cur.execute("INSERT INTO mosquittotab (message) VALUES (%s)", data)
  conn.commit()"""

"""@mqtt.on_message()
def handle_messages(client, userdata, message):
  print('Received message on topic {}: {}'
        .format(message.topic, message.payload.decode()))
  data = message.payload.decode()
  cur.execute(
    "INSERT INTO home_informations VALUES ('4','0','100',%s,'0','100','66');", data);
  conn.commit()"""

"""@app.route('/', methods=['GET', 'POST'])
def index():
  if request.method == "POST":
    details = request.form
    tmin = details['tempmin']
    tmax = details['tempmax']
    tval = details['tempval']
    hmin = details['hummin']
    hmax = details['hummax']
    hval = details['humval']
    cur.execute("INSERT INTO temperature (min, max, value) VALUES (%s, %s, %s)", (tmin, tmax, tval))
    conn.commit()
    cur.execute("INSERT INTO humidity (min, max, value) VALUES (%s, %s, %s)", (hmin, hmax, hval))
    conn.commit()
    return 'success'
  elif request.method == "GET":
    cur.execute("SELECT * FROM temperature ORDER BY id DESC LIMIT 1;")
    drivers_data = cur.fetchall()
    return render_template('index.html', drivers_data=drivers_data)
  return render_template('index.html')"""

"""@app.route('//localhost:4200/#/pages/temp-hum', methods=['POST'])
def index():
  if request.method == "POST":
    details = request.form
    date_debut = details['d_debut']
    date_fin = details['d_fin']
    print(date_fin)
    print("helloooo")
    print(date_debut)
    return date_debut, date_fin"""


@app.route('/temperature', methods=['GET'])
def get_temperature():
  if request.method == "GET":
    cur.execute("SELECT min_temp,max_temp,value_temp FROM home_informations ORDER BY ID DESC LIMIT 1;")
    temperature = cur.fetchall()
    return jsonify({'temperature': [{'value': temperature[0][2], 'min': temperature[0][0], 'max': temperature[0][1]}]})


@app.route('/humidity', methods=['GET'])
def get_humidity():
  if request.method == "GET":
    cur.execute("SELECT min_hum,max_hum,value_hum FROM home_informations ORDER BY ID DESC LIMIT 1;")
    humidity = cur.fetchall()
    return jsonify({'humidity': [{'value': humidity[0][2], 'min': humidity[0][0], 'max': humidity[0][1]}]})


@app.route('/temperature_humidity_per_date', methods=['GET'])
def get_date():
  if request.method == "GET":
    cur.execute(
      "SELECT date,value_temp,value_hum FROM home_informations ORDER BY date;")
    temphumcurv = cur.fetchall()
    return jsonify({'temphumcurv': temphumcurv})


"""@app.route('/temperature_humidity_per_date/', methods=['GET'])
def get_date():
  if request.method == "GET":
    cur.execute("SELECT date,value_temp,value_hum FROM home_informations ORDER BY date ;")
    temphumcurv = cur.fetchall()
    return jsonify({'temphumcurv': temphumcurv })"""

"""@app.route('/mosquitto', methods=['GET'])
def aff():
    cursor = conn.cursor()
    cur.execute("SELECT * FROM mosquittotab;")
    drivers_data = cursor.fetchall()
    return render_template('index.html', drivers_data=drivers_data)"""


# Parameters for SSL enabled
# app.config['MQTT_BROKER_PORT'] = 8883
# app.config['MQTT_TLS_ENABLED'] = True
# app.config['MQTT_TLS_INSECURE'] = True
# app.config['MQTT_TLS_CA_CERTS'] = 'ca.crt'


@socketio.on('subscribe')
def handle_subscribe(json_str):
  data = json.loads(json_str)
  mqtt.subscribe(data['home/temperature_humidite'])


"""@mqtt.on_message()
def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    socketio.emit('mqtt_message', data=data)"""


@mqtt.on_log()
def handle_logging(client, userdata, level, buf):
  print(level, buf)


"""if __name__ == '__main__':
  socketio.run(app, host='127.0.0.1', port=5000)"""

if __name__ == '__main__':
  app.run(port=5000)
