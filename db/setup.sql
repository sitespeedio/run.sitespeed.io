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
status ENUM('waiting','running', 'crawling','analyzing1','analyzing2','analyzing3','measuring1','measuring2','measuring3','uploading','done', 'failed'),
firstPaint SMALLINT UNSIGNED,
domInteractiveTime MEDIUMINT UNSIGNED,
domContentLoadedTime MEDIUMINT UNSIGNED,
speedindex MEDIUMINT UNSIGNED,
pageLoadTime MEDIUMINT UNSIGNED,
frontEndTime MEDIUMINT UNSIGNED,
backEndTime MEDIUMINT UNSIGNED,
ruleScore TINYINT UNSIGNED,
PRIMARY KEY (id),
UNIQUE KEY(testId)
) ENGINE=InnoDB CHARSET=utf8;
