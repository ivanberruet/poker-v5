// Attendances
export function transformData(data) {
    // Helper to parse Spanish date format (DD/MM/YYYY) to ISO
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day).toISOString(); // Convert to ISO format
    };

    // Group data by year
    const groupedByYear = data.reduce((acc, item) => {
        const year = parseDate(item.date).slice(0, 4); // Extract year from ISO string
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {});

    // Add all data into a single "Historial" bucket
    const allData = data.map((item) => ({ ...item, date: parseDate(item.date) }));

    // Helper to calculate stats
    const calculateStats = (entries) => {
        const dateStats = entries.reduce((acc, entry) => {
            const date = entry.date;
            if (!acc[date]) acc[date] = new Set();
            acc[date].add(entry.player);
            return acc;
        }, {});

        return Object.entries(dateStats).map(([date, playersSet]) => ({
            date,
            players: playersSet.size,
        }));
    };

    // Calculate "Historial" stats
    const historial = {
        year: "Histórico",
        attendances: calculateStats(allData),
    };

    // Build the result structure for each year
    const yearlyStats = Object.entries(groupedByYear).map(([year, entries]) => ({
        year: parseInt(year, 10),
        attendances: calculateStats(entries.map((entry) => ({ ...entry, date: parseDate(entry.date) }))),
    }));

    // Return "Historial" first, followed by yearly stats
    return [historial, ...yearlyStats];
}

export function computeStats(attendances) {
    // Extract the players count and associated dates
    const playerData = attendances.map((stat) => ({
        players: stat.players,
        date: stat.date,
    }));

    // Calculate min, max, and average
    const min = Math.min(...playerData.map((item) => item.players));
    const max = Math.max(...playerData.map((item) => item.players));
    const avg =
        playerData.reduce((sum, item) => sum + item.players, 0) / playerData.length;

    // Find the most recent dates for min and max
    const minDate = playerData
        .filter((item) => item.players === min)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;

    const maxDate = playerData
        .filter((item) => item.players === max)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;

    return {
        min,
        minDate,
        max,
        maxDate,
        avg: parseFloat(avg.toFixed(2)), // Round average to 2 decimals
    };
}

// Tournaments
export function getHistoryTableData(data) {

    let auxData 
    // Calculates tornament length and returns only display columns
    auxData = calculateTournamentLengths(data)

    // Sort by date and position
    auxData = groupByDateAndSort(auxData);

    return auxData;
}

function calculateTournamentLengths(data){
    return data.map(row => {
      // Parse date and time
      const [day, month, year] = row.date.split("/");
      
      const startTime = new Date(`${year}-${month}-${day} ${row.startTime}`);
      let endTime = new Date(`${year}-${month}-${day} ${row.endTime}`);
  
      // Handle end time that falls on the next day
      if (endTime < startTime) {
          endTime.setDate(endTime.getDate() + 1);
      }
  
      const tournamentLength = (endTime - startTime) / (1000 * 3600); // Duration in minutes
  
      return {
        date: row.date,
        start: row.startTime,
        end: row.endTime,
        length: tournamentLength,
        position: row.position,
        player: row.player,
        reEntry: row.reEntry,
      };
    });
}

function groupByDateAndSort(data) {
    // Function to parse date from "day/month/year" format
    function parseDate(dateStr) {
        const [day, month, year] = dateStr.split('/');
        return new Date(`${year}-${month}-${day}`);
    }
  
    // Step 1: Group by date
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = [];
        }
        acc[item.date].push(item);
        return acc;
    }, {});
  
    // Step 2: Sort groups by date (descending)
    const sortedGroups = Object.keys(groupedData)
        .sort((a, b) => parseDate(b) - parseDate(a))
        .map(date => ({
            date,
            data: groupedData[date].sort((a, b) => parseInt(a.position) - parseInt(b.position))
        }));
  
    // Step 3: Flatten the sorted groups into a single array
    return sortedGroups.flatMap(group => group.data);
}
  
export function calculateOverallTournamentsStats(data) {
    // Define the cutoff date (13/7/2024) in ISO format
    const cutoffDate = new Date(2024, 6, 13).toISOString(); // July is month 6 (zero-based)

    // Variables for overall stats
    const uniqueDates = new Set();
    let totalLength = 0;

    // Map to group re-entries by tournament date (after cutoff date)
    const reentriesByTournament = {};

    // Iterate over the data
    data.forEach((row) => {
        const [day, month, year] = row.date.split("/");
        const date = new Date(`${year}-${month}-${day}`).toISOString();

        // Always include dates for general stats
        if (!uniqueDates.has(date)) {
            uniqueDates.add(date);
            totalLength += row.length;
        }

        // Group re-entries by date for rows after cutoff
        if (date >= cutoffDate) {
            if (!reentriesByTournament[date]) reentriesByTournament[date] = 0;
            if (row.reEntry === "Si") reentriesByTournament[date]++;
        }
    });

    // Calculate re-entry stats
    const totalReentries = Object.values(reentriesByTournament).reduce((sum, val) => sum + val, 0);
    const totalReentryTournaments = Object.keys(reentriesByTournament).length;
    const averageReentries = totalReentryTournaments > 0
        ? (totalReentries / totalReentryTournaments).toFixed(1)
        : "0.00"; // Avoid division by zero

    // Calculate general stats
    const totalTournaments = uniqueDates.size;
    const averageLength = (totalLength / totalTournaments).toFixed(1);

    return {
        totalTournaments, // Total unique dates
        averageLength, // Average tournament length
        averageReentries, // Average re-entries per tournament (after cutoff)
    };
}

export function getIndividualTournamentStats(data, date) {
    // Filter the data for the specific date
    const tournamentData = data.filter(row => row.date === date);

    // If no data exists for the date, return null
    if (tournamentData.length === 0) {
        return null;
    }

    // Extract startTime and endTime from the first entry (same for the whole tournament)
    const { start: startTime, end: endTime } = tournamentData[0];

    // Count the number of re-entries
    const reentriesCount = tournamentData.filter(row => row.reEntry === "Si").length;

    // Return the result object
    return {
        startTime,
        endTime,
        reentriesCount,
    };
}

// Podiums
export function formatPodiums(data) {
    // Meses en español para facilitar la conversión
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    // Mapa para almacenar los resultados por fecha
    const result = [];
  
    // Recorrer los datos originales
    data.forEach(tournament => {
        // Obtener la fecha y dividirla en componentes
        
        const [day, month, year] = tournament.date.split("/").map(Number);
        
        // Buscar si ya existe un torneo en el resultado para esa fecha
        const existingTournament = result.find(t => t.year === year && t.month === monthNames[month - 1]);
        
        // Si existe, agregar al lugar correspondiente
        if (existingTournament) {
            if (tournament.position === "1") existingTournament.firstPlace = tournament.player;
            if (tournament.position === "2") existingTournament.secondPlace = tournament.player;
            if (tournament.position === "3") existingTournament.thirdPlace = tournament.player;
        } else {
            // Si no existe, crear un nuevo torneo
            const newTournament = {
                month: monthNames[month - 1],
                year: year,
                firstPlace: tournament.position === "1" ? tournament.player : null,
                secondPlace: tournament.position === "2" ? tournament.player : null,
                thirdPlace: tournament.position === "3" ? tournament.player : null
            };
            result.push(newTournament);
        }
    });
    
    return result;
}
  
// Players
export function getPlayerStatistics(tournaments) {
    const playerStats = {};
    const tournamentDates = new Set(); // To track unique tournament dates
  
    // Helper function to compare dates in "DD/MM/YYYY" format
    function isMoreRecent(date1, date2) {
        const [day1, month1, year1] = date1.split('/').map(Number);
        const [day2, month2, year2] = date2.split('/').map(Number);
  
        const dateObj1 = new Date(year1, month1 - 1, day1);
        const dateObj2 = new Date(year2, month2 - 1, day2);
  
        return dateObj1 > dateObj2;
    }
  
    // Loop through each tournament entry
    tournaments.forEach(entry => {
        const player = entry.player;
        const position = parseInt(entry.position);
        const date = entry.date;
  
        // Add tournament date to the set (ensure unique tournaments)
        tournamentDates.add(date);
  
        // If the player doesn't have a record yet, create one
        if (!playerStats[player]) {
            playerStats[player] = {
                name: player, // Add name key
                participations: 0,
                reentries: 0,
                podiums: 0,
                bestResult: { position: Infinity, date: null },
            };
        }
  
        // Update participations
        playerStats[player].participations += 1;
  
        // Update reentries
        if (entry.reEntry === "Si") {
            playerStats[player].reentries += 1;
        }

        // Update podiums (assuming podium is top 3)
        if (position <= 3) {
            playerStats[player].podiums += 1;
        }
  
        // Update best result logic:
        const currentBestPosition = playerStats[player].bestResult.position;
        if (position < currentBestPosition) {
            // If a better position is found, update
            playerStats[player].bestResult = {
                position: position,
                date: date
            };
        } else if (position === currentBestPosition) {
            // If the position is the same, choose the most recent date
            if (isMoreRecent(date, playerStats[player].bestResult.date)) {
                playerStats[player].bestResult = {
                    position: position,
                    date: date
                };
            }
        }
  
    });
  
    // Convert the playerStats object to an array with "name" as a key
    const resultArray = Object.keys(playerStats).map(player => ({
        name: playerStats[player].name,
        participations: playerStats[player].participations,
        reentries: playerStats[player].reentries,
        podiums: playerStats[player].podiums,
        bestResult: playerStats[player].bestResult,
    }));
  
    return resultArray;
}
  