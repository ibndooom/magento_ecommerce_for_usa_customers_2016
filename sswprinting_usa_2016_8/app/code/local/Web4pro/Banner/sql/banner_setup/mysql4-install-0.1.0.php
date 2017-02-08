<?php
	$this->startSetup();
	
	$this->run("
		DROP TABLE IF EXISTS {$this->getTable('banner/banner')};
		CREATE TABLE IF NOT EXISTS {$this->getTable('banner/banner')} (
			`banner_id` int(11) unsigned NOT NULL auto_increment,
			`group_name` varchar (80) NOT NULL default '',
			`title` varchar(255) NOT NULL default '',
			`url` varchar(255) NOT NULL default '',
			`image` varchar(255) NOT NULL default '',
			 small_image varchar(255) NOT NULL default '',
			`html` text NOT NULL,
			`is_enabled` tinyint(1) unsigned NOT NULL default 0,
			PRIMARY KEY (`banner_id`)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8;               
	");
        
//        DROP TABLE IF EXISTS {$this->getTable('banner/catalog_category')};
//		CREATE TABLE IF NOT EXISTS {$this->getTable('banner/catalog_category')} (
//            `banner_id` int(11) NOT NULL,
//            `category_id` int(11) NOT NULL,
//            UNIQUE KEY `banner_category` (`banner_id`,`category_id`),
//            KEY `banner_id` (`banner_id`),
//            KEY `category_id` (`category_id`)
//        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        
	
	$this->endSetup();
