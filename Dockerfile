ARG DENO_VERSION=2.3.1
ARG DENO_IMAGE=denoland/deno:alpine-${DENO_VERSION}
ARG SHOUTERR_VERSION=0.8.0
ARG SHOUTERR_IMAGE=containrrr/shoutrrr:${SHOUTERR_VERSION}

FROM ${SHOUTERR_IMAGE} as shoutrrr

FROM ${DENO_IMAGE}

COPY --from=shoutrrr /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=shoutrrr /shoutrrr /shoutrrr

WORKDIR /app

USER deno

COPY deno.json .
COPY deno.lock .

ADD ./server .

RUN deno cache /app/main.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-run", "/app/main.ts"]
