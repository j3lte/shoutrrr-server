[![Docker Pulls](https://img.shields.io/docker/pulls/j3lte/shoutrrr-server.svg)](https://hub.docker.com/r/j3lte/shoutrrr-server/) [![Twitter Follow](https://img.shields.io/twitter/follow/j3lte.svg?style=social)](https://twitter.com/j3lte)

# j3lte/shoutrrr-server

Execute [Shoutrrr](https://containrrr.dev/shoutrrr) notifications via a simple HTTP API.

## Why?

- Shoutrrr is a great tool to send notifications to different services like Slack, Telegram, Discord, etc.
- It's a CLI tool, so you need to run it from a shell.
- I want to send notifications from my own NAS, so I'd like to have a simple HTTP API to call.

## How?

```bash
docker run -d \
  --name shoutrrr-server \
  -p 8000:8000 \
  j3lte/shoutrrr-server
```

## Docker Compose

```yaml
version: "3.9"

services:
  shouterrr:
    image: j3lte/shoutrrr-server
    restart: always
    ports:
      - "8000:8000"
    environment:
      - SERVER_PORT=8000 # optional, runs on 8000 by default
```

## Usage

Let's assume you have the Shoutrrr server running on `http://localhost:8000`.

### Get info

```bash
curl http://localhost:8000
```

### Verify a Shoutrrr URL

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "...some shoutrrr url..."}' \
  http://localhost:8000/
```

### Send a notification

See a list of supported services [here](https://containrrr.dev/shoutrrr/v0.5/services/overview/)

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url": "...some shoutrrr url...", "message": "Hello World!"}' \
  http://localhost:8000/
```

The JSON payload contains:

- `url`: the Shoutrrr URL to send the notification to
- `message`: the message to send
- `title`: the title of the notification (optional)
- `params`: a list of fields to add to the notification url (optional) (check the various services for supported fields)

## License

MIT
