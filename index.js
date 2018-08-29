var express=require("express");  
var bodyparser=require('body-parser'); 
var fs=require('fs'); 
var app=express();
var PORT=4000;
var BASEPATH="/home/pankaj/";
app.listen(PORT,function(error,data){
	console.log(`server created on http://localhost:${PORT} `);
});

app.use(bodyparser.json());

//   api for get

app.get('/getApi1',fn)
function fn(req,res){
	res.send({status:200,message:"Welcome express"});
}

//or 

app.get('/getApi2',function fn(req,res){
	res.send({status:200,message:"Welcome express"});
})

//  api for post

app.post('/postapi',function(req,res){
	console.log(req);
    var user=req.body.userName;
    if(user.length>0){
       console.log(req.body.userName);
       res.send({status:200,message:"Welcome express = = "+req.route.path});
    }else{
 	  res.send({status:400,message:"please send user name"});
    }

});


// api for middleware

app.get('/middleware',first,second,third);

function first(req,res,next){
	console.log("i am first");
	next();
}

function second(req,res,next){
	console.log("i am second");
	next();
}
function third(){
	console.log("i am third");
}



// Asyncronous call
// console.log("First call");

// setTimeout(function(){
// 	console.log("second call");
// },1000);

// console.log("Third call");
// 



// Sync calling
// console.log("First call");

// returnCallback(function(data){
// 	console.log('second',data);
//     console.log("Third call");
// })

// function returnCallback(cb){
// 	setTimeout(function(){
// 		cb('done');
// 	},1000);
// }
// End sync calling


// sync using promise object
console.log("First call");
usingPromise()
.then((success)=>{
	console.log("Third call",success);
})
.catch((error)=>{
   console.log("error",error);
})



function usingPromise(){
	return new Promise((resolve, reject)=>{
		console.log("second call ");
		resolve('success');
		// reject('im error');
	})
}
// End Promise sync






// api for create folder

app.post('/createFolder',function(req,res){
	console.log("i am going to creating folder");
	var folderName=req.body.folderName
	  fs.mkdir(BASEPATH+req.body.folderName,function(data){
  	  return res.send({status:200,message:"folder create successfully!!!"})
    });
  console.log("i am created folder");
});


// api for create file inside folder and wright content 
app.post('/createFileWithWriteContent',function(req,res){
	console.log("i am going to creating folder");
	var folderName=req.body.folderName;
	var filename=req.body.fileName;
	var fileContaint=req.body.containt;
	fs.appendFile(BASEPATH+folderName+"/"+filename+".txt", fileContaint,function(error,data){
		if(error){
           res.send({status:400,message:"something went wrong!!!"});
		}else{
		   res.send({status:200,message:"f0lder create successfully!!!"});
		}		
	});
  console.log("i am created folder");
});


//api for read file
app.post('/readfile',function(req,res){
	console.log("i am going to read file");
	var folderName=req.body.folderName
	var fileName=req.body.fileName;
	var filePath=BASEPATH+folderName+"/"+fileName+".txt";
	fs.readFile(filePath,function(err,data){
		if(!err){
           console.log('received data: ' + data.toString());
           res.send({status:200,message:data.toString()});
		}else{

			 res.send({status:400,message:"file does not exits"})           
		}
	});

});

// // api for open file

// app.post('/openfile',function(req,res){
// 	console.log("i am going to open file");
// 	var folderName=req.body.folderName
// 	var fileName=req.body.fileName;
// 	var filePath=BASEPATH+folderName+"/"+fileName+".txt";
// 	fs.openfile()
// })


