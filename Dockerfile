FROM node:14.15.5-buster-slim

RUN apt-get update && \
      apt-get -y install wget unzip make gcc && \
      rm -rf /var/lib/apt/lists/*
RUN wget -k https://github.com/joan2937/pigpio/archive/master.zip && \
      unzip master.zip &&  \
      cd pigpio-master && \ 
      make && \
      make install

COPY . /app/
WORKDIR /app
RUN yarn install

CMD ["yarn","start:prod"]
# docker run --rm --privileged testcoop 