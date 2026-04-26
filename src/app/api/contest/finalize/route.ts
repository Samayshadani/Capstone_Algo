import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, getDoc, increment, arrayUnion } from 'firebase/firestore';

export async function POST(req: Request) {
    try {
        const { contestId } = await req.json();

        if (!contestId) {
            return NextResponse.json({ success: false, error: "Missing contestId" }, { status: 400 });
        }

        // 1. Fetch Contest
        const contestRef = doc(db, "contests", contestId);
        const contestSnap = await getDoc(contestRef);

        if (!contestSnap.exists()) {
            return NextResponse.json({ success: false, error: "Contest not found" }, { status: 404 });
        }

        const contest = contestSnap.data();

        if (contest.status === "completed") {
            return NextResponse.json({ success: false, error: "Contest already finalized" }, { status: 400 });
        }

        // 2. Fetch all Registrations
        const q = query(collection(db, "contestRegistrations"), where("contestId", "==", contestId));
        const regSnap = await getDocs(q);
        
        const players = regSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

        if (players.length === 0) {
            await updateDoc(contestRef, { status: "completed" });
            return NextResponse.json({ success: true, message: "Contest ended with zero participants." });
        }

        // 3. Sort players to determine final rank
        players.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.penalties - b.penalties;
        });

        const totalPlayers = players.length;

        // 4. Calculate Gentle Elo & Update Users
        // In a "gentle" system, we give base points for participating, and massive boosts for winning.
        // E.g., Rank 1 gets +100 rating, Rank 2 gets +80, bottom half gets +10.
        
        const updatePromises = players.map(async (player, index) => {
            const rank = index + 1;
            const percentile = 1 - (index / totalPlayers); // 1.0 = First place

            let ratingChange = 10; // Base participation
            
            if (rank === 1) ratingChange += 100;
            else if (rank === 2) ratingChange += 75;
            else if (rank === 3) ratingChange += 50;
            else if (percentile >= 0.5) ratingChange += 25; // Top 50%

            const newBadges = [];
            if (rank <= 3) newBadges.push(`Top 3 - ${contest.title}`);
            else newBadges.push(`Participant - ${contest.title}`);

            const userRef = doc(db, "users", player.userId);
            
            // Only update if user document exists
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                 await updateDoc(userRef, {
                      rating: increment(ratingChange),
                      contestsParticipated: increment(1),
                      badges: arrayUnion(...newBadges),
                      lastContestRank: rank,
                      lastContestDelta: ratingChange
                 });
            }

            // Also update the registration document to record final rank
            await updateDoc(doc(db, "contestRegistrations", player.id), {
                 finalRank: rank,
                 ratingChange: ratingChange
            });
        });

        await Promise.all(updatePromises);

        // 5. Freeze Contest
        await updateDoc(contestRef, { status: "completed" });

        return NextResponse.json({ 
            success: true, 
            message: `Successfully finalized contest ${contestId}. Updated ${players.length} players.`,
            topPlayerId: players[0].userId
        });

    } catch (error: any) {
        console.error("Error finalizing contest:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
