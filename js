<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Department Analysis - by SARSALIJO, JOHN MIKO</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Pirata+One&family=Permanent+Marker&family=Bangers&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        @font-face {
            font-family: 'OnePiece';
            src: url('https://db.onlinewebfonts.com/t/fd6fa80ce81c574b6dedab9a4c2bd5aa.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
        }
        
        :root {
            --primary: #c41e3a; /* Luffy's red */
            --secondary: #ffd700; /* Straw hat gold */
            --accent: #1e90ff; /* Ocean blue */
            --light: #f0e68c; /* Light sand */
            --dark: #2f4f4f; /* Dark slate */
            --wood: #8b4513; /* Wood brown */
            --wood-light: #a0522d; /* Lighter wood */
            --wood-dark: #654321; /* Darker wood */
            --ocean: #1a3c6e; /* Deep ocean blue */
            --ocean-light: #3a6ea5; /* Lighter ocean blue */
            --ocean-foam: #c2e6f0; /* Sea foam */
            --glass: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --neon-glow: 0 0 10px var(--secondary);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            background: linear-gradient(180deg, 
                      var(--ocean) 0%, 
                      var(--ocean-light) 65%, 
                      var(--ocean-foam) 100%);
            background-size: 100% 300%;
            background-position: 0 0;
            animation: oceanWaves 15s ease-in-out infinite;
            color: var(--light);
            line-height: 1.6;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        /* Ocean wave animation */
        @keyframes oceanWaves {
            0%, 100% { background-position: 0 0; }
            50% { background-position: 0 30%; }
        }

        /* Water ripple effect */
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 20% 20%, rgba(194, 230, 240, 0.1) 0%, transparent 70%),
                radial-gradient(ellipse at 80% 40%, rgba(194, 230, 240, 0.08) 0%, transparent 70%),
                radial-gradient(ellipse at 40% 60%, rgba(194, 230, 240, 0.06) 0%, transparent 70%),
                radial-gradient(ellipse at 60% 80%, rgba(194, 230, 240, 0.1) 0%, transparent 70%);
            animation: rippleEffect 12s infinite linear;
            pointer-events: none;
        }

        @keyframes rippleEffect {
            0% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(5px, -5px) scale(1.02); }
            50% { transform: translate(0, 0) scale(1); }
            75% { transform: translate(-5px, 5px) scale(0.98); }
            100% { transform: translate(0, 0) scale(1); }
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 2;
        }

        /* Ship Hull Container Design */
        .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: -10%;
            right: -10%;
            bottom: 0;
            background: linear-gradient(180deg, var(--wood-dark) 0%, var(--wood) 30%, var(--wood-light) 100%);
            border-radius: 20px 20px 180px 180px / 20px 20px 60px 60px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            z-index: -1;
            transform: perspective(1000px) rotateX(2deg);
        }

        /* Ship deck planks */
        .container::after {
            content: '';
            position: absolute;
            top: 0;
            left: -10%;
            right: -10%;
            bottom: 0;
            background-image: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 30px,
                rgba(0, 0, 0, 0.1) 30px,
                rgba(0, 0, 0, 0.1) 32px
            );
            border-radius: 20px 20px 180px 180px / 20px 20px 60px 60px;
            z-index: -1;
            opacity: 0.6;
        }

        /* Ship Header Design */
        header {
            background: linear-gradient(135deg, var(--wood-dark), var(--wood));
            border: 2px solid var(--wood-dark);
            border-radius: 20px 20px 80px 80px / 20px 20px 30px 30px;
            padding: 3rem 2rem;
            margin-bottom: 3rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
                       inset 0 0 50px rgba(255, 215, 0, 0.1);
            position: relative;
            overflow: hidden;
            text-align: center;
        }

        /* Wood grain effect for header */
        header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                repeating-linear-gradient(
                    45deg,
                    rgba(139, 69, 19, 0.1),
                    rgba(139, 69, 19, 0.1) 5px,
                    rgba(139, 69, 19, 0.2) 5px,
                    rgba(139, 69, 19, 0.2) 10px
                );
            opacity: 0.3;
            z-index: 1;
        }

        /* Ship mast */
        .title-container::before {
            content: '';
            position: absolute;
            width: 20px;
            height: 100%;
            background: linear-gradient(to right, var(--wood-dark), var(--wood));
            top: -40px;
            left: 50%;
            transform: translateX(-50%);
            z-index: -1;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        /* Ship sail */
        .title-container::after {
            content: '';
            position: absolute;
            width: 200px;
            height: 150px;
            background: radial-gradient(ellipse at center, var(--light) 0%, var(--light) 70%, rgba(240, 230, 140, 0.7) 100%);
            top: -160px;
            left: 50%;
            transform: translateX(-50%);
            z-index: -2;
            border-radius: 5px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
            clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
        }

        /* Realistic Glass Card Design */
        .instructions-box, .file-drop-area, .chart-container, .search-filter-container, 
        .statistics-panel, .insights-container, .comparison-container {
            background: linear-gradient(135deg, 
                        rgba(160, 82, 45, 0.9), 
                        rgba(101, 67, 33, 0.9));
            border: 2px solid var(--wood-dark);
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 
                        inset 0 0 10px rgba(255, 215, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        /* Wood planks for cards */
        .instructions-box::before, .file-drop-area::before, .chart-container::before, 
        .search-filter-container::before, .statistics-panel::before, 
        .insights-container::before, .comparison-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 15px,
                rgba(0, 0, 0, 0.1) 15px,
                rgba(0, 0, 0, 0.1) 16px
            );
            opacity: 0.4;
            pointer-events: none;
        }

        /* Ship nails */
        .instructions-box::after, .file-drop-area::after, .chart-container::after, 
        .search-filter-container::after, .statistics-panel::after, 
        .insights-container::after, .comparison-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                radial-gradient(circle at 10% 10%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                radial-gradient(circle at 90% 10%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                radial-gradient(circle at 10% 90%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 1px, transparent 1px),
                radial-gradient(circle at 90% 90%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
            background-size: 100% 100%;
            background-repeat: no-repeat;
            pointer-events: none;
        }

        /* Chart Containers - Adjust to make portholes look better */
        #barChartContainer, #pieChartContainer, #comparisonChart {
            position: relative;
            width: 90%;
            aspect-ratio: 1;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        
        #barChartContainer canvas, #pieChartContainer canvas, #comparisonChart canvas {
            position: relative;
            z-index: 5;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
        }
        
        /* Ocean animation within porthole */
        .chart-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                linear-gradient(0deg, 
                    rgba(26, 60, 110, 0.7) 0%, 
                    rgba(58, 110, 165, 0.7) 50%,
                    rgba(194, 230, 240, 0.4) 100%);
            border-radius: 50%;
            z-index: 1;
            animation: oceanMove 8s ease-in-out infinite;
        }
        
        @keyframes oceanMove {
            0%, 100% { background-position: 0% 0%; }
            50% { background-position: 0% 30%; }
        }
        
        /* Floating bubbles within porthole */
        .chart-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 5px, transparent 5px),
                radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 3px, transparent 3px),
                radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.6) 8px, transparent 8px),
                radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 4px, transparent 4px);
            border-radius: 50%;
            z-index: 2;
            animation: bubbleFloat 15s linear infinite;
        }
        
        @keyframes bubbleFloat {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100px); }
        }
        
        /* Ship wheel buttons */
        .upload-btn, .export-btn, .chart-btn, .sort-btn {
            background: radial-gradient(circle at center, var(--wood-light) 0%, var(--wood) 60%, var(--wood-dark) 100%);
            color: var(--secondary);
            border: 4px solid var(--wood-dark);
            border-radius: 50%;
            padding: 15px;
            width: 80px;
            height: 80px;
            cursor: pointer;
            font-family: 'Pirata One', cursive;
            font-size: 1rem;
            transition: all 0.3s ease;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            transform: rotate(0deg);
        }

        /* Ship wheel spokes */
        .upload-btn::before, .export-btn::before, .chart-btn::before, .sort-btn::before {
            content: '';
            position: absolute;
            top: -15px;
            left: 50%;
            width: 8px;
            height: 30px;
            background: var(--wood-dark);
            transform: translateX(-50%);
            border-radius: 4px;
        }

        .upload-btn::after, .export-btn::after, .chart-btn::after, .sort-btn::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            width: 8px;
            height: 30px;
            background: var(--wood-dark);
            transform: translateX(-50%);
            border-radius: 4px;
        }

        /* Additional spokes for horizontal direction */
        .chart-btn i:before, .sort-btn i:before {
            content: '';
            position: absolute;
            left: -15px;
            top: 50%;
            width: 30px;
            height: 8px;
            background: var(--wood-dark);
            transform: translateY(-50%);
            border-radius: 4px;
        }

        .chart-btn i:after, .sort-btn i:after {
            content: '';
            position: absolute;
            right: -15px;
            top: 50%;
            width: 30px;
            height: 8px;
            background: var(--wood-dark);
            transform: translateY(-50%);
            border-radius: 4px;
        }

        .upload-btn:hover, .export-btn:hover, .chart-btn:hover, .sort-btn:hover {
            transform: rotate(15deg) scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        /* Update chart-switcher to look like a ship control panel */
        .chart-switcher {
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin: 2rem 0;
            position: relative;
            padding: 1.5rem;
            background: linear-gradient(to bottom, var(--wood-dark), var(--wood));
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .chart-switcher::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 15px,
                rgba(0, 0, 0, 0.1) 15px,
                rgba(0, 0, 0, 0.1) 16px
            );
            opacity: 0.4;
            border-radius: 15px;
            pointer-events: none;
        }

        /* Ship table design */
        .results-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 8px;
            margin: 2rem 0;
        }

        .results-table th {
            background: linear-gradient(135deg, var(--wood-dark), var(--wood));
            color: var(--secondary);
            padding: 1.2rem;
            font-family: 'Permanent Marker', cursive;
            text-align: left;
            border-radius: 12px 12px 0 0;
            position: relative;
        }

        /* Make the table look like a ship's log */
        .results-table th:first-child {
            border-top-left-radius: 12px;
            border-bottom-left-radius: 0;
        }

        .results-table th:last-child {
            border-top-right-radius: 12px;
            border-bottom-right-radius: 0;
        }

        .results-table td {
            background: rgba(250, 235, 215, 0.9);
            padding: 1rem;
            color: var(--wood-dark);
            border-top: 1px solid var(--wood);
            font-family: 'Pirata One', cursive;
            font-size: 1.1rem;
        }

        .results-table tr:hover td {
            background: rgba(250, 235, 215, 1);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        /* Make the statistics panel look like ship's control gauges */
        .statistics-panel {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            padding: 2rem;
        }

        .stat-card {
            background: radial-gradient(circle at center, var(--wood-light) 0%, var(--wood) 70%, var(--wood-dark) 100%);
            border: 4px solid var(--wood-dark);
            border-radius: 50%;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s ease;
            aspect-ratio: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(ellipse at 30% 30%, 
                    rgba(255, 255, 255, 0.2) 0%, 
                    transparent 60%);
            border-radius: 50%;
            pointer-events: none;
        }

        .stat-card::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: 
                conic-gradient(
                    transparent 0deg,
                    transparent 330deg,
                    var(--secondary) 330deg,
                    var(--secondary) 360deg
                );
            opacity: 0.8;
            border-radius: 50%;
            z-index: 0;
            animation: gaugeNeedle 2s ease-out forwards;
        }

        @keyframes gaugeNeedle {
            from { transform: rotate(0deg); }
            to { transform: rotate(var(--needle-rotation, 90deg)); }
        }

        .stat-value {
            font-family: 'Permanent Marker', cursive;
            font-size: 2rem;
            color: var(--secondary);
            margin-bottom: 0.5rem;
            position: relative;
            z-index: 2;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }

        .stat-label {
            font-family: 'Pirata One', cursive;
            color: var(--light);
            font-size: 1.1rem;
            position: relative;
            z-index: 2;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }

        /* Fix for the themed toggle to look like a ship's wheel */
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: radial-gradient(circle at center, var(--wood-light) 0%, var(--wood) 60%, var(--wood-dark) 100%);
            border: 4px solid var(--wood-dark);
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        /* Add ship wheel spokes to theme toggle */
        .theme-toggle::before,
        .theme-toggle::after {
            content: '';
            position: absolute;
            background: var(--wood-dark);
            border-radius: 4px;
        }

        .theme-toggle::before {
            width: 6px;
            height: 90%;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
        }

        .theme-toggle::after {
            height: 6px;
            width: 90%;
            left: 5%;
            top: 50%;
            transform: translateY(-50%);
        }

        /* Additional diagonal spokes */
        .theme-toggle i::before,
        .theme-toggle i::after {
            content: '';
            position: absolute;
            width: 6px;
            height: 60%;
            background: var(--wood-dark);
            border-radius: 4px;
        }

        .theme-toggle i::before {
            transform: rotate(45deg);
        }

        .theme-toggle i::after {
            transform: rotate(-45deg);
        }

        .theme-toggle:hover {
            transform: rotate(90deg);
        }

        /* Footer to look like ship's base */
        footer {
            font-family: 'Permanent Marker', cursive;
            text-align: center;
            padding: 2rem;
            color: var(--secondary);
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            letter-spacing: 1px;
            margin-top: 4rem;
            background: linear-gradient(to bottom, var(--wood), var(--wood-dark));
            border-radius: 50% 50% 0 0;
            box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
        }

        footer::before {
            content: '⚓';
            font-size: 2.5rem;
            display: block;
            margin-bottom: 1rem;
            animation: float 3s ease-in-out infinite;
        }

        /* Make sure charts render properly */
        canvas {
            z-index: 5;
            position: relative;
        }

        .file-drop-area {
            border: 3px dashed var(--wood-dark);
            border-radius: 15px;
            padding: 2rem;
            text-align: center;
            width: 100%;
            max-width: 500px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: linear-gradient(135deg, var(--wood-light), var(--wood));
            margin: 2rem auto;
            font-family: 'Pirata One', cursive;
            position: relative;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        
        /* Create a treasure chest look for the file drop area */
        .file-drop-area::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(to right, 
                var(--wood-dark) 0%, var(--wood-dark) 10px, 
                var(--secondary) 10px, var(--secondary) 20px,
                var(--wood-dark) 20px, var(--wood-dark) 30px,
                var(--secondary) 30px, var(--secondary) 40px,
                var(--wood-dark) 40px, var(--wood-dark) 50px,
                var(--secondary) 50px, var(--secondary) 60px);
            background-size: 60px 20px;
            background-repeat: repeat-x;
            border-radius: 10px 10px 0 0;
        }
        
        .file-drop-area::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(to right, 
                var(--wood-dark) 0%, var(--wood-dark) 10px, 
                var(--secondary) 10px, var(--secondary) 20px,
                var(--wood-dark) 20px, var(--wood-dark) 30px,
                var(--secondary) 30px, var(--secondary) 40px,
                var(--wood-dark) 40px, var(--wood-dark) 50px,
                var(--secondary) 50px, var(--secondary) 60px);
            background-size: 60px 20px;
            background-repeat: repeat-x;
            border-radius: 0 0 10px 10px;
        }
        
        .file-drop-area p {
            color: var(--light);
            margin-bottom: 1rem;
            font-size: 1.2rem;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            position: relative;
        }
        
        .file-drop-area p::before {
            content: '📜';
            font-size: 2rem;
            display: block;
            margin-bottom: 0.5rem;
        }
        
        .file-input {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            cursor: pointer;
        }
        
        .file-drop-area:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
            border-color: var(--secondary);
        }

        .upload-btn {
            background: radial-gradient(circle at center, var(--wood-light) 0%, var(--wood) 60%, var(--wood-dark) 100%);
            color: var(--secondary);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            font-family: 'Pirata One', cursive;
            font-size: 1.2rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            display: inline-block;
            border: 2px solid var(--wood-dark);
            margin-top: 1rem;
        }
        
        .upload-btn:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            background: radial-gradient(circle at center, var(--wood) 0%, var(--wood-dark) 100%);
        }

        .comparison-container {
            background: linear-gradient(135deg, 
                        rgba(160, 82, 45, 0.9), 
                        rgba(101, 67, 33, 0.9));
            border: 2px solid var(--wood-dark);
            border-radius: 15px;
            padding: 2rem;
            margin: 2rem 0;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 
                        inset 0 0 10px rgba(255, 215, 0, 0.1);
            position: relative;
            overflow: hidden;
        }

        .comparison-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .comparison-select {
            flex: 1;
            padding: 0.8rem;
            background: radial-gradient(circle at center, var(--wood-light) 0%, var(--wood) 70%, var(--wood-dark) 100%);
            border: 2px solid var(--wood-dark);
            border-radius: 8px;
            color: var(--light);
            font-family: 'Pirata One', cursive;
            font-size: 1.1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .comparison-select:focus {
            outline: none;
            border-color: var(--secondary);
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
        }
    </style>
</head>
<body>
    <div class="background-elements"></div>
    <div class="straw-hat-icons">
        <div id="luffy" class="crew-icon" style="background-image: url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXNkanJpYXpwY21xZDVtd2tzYjNtaGpwZm9veTVrbXBqYm9mMnhvNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/fZdzEHC8sMC0E/giphy.gif'); top: 10%; left: 5%;" title="Monkey D. Luffy"></div>
        <div id="zoro" class="crew-icon" style="background-image: url('https://media.giphy.com/media/XARctHXJvoIQP0rH3y/giphy.gif?cid=790b7611qogs14gl5gbpwnzptam0oalgrmqqt9dl9t08yv1n&ep=v1_gifs_search&rid=giphy.gif&ct=g'); top: 20%; left: 80%;" title="Roronoa Zoro"></div>
        <div id="nami" class="crew-icon" style="background-image: url('https://media.giphy.com/media/Qcrmc6dbGyLMQ/giphy.gif?cid=790b76117xqg85piny87u3bnl19kef1nej0e9jda0pm2rq38&ep=v1_gifs_search&rid=giphy.gif&ct=g'); top: 40%; left: 15%;" title="Nami"></div>
        <div id="usopp" class="crew-icon" style="background-image: url('https://media.giphy.com/media/oQ4wYOgjQbD7G/giphy.gif?cid=790b7611xc6cny5te7zs3vztxmabt95ohjadn8jg0sq5ipm6&ep=v1_gifs_search&rid=giphy.gif&ct=g'); top: 60%; left: 75%;" title="Usopp"></div>
        <div id="sanji" class="crew-icon" style="background-image: url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2IxZ3RjcHo2aDVpZW4yM20wcmduN2R6eWxhdDdldHI5eXlscHJlcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LniGJTs1OwA0Z4aW9b/giphy.gif'); top: 30%; left: 90%;" title="Sanji"></div>
        <div id="chopper" class="crew-icon" style="background-image: url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTQzZWVoMGM5NTJkMGZjNmNscXpiMHg1eW10Mjd1M3JsbDk3OWc4cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/R548B8WxpUTsI/giphy.gif'); top: 70%; left: 25%;" title="Tony Tony Chopper"></div>
        <div id="robin" class="crew-icon" style="background-image: url('https://media.giphy.com/media/13SYnseWRwRSc8/giphy.gif?cid=790b76113wihn6hhz136creo0q9g5b230ax48200qib9bwdx&ep=v1_gifs_search&rid=giphy.gif&ct=g'); top: 50%; left: 60%;" title="Nico Robin"></div>
        <div id="franky" class="crew-icon" style="background-image: url('https://media.giphy.com/media/CUfY9iiyxyx56/giphy.gif?cid=790b7611bypyu7adqmhxpi31duydlobyi7dqoqrm6kjv26ss&ep=v1_gifs_search&rid=giphy.gif&ct=g'); top: 80%; left: 40%;" title="Franky"></div>
        <div id="brook" class="crew-icon" style="background-image: url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXQ3c2d3amsxdmZnNmRra2QyYm1vbDV0YTBuczFvNjA0b3l1YzdrYyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OlM1nq85xO6Fq/giphy.gif'); top: 25%; left: 45%;" title="Brook"></div>
    </div>
    <div class="container">
        <header class="animate__animated animate__fadeIn">
            <div class="title-decoration"></div>
            <div class="title-container">
                <h1><span>Student Department Analysis</span></h1>
                <p class="author">by SARSALIJO, JOHN MIKO</p>
            </div>
        </header>

        <div class="instructions-box animate__animated animate__fadeIn">
            <h2 class="instructions-title">Navigation Guide</h2>
            <ul class="instructions-list">
                <li>Prepare your data file (CSV format)</li>
                <li>Upload via drag & drop or file selection</li>
                <li>View dynamic visualizations of department distribution</li>
                <li>Switch between chart types for different perspectives</li>
                <li>Export results for further analysis</li>
            </ul>
        </div>
        
        <div class="search-filter-container animate__animated animate__fadeIn">
            <div class="sort-controls">
                <button class="sort-btn" id="sortByName">
                    <i class="fas fa-sort-alpha-down"></i> Sort by Name
                </button>
                <button class="sort-btn" id="sortByCount">
                    <i class="fas fa-sort-numeric-down"></i> Sort by Count
                </button>
            </div>
        </div>
        
        <div class="file-input-container animate__animated animate__fadeInUp">
            <h2>Upload Data</h2>
            <div class="file-drop-area" id="dropArea">
                <p>Drag & drop your CSV file here or click to browse</p>
                <input type="file" id="fileInput" class="file-input" accept=".csv">
                <button class="upload-btn" id="uploadBtn">
                    <i class="fas fa-upload"></i> Upload CSV
                </button>
            </div>
        </div>
        
        <div class="loader hidden" id="loader"></div>
        
        <div id="resultsSection" class="hidden animate__animated animate__fadeIn">
            <h2>Analysis Results</h2>
            
            <div class="chart-switcher">
                <button class="chart-btn active" id="barChartBtn">
                    <i class="fas fa-chart-bar"></i> Bar Chart
                </button>
                <button class="chart-btn" id="pieChartBtn">
                    <i class="fas fa-chart-pie"></i> Pie Chart
                </button>
            </div>
            
            <div class="visualizations">
                <div class="chart-container" id="barChartContainer">
                    <canvas id="barChart"></canvas>
                </div>
                
                <div class="chart-container hidden" id="pieChartContainer">
                    <canvas id="pieChart"></canvas>
                </div>
            </div>
            
            <h2>Department Summary</h2>
            <table class="results-table" id="resultsTable">
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Student Count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <!-- Table data will be inserted here -->
                </tbody>
            </table>
            
            <button class="export-btn" id="exportBtn">
                <i class="fas fa-download"></i> Export Results
            </button>
        </div>

        <div class="statistics-panel animate__animated animate__fadeIn">
            <div class="stat-card">
                <div class="stat-value" id="totalStudents">0</div>
                <div class="stat-label">Total Students</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="totalDepartments">0</div>
                <div class="stat-label">Departments</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="averageStudents">0</div>
                <div class="stat-label">Avg. Students/Dept</div>
            </div>
            <div class="stat-card">
                <div class="stat-value" id="largestDepartment">-</div>
                <div class="stat-label">Largest Department</div>
            </div>
        </div>

        <!-- Add Data Insights Section -->
        <div class="insights-container animate__animated animate__fadeIn">
            <h2 class="insights-title">Crew's Data Insights</h2>
            <div id="insightsContent">
                <!-- Insights will be dynamically added here -->
            </div>
        </div>

        <div class="comparison-container" id="comparisonContainer">
            <h2>Department Comparison</h2>
            <div class="comparison-controls">
                <select class="comparison-select" id="dept1Select">
                    <option value="">Select Department 1</option>
                </select>
                <select class="comparison-select" id="dept2Select">
                    <option value="">Select Department 2</option>
                </select>
                <button class="sort-btn" id="compareBtn">Compare</button>
            </div>
            <div class="chart-container">
                <canvas id="comparisonChart"></canvas>
            </div>
        </div>

        <div class="export-options">
            <button class="export-btn" id="exportCSV">
                <i class="fas fa-file-csv"></i> Export to CSV
            </button>
            <button class="export-btn" id="exportPDF">
                <i class="fas fa-file-pdf"></i> Export to PDF
            </button>
            <button class="export-btn" id="exportJSON">
                <i class="fas fa-file-code"></i> Export to JSON
            </button>
        </div>
    </div>
    
    <footer>
        <p>© 2023 Data Visualization Project</p>
    </footer>
    
    <button class="theme-toggle" id="themeToggle">
        <i class="fas fa-moon"></i>
    </button>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Variables
            let csvData = null;
            let barChart = null;
            let pieChart = null;
            let departmentCounts = {};
            
            // DOM Elements
            const fileInput = document.getElementById('fileInput');
            const uploadBtn = document.getElementById('uploadBtn');
            const dropArea = document.getElementById('dropArea');
            const loader = document.getElementById('loader');
            const resultsSection = document.getElementById('resultsSection');
            const barChartBtn = document.getElementById('barChartBtn');
            const pieChartBtn = document.getElementById('pieChartBtn');
            const barChartContainer = document.getElementById('barChartContainer');
            const pieChartContainer = document.getElementById('pieChartContainer');
            const resultsTable = document.getElementById('resultsTable');
            const tableBody = document.getElementById('tableBody');
            const exportBtn = document.getElementById('exportBtn');
            
            // Event Listeners
            uploadBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', handleFileUpload);
            dropArea.addEventListener('dragover', handleDragOver);
            dropArea.addEventListener('drop', handleDrop);
            barChartBtn.addEventListener('click', () => toggleChartView('bar'));
            pieChartBtn.addEventListener('click', () => toggleChartView('pie'));
            exportBtn.addEventListener('click', exportResults);
            
            // Functions
            function handleDragOver(e) {
                e.preventDefault();
                e.stopPropagation();
                dropArea.style.borderColor = '#e74c3c';
                dropArea.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
            }
            
            function handleDrop(e) {
                e.preventDefault();
                e.stopPropagation();
                dropArea.style.borderColor = '#3498db';
                dropArea.style.backgroundColor = 'rgba(52, 152, 219, 0.05)';
                
                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    handleFileUpload();
                }
            }
            
            function handleFileUpload() {
                const file = fileInput.files[0];
                
                if (file && file.type === 'text/csv') {
                    loader.style.display = 'block';
                    
                    Papa.parse(file, {
                        header: true,
                        complete: function(results) {
                            csvData = results.data;
                            processDepartmentData();
                            loader.style.display = 'none';
                            resultsSection.classList.remove('hidden');
                            
                            setTimeout(() => {
                                barChartContainer.classList.add('chart-active');
                                pieChartContainer.classList.add('chart-active');
                            }, 100);
                        },
                        error: function(error) {
                            alert('Error parsing CSV: ' + error.message);
                            loader.style.display = 'none';
                        }
                    });
                } else {
                    alert('Please upload a valid CSV file');
                }
            }
            
            function processDepartmentData() {
                departmentCounts = {};
                
                // Count students in each department
                csvData.forEach(student => {
                    const department = student.Department;
                    if (department) {
                        departmentCounts[department] = (departmentCounts[department] || 0) + 1;
                    }
                });
                
                // Create sorted array of departments for visualization
                const sortedDepartments = Object.entries(departmentCounts)
                    .sort((a, b) => b[1] - a[1])
                    .filter(item => item[0] && item[0].trim() !== '');
                
                const labels = sortedDepartments.map(item => item[0]);
                const data = sortedDepartments.map(item => item[1]);
                
                createBarChart(labels, data);
                createPieChart(labels, data);
                populateTable(sortedDepartments);
                updateStatistics();
                setupComparison();
                generateInsights();
            }
            
            function createBarChart(labels, data) {
                const ctx = document.getElementById('barChart').getContext('2d');
                const totalStudents = data.reduce((sum, val) => sum + val, 0);
                
                if (barChart) {
                    barChart.destroy();
                }
                
                barChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Number of Students',
                            data: data,
                            backgroundColor: generateShipColors(labels.length, 0.7),
                            borderColor: generateShipColors(labels.length, 1),
                            borderWidth: 2,
                            borderRadius: 8,
                            maxBarThickness: 50
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        layout: {
                            padding: {
                                top: 20,
                                right: 20,
                                bottom: 40,
                                left: 20
                            }
                        },
                        animation: {
                            duration: 2000,
                            easing: 'easeInOutQuart',
                        },
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    color: '#8b4513',
                                    font: {
                                        family: 'Pirata One',
                                        size: 14
                                    },
                                    boxWidth: 15,
                                    usePointStyle: true,
                                    pointStyle: 'circle'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Students Count by Department',
                                color: '#8b4513',
                                font: {
                                    family: 'Permanent Marker',
                                    size: 18,
                                    weight: 'bold'
                                },
                                padding: 10
                            },
                            tooltip: {
                                backgroundColor: 'rgba(139, 69, 19, 0.9)',
                                titleColor: '#ffd700',
                                bodyColor: '#f0e68c',
                                cornerRadius: 8,
                                boxPadding: 5,
                                usePointStyle: true,
                                callbacks: {
                                    label: function(context) {
                                        const value = context.parsed.y;
                                        const percentage = ((value / totalStudents) * 100).toFixed(1);
                                        return `Students: ${value} (${percentage}%)`;
                                    }
                                }
                            },
                            datalabels: {
                                color: '#8b4513',
                                anchor: 'end',
                                align: 'top',
                                offset: 5,
                                font: {
                                    family: 'Pirata One',
                                    size: 13,
                                    weight: 'bold'
                                },
                                formatter: function(value) {
                                    const percentage = ((value / totalStudents) * 100).toFixed(1);
                                    return percentage + '%';
                                },
                                display: function(context) {
                                    return context.dataset.data[context.dataIndex] > 0;
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(139, 69, 19, 0.1)',
                                    drawBorder: false
                                },
                                ticks: {
                                    color: '#8b4513',
                                    font: {
                                        family: 'Pirata One',
                                        size: 12
                                    },
                                    padding: 5
                                },
                                border: {
                                    display: false
                                }
                            },
                            x: {
                                grid: {
                                    display: false,
                                    drawBorder: false
                                },
                                ticks: {
                                    color: '#8b4513',
                                    font: {
                                        family: 'Pirata One',
                                        size: 12
                                    },
                                    maxRotation: 45,
                                    minRotation: 45,
                                    padding: 5
                                },
                                border: {
                                    display: false
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });
            }
            
            function createPieChart(labels, data) {
                const ctx = document.getElementById('pieChart').getContext('2d');
                const totalStudents = data.reduce((sum, val) => sum + val, 0);
                
                if (pieChart) {
                    pieChart.destroy();
                }
                
                pieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: generateShipColors(labels.length, 0.7),
                            borderColor: generateShipColors(labels.length, 1),
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        layout: {
                            padding: 20
                        },
                        animation: {
                            animateRotate: true,
                            animateScale: true,
                            duration: 2000,
                            easing: 'easeOutQuart'
                        },
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: {
                                    font: {
                                        family: 'Pirata One',
                                        size: 13
                                    },
                                    color: '#8b4513',
                                    padding: 15,
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    boxWidth: 10,
                                    generateLabels: function(chart) {
                                        const data = chart.data;
                                        if (data.labels.length && data.datasets.length) {
                                            return data.labels.map((label, i) => {
                                                const value = data.datasets[0].data[i];
                                                const percentage = ((value / totalStudents) * 100).toFixed(1);
                                                return {
                                                    text: `${label} (${percentage}%)`,
                                                    fillStyle: data.datasets[0].backgroundColor[i],
                                                    strokeStyle: data.datasets[0].borderColor[i],
                                                    lineWidth: 1,
                                                    hidden: isNaN(data.datasets[0].data[i]) || chart.getDatasetMeta(0).data[i].hidden,
                                                    index: i
                                                };
                                            });
                                        }
                                        return [];
                                    }
                                }
                            },
                            title: {
                                display: true,
                                text: 'Students Distribution by Department',
                                color: '#8b4513',
                                font: {
                                    family: 'Permanent Marker',
                                    size: 18,
                                    weight: 'bold'
                                },
                                padding: 10
                            },
                            tooltip: {
                                backgroundColor: 'rgba(139, 69, 19, 0.9)',
                                titleColor: '#ffd700',
                                bodyColor: '#f0e68c',
                                cornerRadius: 8,
                                boxPadding: 5,
                                callbacks: {
                                    label: function(context) {
                                        const value = context.parsed;
                                        const percentage = ((value / totalStudents) * 100).toFixed(1);
                                        return `Students: ${value} (${percentage}%)`;
                                    }
                                }
                            },
                            datalabels: {
                                color: '#000000',
                                font: {
                                    family: 'Pirata One',
                                    size: 13,
                                    weight: 'bold'
                                },
                                formatter: function(value) {
                                    const percentage = ((value / totalStudents) * 100).toFixed(1);
                                    if (percentage < 5) return ''; // Don't show labels for small slices
                                    return percentage + '%';
                                },
                                backgroundColor: function(context) {
                                    return context.dataset.backgroundColor[context.dataIndex];
                                },
                                borderColor: 'white',
                                borderWidth: 1,
                                borderRadius: 4,
                                padding: 4,
                                display: function(context) {
                                    const value = context.dataset.data[context.dataIndex];
                                    const percentage = ((value / totalStudents) * 100);
                                    return percentage >= 5; // Only show for slices >= 5%
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });
            }
            
            function generateShipColors(count, alpha) {
                // Ship-themed color palette
                const shipPalette = [
                    `rgba(139, 69, 19, ${alpha})`,   // Wood brown
                    `rgba(160, 82, 45, ${alpha})`,   // Wood light
                    `rgba(101, 67, 33, ${alpha})`,   // Wood dark
                    `rgba(196, 30, 58, ${alpha})`,   // Red
                    `rgba(255, 215, 0, ${alpha})`,   // Gold
                    `rgba(30, 144, 255, ${alpha})`,  // Ocean blue
                    `rgba(240, 230, 140, ${alpha})`, // Light sand
                    `rgba(47, 79, 79, ${alpha})`,    // Dark slate
                    `rgba(58, 110, 165, ${alpha})`,  // Ocean light
                    `rgba(194, 230, 240, ${alpha})`  // Sea foam
                ];
                
                const colors = [];
                // If we need more colors than in our palette, generate them
                if (count <= shipPalette.length) {
                    for (let i = 0; i < count; i++) {
                        colors.push(shipPalette[i]);
                    }
                } else {
                    // If we need more colors, generate them with a hue step
                    const hueStep = 360 / count;
                    for (let i = 0; i < count; i++) {
                        const hue = i * hueStep;
                        colors.push(`hsla(${hue}, 70%, 60%, ${alpha})`);
                    }
                }
                
                return colors;
            }
            
            function populateTable(departmentData) {
                tableBody.innerHTML = '';
                const totalStudents = departmentData.reduce((sum, item) => sum + item[1], 0);
                
                departmentData.forEach(item => {
                    const row = document.createElement('tr');
                    const departmentCell = document.createElement('td');
                    const countCell = document.createElement('td');
                    const percentageCell = document.createElement('td');
                    
                    departmentCell.textContent = item[0];
                    countCell.textContent = item[1];
                    const percentage = ((item[1] / totalStudents) * 100).toFixed(1);
                    percentageCell.textContent = `${percentage}%`;
                    
                    row.appendChild(departmentCell);
                    row.appendChild(countCell);
                    row.appendChild(percentageCell);
                    tableBody.appendChild(row);
                });
            }
            
            function toggleChartView(chartType) {
                if (chartType === 'bar') {
                    barChartBtn.classList.add('active');
                    pieChartBtn.classList.remove('active');
                    barChartContainer.classList.remove('hidden');
                    pieChartContainer.classList.add('hidden');
                    
                    // Redraw to ensure proper rendering in porthole
                    setTimeout(() => {
                        if (barChart) {
                            const ctx = document.getElementById('barChart').getContext('2d');
                            ctx.canvas.width = ctx.canvas.offsetWidth;
                            ctx.canvas.height = ctx.canvas.offsetHeight;
                            barChart.resize();
                            barChart.update();
                        }
                    }, 100);
                } else {
                    barChartBtn.classList.remove('active');
                    pieChartBtn.classList.add('active');
                    barChartContainer.classList.add('hidden');
                    pieChartContainer.classList.remove('hidden');
                    
                    // Redraw to ensure proper rendering in porthole
                    setTimeout(() => {
                        if (pieChart) {
                            const ctx = document.getElementById('pieChart').getContext('2d');
                            ctx.canvas.width = ctx.canvas.offsetWidth;
                            ctx.canvas.height = ctx.canvas.offsetHeight;
                            pieChart.resize();
                            pieChart.update();
                        }
                    }, 100);
                }
            }
            
            function exportResults() {
                if (!csvData) {
                    alert('No data to export. Please upload a CSV file first.');
                    return;
                }
                
                const totalStudents = Object.values(departmentCounts).reduce((sum, val) => sum + val, 0);
                
                // Create CSV content
                let csvContent = 'Department,Student Count,Percentage\n';
                
                Object.entries(departmentCounts)
                    .sort((a, b) => b[1] - a[1])
                    .filter(item => item[0] && item[0].trim() !== '')
                    .forEach(([department, count]) => {
                        const percentage = ((count / totalStudents) * 100).toFixed(1);
                        csvContent += `${department},${count},${percentage}%\n`;
                    });
                
                // Create blob and download
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', 'department_analysis.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            let isDarkMode = true;

            themeToggle.addEventListener('click', () => {
                isDarkMode = !isDarkMode;
                document.body.style.background = isDarkMode 
                    ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(46, 20, 20, 0.95))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(240, 230, 220, 0.95))';
                themeToggle.innerHTML = isDarkMode 
                    ? '<i class="fas fa-moon"></i>' 
                    : '<i class="fas fa-sun"></i>';
            });

            // Sorting
            document.getElementById('sortByName').addEventListener('click', function() {
                this.classList.add('active');
                document.getElementById('sortByCount').classList.remove('active');
                const sorted = Object.entries(departmentCounts)
                    .sort((a, b) => a[0].localeCompare(b[0]));
                updateCharts(sorted);
            });

            document.getElementById('sortByCount').addEventListener('click', function() {
                this.classList.add('active');
                document.getElementById('sortByName').classList.remove('active');
                const sorted = Object.entries(departmentCounts)
                    .sort((a, b) => b[1] - a[1]);
                updateCharts(sorted);
            });

            function updateCharts(sortedData) {
                const labels = sortedData.map(item => item[0]);
                const data = sortedData.map(item => item[1]);
                
                createBarChart(labels, data);
                createPieChart(labels, data);
                populateTable(sortedData);
            }

            // Statistics Update
            function updateStatistics() {
                const total = Object.values(departmentCounts).reduce((sum, val) => sum + val, 0);
                const deptCount = Object.keys(departmentCounts).length;
                const avg = deptCount > 0 ? Math.round(total / deptCount) : 0;
                const largest = Object.entries(departmentCounts)
                    .sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

                document.getElementById('totalStudents').textContent = total;
                document.getElementById('totalDepartments').textContent = deptCount;
                document.getElementById('averageStudents').textContent = avg;
                document.getElementById('largestDepartment').textContent = largest;
            }

            // Comparison Feature
            function setupComparison() {
                const dept1Select = document.getElementById('dept1Select');
                const dept2Select = document.getElementById('dept2Select');
                const compareBtn = document.getElementById('compareBtn');
                
                // Populate department options
                const departments = Object.keys(departmentCounts);
                departments.forEach(dept => {
                    dept1Select.add(new Option(dept, dept));
                    dept2Select.add(new Option(dept, dept));
                });

                compareBtn.addEventListener('click', () => {
                    const dept1 = dept1Select.value;
                    const dept2 = dept2Select.value;
                    
                    if (dept1 && dept2) {
                        createComparisonChart(dept1, dept2);
                        document.getElementById('comparisonContainer').classList.add('active');
                    }
                });
            }

            function createComparisonChart(dept1, dept2) {
                const ctx = document.getElementById('comparisonChart').getContext('2d');
                
                if (window.comparisonChart) {
                    window.comparisonChart.destroy();
                }
                
                const data = {
                    labels: [dept1, dept2],
                    datasets: [{
                        label: 'Number of Students',
                        data: [departmentCounts[dept1], departmentCounts[dept2]],
                        backgroundColor: [
                            'rgba(139, 69, 19, 0.7)',  // Wood brown
                            'rgba(196, 30, 58, 0.7)'   // Red
                        ],
                        borderColor: [
                            'rgba(101, 67, 33, 1)',    // Wood dark
                            'rgba(139, 0, 0, 1)'       // Dark red
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                        maxBarThickness: 80
                    }]
                };

                window.comparisonChart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Department Comparison',
                                color: '#8b4513',
                                font: {
                                    family: 'Permanent Marker',
                                    size: 18,
                                    weight: 'bold'
                                },
                                padding: 10
                            },
                            legend: {
                                display: false
                            },
                            tooltip: {
                                backgroundColor: 'rgba(139, 69, 19, 0.9)',
                                titleColor: '#ffd700',
                                bodyColor: '#f0e68c',
                                cornerRadius: 8,
                                boxPadding: 5
                            },
                            datalabels: {
                                color: '#ffffff',
                                anchor: 'center',
                                align: 'center',
                                font: {
                                    family: 'Pirata One',
                                    size: 16,
                                    weight: 'bold'
                                },
                                formatter: function(value) {
                                    return value;
                                },
                                textShadow: '0px 0px 4px rgba(0, 0, 0, 0.7)'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(139, 69, 19, 0.1)',
                                    drawBorder: false
                                },
                                ticks: {
                                    color: '#8b4513',
                                    font: {
                                        family: 'Pirata One',
                                        size: 12
                                    },
                                    padding: 5
                                },
                                border: {
                                    display: false
                                }
                            },
                            x: {
                                grid: {
                                    display: false,
                                    drawBorder: false
                                },
                                ticks: {
                                    color: '#8b4513',
                                    font: {
                                        family: 'Pirata One',
                                        size: 14
                                    },
                                    padding: 5
                                },
                                border: {
                                    display: false
                                }
                            }
                        }
                    },
                    plugins: [ChartDataLabels]
                });
                
                // Ensure proper rendering in the porthole
                setTimeout(() => {
                    if (window.comparisonChart) {
                        ctx.canvas.width = ctx.canvas.offsetWidth;
                        ctx.canvas.height = ctx.canvas.offsetHeight;
                        window.comparisonChart.resize();
                        window.comparisonChart.update();
                    }
                }, 100);
            }

            // Enhanced Export Options
            document.getElementById('exportPDF').addEventListener('click', () => {
                // Implement PDF export using jsPDF or similar library
                alert('PDF export feature coming soon!');
            });

            document.getElementById('exportJSON').addEventListener('click', () => {
                const jsonData = JSON.stringify(departmentCounts, null, 2);
                const blob = new Blob([jsonData], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'department_analysis.json';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            // Data Insights Feature
            function generateInsights() {
                if (!departmentCounts || Object.keys(departmentCounts).length === 0) return;

                const insightsContent = document.getElementById('insightsContent');
                const totalStudents = Object.values(departmentCounts).reduce((sum, val) => sum + val, 0);
                const departments = Object.entries(departmentCounts).sort((a, b) => b[1] - a[1]);
                const avgStudents = Math.round(totalStudents / departments.length);

                // Calculate insights
                const topDepartment = departments[0];
                const smallestDepartment = departments[departments.length - 1];
                const aboveAverage = departments.filter(dept => dept[1] > avgStudents).length;

                // Clear previous insights
                insightsContent.innerHTML = '';

                // Create insight cards
                const insights = [
                    {
                        icon: '⚔️',
                        title: "Captain's Observation",
                        content: `The mighty ${topDepartment[0]} leads our fleet with ${topDepartment[1]} nakama, while ${smallestDepartment[0]} forms our smallest but valuable crew of ${smallestDepartment[1]}.`
                    },
                    {
                        icon: '🎯',
                        title: "Navigator's Report",
                        content: `${aboveAverage} departments sail above the average crew size of ${avgStudents} members, showing our diverse strength distribution!`
                    },
                    {
                        icon: '🗺️',
                        title: "Log Pose Reading",
                        content: `Our total fleet of ${totalStudents} members is distributed across ${departments.length} different divisions, each contributing to our grand adventure!`
                    }
                ];

                insights.forEach(insight => {
                    const card = document.createElement('div');
                    card.className = 'insight-card';
                    card.innerHTML = `
                        <span class="insight-icon">${insight.icon}</span>
                        <h3 class="insight-title">${insight.title}</h3>
                        <p class="insight-content">${insight.content}</p>
                    `;
                    insightsContent.appendChild(card);
                });
            }
        });
    </script>
</body>
</html> 
