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
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * @category    Mage
 * @package     Mage_Page
 * @copyright   Copyright (c) 2012 Magento Inc. (http://www.magentocommerce.com)
 * @license     http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

/**
 * Html page block
 *
 * @category   Mage
 * @package    Mage_Page
 * @author      Magento Core Team <core@magentocommerce.com>
 *
 * @todo        separate order, mode and pager
 */
class Pixopa_Catalog_Block_Html_Pager extends Mage_Page_Block_Html_Pager
{
    protected $_pageVarName    = 'p';
    protected $_totalCount = 0;
    protected $_resultsCount = 0;
    

    public function getFirstNum()
    {
        return $this->getLimit()*($this->getCurPage()-1)+1;
    }

    public function getLastNum()
    {
        return $this->getLimit()*($this->getCurPage()-1)+$this->getResultsCount();
    }

	public function setResultsCount($count)
    {
        $this->_resultsCount = $count;
        return $this;
    }
    
	public function getResultsCount()
    {
        return $this->_resultsCount;
    }
    
	public function setTotalNum($count)
    {
        $this->_totalCount = $count;
        return $this;
    }
    
    public function getTotalNum()
    {
        return $this->_totalCount;
    }

    public function isFirstPage()
    {
        return $this->getCurrentPage() == 1;
    }

    public function getLastPageNum()
    {
        return $this->getLastPageNumber();
    }

    public function isLastPage()
    {
        return $this->getCurPage() >= $this->getLastPageNum();
    }
    
	public function getLimitUrl($limit)
    {
        return $this->getPagerUrl(array($this->getLimitVarName()=>$limit, $this->getPageVarName() => null));
    }

    public function getPages()
    {
        $pages = array();
        if ($this->getLastPageNumber() <= $this->_displayPages) {
            $pages = range(1, $this->getLastPageNumber());
        }
        else {
            $half = ceil($this->_displayPages / 2);
            if ($this->getCurPage() >= $half && $this->getCurPage() <= $this->getLastPageNumber() - $half) {
                $start  = ($this->getCurPage() - $half) + 1;
                $finish = ($start + $this->_displayPages) - 1;
            }
            elseif ($this->getCurPage() < $half) {
                $start  = 1;
                $finish = $this->_displayPages;
            }
            elseif ($this->getCurPage() > ($this->getLastPageNumber() - $half)) {
                $finish = $this->getLastPageNumber();
                $start  = $finish - $this->_displayPages + 1;
            }

            $pages = range($start, $finish);
        }
        return $pages;
    }

    public function getFirstPageUrl()
    {
        return $this->getPageUrl(1);
    }

    public function getPreviousPageUrl()
    {
        return $this->getPageUrl($this->getCurPage(-1));
    }

    public function getNextPageUrl()
    {
        return $this->getPageUrl($this->getCurPage(+1));
    }

    public function getLastPageUrl()
    {
        return $this->getPageUrl($this->getLastPageNumber());
    }

    /**
     * Initialize frame data, such as frame start, frame start etc.
     *
     * @return Mage_Page_Block_Html_Pager
     */
    protected function _initFrame()
    {
        if (!$this->isFrameInitialized()) {
            $start = 0;
            $end = 0;

            if ($this->getLastPageNumber() <= $this->getFrameLength()) {
                $start = 1;
                $end = $this->getLastPageNumber();
            }
            else {
                $half = ceil($this->getFrameLength() / 2);
                if ($this->getCurPage() >= $half && $this->getCurPage() <= $this->getLastPageNumber() - $half) {
                    $start  = ($this->getCurPage() - $half) + 1;
                    $end = ($start + $this->getFrameLength()) - 1;
                }
                elseif ($this->getCurPage() < $half) {
                    $start  = 1;
                    $end = $this->getFrameLength();
                }
                elseif ($this->getCurPage() > ($this->getLastPageNumber() - $half)) {
                    $end = $this->getLastPageNumber();
                    $start  = $end - $this->getFrameLength() + 1;
                }
            }
            $this->_frameStart = $start;
            $this->_frameEnd = $end;

            $this->_setFrameInitialized(true);
        }

        return $this;
    }

	/**
     * Get current page
     *
     * @param  int $displacement
     * @return int
     */
    public function getCurPage($displacement = 0)
    {
        if ($this->getCurrentPage() + $displacement < 1) {
            return 1;
        }
        elseif ($this->getCurrentPage() + $displacement > $this->getLastPageNumber()) {
            return $this->getLastPageNumber();
        } else {
            return $this->getCurrentPage() + $displacement;
        }
    }

    /**
     * Retrieve last page number
     *
     * @return int
     */
    public function getLastPageNumber()
    {
        $resultSize = (int) $this->getTotalNum();
        if (0 === $resultSize) {
            return 1;
        }
        elseif($this->getLimit()) {
            return ceil($resultSize/$this->getLimit());
        }
        else{
            return 1;
        }
    }
}