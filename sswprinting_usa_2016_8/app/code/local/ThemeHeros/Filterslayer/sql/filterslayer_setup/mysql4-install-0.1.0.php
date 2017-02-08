<?php
/**
 * Magento
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 */

/**
 * Catalog layer price filter
 *
 * @category   ThemeHeros
 * @package    ThemeHeros_Filterslayer
 * @author     ThemeHeros Developer <soncp@arrowhitech.com>
 */

$installer = $this;

$installer->startSetup();

$installer->run("

-- DROP TABLE IF EXISTS {$this->getTable('filterslayer')};
CREATE TABLE {$this->getTable('filterslayer')} (
  `filterslayer_id` int(11) unsigned NOT NULL auto_increment,
  `attribute_code` varchar(255) NOT NULL default '',
  `attribute_value` text NOT NULL default '',
  `layer_image` int(2) NULL,
  `layer_checkbox` int(2) NULL,
  `created_time` datetime NULL,
  `update_time` datetime NULL,
  PRIMARY KEY (`filterslayer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    ");

$installer->endSetup(); 