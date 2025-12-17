$cache = Join-Path -Path (Get-Location) -ChildPath ".next"
if (Test-Path $cache) {
  Write-Host "Removing .next cache..."
  Remove-Item $cache -Recurse -Force
} else {
  Write-Host ".next cache does not exist."
}

