compose-sample-app-iotweek2014
==============================

#SMART PRODUCT INTERACTION

The objective of this tutorial is to showcase a simple application of how to set up and use the COMPOSE platform to update information in real time based on a concrete use case of Smart Product Interaction.

This application will enable users to scan the barcode of a product, obtain information from external data sources about the product and to record interactions using the COMPOSE platform. This updates can be monitored by use of the MQTT facilities of the platform by third party subscribers or devices.

The application can be used during the hackathon to build your own ideas on top of it!

The components involved are:
COMPOSE dashboard (glue.thngs)
SCANTHNG service through EVRYTHNG dashboard (devportal-test.evrythng.net)
EVRYTHNG engine (api-test.evrythng.net)

Configuration

Before you can use the test application you need to configure the access to the different services, for which you need certain API keys.

## SCANTHNG and EVRYTHNG API key

To access the scanthng service you need an application key inside the EVRYTHNG ENGINE platform:

Register as a developer in EVRYTHNG portal https://devportal-test.evrythng.net/register
Activate your account (you will receive an activation email)
Go to your dashboard and write down your operator API KEY
https://devportal-test.evrythng.net/account/token
Go to your dashboard and create an application to obtain an APPLICATION KEY
https://devportal-test.evrythng.net/dashboard/applications

## COMPOSE access API KEY

To be able to create our Product Smart Object and start using the COMPOSE platform to publish data, you need to obtain an API KEY. The API KEY is provided once you create your first Smart Object.

Access the Smart Object Manager and sign up and login to the glue.thngs dashboard
http://www.gluethings.com/smart-object-manager/


Further reading if needed
http://www.gluethings.com/documentation/tutorials/connect-device-tutorial/sign-up-and-login/
http://www.gluethings.com/platform/get-started/

Once you are logged in, you can create a Product Smart Object to gather the interaction information

Access the Smart Object Manager and add a new Smart Object with one stream called “checkins” and two channels, one for the “user”, another one for the “checkinlocation”.
http://www.gluethings.com/smart-object-manager/

Stream description (json):
"streams": {
                      "checkins": {
                               "channels": {
                                                     "user": {
                                                                   "type": "String",
                                                                   "unit": "id"
                                                                  },
                                                      "checkInLocation": {
                                                                    "type": "geo_point",
                                                                    "unit": "lat-long"
                                                                      }
                                                  },
                                 "description": "Checkins",
                                 "type": "sensor"
                                       }
                  }

The stream is called “checkins” and defines two channels, one for the user and one for the location where the checkin was done.

Further reading 
http://www.gluethings.com/documentation/tutorials/connect-device-tutorial/create-smart-object/

Once the Smart Object is created, in the My Devices view, you will get the Smart Object ID and the API Token to access the platform’s endpoint.

## CREATE PRODUCT to be scanned

To be able to scan a product and link it to the COMPOSE platform, you have to create the product in the EVRTHNG platform 

The be able to recognize the product in EVRYTHNG platform, it needs to have the identifiers part filled with the adequate barcode.

You can adapt the provided python script to create automatically the products and linked them together, as well as asigning the barcode you are going to use. Change the type of barcode accordingly in the code too.

/compose-sample-app-iotweek2014/www/compose/app/scripts/compose/COMPOSE_hackfest_initialize.py

Another feature of the SCANTHNG service is that you can link your own web application via a redirection URL. In the provided script there is a dummy redirection configuration but it can be changed depending on your application.

## SETUP Smart Product Interaction Sample App

The sample application has been developed with the framework Angular.js (https://angularjs.org/) and provided as a PhoneGap app (http://phonegap.com/). We assume you have configured your environment to be able to compile and deploy phonegap apps.

Checkout sample app from:

Update API keys in the provided services: 
/compose-sample-app-iotweek2014/www/compose/app/scripts/services

You can find the PhoneGap library to scan under
/compose-sample-app-iotweek2014/www/js/scanthng-phonegap.js

## Application Workflow 
	
Once the application is up and running, you have a simple workflow:

Start screen with Login button and Scan barcode button
The Login button just allows you to set a username in the app
Scan barcode button launches the recognition process
When a product is recognized, its information is loaded
A checkin button enables the capture of the user interaction, username is taken from the login if done, location is taken from the device.

## Extensions and ideas

User login: the application doesn’t provide any authentication mechanism, but it has a simple page where you can set the user name so that the updates on the Smart Object register it. More sophisticated mechanisms can be integrated such as Facebook or Twitter login, or maybe authentications based on scans?

Scan button: in this sample app the product information is stored in the EVRYTHNG engine, but you can come up with more imaginative ways of combining data, for example using existing Open Data or combining information from different sources.

Checkin product: the sample app provides a simple checkin button which updates the stream of information by communicating to the service when, where and who checked-in into the product. This showcases how to use the COMPOSE servioticy API to update Smart Objects information in real time. The app does not include actuation or visualization of this information for any purpose, which could be interesting to explore.

Devices or applications can listen to the stream updates based on the MQTT interface and actuate on them!!

