module.exports = {  
  validateFields: function (options){
    Object.keys(options).forEach(function(k) {
      if(typeof(options[k])==='string'){
        options[k]=options[k].trim();
      }
      if(typeof(options[k])==='object' && options[k]!=null){
        for(i=0;i<options[k].length;i++){
          if(typeof(options[k][i])==='string')
            options[k][i]=options[k][i].trim();
        }        
      }
    });  
    return options;
  }
};