const request=require('request')

const forcast=(address,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?q=' + address + '&APPID=5de69f727b3f42e62df6bae51e09bdce&units=metric'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("Unable to connect to weather service!",undefined)
        }
        else if(response.body.message){
            callback("Unable to find location,Try another location.",undefined)
        }
        else{
            callback(undefined,"Temperature is "+response.body.main.temp+", It feels Like "+response.body.main.feels_like+" outside.")
        }
    })
}

module.exports=forcast