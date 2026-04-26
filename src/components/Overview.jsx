import { useEffect, useState } from "react";

function Overview() {

  const [stats, setStats] = useState({
        visitorsToday: 0,
        totalVisitors: 0,
        messages: 0,
        downloads: 0
    });

    useEffect(()=>{
        fetchStats();
    })

    async function fetchStats() {
        
        
    }

    return (
        <div>
            this is overview
        </div>
    )
}

export default Overview
