const express =require('express');
const port=5000;
const app=express();
app.listen(port,() => {
    console.log("Server running on port ",port);
});
app.get('/',(req,res) =>
{
    //res.send("Test");
    const PATH="http://127.0.0.1:5000/dummy.json";
   /* fetch(PATH)
    .then(res=>{
        console.log(res.json());
    }) */
                //const data = await response.json();
                //const tempItem = JSON.stringify(data);
   //const tempObj = JSON.parse(tempItem);
   //const tempRecords = tempObj.slice(indexOfFirstRecord, indexOfLastRecord);
   //const tempPages = Math.ceil(tempObj.length / recordsPerPage);
   // const file=fetch(PATH);
   // let fileData=file.json();
   // let test=JSON.parse(file);
    res.send("da");
});
