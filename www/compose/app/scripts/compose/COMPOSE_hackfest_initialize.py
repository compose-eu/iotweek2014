from urllib2 import Request, urlopen
import json

evrythngEndpoint = "http://api-test.evrythng.net"
composeEndpoint = "http://api.servioticy.com"

evrythngAPIKey = ""
composeAPIKey = ""
soid = ""
barcode = ""

# Create product in EVRYTHNG
product_data = json.dumps({                         
        "fn": "Pepsi Max",
        "description": "Refreshing cola drink",
        "customFields": {
            "brand": "Pepsi",
            "nutritional facts": "{\"sugar\": \"<1%\", \"calories\": \"1.3\", \"fat\":\"0\",\"salt\":0} ",
        },
        "photos": [
            "http://www.bmstores.co.uk/images/hpcProductImage/imgFull/2059-Pepsi-330ml-Can.jpg"
        ],
        "identifiers": {
            "ean_8": barcode
        }
    })

headers = {
           "Authorization": evrythngAPIKey,
           "Content-Type": "application/json"
           }

request = Request(evrythngEndpoint + "/products?app=all", data=product_data, headers=headers)
request.get_method = lambda: 'POST'
response_body = urlopen(request).read()
print response_body

data = json.loads(response_body)
evrythngID = data["id"]

# Update EVRYTHNG product with SOID
product_data_update = json.dumps({
                                  "customFields": {
                                                    "brand": "Pepsi",
                                                    "nutritional facts": "{\"sugar\": \"<1%\", \"calories\": \"1.3\", \"fat\":\"0\",\"salt\":0} ",
                                                    "soid": soid
                                                  }
                                 })

headers = {
           "Authorization": evrythngAPIKey,
           "Content-Type": "application/json"
           }

request = Request(evrythngEndpoint + "/products/" + evrythngID, data=product_data_update, headers=headers)
request.get_method = lambda: 'PUT'
response_body = urlopen(request).read()
print response_body

#create redirection URL
redirection_data = json.dumps({
                               "defaultRedirectUrl" : "http://example.com/{productId}"
                               })

headers = {
           "Authorization": evrythngAPIKey,
           "Content-Type": "application/json"
           }

request = Request(evrythngEndpoint + "/products/" + evrythngID +"/redirector?app=all", data=redirection_data, headers=headers)
request.get_method = lambda: 'POST'
response_body = urlopen(request).read()
print response_body



