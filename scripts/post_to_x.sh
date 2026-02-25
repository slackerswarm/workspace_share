#!/bin/bash

# OAuth credentials
CONSUMER_KEY="WzRXbgnuhXiStIhb8bDvJoypi"
CONSUMER_SECRET="fKEUjS4mromCHnjxeDXrwj7wD3gVfDN3aZlpE1Fjex2YNdZwyu"
ACCESS_TOKEN="2026001311368626176-DqhFRyFZbAiZnflrm7ax2bYMVB259t"
ACCESS_SECRET="tbFS8JPXfbbd9QZ5DabtWrKeddUgxwpklqaLDPnhYVVXY"

# Tweet text from arg
STATUS="$1"

# OAuth params
OAUTH_NONCE=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
OAUTH_TIMESTAMP=$(date +%s)
OAUTH_SIGNATURE_METHOD="HMAC-SHA1"
OAUTH_VERSION="1.0"

# URL encode function
url_encode() {
  echo -n "$1" | perl -MURI::Escape -ne 'print uri_escape($_)'
}

# Build param string
PARAMS="oauth_consumer_key=${CONSUMER_KEY}&oauth_nonce=${OAUTH_NONCE}&oauth_signature_method=${OAUTH_SIGNATURE_METHOD}&oauth_timestamp=${OAUTH_TIMESTAMP}&oauth_token=${ACCESS_TOKEN}&oauth_version=${OAUTH_VERSION}&status=$(url_encode \"$STATUS\")"

# Base string
BASE_STRING="POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&$(url_encode \"$PARAMS\")"

# Signing key
SIGNING_KEY="${CONSUMER_SECRET}&${ACCESS_SECRET}"

# Generate signature
SIGNATURE=$(echo -n "$BASE_STRING" | openssl dgst -sha1 -hmac "$SIGNING_KEY" -binary | base64)

# Authorization header
AUTH_HEADER='OAuth oauth_consumer_key="'${CONSUMER_KEY}'", oauth_nonce="'${OAUTH_NONCE}'", oauth_signature="'$(url_encode "$SIGNATURE")'", oauth_signature_method="'${OAUTH_SIGNATURE_METHOD}'", oauth_timestamp="'${OAUTH_TIMESTAMP}'", oauth_token="'${ACCESS_TOKEN}'", oauth_version="'${OAUTH_VERSION}'"'

# Post the tweet
curl --request POST 'https://api.twitter.com/2/tweets' --data "status=$(url_encode \"$STATUS\")" --header "Authorization: $AUTH_HEADER" --header "Content-Type: application/x-www-form-urlencoded" 