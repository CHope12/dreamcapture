import { NextResponse } from "next/server";
import { app, db, startApp, storage } from "@/lib/firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ error: "Missing request body" }, { status: 400 });

    console.log("Request Body:", body);

    const { userId, prompt, title, date, mood, tags } = body;
    if (!userId || !prompt || !title || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }    

    // 🔹 Simulate creating a task for tracking
    const taskId = `task-${Date.now()}`;

    //Save task in firestore
    await setDoc(doc(db, "tasks", taskId), { taskId, userId, prompt, title, date, mood, tags, status: "pending" });

    console.log("New Task ID:", taskId);

    return NextResponse.json({ taskId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to start generation", details: (error as any).message }, { status: 500 });
  }
}