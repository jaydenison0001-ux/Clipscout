import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
const app=express(), port=process.env.PORT||3000, token=process.env.REVERSE_SEARCH_SESSION_TOKEN;
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:"12mb"}));
app.use("/api/",rateLimit({windowMs:60000,limit:12,standardHeaders:true,legacyHeaders:false}));
app.use(express.static("public"));
app.get("/api/health",(_req,res)=>res.json({ok:true,configured:Boolean(token)}));
app.post("/api/search",async(req,res)=>{
 if(!token)return res.status(503).json({error:"Search is not configured. Add your own account session token to the server environment."});
 const {image,providers,force=false}=req.body||{};
 if(typeof image!=="string"||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+=*$/.test(image))return res.status(400).json({error:"Provide one JPEG, PNG or WebP frame as a base64 data URL."});
 if(image.length>8*1024*1024)return res.status(413).json({error:"Frame too large. Use a smaller image or lower-resolution clip."});
 const allowed=new Set(["serpapi_reverse","yandex_reverse","bing_reverse"]);
 if(!Array.isArray(providers)||providers.length<1||providers.length>3||providers.some(p=>!allowed.has(p)))return res.status(400).json({error:"Choose one to three supported providers."});
 try{const upstream=await fetch("https://reverse-video-search.com/api/search/single-image",{method:"POST",headers:{"Authorization":`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({image,providers,force:Boolean(force)})});const body=await upstream.json().catch(()=>({}));res.status(upstream.status).json(body)}
 catch{res.status(502).json({error:"Could not reach search service. Check provider history before retrying; a timed-out request may already have used credits."})}
});
app.listen(port,()=>console.log(`ClipScout running on port ${port}`));
