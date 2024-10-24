import OpenAI from 'openai'
import { NextResponse } from "next/server";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
 

 
export async function POST(req: Request) {
  const {text} = await req.json()
  if(text) {
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": [{type:'text', text:text}]}]  ,
        // response_format:{ "type": "json_object" }
      });
     
      
     
        return NextResponse.json({result: response.choices[0].message.content})
  }
  else {
    return NextResponse.json({ Message: "No Text Input", status: 500 });
  }
  }
  
