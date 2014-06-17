import simplejson as json
import time

import utils

def generate_coords():
  global timestamp
  global deltatime

  data = {}

  channels = {}
  location = {}
  lati, longi = utils.newLocation()
  location["current-value"] = [lati, longi]
  channels["locations"] = location
  temperature = {}
  temperature["current-value"] = utils.newTemperature()
  channels["temperature"] = temperature

  data["channels"] = channels
  data["lastUpdate"] = long(time.time())

  return data

args = utils.parse_cmdline_args()

if not args.soId:
    raise ValueError("Must have --soId argument")

response = utils.updateSOData(args.soId,
                              'sensorA',
                              json.dumps(generate_coords()))
print "Print response: "
print response
