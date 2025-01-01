const success = (message,data) => {
    
    if(data){

        return {status : true, message, data}
    }else{
     
    return {status : true, message}
    }

}


const failed = (message) => {
  
    return {status : false, message}


}


module.exports = reply = {failed,success}