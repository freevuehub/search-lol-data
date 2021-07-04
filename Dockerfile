FROM hayd/alpine-deno:1.5.2

EXPOSE 19974

WORKDIR /app

USER deno

COPY deps.ts /app
RUN deno cache deps.ts

ADD . /app

RUN deno cache server.ts

CMD ["run", "--allow-net", "--allow-read", "server.ts"]
