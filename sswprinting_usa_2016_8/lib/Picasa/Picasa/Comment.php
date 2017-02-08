<?php

require_once('lib/Picasa/Picasa/Author.php');

/**
 * Represents a comment left for a Picasa photo.
 *
 * @package Picasa
 * @version Version 3.0
 * @license http://www.gnu.org/licenses/ GNU Public License Version 3
 * @copyright Copyright (c) 2007 Cameron Hinkle
 * @author Cameron Hinkle
 * @since Version 2.0
 */
class Picasa_Comment {

	/**
	 * The URL of the Atom feed for the comment.              
	 *
	 * @var string
	 */
	private $id;         

	/**
	 * The time and date the comment was submitted.
	 *
	 * @var string
	 */
	private $published;   

	/**
	 * The title of the comment.             
	 *
	 * @var string
	 */
	private $title;     

	/**
	 * The time and date the comment was updated.  
	 *
	 * @var string
	 */
	private $updated;     

	/**
	 * The author of the comment.     
	 *
	 * @var {@link Picasa_Author}
	 */
	private $author;      

	/**
	 * The unique numeric value assigned to the photo by Picasa.     
	 *
	 * @var int
	 */
	private $photoid;     

	/**
	 * The comment's text.      
	 *
	 * @var string
	 */
	private $content;    

	/**
	 * A unique number assigned to the comment.              
	 *
	 * @var string 
	 */
	private $idnum;        

	/**
	 * @return string
	 */
	public function getId () {
		return $this->id;
	}

	/**
	 * @return string
	 */
	public function getPublished () {
		return $this->published;
	}

	/**
	 * @return string
	 */
	public function getTitle () {
		return $this->title;
	}

	/**
	 * @return string
	 */
	public function getUpdated () {
		return $this->updated;
	}

	/**
	 * @return Picasa_Author 
	 */
	public function getAuthor () {
		return $this->author;
	}

	/**
	 * @return int
	 */
	public function getPhotoid () {
		return $this->photoid;
	}

	/**
	 * @return string
	 */
	public function getContent () {
		return $this->content;
	}

	/**
	 * @return string 
	 */
	public function getIdnum () {
		return $this->idnum;
	}

	/**
	 * @param string
	 * @return void
	 */
	public function setId ($id) {
		$this->id = $id;
	}

	/**
	 * @param string
	 * @return void
	 */
	public function setPublished ($published) {
		$this->published = $published;
	}

	/**
	 * @param string
	 * @return void
	 */
	public function setTitle ($title) {
		$this->title = $title;
	}

	/**
	 * @param string
	 * @return void
	 */
	public function setUpdated ($updated) {
		$this->updated = $updated;
	}

	/**
	 * @param Picasa_Author 
	 * @return void
	 */
	public function setAuthor ($author) {
		$this->author = $author;
	}

	/**
	 * @param id
	 * @return void
	 */
	public function setPhotoid ($photoidid) {
		$this->photoid = $photoid;
	}

	/**
	 * @param string
	 * @return void
	 */
	public function setContent ($content) {
		$this->content = $content;
	}

	/**
	 * @param string 
	 * @return void
	 */
	public function setIdnum ($idnum) {
		$this->idnum = $idnum;
	}

	/**
	 * Constructs a Picasa_Comment object from XML.
	 * You'll notice that the parameters are in a different order than with other similar classes in the API.  This is because
	 * it was initially created without a $url or $contextArray parameter and to maintain backwards compatibility, the two
	 * extra parameters had to be appended to the end.
	 *
	 * @param SimpleXMLElement $comments   XML representing a Picasa comment.  
	 * @param string $url                  A URL pointing to the Atom feed for the requested data.  Optional, the default is null.
	 *                                     If null is passed, the method assumes that the XML is supplied in the $comments parameter.
	 * @param array $contextArray          An array that can be passed to stream_context_create() to generate
	 *                                     a PHP context.  See 
	 *                                     {@link http://us2.php.net/manual/en/function.stream-context-create.php}
	 * @throws {@link Picasa_Exception}    If the XML suppled through either parameter does not contain valid XML.
	 */
	public function __construct (SimpleXMLElement $comments=null, $url=null, $contextArray=null) {
	    	if ($url != null) {
			$context = null;
			if ($contextArray != null) {
			    	$context = stream_context_create($contextArray);
			}
			$xmldata = @file_get_contents($url, false, $context);
			if ($xmldata == false) {
				throw Picasa::getExceptionFromInvalidQuery($url, $contextArray);	
			}
			try {
				// Load the XML file into a SimpleXMLElement
				$comments = new SimpleXMLElement($xmldata);
			} catch (Exception $e) {
				throw new Picasa_Exception($e->getMessage(), null, $url);
			}
		}

		if ($comments != null) { 
			$namespaces = $comments->getNamespaces(true);

			$gphoto_ns = $comments->children($namespaces["gphoto"]);
			
			$this->id = $comments->id;
			$this->published = $comments->published;
			$this->title = $comments->title;
			$this->updated = $comments->updated;
			$this->content = $comments->content;
			$this->photoid = $gphoto_ns->photoid;
			$this->author = new Picasa_Author($comments->author);
			$this->idnum = $gphoto_ns->id;
		}	
	}


	/**
	 * Constructs a textual representation of the current Picasa_Comment instantiation.
	 *
	 * @return string
	 */
	public function __toString() {
    		$retString="
      [ TYPE:        Picasa_Comment 
        IDNUM:       ".$this->idnum."
        CONTENT:     ".$this->content."
        ID:          ".$this->id."
        PUBLISHED:   ".$this->published."
        TITLE:       ".$this->title." 
        UPDATED:     ".$this->updated."
        PHOTOID:     ".$this->photoid."
	AUTHOR:      ".$this->author."
      ]";

	    	return $retString;
	}

	/**
	 * Constructs an array of {@link Picasa_Comment} objects based on the XML taken from either the $xml parameter or from the contents of $url.
	 *
	 * @param string $url                  A URL pointing to a Picasa Atom feed that has zero or more "entry" nodes represeing
	 *                                     a Picasa comment.  Optional, the default is null.  If this parameter is null, the method will
	 *                                     try to get the XML content from the $xml parameter directly.
	 * @param SimpleXMLElement $xml        XML from a Picasa Atom feed that has zero or more "entry" nodes represeing a Picasa comment.  
	 *                                     Optional, the default is null.  If the $url parameter is null and the $xml parameter is null,
	 *                                     a {@Picasa_Exception} is thrown.  
	 * @param array $contextArray          An array that can be passed to stream_context_create() to generate
	 *                                     a PHP context.  See 
	 *                                     {@link http://us2.php.net/manual/en/function.stream-context-create.php}
	 * @throws {@link Picasa_Exception}    If the XML passed (through either parameter) could not be used to construct a {@link SimpleXMLElement}.
	 * @return array                       An array of {@link Picasa_Comment} objects representing all comments in the requested feed.
	 * @see http://php.net/simplexml
	 */
	public static function getCommentArray($url=null, SimpleXMLElement $xml=null, $contextArray=null) {
		if ($url != null) {
			$context = null;
			if ($contextArray != null) {
			    	$context = stream_context_create($contextArray);
			}
			// Get the XML document from Picasa's server based on the query in the URL
			$commentXml = @file_get_contents($url, null, $context);
			if ($commentXml == false) {
			    throw Picasa::getExceptionFromInvalidQuery($url);	
			}
		}
		try {
			// Load the XML file into a SimpleXMLElement
			$xml = new SimpleXMLElement($commentXml);
		} catch (Exception $e) {
			throw new Picasa_Exception($e->getMessage(), null, $url);
		}

		$commentArray = array();
		$i = 0;
		// Create a blank Album object for each album in the account 
		foreach($xml->entry as $comment) {
			$commentArray[$i] = new Picasa_Comment($comment);
			$i++;
		}			

		return $commentArray;
	}	



}
