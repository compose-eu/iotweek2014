import simplejson as json
import httplib, urllib
import csv
import sys
import random
from random import uniform, randrange
import argparse

import logging

# Set to 1 to force HTTPS
SECURE = 0

# Your API Key
# API_KEY = ''
f = open('api_token.txt', 'r')
API_KEY = f.readline().replace('\n', '')
f.close()

# Configure basic Logging format
logging.basicConfig(level=logging.INFO,
    format='%(asctime)s %(levelname)-8s %(filename)s:%(lineno)-4d: %(message)s',
    datefmt='%m-%d %H:%M',
    )

# Import some tools to measure execution time -- NOT USED HERE
from timeit import Timer
from functools import partial
from datetime import tzinfo, timedelta, datetime #http://docs.python.org/library/datetime.html

def get_execution_time(function, numberOfExecTime, *args, **kwargs):
    """Return the execution time of a function in seconds."""
    return round(Timer(partial(function, *args, **kwargs))
                 .timeit(numberOfExecTime), 3)


#---- Send requests to the engine and print responses

# Print the response of the API
def print_response(response):
        logging.info(response['headers'])

        # pretty print response body if any
        if response['body'] != '':
                logging.info("Response Content Body: \n")
                logging.info(response['body'])
        else:
                logging.info("No response body.")

def send_request(method, url, body='', headers='', username='', password=''):

        headers['Authorization'] = API_KEY

        # Use HTTP or HTTPs Connection
        if SECURE:
                conn = httplib.HTTPSConnection(
                        host="api.servioticy.com",
                        port=443,
                )
        else:
                logging.info("No Secure")
                conn = httplib.HTTPConnection(
                        host="api.servioticy.com",
                        port=80,
                        )

        # Build the HTTP(S) request with the body, headers, and ver
        conn.request(
                method=method,
                url='%s' % url,
                body=body,
                headers=headers
                )

        # Send the request
        logging.info("###  %s %s  ###" % (method,url))
        logging.info("Paylod: " + body)
        full_response = conn.getresponse()

        # Parse the response
        response={} # Parse the HTTP response
        response['body']=full_response.read()
        response['headers']=full_response.getheaders()
        response['status']=full_response.status
        response['reason']=full_response.reason
        conn.close()
        logging.info("###  %s %s  ###" % (response['status'],response['reason']))
        print_response(response)
        return response


#---- Implementation of a few endpoints in the engine

# Creates a SO
def create_so(soDocument):
        headers = {"Content-Type": "application/json"}
        response = send_request(
                method="POST",
                url="/",
                body=soDocument,
                headers=headers
        )

        if response['status'] != 201:
                logging.error("oops, problem creating the SO. Error: " + str(response['status']))
                logging.error(response['headers'])
                logging.error(response['body'])

        return response

# Creates a subscription
def create_subscription(soId, streamId, subsDocument):
        headers = {"Content-Type": "application/json"}
        response = send_request(
                method="POST",
                url="/" + soId + "/streams/" + streamId + "/subscriptions",
                body=subsDocument,
                headers=headers
        )

        if response['status'] != 201:
                logging.error("oops, problem creating the subscription. Error: " + str(response['status']))
                logging.error(response['headers'])
                logging.error(response['body'])

        return response

# Get the list of all the SOs of the user
def get_all_sos():
        headers = {"Accept": "application/json"}
        send_request(
                method="GET",
                url="/",
                headers=headers
        )

# Get a single SO
def get_so(soId):
        headers = {"Accept": "application/json"}
        send_request(
                method="GET",
                url="/%s" % soId,
                headers=headers
        )

# Updates a SO
def update_so(soDocument,soId):
        headers = {"Content-Type": "application/json"}
        send_request(
                method="PUT",
                url="/%s" % soId,
                body=soDocument,
                headers=headers
        )

# Update sensor data /{soId}/streams/{streamId}
def updateSOData(soId, streamId, data):
        headers = {"Content-Type": "application/json"}
        response = send_request(
                method="PUT",
                url="/%s/streams/%s" %(soId, streamId),
                body=data,
                headers=headers
        )

        if response['status'] != 200 and response['status'] != 202:
                logging.error("oops, problem creating the subscription. Error: " + str(response['status']))
                logging.error(response['headers'])
                logging.error(response['body'])

        return response

def newLocation():
   return uniform(51.307222,51.707222), uniform(-0.1075, -0.1475)

def newTemperature():
    return round((random.random() * (22.99 - 18.00) + 18.00), 2)

def parse_cmdline_args():
    parser = argparse.ArgumentParser(
                        formatter_class = argparse.RawDescriptionHelpFormatter)

    parser.add_argument('--soId',
                        required=False,
                        dest='soId',
                        help='Service Object Id')

    return parser.parse_args()
