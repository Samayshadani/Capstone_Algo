import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, doc, getDoc, query, where, getCountFromServer, updateDoc } from "firebase/firestore";

export async function GET(request: NextRequest) {
    try {
        // Get user ID from query params
        const searchParams = request.nextUrl.searchParams;
        const uid = searchParams.get("uid");

        if (!uid) {
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        // Fetch user document
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userData = userSnap.data();
        const userXP = userData.xp || 0;

        // Check if we have a cached rank that's less than 1 hour old
        const stats = userData.stats;
        const lastRankUpdate = stats?.lastRankUpdate;
        const ONE_HOUR = 3600000; // milliseconds

        if (lastRankUpdate && stats?.rank !== undefined) {
            const age = Date.now() - lastRankUpdate;
            if (age < ONE_HOUR) {
                // Return cached rank
                return NextResponse.json({
                    rank: stats.rank,
                    totalUsers: stats.totalUsers || 0,
                    percentile: stats.percentile || 0,
                    cached: true,
                    timestamp: new Date(lastRankUpdate).toISOString()
                });
            }
        }

        // Calculate new rank
        const usersRef = collection(db, "users");

        // Count users with higher XP
        const higherXPQuery = query(usersRef, where("xp", ">", userXP));
        const higherXPSnapshot = await getCountFromServer(higherXPQuery);
        const usersWithHigherXP = higherXPSnapshot.data().count;

        // Rank is number of users with higher XP + 1
        const rank = usersWithHigherXP + 1;

        // Get total user count
        const totalUsersSnapshot = await getCountFromServer(usersRef);
        const totalUsers = totalUsersSnapshot.data().count;

        // Calculate percentile (higher is better)
        const percentile = totalUsers > 0
            ? Math.round(((totalUsers - rank + 1) / totalUsers) * 100)
            : 0;

        // Cache the result in Firestore
        await updateDoc(userRef, {
            "stats.rank": rank,
            "stats.totalUsers": totalUsers,
            "stats.percentile": percentile,
            "stats.lastRankUpdate": Date.now()
        });

        return NextResponse.json({
            rank,
            totalUsers,
            percentile,
            cached: false,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error("Error calculating rank:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
