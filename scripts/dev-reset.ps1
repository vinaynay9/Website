# Dev Server Reset Script
# Kills all Node.js processes and frees ports 3000-3010
# Use this when dev server hangs or spawns multiple ports

Write-Host "=== Dev Server Reset ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Kill all Node.js processes
Write-Host "Step 1: Killing all Node.js processes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue

if ($nodeProcesses) {
    $count = $nodeProcesses.Count
    Write-Host "Found $count Node.js process(es)" -ForegroundColor Yellow
    
    foreach ($proc in $nodeProcesses) {
        Write-Host "  Killing PID $($proc.Id)..." -ForegroundColor Gray
        Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    }
    
    # Wait a moment for processes to fully terminate
    Start-Sleep -Seconds 2
    
    Write-Host "✓ All Node.js processes terminated" -ForegroundColor Green
} else {
    Write-Host "✓ No Node.js processes found" -ForegroundColor Green
}

Write-Host ""

# Step 2: Free ports 3000-3010
Write-Host "Step 2: Checking ports 3000-3010..." -ForegroundColor Yellow

$portsToCheck = 3000..3010
$freedPorts = @()

foreach ($port in $portsToCheck) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    
    if ($connection) {
        $pid = $connection.OwningProcess
        Write-Host "  Port $port is in use by PID $pid" -ForegroundColor Gray
        
        # Try to kill the process using the port
        try {
            Stop-Process -Id $pid -Force -ErrorAction Stop
            Write-Host "    ✓ Freed port $port" -ForegroundColor Green
            $freedPorts += $port
        } catch {
            Write-Host "    ⚠ Could not free port $port: $_" -ForegroundColor Yellow
        }
    }
}

if ($freedPorts.Count -eq 0) {
    Write-Host "✓ All ports 3000-3010 are free" -ForegroundColor Green
} else {
    Write-Host "✓ Freed $($freedPorts.Count) port(s): $($freedPorts -join ', ')" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== Reset Complete ===" -ForegroundColor Cyan
Write-Host "You can now run: npm run dev" -ForegroundColor Green
Write-Host ""

