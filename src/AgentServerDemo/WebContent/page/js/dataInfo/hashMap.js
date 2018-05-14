
function HashMap()
 {
     /** Map size **/
     var size = 0;
     /** object **/
     var entry = new Object();
     
     /** save **/
     this.put = function (key , value)
     {
         if (!this.containsKey(key))
         {
             size ++ ;
         }
         entry[key] = value;
     };
     
     /** get **/
     this.get = function (key)
     {
         if ( this.containsKey(key) )
         {
             return entry[key];
         }
         else
         {
             return null;
         }
     };
     
     /** delete **/
     this.remove = function ( key )
     {
         if ( delete entry[key] )
         {
             size --;
         }
     };
     
     /** clear map **/ 
     this.clear = function() 
     {  
         try 
         {  
             delete entry;  
             entry = {};  
             size = 0;
         } 
         catch (e) 
         {  
             return e;  
         }  
     }; 
     
     /** is contain Key **/
     this.containsKey = function ( key )
     {
         return (key in entry);
     };
     
     /** is contain Value **/
     this.containsValue = function ( value )
     {
         for(var prop in entry)
         {
             if (entry[prop] == value)
             {
                 return true;
             }
         }
         return false;
     };
     
     /** all Value **/
     this.values = function ()
     {
    	 var values = new Array();
         for(var prop in entry)
         {
             values.push(entry[prop]);
         }
         return values;
     };
     
     /** all Key **/
     this.keys = function ()
     {
    	 var keys = new Array();
         for(var prop in entry)
         {
             keys.push(prop);
         }
         return keys;
     };
     
     /** Map Size **/
     this.size = function ()
     {
         return size;
     };
 }