FROM teitei/chrome:latest

# install ja lang pack.
RUN apt-get update && apt-get install -y language-pack-ja-base language-pack-ja

ENV LANG ja_JP.UTF-8
EXPOSE 9222
