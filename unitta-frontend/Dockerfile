FROM --platform=linux/amd64 node:24-slim

WORKDIR /app

# Copie o certificado
COPY ./certs/nscacert_combined.pem /usr/local/share/ca-certificates/nscacert_combined.crt
COPY ./certs/nscacert_combined.pem /app/certs/nscacert_combined.crt

RUN chmod 644 /app/certs/nscacert_combined.crt
# Exporta variável global
ENV NODE_EXTRA_CA_CERTS=/app/certs/nscacert_combined.crt

ENV PATH="/app/node_modules/.bin:$PATH"

RUN rm -rf node_modules package-lock.json
COPY package*.json ./

RUN npm install -g pnpm
RUN pnpm install


COPY . .

EXPOSE 5173
CMD ["pnpm", "run", "dev"]
