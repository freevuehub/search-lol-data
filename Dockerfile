FROM  hayd/deno:1.9.2

EXPOSE 19974

WORKDIR /app

USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache server.ts

CMD ["run", "--allow-net", "--allow-read", "server.ts"]
