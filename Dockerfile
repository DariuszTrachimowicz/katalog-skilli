# Dwa obrazy z jednego pliku:
#   web    — nginx ze zbudowanym serwisem statycznym
#   zapisy — usługa zapisów z testu doboru (czysty Node, bez zależności)
# Build stron dzieje się w obrazie, więc na serwerze nie trzeba mieć Node.

FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN node build.mjs

FROM node:22-alpine AS zapisy
WORKDIR /app
COPY --from=build /app /app
USER node
CMD ["node", "serwer/zapisy.mjs"]

FROM nginx:1.27-alpine AS web
COPY serwer/nginx-kontener.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/public /usr/share/nginx/html
