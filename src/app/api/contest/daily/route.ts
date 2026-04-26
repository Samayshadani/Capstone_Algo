import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, getDocs, collection, Timestamp } from 'firebase/firestore';

export async function GET() {
  try {
    // 1. Determine "Today" ID (Local server time for simplicity)
    const now = new Date();
    const dateString = now.toISOString().split('T')[0]; // e.g. "2026-03-17"
    const contestId = `daily-${dateString}`;

    // 2. Try to fetch today's Contest
    const contestRef = doc(db, "contests", contestId);
    const contestSnap = await getDoc(contestRef);

    if (contestSnap.exists()) {
      // It exists - return it immediately.
      return NextResponse.json({ success: true, contest: contestSnap.data() });
    }

    // 3. LAZY INITIALIZATION: Contest does not exist yet. Create it!
    console.log(`[Contest System] Initializing Daily Contest for ${dateString} on demand...`);
    
    // Fetch all available question IDs from Firestore
    const questionsSnapshot = await getDocs(collection(db, "questions"));
    const allQuestionIds = questionsSnapshot.docs.map(doc => doc.id);

    if (allQuestionIds.length < 3) {
      return NextResponse.json({ success: false, error: "Not enough questions in database to seed a contest." }, { status: 500 });
    }

    // Select 3 random problems
    const shuffled = allQuestionIds.sort(() => 0.5 - Math.random());
    const selectedProblems = shuffled.slice(0, 3);

    // Set expiration to end of today
    const tomorrow = new Date(now);
    tomorrow.setHours(23, 59, 59, 999);

    const newContestData = {
      id: contestId,
      title: `AlgoSensei Daily Contest`,
      subtitle: `Challenge of ${dateString}`,
      startTime: Timestamp.fromDate(now),
      endTime: Timestamp.fromDate(tomorrow),
      problems: selectedProblems,
      status: "active", 
    };

    // Save newly created contest to Firestore
    await setDoc(contestRef, newContestData);

    return NextResponse.json({ 
      success: true, 
      isNew: true,
      contest: newContestData
    });

  } catch (error: any) {
    console.error("Error fetching/initializing daily contest:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
