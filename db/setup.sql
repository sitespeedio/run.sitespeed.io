CREATE DATABASE sitespeedio;

USE sitespeedio;

CREATE TABLE IF NOT EXISTS runs (
id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
testId CHAR (37),
url VARCHAR(2083),
testerIp VARCHAR(20) NOT NULL,
created DATETIME DEFAULT CURRENT_TIMESTAMP,
changed DATETIME ON UPDATE CURRENT_TIMESTAMP,
location ENUM('sf', 'nyc', 'london', 'amsterdam','singapore','frankfurt'),
browser ENUM('firefox', 'chrome'),
status ENUM('waiting','running','uploading','done', 'failed'),
speedindex integer,
score smallint,
PRIMARY KEY (id),
UNIQUE KEY(testId)
) ENGINE=InnoDB CHARSET=utf8;
