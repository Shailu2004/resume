import { createServer } from "http";
import { readFile } from "fs/promises";


const server = createServer(async (req,res)=>{
       if(req.url === '/'){
          const html= await readFile('ind.html', 'utf8');
          res.writeHead(200,{'Content-Type':'text/html'});
          res.end(html);
       }
       else if(req.url === '/products'){
        const prod= await readFile('products.json', 'utf8');
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(prod);
       }
       else{
         res.writeHead(400);
         res.end("404 Page not found");
       }
});

server.listen(3000);