# Using MySQL 8
FROM mysql:8

# Establish MySQL DB as environment variable
ENV MYSQL_DATABASE=pharmtech
ENV MYSQL_RANDOM_ROOT_PASSWORD=1

# Copy in first run SQL scripts
COPY ./init.sql /docker-entrypoint-initdb.d/
COPY ./pharmtech_schema.sql /docker-entrypoint-initdb.d/

EXPOSE 3306
