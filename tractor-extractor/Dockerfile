FROM apify/actor-node-puppeteer-chrome:16

RUN npm i -g bun

COPY . ./

CMD ["bun run test.js"]