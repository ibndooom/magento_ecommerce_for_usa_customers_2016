<?php
/**
 * @category    Web4pro
 * @package     Web4pro_Fourover
 */

class Web4pro_Fourover_Model_Order extends Mage_Core_Model_Abstract
{
    protected function _construct()
    {
        $this->_init('web4pro_4over/order');
    }
    
    /**
     * Collects all filepathes of PDF snapshots for an order
     *
     * @return array
     */
    public function getJobsFiles()
    {
        $files = array(); 
        if ($jobs = $this->getJobs()) {
            foreach ($jobs as $job) {
                if (!empty($job['files']['local']['path'])) {
                    $files = array_merge($files, array_values($job['files']['local']['path']));
                }
            }
        }
        
        return $files;
    }
    
    /**
     * Collects all uuids of posted files for an order
     *
     * @return array
     */
    public function getJobsFilesUuids()
    {
        $uuids = array(); 
        if ($jobs = $this->getJobs()) {
            foreach ($jobs as $job) {
                if (!empty($job['files']['service'])) {
                    $uuids = array_merge($uuids, array_values($job['files']['service']));
                }
            }
        }

        return $uuids;
    }
}
