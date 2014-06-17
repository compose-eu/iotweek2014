API_TOKEN=`cat ../api_token.txt`
SO_ID=`cat SO.id`

curl -i -X POST -H "Content-Type: application/json" \
    -H "Authorization: $API_TOKEN" \
    -d '{"callback": "pubsub","destination": "'$API_TOKEN'"}' \
    http://api.servioticy.com/$SO_ID/streams/sensorA/subscriptions

echo
