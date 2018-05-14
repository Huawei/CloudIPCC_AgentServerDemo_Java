// Internationalization
// Copyright © Huawei Technologies Co., Ltd. 2016. All rights reserved.

function I18NClass()
{
	// ! @function
	// ************************************************************************
	// functionname   : ParseByTagName
	// desc     : change the page text of the tag elements which have  self attribute according to the languagePageObject
	// parameter  
	// [IN]     languagePageObject: language define page json object, which defines language string for the self tag  
	// [IN]     tagName: the document tag name
	// return   : 
	// ************************************************************************
	this.ParseByTagName = function(languagePageObject, tagName){
		if ( languagePageObject === null || tagName === null ){
			return;
		}
		var elems = null;
		try{
			elems = document.getElementsByTagName(tagName);
		}
		catch(e) {
			return;
		}
		//no elements
		if ( null === elems || 0 === elems.length ){
			return;
		}
		//iterate the elemets to change the value or innner text
		for (var i = 0; i < elems.length; i++){
			var element = elems[i];
			var attribute = element.getAttribute("self");
			if ( attribute === null || attribute === undefined){
				continue;
			}
			// get the specified
			var langPageValue = languagePageObject[attribute];
			if ( langPageValue === null || langPageValue === undefined){
				continue;
			}
			if (tagName === "input"){
				element.value = langPageValue;
			}
			else{
				element.innerHTML = langPageValue;
			}
		}
	}
	// ! @function
	// ************************************************************************
	// functionname   : SwitchI18N
	// desc     : change the html elements which has specified "self" attribute with the languagePageObject 
	// parameter  
	// [IN]     languagePageObject: language define page json object, which defines language string for the self tag  
	// return   : 
	// ************************************************************************
	this.SwitchI18N = function(languagePageObject){
		if ( languagePageObject === null ){
			return;
		}
		// parse h2
		this.ParseByTagName(languagePageObject, 'h2');
		// parse h3
		this.ParseByTagName(languagePageObject, 'h3');
		// parse td
		this.ParseByTagName(languagePageObject, 'td');
		// parse span
		this.ParseByTagName(languagePageObject, 'span');
		// parse option
		this.ParseByTagName(languagePageObject, 'option');
		// parse li
		this.ParseByTagName(languagePageObject, 'li');
		// parse input
		this.ParseByTagName(languagePageObject, 'input');
		// parse p
		this.ParseByTagName(languagePageObject, 'p');
		// parse a
		this.ParseByTagName(languagePageObject, 'a');
	}
	
}