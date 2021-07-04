FROM denoland/deno:1.11.5

EXPOSE 8080

WORKDIR /server

USER deno

COPY deps.ts .
RUN deno cache deps.ts

COPY . .
RUN deno cache server.ts

CMD ["run", "--allow-net", "--allow-read", "server.ts"]
