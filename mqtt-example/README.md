# README

## Service Object operations

### Configuration:

- In `api_token.txt` write you API_KEY.


### Create Service Object

    python CreateSO.py

You will obtain something like:

    06-03 17:25 INFO     utils.py:61  : No Secure
    06-03 17:25 INFO     utils.py:76  : ###  POST /  ###
    06-03 17:25 INFO     utils.py:77  : Paylod: {"name": "Some name", "actions": [], "public": "true", "streams": {"sensorA": {"channels": {"location": {"type": "geo_point", "unit": "degress"}, "temperature": {"type": "numeric", "unit": "degrees"}}, "type": "sensor", "description": "Temperature and location"}, "sensorB": {"channels": {"pressure": {"type": "numeric", "unit": "pascal"}, "altitude": {"type": "numeric", "unit": "meters"}}, "type": "sensor", "description": "altitud and presure"}}, "customFields": {}, "properties": [], "description": "Some kind of description"}
    06-03 17:25 INFO     utils.py:87  : ###  201 Created  ###
    06-03 17:25 INFO     utils.py:41  : [('date', 'Tue, 03 Jun 2014 15:25:42 GMT'), ('transfer-encoding', 'chunked'), ('content-type', 'application/json'), ('location', 'http://api.servioticy.com/1401809150435237689f2dde54018bfc2a7099ac73c81'), ('server', 'api.servIoTicy')]
    06-03 17:25 INFO     utils.py:45  : Response Content Body: 

    06-03 17:25 INFO     utils.py:46  : {"id":"1401809150435237689f2dde54018bfc2a7099ac73c81","createdAt":1401809150435}

In the response there is the Service Object id `1401809150435237689f2dde54018bfc2a7099ac73c81`:

    {"id":"1401809150435237689f2dde54018bfc2a7099ac73c81","createdAt":1401809150435}

### Service Object data upload

To upload data to the Service Object stream `sensorA` with random values:

    python UpdateSO.py --soId 1401692338924dbf1896bef3148428810106aaea6dab2

## MQTT example

Under `mqtt_subscription` you can find a full mqtt example.


### Configuration:

- In `SO.id` write the Service Object id: `1401809150435237689f2dde54018bfc2a7099ac73c81`
	
### Create subscription

Execute `create_subscription.sh` to subcribe to the stream `sensorA`:

	sh create_subscription.sh
	
You will obtain something like:

	HTTP/1.1 201 Created
	Date: Tue, 03 Jun 2014 18:20:52 GMT
	Server: api.servIoTicy
	Location: http://api.servioticy.com/1401692338924dbf1896bef3148428810106aaea6dab2/streams/sensorA/subscriptions/fa47ae6d230641368698b23c60b0df63
	Content-Type: application/json
	Transfer-Encoding: chunked

	{"id":"fa47ae6d230641368698b23c60b0df63","createdAt":1401819659900}
	
Execute `run_subscriber.sh` to start the mqtt subscriber:

	sh run_subcriber.sh
	
The subscriber remains connected:

	subscription url: /topic/NzUwMGY3NzAtNDViMi00OTRhLWE5NjEtOWZiN2JjYzkxYTY1NDBhYTU3ZmQtZGExMC00NzEyLTk2YjEtMjQzOGYyNTRkODhj.1401692338924dbf1896bef3148428810106aaea6dab2.streams.sensorA.updates
	
Now is time to upload data to the `sensorA` streams using `UpdateSO.py`

	python UpdateSO.py --soId 1401692338924dbf1896bef3148428810106aaea6dab2
	
At this point the subscriber receives the mqtt message and shows it:

	subscription url: /topic/NzUwMGY3NzAtNDViMi00OTRhLWE5NjEtOWZiN2JjYzkxYTY1NDBhYTU3ZmQtZGExMC00NzEyLTk2YjEtMjQzOGYyNTRkODhj.1401692338924dbf1896bef3148428810106aaea6dab2.streams.sensorA.updates
	{"channels":{"locations":{"unit":null,"current-value":[51.57299339457366,-0.11006073890956523]},"temperature":{"unit":null,"current-value":18.7}},"lastUpdate":1401819725,"streamsChain":[["1401692338924dbf1896bef3148428810106aaea6dab2","sensorA"]],"timestampChain":[1401819696685],"originId":-6917711147765839049}
	

	
	
	