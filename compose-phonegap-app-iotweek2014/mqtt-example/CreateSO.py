import simplejson as json

import utils

sensor = """
{
    "name": "Some name",
    "public": "true",
    "actions": [],
    "streams": {
        "sensorA": {
            "channels": {
                "location": {
                    "type": "geo_point",
                    "unit": "degress"
                },
                "temperature": {
                    "type": "numeric",
                    "unit": "degrees"
                }
            },
            "type": "sensor",
            "description": "Temperature and location"
        },
        "sensorB": {
            "channels": {
                "altitude": {
                    "type": "numeric",
                    "unit": "meters"
                },
                "pressure": {
                    "type": "numeric",
                    "unit": "pascal"
                }
            },
            "type": "sensor",
            "description": "altitud and presure"
        }
    },
    "customFields": {},
    "properties": [],
    "description": "Some kind of description"
}
"""
data = json.loads(sensor)

response = utils.create_so(json.dumps(data))
