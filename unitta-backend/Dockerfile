FROM node:23-alpine

WORKDIR /app


# # Copie o certificado
# COPY ./certs/nscacert_combined.pem /usr/local/share/ca-certificates/nscacert_combined.crt
# COPY ./certs/nscacert_combined.pem /app/certs/nscacert_combined.crt

# RUN chmod 644 /app/certs/nscacert_combined.crt
# # Exporta variável global
# ENV NODE_EXTRA_CA_CERTS=/app/certs/nscacert_combined.crt

COPY package*.json ./
RUN npm install

COPY . .

# Copia o .env
COPY .env .env

# Gera o cliente do Prisma
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate

COPY entrypoint.sh .
ENTRYPOINT ["./entrypoint.sh"]

EXPOSE 3333
CMD ["npm", "run", "dev"]


