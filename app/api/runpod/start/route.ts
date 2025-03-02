import { NextResponse } from "next/server";
import { initAdmin } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { db, storage } = initAdmin();
    const body = await req.json();
    if (!body) return NextResponse.json({ error: "Missing request body" }, { status: 400 });

    const { userId, prompt, title, date, mood, tags } = body;
    if (!userId || !prompt || !title || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }    

    const taskId = `task-${Date.now()}`;

    await db.collection('tasks').add({
      taskId,
      userId,
      prompt,
      title,
      date,
      mood,
      tags,
      status: "pending",
    });    

    console.log('Task created:', taskId);

    return NextResponse.json({ taskId });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ 
      error: "Failed to start generation", 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}