-- create user called `manager` with password `Password`
CREATE USER 'manager'@'%' IDENTIFIED BY 'Password';

-- give access to manager on db
GRANT ALL PRIVILEGES ON *.* TO 'manager'@'%';

-- set password method to native password for mysql workbench access (mysql 8 issue)
ALTER USER 'manager'@'%' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';

-- flush them privileges
FLUSH PRIVILEGES;